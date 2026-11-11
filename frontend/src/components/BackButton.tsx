import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';

const BackBtn = styled.button`
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

  &:hover {
    background: var(--color-accent-light);
  }

  &:active {
    transform: scale(0.97);
  }
`;

export function BackButton() {
  const navigate = useNavigate();
  return <BackBtn type="button" onClick={() => navigate(-1)}>← Volver</BackBtn>;
}
