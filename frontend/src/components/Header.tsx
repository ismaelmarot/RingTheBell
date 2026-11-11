import { useNavigate } from 'react-router-dom';
import { ChevronLeftIcon } from '@/components/Icons';
import styled from 'styled-components';

const HeaderBar = styled.header`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 16px;
  margin: 0;
  background: var(--color-petroleum);
  color: #FFFFFF;
  position: sticky;
  top: 0;
  z-index: 50;
  width: 100%;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.12);

  @media (min-width: 768px) {
    padding: 16px 24px;
    border-radius: 0;
  }
`;

const LeftSection = styled.div`
  flex: 1;
  display: flex;
  align-items: center;
`;

const RightSection = styled.div`
  display: flex;
  align-items: center;
  min-width: 4px;
  justify-content: flex-end;
`;

const Title = styled.h1`
  font-size: 20px;
  font-weight: 700;
  letter-spacing: -0.01em;
  color: #FFFFFF;
  margin: 0;
`;

const BackButton = styled.button`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 36px;
  height: 36px;
  min-width: 36px;
  min-height: 36px;
  border-radius: 18px;
  background: rgba(255, 255, 255, 0.15);
  border: none;
  cursor: pointer;
  color: #FFFFFF;
  transition: all 0.15s ease;

  &:hover {
    background: rgba(255, 255, 255, 0.25);
  }

  &:active {
    transform: scale(0.95);
  }
`;

interface HeaderProps {
  title?: string;
  showBack?: boolean;
}

export function Header({ title, showBack = true }: HeaderProps) {
  const navigate = useNavigate();

  return (
    <HeaderBar>
      <LeftSection>
        {title ? <Title>{title}</Title> : null}
      </LeftSection>
      <RightSection>
        {showBack ? (
          <BackButton type="button" onClick={() => navigate(-1)} aria-label="Volver">
            <ChevronLeftIcon size={20} />
          </BackButton>
        ) : null}
      </RightSection>
    </HeaderBar>
  );
}
