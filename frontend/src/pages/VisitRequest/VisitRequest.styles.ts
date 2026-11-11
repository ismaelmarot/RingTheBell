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
`;

export const Title = styled.h1`
  font-size: 28px;
  font-weight: 700;
  letter-spacing: -0.022em;
  color: var(--color-text);
  text-align: center;
  margin-bottom: 8px;
`;

export const Subtitle = styled.p`
  font-size: 15px;
  color: var(--color-text-secondary);
  text-align: center;
  margin-bottom: 24px;
`;

export const FormRow = styled.div`
  display: flex;
  flex-direction: column;
  gap: 8px;
  margin-bottom: 12px;
`;

export const Input = styled.input`
  width: 100%;
  padding: 14px 16px;
  border: 1px solid var(--color-separator);
  border-radius: 12px;
  font-size: 17px;
  background: var(--color-card);
  color: var(--color-text);
  transition: all 0.2s ease;
  min-height: 48px;

  &::placeholder { color: var(--color-text-tertiary); }
  &:focus { outline: none; border-color: var(--color-turquoise); box-shadow: 0 0 0 4px var(--color-turquoise-light); }
`;

export const ActionButton = styled.button`
  width: 100%;
  padding: 14px 24px;
  border: none;
  border-radius: 12px;
  background: var(--color-accent);
  color: #FFFFFF;
  font-size: 17px;
  font-weight: 600;
  min-height: 48px;
  transition: all 0.15s ease;
  margin-top: 8px;

  &:hover { background: var(--color-accent-hover); }
  &:active { transform: scale(0.97); }
  &:disabled { opacity: 0.4; pointer-events: none; }
`;

export const SuccessIcon = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  color: var(--color-success);
  margin-bottom: 16px;
`;

export const SuccessText = styled.p`
  font-size: 17px;
  color: var(--color-text-secondary);
  text-align: center;
  margin-bottom: 24px;
  line-height: 1.5;
`;

export const LinkButton = styled.a`
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
