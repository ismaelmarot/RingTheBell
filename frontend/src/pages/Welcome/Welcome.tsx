import { useNavigate } from 'react-router-dom';
import { useAuth } from '@/context/AuthContext';
import { BellIcon } from '@/components/Icons';
import { Header } from '@/components/Header';
import {
  WelcomeContainer,
  WelcomeHint,
  WelcomeIcon,
  WelcomeSubtitle,
  WelcomeTitle,
} from './Welcome.styles';

export const Welcome = () => {
  const navigate = useNavigate();
  const { user } = useAuth();
  const firstName = user?.email?.split('@')[0] ?? 'Usuario';

  return (
    <WelcomeContainer onClick={() => navigate('/')}>
      <Header title="" showBack={false} />
      <WelcomeIcon>
        <BellIcon size={64} />
      </WelcomeIcon>
      <WelcomeTitle>Hola, {firstName}</WelcomeTitle>
      <WelcomeSubtitle>Bienvenido a RingTheBell</WelcomeSubtitle>
      <WelcomeHint>Toca para continuar</WelcomeHint>
    </WelcomeContainer>
  );
};
