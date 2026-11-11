import { useCallback, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { getToken } from '@/services/auth.service';
import { HomeIcon } from '@/components/Icons';
import { Header } from '@/components/Header';
import {
  createInstallation,
  createUnit,
  deleteInstallation,
  deleteUnit,
  listInstallations,
  listUnits,
} from '@/services/installations.service';
import type { Installation, Unit } from '@/interface';
import {
  ActionButton,
  EmptyState,
  FormCard,
  FormRow,
  Input,
  InstallationCard,
  InstallationHeader,
  LoadingSpinner,
  PageContainer,
  Select,
  SectionTitle,
  UnitList,
} from './Installations.styles';

export const Installations = () => {
  const navigate = useNavigate();
  const [installations, setInstallations] = useState<Installation[]>([]);
  const [unitsByInstallation, setUnitsByInstallation] = useState<Record<string, Unit[]>>({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const [newName, setNewName] = useState('');
  const [newType, setNewType] = useState('building');
  const [newUnitCode, setNewUnitCode] = useState<Record<string, string>>({});

  const load = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const data = await listInstallations();
      setInstallations(data);
      const units: Record<string, Unit[]> = {};
      await Promise.all(
        data.map(async (inst) => {
          units[inst.id] = await listUnits(inst.id);
        }),
      );
      setUnitsByInstallation(units);
    } catch (err) {
      setError((err as Error).message);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    if (!getToken()) {
      navigate('/login');
      return;
    }
    const run = async () => {
      setLoading(true);
      setError(null);
      try {
        const data = await listInstallations();
        setInstallations(data);
        const units: Record<string, Unit[]> = {};
        await Promise.all(
          data.map(async (inst) => {
            units[inst.id] = await listUnits(inst.id);
          }),
        );
        setUnitsByInstallation(units);
      } catch (err) {
        setError((err as Error).message);
      } finally {
        setLoading(false);
      }
    };
    void run();
  }, [navigate]);

  const handleCreate = async () => {
    if (!newName.trim()) return;
    try {
      await createInstallation({ name: newName.trim(), type: newType });
      setNewName('');
      await load();
    } catch (err) {
      setError((err as Error).message);
    }
  };

  const handleDeleteInstallation = async (id: string) => {
    try {
      await deleteInstallation(id);
      await load();
    } catch (err) {
      setError((err as Error).message);
    }
  };

  const handleCreateUnit = async (installationId: string) => {
    const code = newUnitCode[installationId]?.trim();
    if (!code) return;
    try {
      await createUnit({ installationId, code });
      setNewUnitCode((prev) => ({ ...prev, [installationId]: '' }));
      await load();
    } catch (err) {
      setError((err as Error).message);
    }
  };

  const handleDeleteUnit = async (installationId: string, unitId: string) => {
    try {
      await deleteUnit(installationId, unitId);
      await load();
    } catch (err) {
      setError((err as Error).message);
    }
  };


  return (
    <PageContainer>
      <Header title="Instalaciones" />
      {loading ? <LoadingSpinner /> : null}
      {error ? <EmptyState><p>{error}</p></EmptyState> : null}

      <FormCard>
        <FormRow>
        <Input
          placeholder="Nombre de instalación"
          value={newName}
          onChange={(e) => setNewName(e.target.value)}
        />
        <Select value={newType} onChange={(e) => setNewType(e.target.value)}>
          <option value="building">Edificio</option>
          <option value="house">Casa</option>
          <option value="office">Oficina</option>
          <option value="neighborhood">Barrio</option>
        </Select>
        <ActionButton type="button" onClick={handleCreate}>
          Crear
        </ActionButton>
        </FormRow>
      </FormCard>

      {!loading && installations.length === 0 ? <EmptyState><div className="icon"><HomeIcon size={48} /></div><p>Sin instalaciones</p></EmptyState> : null}

      {installations.map((inst) => (
        <InstallationCard key={inst.id}>
          <InstallationHeader>
            <SectionTitle>
              {inst.name} ({inst.type})
            </SectionTitle>
            <ActionButton $variant="danger" type="button" onClick={() => handleDeleteInstallation(inst.id)}>
              Eliminar
            </ActionButton>
          </InstallationHeader>
          <UnitList>
            {(unitsByInstallation[inst.id] ?? []).map((unit) => (
              <li key={unit.id}>
                {unit.code} {unit.floor ? `· piso ${unit.floor}` : ''}
                <ActionButton $variant="danger" type="button" onClick={() => handleDeleteUnit(inst.id, unit.id)}>
                  ×
                </ActionButton>
              </li>
            ))}
          </UnitList>
          <FormRow>
            <Input
              placeholder="Código de unidad (ej. 4B)"
              value={newUnitCode[inst.id] ?? ''}
              onChange={(e) => setNewUnitCode((prev) => ({ ...prev, [inst.id]: e.target.value }))}
            />
            <ActionButton type="button" onClick={() => handleCreateUnit(inst.id)}>
              + Unidad
            </ActionButton>
          </FormRow>
        </InstallationCard>
      ))}


    </PageContainer>
  );
};