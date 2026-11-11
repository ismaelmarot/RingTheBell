import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { Header } from '@/components/Header';
import { createVisit } from '@/services/visits.service';
import { resolveQr } from '@/services/qr.service';
import { listUnits } from '@/services/installations.service';
import type { Unit } from '@/interface';
import { BellIcon } from '@/components/Icons';
import {
  Card,
  EmptyState,
  LoadingSpinner,
  PageContainer,
  Subtitle,
  Title,
  UnitButton,
  UnitCode,
  UnitFloor,
  UnitList,
} from './SelectBell.styles';

interface ResolvedQr {
  installation: { id: string; name: string; type: string };
  unit: { id: string; code: string; floor: string | null } | null;
  qr: { id: string; mode: 'GENERAL' | 'SINGLE' };
}

export const SelectBell = () => {
  const { token } = useParams<{ token: string }>();
  const navigate = useNavigate();
  const [resolved, setResolved] = useState<ResolvedQr | null>(null);
  const [units, setUnits] = useState<Unit[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);
  const [selecting, setSelecting] = useState(false);

  useEffect(() => {
    const run = async () => {
      if (!token) {
        setError('Token no provisto');
        setLoading(false);
        return;
      }
      try {
        const data = await resolveQr(token);
        setResolved(data as ResolvedQr);
        const inst = data.installation as { id: string; name: string; type: string } | null;
        if (inst?.id) {
          const u = await listUnits(inst.id);
          setUnits(u);
        }
      } catch (err) {
        setError((err as Error).message);
      } finally {
        setLoading(false);
      }
    };
    void run();
  }, [token]);

  const handleSelectUnit = async (unit: Unit) => {
    if (!resolved) return;
    setSelecting(true);
    setError(null);
    try {
      const visit = await createVisit({
        installationId: resolved.installation.id,
        unitId: unit.id,
        visitorName: 'Visitante',
        reason: null,
        company: null,
      });
      navigate(`/call/${visit.id}`);
    } catch (err) {
      setError((err as Error).message);
    } finally {
      setSelecting(false);
    }
  };

  const handleGeneral = async () => {
    if (!resolved) return;
    setSelecting(true);
    setError(null);
    try {
      const visit = await createVisit({
        installationId: resolved.installation.id,
        unitId: null,
        visitorName: 'Visitante',
        reason: null,
        company: null,
      });
      navigate(`/call/${visit.id}`);
    } catch (err) {
      setError((err as Error).message);
    } finally {
      setSelecting(false);
    }
  };

  if (loading) return <PageContainer><LoadingSpinner /></PageContainer>;
  if (error) return <PageContainer><Card><EmptyState><p>{error}</p></EmptyState></Card></PageContainer>;
  if (!resolved) return <PageContainer><Card><EmptyState><p>No se pudo resolver el código QR</p></EmptyState></Card></PageContainer>;

  return (
    <PageContainer>
      <Header title="Seleccionar timbre" />
      <Card>
        <Title style={{ display: 'none' }}>Seleccionar timbre</Title>
        <Subtitle>{resolved.installation.name} {resolved.unit ? `· Unidad ${resolved.unit.code}` : ''}</Subtitle>
        {error ? <EmptyState><p>{error}</p></EmptyState> : null}
        {selecting ? <LoadingSpinner /> : null}
        {!selecting && units.length > 0 ? (
          <UnitList>
            {units.map((unit) => (
              <UnitButton key={unit.id} type="button" onClick={() => handleSelectUnit(unit)} disabled={selecting}>
                <UnitCode>{unit.code}</UnitCode>
                <UnitFloor>{unit.floor ? `Piso ${unit.floor}` : 'Sin piso'}</UnitFloor>
              </UnitButton>
            ))}
          </UnitList>
        ) : null}
        {!selecting && units.length === 0 ? (
          <EmptyState>
            <div className="icon"><BellIcon size={48} /></div>
            <p>Sin unidades registradas</p>
          </EmptyState>
        ) : null}
        {!selecting ? (
          <UnitButton type="button" onClick={handleGeneral} disabled={selecting}>
            <UnitCode>Timbre general</UnitCode>
            <UnitFloor>Llamar a la instalación</UnitFloor>
          </UnitButton>
        ) : null}
      </Card>
    </PageContainer>
  );
};
