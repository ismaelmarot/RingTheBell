import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { getToken } from '@/services/auth.service';
import { listInstallations } from '@/services/installations.service';
import { listUnits } from '@/services/installations.service';
import type { Installation, Unit } from '@/interface';
import { HomeIcon } from '@/components/Icons';
import { Header } from '@/components/Header';
import {
  EmptyState,
  InstallationCard,
  InstallationHeader,
  InstallationName,
  InstallationType,
  LoadingSpinner,
  PageContainer,
  PhoneItem,
  PhoneList,
  PhoneCode,
  PhoneMeta,
  SectionTitle,
} from './Admin.styles';

export const Admin = () => {
  const navigate = useNavigate();
  const [installations, setInstallations] = useState<Installation[]>([]);
  const [unitsByInstallation, setUnitsByInstallation] = useState<Record<string, Unit[]>>({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!getToken()) {
      navigate('/login');
      return;
    }
    let cancelled = false;
    const run = async () => {
      setLoading(true);
      setError(null);
      try {
        const data = await listInstallations();
        if (cancelled) return;
        setInstallations(data);
        const units: Record<string, Unit[]> = {};
        await Promise.all(
          data.map(async (inst) => {
            units[inst.id] = await listUnits(inst.id);
          }),
        );
        if (cancelled) return;
        setUnitsByInstallation(units);
      } catch (err) {
        if (cancelled) return;
        setError((err as Error).message);
      } finally {
        if (!cancelled) setLoading(false);
      }
    };
    void run();
    return () => { cancelled = true; };
  }, [navigate]);


  return (
    <PageContainer>
      <Header title="Administración" />
      {loading ? <LoadingSpinner /> : null}
      {error ? <EmptyState><p>{error}</p></EmptyState> : null}
      {!loading && installations.length === 0 ? (
        <EmptyState><div className="icon"><HomeIcon size={48} /></div><p>Sin instalaciones registradas</p></EmptyState>
      ) : null}
      {installations.map((inst) => (
        <InstallationCard key={inst.id}>
          <InstallationHeader>
            <InstallationName>{inst.name}</InstallationName>
            <InstallationType>{inst.type}</InstallationType>
          </InstallationHeader>
          <SectionTitle>Unidades comunicables ({(unitsByInstallation[inst.id] ?? []).length})</SectionTitle>
          {(unitsByInstallation[inst.id] ?? []).length === 0 ? (
            <EmptyState><p>Sin unidades registradas</p></EmptyState>
          ) : (
            <PhoneList>
              {(unitsByInstallation[inst.id] ?? []).map((unit) => (
                <PhoneItem key={unit.id}>
                  <PhoneCode>{unit.code}</PhoneCode>
                  <PhoneMeta>{unit.floor ? `Piso ${unit.floor}` : 'Sin piso'}</PhoneMeta>
                </PhoneItem>
              ))}
            </PhoneList>
          )}
        </InstallationCard>
      ))}

    </PageContainer>
  );
};
