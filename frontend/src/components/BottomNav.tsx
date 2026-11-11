import { Link, useLocation } from 'react-router-dom';
import { useAuth } from '@/context/AuthContext';
import { HomeIcon, QrIcon, BellIcon, SettingsIcon, UserIcon } from '@/components/Icons';
import styled from 'styled-components';

const Nav = styled.nav`
  position: fixed;
  bottom: 0;
  left: 0;
  right: 0;
  display: flex;
  justify-content: space-around;
  align-items: center;
  padding: 8px 0;
  padding-bottom: max(8px, env(safe-area-inset-bottom));
  background: var(--color-card);
  border-top: 0.5px solid var(--color-separator);
  z-index: 100;
  backdrop-filter: blur(20px);
  -webkit-backdrop-filter: blur(20px);

  @media (min-width: 768px) {
    display: none;
  }
`;

const NavItem = styled(Link)<{ $active: boolean }>`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 2px;
  padding: 4px 8px;
  border-radius: 8px;
  text-decoration: none;
  color: ${({ $active }) => ($active ? 'var(--color-turquoise)' : 'var(--color-text-secondary)')};
  transition: color 0.15s ease;
  min-width: 48px;
  min-height: 48px;
  justify-content: center;

  &:active {
    transform: scale(0.95);
  }
`;

const NavLabel = styled.span`
  font-size: 10px;
  font-weight: 500;
`;

const ROLE_LEVEL: Record<string, number> = {
  ADMIN_PRINCIPAL: 4,
  ADMIN: 3,
  ENCARGADO: 2,
  RESIDENT: 1,
};

export function BottomNav() {
  const location = useLocation();
  const { user } = useAuth();
  const level = ROLE_LEVEL[user?.role ?? ''] ?? 0;
  const canManage = level >= 2;

  const items = [
    { to: '/', icon: HomeIcon, label: 'Inicio' },
    { to: '/resident', icon: UserIcon, label: 'Residente' },
    { to: '/notifications', icon: BellIcon, label: 'Avisos' },
    ...(canManage ? [{ to: '/qr', icon: QrIcon, label: 'QR' }] : []),
    { to: '/settings', icon: SettingsIcon, label: 'Ajustes' },
  ];

  return (
    <Nav>
      {items.map((item) => {
        const Icon = item.icon;
        const active = location.pathname === item.to;
        return (
          <NavItem key={item.to} to={item.to} $active={active}>
            <Icon size={20} />
            <NavLabel>{item.label}</NavLabel>
          </NavItem>
        );
      })}
    </Nav>
  );
}
