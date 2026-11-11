import { Link } from 'react-router-dom';
import { HomeLink, NotFoundContainer, NotFoundIcon, NotFoundText, NotFoundTitle } from './NotFound.styles';
import { SearchIcon } from '@/components/Icons';
import { BackButton } from '@/components/BackButton';

export const NotFound = () => {
  return (
  <NotFoundContainer>
    <div style={{ position: 'absolute', top: 16, left: 16 }}>
      <BackButton />
    </div>
    <NotFoundIcon><SearchIcon size={64} /></NotFoundIcon>
    <NotFoundTitle>Página no encontrada</NotFoundTitle>
    <NotFoundText>La página que buscas no existe o fue movida.</NotFoundText>
    <HomeLink as={Link} to="/">Volver al inicio</HomeLink>
  </NotFoundContainer>
  );
};
