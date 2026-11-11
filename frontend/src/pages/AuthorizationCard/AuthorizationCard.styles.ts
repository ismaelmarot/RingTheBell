import styled from 'styled-components';

export const PageContainer = styled.main`
  min-height: 100vh;
  padding: 0 0 16px 0;
  max-width: 100%;
  margin: 0;
  animation: fadeIn 0.3s ease;
  display: flex;
  flex-direction: column;
  justify-content: center;
`;

export const Card = styled.div`
  background: var(--color-card);
  border-radius: 20px;
  padding: 32px 24px;
  box-shadow: 0 8px 24px rgba(0, 0, 0, 0.06), 0 2px 8px rgba(0, 0, 0, 0.04);
  border: 0.5px solid var(--color-separator);
  display: flex;
  flex-direction: column;
  gap: 12px;
`;

export const Title = styled.h1`
  font-size: 28px;
  font-weight: 700;
  letter-spacing: -0.022em;
  color: var(--color-text);
  text-align: center;
  margin-bottom: 8px;
`;

export const VisitorPhoto = styled.img`
  width: 120px;
  height: 120px;
  border-radius: 50%;
  object-fit: cover;
  margin: 0 auto 8px;
  border: 3px solid #FFFFFF;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.08);
`;

export const Field = styled.div`
  display: flex;
  flex-direction: column;
  gap: 2px;
  padding: 12px 0;
  border-bottom: 0.5px solid var(--color-separator);

  &:last-of-type {
    border-bottom: none;
  }
`;

export const Label = styled.span`
  font-size: 12px;
  font-weight: 600;
  color: var(--color-text-secondary);
  text-transform: uppercase;
  letter-spacing: 0.02em;
`;

export const Value = styled.span`
  font-size: 17px;
  color: var(--color-text);
  font-weight: 500;
`;

export const StatusBadge = styled.span<{ $status: string }>`
  display: inline-flex;
  align-items: center;
  padding: 4px 12px;
  border-radius: 8px;
  font-size: 13px;
  font-weight: 600;

  ${({ $status }) => {
    switch ($status) {
      case 'ACCEPTED': return `background: var(--color-success-light); color: var(--color-success);`;
      case 'REJECTED': return `background: var(--color-danger-light); color: var(--color-danger);`;
      case 'FINALIZED': return `background: var(--color-fill); color: var(--color-gray);`;
      case 'PENDING': default: return `background: var(--color-warning-light); color: var(--color-warning);`;
    }
  }}
`;

export const BackLink = styled.a`
  display: block;
  text-align: center;
  color: var(--color-accent);
  font-size: 15px;
  font-weight: 500;
  text-decoration: none;
  margin-top: 16px;

  &:hover { text-decoration: underline; }
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
