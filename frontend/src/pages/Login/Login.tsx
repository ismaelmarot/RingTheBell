import { useState } from 'react';
import type { FormEvent } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '@/context/AuthContext';
import { useTheme } from '@/context/ThemeContext';
import { BellIcon, QrIcon, EditIcon, SuccessIcon } from '@/components/Icons';
import {
  ErrorText,
  FeatureIcon,
  FeatureItem,
  FeatureList,
  FeatureText,
  FormGroup,
  Input,
  Label,
  LoginCard,
  LoginContainer,
  LoginForm,
  LoginTitle,
  SubmitButton,
  ToggleButton,
  WelcomeIcon,
  WelcomeSection,
  WelcomeSubtitle,
  WelcomeTitle,
} from './Login.styles';

export const Login = () => {
  const navigate = useNavigate();
  const { login: authLogin } = useAuth();
  const { mode, toggle } = useTheme();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (event: FormEvent) => {
    event.preventDefault();
    setLoading(true);
    setError(null);

    try {
      await authLogin(email, password);
      navigate('/welcome');
    } catch (err) {
      setError((err as Error).message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <LoginContainer style={{ position: 'relative' }}>
      <ToggleButton type="button" onClick={toggle}>
        {mode === 'dark' ? '☀️' : '🌙'}
      </ToggleButton>

      <WelcomeSection>
        <WelcomeIcon><BellIcon size={48} /></WelcomeIcon>
        <WelcomeTitle>RingTheBell</WelcomeTitle>
        <WelcomeSubtitle>
          Gestión de visitantes mediante códigos QR. Simple, segura y moderna.
        </WelcomeSubtitle>
        <FeatureList>
          <FeatureItem>
            <FeatureIcon><QrIcon size={24} /></FeatureIcon>
            <FeatureText>Escanea el código QR en la entrada</FeatureText>
          </FeatureItem>
          <FeatureItem>
            <FeatureIcon><EditIcon size={24} /></FeatureIcon>
            <FeatureText>Completa tu solicitud de visita</FeatureText>
          </FeatureItem>
          <FeatureItem>
            <FeatureIcon><BellIcon size={24} /></FeatureIcon>
            <FeatureText>El residente recibe la notificación</FeatureText>
          </FeatureItem>
          <FeatureItem>
            <FeatureIcon><SuccessIcon size={24} /></FeatureIcon>
            <FeatureText>Acepta o rechaza la visita en tiempo real</FeatureText>
          </FeatureItem>
        </FeatureList>
      </WelcomeSection>

      <LoginCard>
        <LoginTitle>Ingresar al sistema</LoginTitle>
        <LoginForm onSubmit={handleSubmit}>
          <FormGroup>
            <Label htmlFor="email">Email</Label>
            <Input
              id="email"
              type="email"
              value={email}
              onChange={(event) => setEmail(event.target.value)}
              placeholder="tu@email.com"
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
              placeholder="••••••••"
              required
            />
          </FormGroup>
          {error ? <ErrorText>{error}</ErrorText> : null}
          <SubmitButton type="submit" disabled={loading}>
            {loading ? 'Entrando...' : 'Entrar'}
          </SubmitButton>
        </LoginForm>
      </LoginCard>
    </LoginContainer>
  );
};
