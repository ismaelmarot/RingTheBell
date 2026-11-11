import { useCallback, useEffect, useRef, useState } from 'react';
import { useParams } from 'react-router-dom';
import { io, Socket } from 'socket.io-client';
import { getToken } from '@/services/auth.service';
import { Header } from '@/components/Header';
import { listMessages, sendMessage } from '@/services/messages.service';
import type { Message } from '@/interface';
import {
  EmptyState,
  ErrorText,
  Input,
  InputBar,
  MessageBubble,
  MessageList,
  PageContainer,
  SendButton,
  Title,
  ConnectionDot,
} from './Chat.styles';

const SOCKET_URL = import.meta.env.VITE_API_URL || 'http://localhost:3001';

export const Chat = () => {
  const { visitId } = useParams<{ visitId: string }>();
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState('');
  const [senderName] = useState(() => {
    const token = getToken();
    if (token) {
      try {
        const payload = JSON.parse(atob(token.split('.')[1]));
        if (payload.email) return payload.email;
      } catch {
        // ignore
      }
    }
    return 'Usuario';
  });
  const [connected, setConnected] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const socketRef = useRef<Socket | null>(null);
  const listRef = useRef<HTMLUListElement | null>(null);

  const scrollToBottom = useCallback(() => {
    if (listRef.current) {
      listRef.current.scrollTop = listRef.current.scrollHeight;
    }
  }, []);

  useEffect(() => {
    if (!visitId) return;
    const run = async () => {
      try {
        const history = await listMessages(visitId);
        setMessages(history);
      } catch (err) {
        setError((err as Error).message);
      }
    };
    void run();

    const socket = io(SOCKET_URL, { transports: ['websocket'] });
    socketRef.current = socket;
    socket.on('connect', () => {
      setConnected(true);
      socket.emit('join_visit', visitId);
      socket.emit('request_history', visitId);
    });
    socket.on('disconnect', () => setConnected(false));
    socket.on('new_message', (msg: Message) => {
      setMessages((prev) => (prev.some((m) => m.id === msg.id) ? prev : [...prev, msg]));
    });
    socket.on('history', (msgs: Message[]) => {
      setMessages(msgs);
    });

    return () => {
      socket.disconnect();
      socketRef.current = null;
    };
  }, [visitId]);

  useEffect(() => {
    scrollToBottom();
  }, [messages, scrollToBottom]);

  const handleSend = async () => {
    if (!visitId || !input.trim()) return;
    const text = input.trim();
    setInput('');
    const socket = socketRef.current;
    if (socket && socket.connected) {
      socket.emit('send_message', { visitId, senderName, content: text });
    } else {
      try {
        const msg = await sendMessage({ visitId, senderName, content: text });
        setMessages((prev) => (prev.some((m) => m.id === msg.id) ? prev : [...prev, msg]));
      } catch (err) {
        setError((err as Error).message);
      }
    }
  };

  return (
    <PageContainer>
      <Header title="Chat de visita" />
      <Title style={{ display: "none" }}>Chat de visita <ConnectionDot $connected={connected} /></Title>

      {error ? <ErrorText>{error}</ErrorText> : null}
      <MessageList ref={listRef}>
        {messages.length === 0 ? <EmptyState>Sin mensajes</EmptyState> : null}
        {messages.map((m) => (
          <MessageBubble key={m.id} $mine={m.sender_name === senderName}>
            <strong>{m.sender_name}</strong>
            {m.content ? <span>{m.content}</span> : null}
            {m.image_url ? <img src={m.image_url} alt="imagen" width={160} /> : null}
            <small>{new Date(m.created_at).toLocaleTimeString()}</small>
          </MessageBubble>
        ))}
      </MessageList>
      <InputBar>
        <Input
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === 'Enter') void handleSend();
          }}
          placeholder="Escribe un mensaje..."
        />
        <SendButton type="button" onClick={() => void handleSend()}>
          Enviar
        </SendButton>
      </InputBar>

    </PageContainer>
  );
};