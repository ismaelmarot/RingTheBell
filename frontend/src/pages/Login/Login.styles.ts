import styled from 'styled-components';

export const LoginContainer = styled.main`
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 48px 24px;
  background: var(--color-bg);
`;

export const WelcomeSection = styled.div`
  text-align: center;
  margin-bottom: 40px;
  max-width: 480px;
`;

export const WelcomeIcon = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  color: var(--color-turquoise);
  margin-bottom: 16px;
`;

export const WelcomeTitle = styled.h1`
  font-size: 32px;
  font-weight: 700;
  letter-spacing: -0.022em;
  color: var(--color-text);
  margin-bottom: 8px;
`;

export const WelcomeSubtitle = styled.p`
  font-size: 17px;
  color: var(--color-text-secondary);
  line-height: 1.5;
  margin-bottom: 24px;
`;

export const FeatureList = styled.div`
  display: flex;
  flex-direction: column;
  gap: 12px;
  margin-bottom: 32px;
  text-align: left;
`;

export const FeatureItem = styled.div`
  display: flex;
  align-items: center;
  gap: 12px;
  padding: 12px 16px;
  border-radius: 12px;
  background: var(--color-card);
  border: 0.5px solid var(--color-separator);
`;

export const FeatureIcon = styled.span`
  font-size: 24px;
`;

export const FeatureText = styled.span`
  font-size: 15px;
  color: var(--color-text);
  font-weight: 500;
`;

export const LoginCard = styled.div`
  width: 100%;
  max-width: 400px;
  background: var(--color-card);
  border-radius: 20px;
  padding: 32px 24px;
  box-shadow: 0 8px 24px rgba(0, 0, 0, 0.06), 0 2px 8px rgba(0, 0, 0, 0.04);
  border: 0.5px solid var(--color-separator);
  animation: scaleIn 0.3s ease;
`;

export const LoginTitle = styled.h2`
  font-size: 22px;
  font-weight: 700;
  letter-spacing: -0.01em;
  text-align: center;
  margin-bottom: 24px;
  color: var(--color-text);
`;

export const LoginForm = styled.form`
  display: flex;
  flex-direction: column;
  gap: 12px;
`;

export const FormGroup = styled.div`
  display: flex;
  flex-direction: column;
  gap: 8px;
`;

export const Label = styled.label`
  font-size: 13px;
  font-weight: 600;
  color: var(--color-text-secondary);
  text-transform: uppercase;
  letter-spacing: 0.02em;
  margin-left: 4px;
`;

export const Input = styled.input`
  width: 100%;
  padding: 14px 16px;
  border: 1px solid var(--color-separator);
  border-radius: 12px;
  font-size: 17px;
  background: var(--color-bg-secondary);
  color: var(--color-text);
  transition: all 0.2s ease;
  min-height: 48px;

  &::placeholder { color: var(--color-text-tertiary); }
  &:focus {
    outline: none;
    border-color: var(--color-turquoise);
    box-shadow: 0 0 0 4px var(--color-turquoise-light);
  }
`;

export const ErrorText = styled.p`
  font-size: 13px;
  color: var(--color-danger);
  margin: 4px 0 0 4px;
`;

export const SubmitButton = styled.button`
  width: 100%;
  padding: 14px 24px;
  border: none;
  border-radius: 12px;
  background: var(--color-turquoise);
  color: #FFFFFF;
  font-size: 17px;
  font-weight: 600;
  min-height: 48px;
  transition: all 0.15s ease;
  margin-top: 8px;

  &:hover { background: var(--color-turquoise-hover); }
  &:active { transform: scale(0.97); }
  &:disabled { opacity: 0.4; pointer-events: none; }
`;

export const ToggleButton = styled.button`
  position: absolute;
  top: 24px;
  right: 24px;
  background: none;
  border: none;
  cursor: pointer;
  font-size: 20px;
  color: var(--color-text-secondary);
  padding: 8px;
  border-radius: 8px;

  &:hover { background: var(--color-fill); }
`;
