import { useCallback, useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { getToken } from '@/services/auth.service';
import { BellIcon } from '@/components/Icons';
import { Header } from '@/components/Header';
import { apiFetch } from '@/services/api';
import {
  ActionButton,
  ActionRow,
  EmptyState,
  LoadingSpinner,
  NotificationItem,
  NotificationList,
  NotificationMessage,
  NotificationMeta,
  PageContainer,
} from './Notifications.styles';

interface Notification {
  id: string;
  user_id: string;
  visit_id: string | null;
  type: string;
  message: string;
  read: number;
  created_at: string;
}

export const Notifications = () => {
  const navigate = useNavigate();
  const [notifications, setNotifications] = useState<Notification[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const load = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const data = await apiFetch<{ notifications: Notification[]; unread: number }>('/notifications');
      setNotifications(data.notifications);
    } catch (err) {
      setError((err as Error).message);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    if (!getToken()) {
      navigate('/login');
      return;
    }
    const run = async () => {
      await load();
    };
    void run();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [navigate]);

  const handleMarkRead = async (id: string) => {
    try {
      await apiFetch(`/notifications/${id}/read`, { method: 'POST' });
      await load();
    } catch (err) {
      setError((err as Error).message);
    }
  };


  return (
    <PageContainer>
      <Header title="Notificaciones" />
      {loading ? <LoadingSpinner /> : null}
      {error ? <EmptyState><p>{error}</p></EmptyState> : null}
      {!loading && notifications.length === 0 ? (
        <EmptyState><div className="icon"><BellIcon size={48} /></div><p>Sin notificaciones</p></EmptyState>
      ) : null}
      <NotificationList>
        {notifications.map((n) => (
          <NotificationItem key={n.id} $read={n.read === 1}>
            <NotificationMessage>{n.message}</NotificationMessage>
            <NotificationMeta>{new Date(n.created_at).toLocaleString()}</NotificationMeta>
            <ActionRow>
              {n.read === 0 ? (
                <ActionButton type="button" onClick={() => handleMarkRead(n.id)}>
                  Marcar leída
                </ActionButton>
              ) : null}
              {n.visit_id ? (
                <ActionButton $variant="ghost" as={Link} to={`/card/${n.visit_id}`}>
                  Ver card →
                </ActionButton>
              ) : null}
            </ActionRow>
          </NotificationItem>
        ))}
      </NotificationList>
    </PageContainer>
  );
};
