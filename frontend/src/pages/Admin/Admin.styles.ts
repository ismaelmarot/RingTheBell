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

export const InstallationCard = styled.div`
  background: var(--color-card);
  border-radius: 16px;
  padding: 20px;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.04), 0 1px 2px rgba(0, 0, 0, 0.06);
  border: 0.5px solid var(--color-separator);
  margin-bottom: 16px;
  display: flex;
  flex-direction: column;
  gap: 12px;
`;

export const InstallationHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 12px;
`;

export const InstallationName = styled.h2`
  font-size: 20px;
  font-weight: 600;
  letter-spacing: -0.01em;
  color: var(--color-text);
  margin: 0;
`;

export const InstallationType = styled.span`
  font-size: 13px;
  color: var(--color-text-secondary);
  background: var(--color-fill);
  padding: 4px 10px;
  border-radius: 8px;
`;

export const PhoneList = styled.ul`
  list-style: none;
  padding: 0;
  margin: 0;
  display: flex;
  flex-direction: column;
  gap: 8px;
`;

export const PhoneItem = styled.li`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 12px 16px;
  background: var(--color-bg-secondary);
  border-radius: 10px;
  font-size: 15px;
`;

export const PhoneCode = styled.span`
  font-weight: 600;
  color: var(--color-text);
`;

export const PhoneMeta = styled.span`
  font-size: 13px;
  color: var(--color-text-secondary);
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

export const SectionTitle = styled.h3`
  font-size: 15px;
  font-weight: 600;
  color: var(--color-text-secondary);
  text-transform: uppercase;
  letter-spacing: 0.02em;
  margin: 0 0 8px 0;
`;

export const ToggleButton = styled.button`
  background: none;
  border: none;
  cursor: pointer;
  font-size: 18px;
  color: var(--color-text-secondary);
  padding: 4px;
`;
