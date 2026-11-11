import styled from 'styled-components';

export const WelcomeContainer = styled.main`
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  text-align: center;
  padding: 24px;
  background: var(--color-bg);
  cursor: pointer;
  user-select: none;
`;

export const WelcomeIcon = styled.div`
  font-size: 80px;
  margin-bottom: 24px;
  color: var(--color-turquoise);
`;

export const WelcomeTitle = styled.h1`
  font-size: clamp(2rem, 5vw, 2.75rem);
  font-weight: 700;
  letter-spacing: -0.022em;
  color: var(--color-text);
  margin-bottom: 8px;
`;

export const WelcomeSubtitle = styled.p`
  font-size: clamp(1rem, 2.5vw, 1.25rem);
  color: var(--color-text-secondary);
  margin-bottom: 48px;
`;

export const WelcomeHint = styled.p`
  font-size: 14px;
  color: var(--color-text-tertiary);
  margin-top: 48px;
`;
