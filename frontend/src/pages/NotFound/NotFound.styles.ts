import styled from 'styled-components';

export const NotFoundContainer = styled.main`
  min-height: 100vh;
  position: relative;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  text-align: center;
  padding: 24px;
  background: linear-gradient(180deg, var(--color-card) 0%, var(--color-bg) 100%);
`;

export const NotFoundIcon = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  color: var(--color-text-tertiary);
  margin-bottom: 16px;
  opacity: 0.4;
`;

export const NotFoundTitle = styled.h1`
  font-size: 28px;
  font-weight: 700;
  letter-spacing: -0.022em;
  color: var(--color-text);
  margin-bottom: 8px;
`;

export const NotFoundText = styled.p`
  font-size: 17px;
  color: var(--color-text-secondary);
  margin-bottom: 24px;
`;

export const HomeLink = styled.a`
  display: inline-flex;
  align-items: center;
  gap: 4px;
  padding: 12px 24px;
  border-radius: 12px;
  background: var(--color-accent);
  color: #FFFFFF;
  font-size: 15px;
  font-weight: 600;
  text-decoration: none;
  transition: all 0.15s ease;

  &:hover {
    background: var(--color-accent-hover);
    text-decoration: none;
  }

  &:active {
    transform: scale(0.97);
  }
`;
