import { Link } from 'react-router-dom';
import { Header } from '@/components/Header';
import { HomeIcon as HomeIco, BellIcon, QrIcon, SettingsIcon, UserIcon, ClockIcon, SuccessIcon, CloseIcon } from '@/components/Icons';
import { useAuth } from '@/context/AuthContext';
import {
  Card,
  EmptyState,
  PageContainer,
  QuickActionCard,
  QuickActionIcon,
  QuickActionLabel,
  QuickActions,
  SectionTitle,
  StatCard,
  StatIcon,
  StatLabel,
  StatValue,
  StatsGrid,
} from './Home.styles';

const ROLE_LEVEL: Record<string, number> = {
  ADMIN_PRINCIPAL: 4,
  ADMIN: 3,
  ENCARGADO: 2,
  RESIDENT: 1,
};

export const Home = () => {
  const { user } = useAuth();
  const level = ROLE_LEVEL[user?.role ?? ''] ?? 0;
  const canManage = level >= 2;
  const canAudit = level >= 3;


  return (
    <PageContainer>
      <Header title="RingTheBell" showBack={true} />

      <QuickActions>
        <QuickActionCard as={Link} to="/resident">
          <QuickActionIcon><UserIcon size={24} /></QuickActionIcon>
          <QuickActionLabel>Panel Residente</QuickActionLabel>
        </QuickActionCard>
        <QuickActionCard as={Link} to="/notifications">
          <QuickActionIcon><BellIcon size={24} /></QuickActionIcon>
          <QuickActionLabel>Notificaciones</QuickActionLabel>
        </QuickActionCard>
        {canManage ? (
          <QuickActionCard as={Link} to="/qr">
            <QuickActionIcon><QrIcon size={24} /></QuickActionIcon>
            <QuickActionLabel>Códigos QR</QuickActionLabel>
          </QuickActionCard>
        ) : null}
        {canManage ? (
          <QuickActionCard as={Link} to="/installations">
            <QuickActionIcon><HomeIco size={24} /></QuickActionIcon>
            <QuickActionLabel>Instalaciones</QuickActionLabel>
          </QuickActionCard>
        ) : null}
        {canAudit ? (
          <QuickActionCard as={Link} to="/admin">
            <QuickActionIcon><SettingsIcon size={24} /></QuickActionIcon>
            <QuickActionLabel>Administración</QuickActionLabel>
          </QuickActionCard>
        ) : null}
        {canAudit ? (
          <QuickActionCard as={Link} to="/audit">
            <QuickActionIcon><UserIcon size={24} /></QuickActionIcon>
            <QuickActionLabel>Auditoría</QuickActionLabel>
          </QuickActionCard>
        ) : null}
      </QuickActions>

      <SectionTitle>Resumen</SectionTitle>
      <StatsGrid>
        <StatCard>
          <StatValue>0</StatValue>
          <StatLabel>Visitas pendientes</StatLabel>
          <StatIcon><ClockIcon size={20} /></StatIcon>
        </StatCard>
        <StatCard>
          <StatValue>0</StatValue>
          <StatLabel>Visitas autorizadas</StatLabel>
          <StatIcon><SuccessIcon size={20} /></StatIcon>
        </StatCard>
        <StatCard>
          <StatValue>0</StatValue>
          <StatLabel>Visitas rechazadas</StatLabel>
          <StatIcon><CloseIcon size={20} /></StatIcon>
        </StatCard>
        <StatCard>
          <StatValue>0</StatValue>
          <StatLabel>Tus códigos QR</StatLabel>
          <StatIcon><QrIcon size={20} /></StatIcon>
        </StatCard>
      </StatsGrid>

      <SectionTitle>Actividad reciente</SectionTitle>
      <Card>
        <EmptyState>
            <div className="icon"><BellIcon size={48} /></div>
            <p>Sin actividad reciente</p>
          </EmptyState>
      </Card>
    </PageContainer>
  );
};
