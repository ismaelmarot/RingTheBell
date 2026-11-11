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

export const Layout = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 24px;

  @media (max-width: 768px) {
    grid-template-columns: 1fr;
  }
`;

export const FormPanel = styled.div`
  display: flex;
  flex-direction: column;
  gap: 12px;
`;

export const PreviewPanel = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 12px;
`;

export const SectionCard = styled.div`
  background: var(--color-card);
  border-radius: 16px;
  padding: 20px;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.04), 0 1px 2px rgba(0, 0, 0, 0.06);
  border: 0.5px solid var(--color-separator);
`;

export const SectionTitle = styled.h2`
  font-size: 17px;
  font-weight: 600;
  color: var(--color-text);
  margin: 0 0 12px 0;
`;

export const FormGroup = styled.div`
  display: flex;
  flex-direction: column;
  gap: 8px;
  margin-bottom: 12px;
`;

export const Label = styled.label`
  font-size: 13px;
  font-weight: 600;
  color: var(--color-text-secondary);
  text-transform: uppercase;
  letter-spacing: 0.02em;
`;

export const Input = styled.input`
  width: 100%;
  padding: 12px 16px;
  border: 1px solid var(--color-separator);
  border-radius: 12px;
  font-size: 15px;
  background: var(--color-bg-secondary);
  color: var(--color-text);
  transition: all 0.2s ease;
  min-height: 44px;

  &::placeholder { color: var(--color-text-tertiary); }
  &:focus {
    outline: none;
    border-color: var(--color-turquoise);
    box-shadow: 0 0 0 4px var(--color-turquoise-light);
  }
`;

export const Checkbox = styled.label`
  display: flex;
  align-items: center;
  gap: 8px;
  font-size: 15px;
  color: var(--color-text);
  cursor: pointer;
  padding: 8px 0;
`;

export const CheckboxInput = styled.input`
  width: 20px;
  height: 20px;
  accent-color: var(--color-turquoise);
`;

export const PreviewCard = styled.div`
  background: var(--color-card);
  border-radius: 16px;
  padding: 32px;
  box-shadow: 0 4px 16px rgba(0, 0, 0, 0.08);
  border: 0.5px solid var(--color-separator);
  text-align: center;
  width: 100%;
  max-width: 320px;
`;

export const PreviewTitle = styled.h3`
  font-size: 18px;
  font-weight: 700;
  color: var(--color-text);
  margin: 0 0 4px 0;
`;

export const PreviewSubtitle = styled.p`
  font-size: 13px;
  color: var(--color-text-secondary);
  margin: 0 0 16px 0;
`;

export const PreviewQr = styled.img`
  width: 200px;
  height: 200px;
  margin: 0 auto 16px;
  display: block;
`;

export const PreviewMessage = styled.p`
  font-size: 13px;
  color: var(--color-text-secondary);
  margin: 8px 0 0 0;
  line-height: 1.4;
`;

export const PreviewInstructions = styled.p`
  font-size: 12px;
  color: var(--color-text-tertiary);
  margin: 8px 0 0 0;
  line-height: 1.4;
`;

export const ActionRow = styled.div`
  display: flex;
  gap: 8px;
  flex-wrap: wrap;
  margin-top: 16px;
`;

export const ActionButton = styled.button<{ $variant?: 'primary' | 'secondary' | 'danger' }>`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: 6px;
  padding: 10px 18px;
  border-radius: 10px;
  font-size: 15px;
  font-weight: 600;
  transition: all 0.15s ease;
  min-height: 40px;
  cursor: pointer;
  border: none;

  ${({ $variant }) => {
    switch ($variant) {
      case 'secondary': return `background: var(--color-fill); color: var(--color-accent); &:hover { background: var(--color-fill-secondary); }`;
      case 'danger': return `background: var(--color-danger); color: #FFFFFF; &:hover { background: #D70015; }`;
      default: return `background: var(--color-turquoise); color: #FFFFFF; &:hover { background: var(--color-turquoise-hover); }`;
    }
  }}

  &:active { transform: scale(0.97); }
  &:disabled { opacity: 0.4; pointer-events: none; }
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

export const BackButton = styled.button`
  display: inline-flex;
  align-items: center;
  gap: 4px;
  color: var(--color-accent);
  font-size: 17px;
  font-weight: 400;
  padding: 8px 4px;
  margin: -8px 0;
  border-radius: 8px;
  background: none;
  border: none;
  cursor: pointer;
  transition: background 0.15s ease;

  &:hover { background: var(--color-accent-light); }
  &:active { transform: scale(0.97); }
`;
