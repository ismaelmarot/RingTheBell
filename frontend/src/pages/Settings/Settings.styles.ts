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

export const SectionCard = styled.div`
  background: var(--color-card);
  border-radius: 16px;
  padding: 20px;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.04), 0 1px 2px rgba(0, 0, 0, 0.06);
  border: 0.5px solid var(--color-separator);
  margin-bottom: 16px;
`;

export const SectionTitle = styled.h2`
  font-size: 17px;
  font-weight: 600;
  color: var(--color-text);
  margin: 0 0 4px 0;
`;

export const SectionDesc = styled.p`
  font-size: 13px;
  color: var(--color-text-secondary);
  margin: 0 0 16px 0;
`;

export const SettingRow = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 12px 0;
  border-bottom: 0.5px solid var(--color-separator);

  &:last-child {
    border-bottom: none;
  }
`;

export const SettingLabel = styled.span`
  font-size: 15px;
  color: var(--color-text);
  font-weight: 500;
`;

export const SettingValue = styled.span`
  font-size: 13px;
  color: var(--color-text-secondary);
`;

export const Toggle = styled.button<{ $active: boolean }>`
  width: 51px;
  height: 31px;
  border-radius: 15.5px;
  border: none;
  background: ${({ $active }) => ($active ? 'var(--color-turquoise)' : 'var(--color-fill)')};
  cursor: pointer;
  position: relative;
  transition: background 0.3s ease;
  padding: 0;
  flex-shrink: 0;

  &::after {
    content: '';
    position: absolute;
    top: 2px;
    left: ${({ $active }) => ($active ? '22px' : '2px')};
    width: 27px;
    height: 27px;
    border-radius: 50%;
    background: #FFFFFF;
    transition: left 0.3s cubic-bezier(0.25, 0.1, 0.25, 1);
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.15), 0 1px 2px rgba(0, 0, 0, 0.1);
  }
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
