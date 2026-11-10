import styled from 'styled-components';

export const LoginContainer = styled.main`
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  text-align: center;
  padding: 24px;
`;

export const LoginTitle = styled.h1`
  font-size: 2rem;
  font-weight: 700;
`;

export const LoginSubtitle = styled.p`
  font-size: 1rem;
  color: #6e6e73;
`;

export const LoginForm = styled.form`
  width: 100%;
  max-width: 360px;
  display: flex;
  flex-direction: column;
  gap: 16px;
  margin-top: 24px;
`;

export const FormGroup = styled.div`
  display: flex;
  flex-direction: column;
  gap: 8px;
`;

export const Label = styled.label`
  font-size: 0.875rem;
  font-weight: 600;
`;

export const Input = styled.input`
  padding: 12px;
  border: 1px solid #d2d2d7;
  border-radius: 12px;
  font-size: 1rem;
`;

export const ErrorText = styled.p`
  color: #d70015;
  font-size: 0.875rem;
`;

export const SubmitButton = styled.button`
  padding: 12px;
  border: none;
  border-radius: 12px;
  background-color: #000000;
  color: #ffffff;
  font-size: 1rem;
  font-weight: 600;
`;

export const ButtonContainer = styled.div`
  display: flex;
  justify-content: center;
  margin-top: 16px;
`;
