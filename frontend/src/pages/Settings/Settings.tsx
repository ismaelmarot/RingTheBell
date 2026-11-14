import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '@/context/AuthContext';
import { useTheme } from '@/context/ThemeContext';
import { Header } from '@/components/Header';
import {
  PageContainer,
  SectionCard,
  SectionDesc,
  SectionTitle,
  SettingLabel,
  SettingRow,
  SettingValue,
  Toggle,
} from './Settings.styles';

export const Settings = () => {
  const navigate = useNavigate();
  const { user, logout } = useAuth();
  const { mode, toggle: toggleTheme } = useTheme();
  const [visitRequired, setVisitRequired] = useState(true);
  const [locationRequired, setLocationRequired] = useState(false);
  const [pushEnabled, setPushEnabled] = useState(true);

  return (
    <PageContainer>
      <Header title="Configuración" />

      <SectionCard>
        <SectionTitle>Timbre QR</SectionTitle>
        <SectionDesc>Configuración del funcionamiento del timbre</SectionDesc>
        <SettingRow>
          <SettingLabel>Solicitud de visita obligatoria</SettingLabel>
          <Toggle $active={visitRequired} onClick={() => setVisitRequired(!visitRequired)} />
        </SettingRow>
        <SettingRow>
          <SettingLabel>Ubicación requerida</SettingLabel>
          <Toggle $active={locationRequired} onClick={() => setLocationRequired(!locationRequired)} />
        </SettingRow>
      </SectionCard>

      <SectionCard>
        <SectionTitle>Notificaciones</SectionTitle>
        <SectionDesc>Preferencias de notificación</SectionDesc>
        <SettingRow>
          <SettingLabel>Notificaciones push</SettingLabel>
          <Toggle $active={pushEnabled} onClick={() => setPushEnabled(!pushEnabled)} />
        </SettingRow>
      </SectionCard>

      <SectionCard>
        <SectionTitle>Seguridad</SectionTitle>
        <SectionDesc>Roles y permisos</SectionDesc>
        <SettingRow>
          <SettingLabel>Rol actual</SettingLabel>
          <SettingValue>{user?.role ?? 'N/A'}</SettingValue>
        </SettingRow>
        <SettingRow>
          <SettingLabel>Email</SettingLabel>
          <SettingValue>{user?.email ?? 'N/A'}</SettingValue>
        </SettingRow>
      </SectionCard>

      <SectionCard>
        <SectionTitle>Apariencia</SectionTitle>
        <SectionDesc>Modo claro u oscuro</SectionDesc>
        <SettingRow>
          <SettingLabel>Tema {mode === 'dark' ? 'oscuro' : 'claro'}</SettingLabel>
          <Toggle $active={mode === 'dark'} onClick={toggleTheme} />
        </SettingRow>
      </SectionCard>

      <SectionCard>
        <SectionTitle>Sesión</SectionTitle>
        <SectionDesc>Gestión de la sesión actual</SectionDesc>
        <SettingRow>
          <SettingLabel>Cerrar sesión</SettingLabel>
          <button
            type="button"
            onClick={() => { logout(); navigate('/login'); }}
            style={{
              padding: '8px 16px',
              borderRadius: '999px',
              border: 'none',
              background: 'var(--color-danger)',
              color: '#FFFFFF',
              fontSize: '14px',
              fontWeight: 600,
              cursor: 'pointer',
            }}
          >
            Salir
          </button>
        </SettingRow>
      </SectionCard>


    </PageContainer>
  );
};
