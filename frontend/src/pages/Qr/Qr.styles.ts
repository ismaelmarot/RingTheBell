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

export const FormCard = styled.div`
  background: var(--color-card);
  border-radius: 16px;
  padding: 20px;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.04), 0 1px 2px rgba(0, 0, 0, 0.06);
  border: 0.5px solid var(--color-separator);
  margin-bottom: 24px;
`;

export const FormRow = styled.div`
  display: flex;
  gap: 12px;
  align-items: center;
  flex-wrap: wrap;
`;

export const Input = styled.input`
  flex: 1;
  min-width: 160px;
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

export const Select = styled.select`
  padding: 12px 16px;
  border: 1px solid var(--color-separator);
  border-radius: 12px;
  font-size: 15px;
  background: var(--color-card);
  color: var(--color-text);
  transition: all 0.2s ease;
  min-height: 44px;
  cursor: pointer;

  &:focus { outline: none; border-color: var(--color-turquoise); box-shadow: 0 0 0 4px var(--color-turquoise-light); }
`;

export const ActionButton = styled.button<{ $variant?: 'primary' | 'secondary' | 'danger' | 'ghost' }>`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: 4px;
  padding: 10px 18px;
  border-radius: 10px;
  font-size: 15px;
  font-weight: 600;
  transition: all 0.15s ease;
  min-height: 40px;
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

export const QrGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
  gap: 12px;
`;

export const QrCard = styled.div`
  background: var(--color-card);
  border-radius: 16px;
  padding: 20px;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.04), 0 1px 2px rgba(0, 0, 0, 0.06);
  border: 0.5px solid var(--color-separator);
  display: flex;
  flex-direction: column;
  gap: 12px;
  align-items: center;
  transition: all 0.2s ease;

  &:hover { box-shadow: 0 4px 12px rgba(0, 0, 0, 0.06), 0 2px 4px rgba(0, 0, 0, 0.04); }
`;

export const QrImage = styled.img`
  width: 180px;
  height: 180px;
  border-radius: 12px;
  background: var(--color-bg);
  padding: 8px;
`;

export const QrMeta = styled.p`
  font-size: 13px;
  color: var(--color-text-secondary);
  text-align: center;
  margin: 0;
`;

export const StatusBadge = styled.span<{ $status: string }>`
  display: inline-flex;
  align-items: center;
  padding: 4px 10px;
  border-radius: 8px;
  font-size: 13px;
  font-weight: 600;

  ${({ $status }) => {
    switch ($status) {
      case 'ACTIVE': return `background: var(--color-success-light); color: var(--color-success);`;
      case 'REVOKED': return `background: var(--color-danger-light); color: var(--color-danger);`;
      default: return `background: var(--color-fill); color: var(--color-gray);`;
    }
  }}
`;

export const ActionRow = styled.div`
  display: flex;
  gap: 8px;
  flex-wrap: wrap;
  justify-content: center;
`;

export const EmptyState = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 64px 24px;
  text-align: center;
  color: var(--color-text-secondary);

  .icon { font-size: 48px; margin-bottom: 16px; opacity: 0.4; }
  p { font-size: 17px; margin: 0; }
`;

export const LoadingSpinner = styled.div`
  width: 32px;
  height: 32px;
  border: 3px solid var(--color-separator);
  border-top-color: var(--color-accent);
  border-radius: 50%;
  animation: spin 0.8s linear infinite;
  margin: 48px auto;

  @keyframes spin { to { transform: rotate(360deg); } }
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
