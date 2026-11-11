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
  margin-bottom: 32px;
  padding: 0 4px;
`;

export const Greeting = styled.div`
  display: flex;
  flex-direction: column;
  gap: 4px;
`;

export const GreetingText = styled.h1`
  font-size: 28px;
  font-weight: 700;
  letter-spacing: -0.022em;
  color: var(--color-text);
  margin: 0;
`;

export const GreetingSub = styled.p`
  font-size: 15px;
  color: var(--color-text-secondary);
  margin: 0;
`;

export const HeaderActions = styled.div`
  display: flex;
  gap: 8px;
  align-items: center;
`;

export const IconButton = styled.button`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 40px;
  height: 40px;
  border-radius: 12px;
  background: var(--color-card);
  border: 0.5px solid var(--color-separator);
  color: var(--color-text-secondary);
  cursor: pointer;
  transition: all 0.15s ease;
  font-size: 18px;

  &:hover {
    background: var(--color-fill);
    color: var(--color-text);
  }

  &:active {
    transform: scale(0.97);
  }
`;

export const QuickActions = styled.div`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 12px;
  gap: 12px;
  margin-bottom: 32px;
`;

export const QuickActionCard = styled.button`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 8px;
  padding: 20px 12px;
  border-radius: 16px;
  background: var(--color-card);
  border: 0.5px solid var(--color-separator);
  cursor: pointer;
  transition: all 0.2s ease;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.04), 0 1px 2px rgba(0, 0, 0, 0.06);

  &:hover {
    transform: translateY(-2px);
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.06), 0 2px 4px rgba(0, 0, 0, 0.04);
  }

  &:active {
    transform: scale(0.97);
  }
`;

export const QuickActionIcon = styled.span`
  font-size: 32px;
`;

export const QuickActionLabel = styled.span`
  font-size: 13px;
  font-weight: 600;
  color: var(--color-text);
  text-align: center;
`;

export const SectionTitle = styled.h2`
  font-size: 20px;
  font-weight: 600;
  letter-spacing: -0.01em;
  color: var(--color-text);
  margin: 0 0 12px 0;
`;

export const StatsGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 12px;
  gap: 12px;
  margin-bottom: 32px;
`;

export const StatCard = styled.div`
  background: var(--color-card);
  border-radius: 16px;
  padding: 20px;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.04), 0 1px 2px rgba(0, 0, 0, 0.06);
  border: 0.5px solid var(--color-separator);
  display: flex;
  flex-direction: column;
  gap: 8px;
`;

export const StatValue = styled.span`
  font-size: 32px;
  font-weight: 700;
  letter-spacing: -0.022em;
  color: var(--color-petroleum);
`;

export const StatLabel = styled.span`
  font-size: 13px;
  color: var(--color-text-secondary);
  font-weight: 500;
`;

export const StatIcon = styled.span`
  display: flex;
  align-items: center;
  justify-content: center;
  color: var(--color-text-tertiary);
  align-self: flex-end;
`;

export const Card = styled.div`
  background: var(--color-card);
  border-radius: 16px;
  padding: 20px;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.04), 0 1px 2px rgba(0, 0, 0, 0.06);
  border: 0.5px solid var(--color-separator);
  margin-bottom: 16px;
`;

export const ActivityList = styled.div`
  display: flex;
  flex-direction: column;
  gap: 8px;
`;

export const ActivityItem = styled.div`
  display: flex;
  align-items: center;
  gap: 12px;
  padding: 12px 16px;
  border-radius: 12px;
  background: var(--color-bg-secondary);
  transition: all 0.15s ease;

  &:hover {
    background: var(--color-fill);
  }
`;

export const ActivityIcon = styled.span`
  font-size: 20px;
  width: 36px;
  height: 36px;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 10px;
  background: var(--color-fill);
`;

export const ActivityContent = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  gap: 2px;
`;

export const ActivityTitle = styled.span`
  font-size: 15px;
  font-weight: 500;
  color: var(--color-text);
`;

export const ActivityMeta = styled.span`
  font-size: 13px;
  color: var(--color-text-secondary);
`;

export const NavLinks = styled.nav`
  display: flex;
  gap: 8px;
  flex-wrap: wrap;
`;

export const NavLink = styled.a`
  display: inline-flex;
  align-items: center;
  gap: 6px;
  padding: 10px 16px;
  border-radius: 10px;
  background: var(--color-card);
  color: var(--color-accent);
  font-size: 14px;
  font-weight: 500;
  text-decoration: none;
  border: 0.5px solid var(--color-separator);
  transition: all 0.15s ease;

  &:hover {
    background: var(--color-accent-light);
    text-decoration: none;
  }

  &:active {
    transform: scale(0.97);
  }
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
