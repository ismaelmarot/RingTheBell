import styled from 'styled-components';

export const PageContainer = styled.main`
  min-height: 100vh;
  padding: 0 0 16px 0;
  max-width: 100%;
  margin: 0;
  animation: fadeIn 0.3s ease;
  display: flex;
  flex-direction: column;
`;

export const Header = styled.header`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 16px;
  padding: 0 4px;
`;

export const Title = styled.h1`
  font-size: 28px;
  font-weight: 700;
  letter-spacing: -0.022em;
  color: var(--color-text);
`;

export const ConnectionDot = styled.span<{ $connected: boolean }>`
  display: inline-block;
  width: 10px;
  height: 10px;
  border-radius: 50%;
  background: ${({ $connected }) => ($connected ? '#34C759' : '#FF3B30')};
  margin-left: 8px;
  vertical-align: middle;
`;

export const MessageList = styled.ul`
  list-style: none;
  padding: 16px;
  margin: 0 0 16px 0;
  flex: 1;
  overflow-y: auto;
  display: flex;
  flex-direction: column;
  gap: 8px;
  background: var(--color-card);
  border-radius: 16px;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.04), 0 1px 2px rgba(0, 0, 0, 0.06);
  border: 0.5px solid var(--color-separator);
  min-height: 300px;
  max-height: 60vh;
`;

export const MessageBubble = styled.li<{ $mine: boolean }>`
  align-self: ${({ $mine }) => ($mine ? 'flex-end' : 'flex-start')};
  background-color: ${({ $mine }) => ($mine ? 'var(--color-turquoise)' : 'var(--color-fill)')};
  color: ${({ $mine }) => ($mine ? '#FFFFFF' : '#000000')};
  padding: 10px 14px;
  border-radius: 16px;
  max-width: 80%;
  display: flex;
  flex-direction: column;
  gap: 4px;
  font-size: 15px;
  line-height: 1.4;
  box-shadow: 0 1px 2px rgba(0, 0, 0, 0.04);

  strong {
    font-size: 12px;
    font-weight: 600;
    opacity: 0.8;
  }

  small {
    font-size: 11px;
    opacity: 0.7;
  }

  img {
    border-radius: 8px;
    margin-top: 4px;
  }
`;

export const InputBar = styled.div`
  display: flex;
  gap: 8px;
  align-items: center;
`;

export const Input = styled.input`
  flex: 1;
  padding: 12px 16px;
  border: 1px solid var(--color-separator);
  border-radius: 12px;
  font-size: 15px;
  background: var(--color-card);
  color: var(--color-text);
  transition: all 0.2s ease;
  min-height: 44px;

  &::placeholder { color: var(--color-text-tertiary); }
  &:focus { outline: none; border-color: var(--color-turquoise); box-shadow: 0 0 0 4px var(--color-turquoise-light); }
`;

export const SendButton = styled.button`
  padding: 12px 20px;
  border: none;
  border-radius: 12px;
  background: var(--color-accent);
  color: #FFFFFF;
  font-size: 15px;
  font-weight: 600;
  min-height: 44px;
  transition: all 0.15s ease;

  &:hover { background: var(--color-accent-hover); }
  &:active { transform: scale(0.97); }
  &:disabled { opacity: 0.4; pointer-events: none; }
`;

export const EmptyState = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 48px 24px;
  text-align: center;
  color: var(--color-text-secondary);
  width: 100%;

  .icon { font-size: 48px; margin-bottom: 16px; opacity: 0.4; }
  p { font-size: 17px; margin: 0; }
`;

export const ErrorText = styled.p`
  font-size: 13px;
  color: var(--color-danger);
  margin: 0 0 8px 0;
`;

export const BackLink = styled.a`
  display: inline-flex;
  align-items: center;
  gap: 4px;
  color: var(--color-accent);
  font-size: 15px;
  font-weight: 500;
  text-decoration: none;
  margin-top: 16px;

  &:hover { text-decoration: underline; }
`;
