import styled from 'styled-components';

export const PageContainer = styled.main`
  min-height: 100vh;
  padding: 0 0 16px 0;
  max-width: 100%;
  margin: 0;
  animation: fadeIn 0.3s ease;
`;

export const Header = styled.header`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 24px;
  padding: 0 4px;
`;

export const Title = styled.h1`
  font-size: 34px;
  font-weight: 700;
  letter-spacing: -0.022em;
  color: var(--color-text);
`;

export const ButtonRow = styled.div`
  display: flex;
  gap: 12px;
  flex-wrap: wrap;
  margin-bottom: 24px;
`;

export const ActionButton = styled.button<{ $variant?: 'primary' | 'secondary' | 'danger' | 'ghost' }>`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: 6px;
  padding: 12px 20px;
  border-radius: 12px;
  font-size: 15px;
  font-weight: 600;
  transition: all 0.15s ease;
  min-height: 44px;
  -webkit-tap-highlight-color: transparent;

  ${({ $variant }) => {
    switch ($variant) {
      case 'secondary': return `background: var(--color-fill-secondary); color: var(--color-accent); &:hover { background: var(--color-fill); } &:active { transform: scale(0.97); }`;
      case 'danger': return `background: var(--color-danger); color: #FFFFFF; &:hover { background: var(--color-danger); } &:active { transform: scale(0.97); }`;
      case 'ghost': return `background: transparent; color: var(--color-accent); &:hover { background: var(--color-accent-light); } &:active { transform: scale(0.97); }`;
      default: return `background: var(--color-turquoise); color: #FFFFFF; &:hover { background: var(--color-turquoise-hover); } &:active { transform: scale(0.97); }`;
    }
  }}

  &:disabled { opacity: 0.4; pointer-events: none; }
`;

export const StatusCard = styled.div`
  background: var(--color-card);
  border-radius: 16px;
  padding: 20px;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.04), 0 1px 2px rgba(0, 0, 0, 0.06);
  border: 0.5px solid var(--color-separator);
  margin-bottom: 16px;
  text-align: center;
`;

export const StatusText = styled.p`
  font-size: 17px;
  font-weight: 500;
  color: var(--color-text);
  margin: 0;
`;

export const GeoWarning = styled.div`
  background: var(--color-warning-light);
  border-radius: 12px;
  padding: 12px 16px;
  color: var(--color-warning);
  font-size: 15px;
  font-weight: 500;
  margin-bottom: 16px;
  text-align: center;
`;

export const VideoGrid = styled.div`
  display: flex;
  gap: 12px;
  flex-wrap: wrap;
  margin-bottom: 24px;
`;

export const Video = styled.video`
  width: 280px;
  height: 210px;
  background: #000000;
  border-radius: 16px;
  object-fit: cover;
`;

export const IncomingModal = styled.div`
  background: var(--color-card);
  border-radius: 20px;
  padding: 24px;
  box-shadow: 0 16px 48px rgba(0, 0, 0, 0.12), 0 8px 16px rgba(0, 0, 0, 0.06);
  border: 0.5px solid var(--color-separator);
  margin-bottom: 16px;
  text-align: center;
  animation: scaleIn 0.3s ease;
`;

export const ModalTitle = styled.p`
  font-size: 17px;
  font-weight: 600;
  color: var(--color-text);
  margin: 0 0 16px 0;
`;

export const ModalActions = styled.div`
  display: flex;
  gap: 12px;
  justify-content: center;
`;

export const SectionTitle = styled.h2`
  font-size: 20px;
  font-weight: 600;
  letter-spacing: -0.01em;
  color: var(--color-text);
  margin: 24px 0 12px 0;
`;

export const CallHistoryItem = styled.div`
  background: var(--color-card);
  border-radius: 12px;
  padding: 14px 18px;
  box-shadow: 0 1px 2px rgba(0, 0, 0, 0.04);
  border: 0.5px solid var(--color-separator);
  font-size: 15px;
  color: var(--color-text);
  margin-bottom: 8px;
`;

export const EmptyState = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 48px 24px;
  text-align: center;
  color: var(--color-text-secondary);

  .icon { font-size: 48px; margin-bottom: 16px; opacity: 0.4; }
  p { font-size: 17px; margin: 0; }
`;

export const BackLink = styled.a`
  display: inline-flex;
  align-items: center;
  gap: 4px;
  color: var(--color-accent);
  font-size: 15px;
  font-weight: 500;
  text-decoration: none;
  margin-top: 24px;

  &:hover { text-decoration: underline; }
`;
