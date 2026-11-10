import { useState } from 'react';
import type { FormEvent } from 'react';
import { useNavigate } from 'react-router-dom';
import { login, setToken } from '@/services/auth.service';
import {
  ErrorText,
  FormGroup,
  Input,
  Label,
  LoginContainer,
  LoginForm,
  LoginSubtitle,
  LoginTitle,
  SubmitButton,
} from './Login.styles';

export const Login = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (event: FormEvent) => {
    event.preventDefault();
    setLoading(true);
    setError(null);

    try {
      const response = await login({ email, password });
      setToken(response.token);
      navigate('/');
    } catch (err) {
      setError((err as Error).message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <LoginContainer>
      <LoginTitle>RingTheBell</LoginTitle>
      <LoginSubtitle>Gestión de visitantes mediante QR</LoginSubtitle>
      <LoginForm onSubmit={handleSubmit}>
        <FormGroup>
          <Label htmlFor="email">Email</Label>
          <Input
            id="email"
            type="email"
            value={email}
            onChange={(event) => setEmail(event.target.value)}
            required
          />
        </FormGroup>
        <FormGroup>
          <Label htmlFor="password">Contraseña</Label>
          <Input
            id="password"
            type="password"
            value={password}
            onChange={(event) => setPassword(event.target.value)}
            required
          />
        </FormGroup>
        {error ? <ErrorText>{error}</ErrorText> : null}
        <SubmitButton type="submit" disabled={loading}>
          Entrar
        </SubmitButton>
      </LoginForm>
    </LoginContainer>
  );
};
