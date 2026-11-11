import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { apiFetch } from '@/services/api';
import { Header } from '@/components/Header';
import {
  Card,
  EmptyState,
  Field,
  Label,
  LoadingSpinner,
  PageContainer,
  StatusBadge,
  Title,
  Value,
  VisitorPhoto,
} from './AuthorizationCard.styles';

interface CardData {
  visit: {
    id: string;
    visitor_name: string;
    visitor_photo: string | null;
    reason: string | null;
    company: string | null;
    status: string;
    requested_at: string;
    responded_at: string | null;
    decision_note: string | null;
    auto_responded: number;
  };
  installation: { id: string; name: string; type: string } | null;
  unit: { id: string; code: string; floor: string | null } | null;
  responder: { id: string; email: string; role: string } | null;
}

export const AuthorizationCard = () => {
  const { visitId } = useParams<{ visitId: string }>();
  const [data, setData] = useState<CardData | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const run = async () => {
      if (!visitId) {
        setError('Visita no especificada');
        setLoading(false);
        return;
      }
      try {
        const result = await apiFetch<CardData>(`/visits/card/${visitId}`);
        setData(result);
      } catch (err) {
        setError((err as Error).message);
      } finally {
        setLoading(false);
      }
    };
    void run();
  }, [visitId]);

  if (loading) return <PageContainer><LoadingSpinner /></PageContainer>;
  if (error) return <PageContainer><Card><EmptyState><p>{error}</p></EmptyState></Card></PageContainer>;
  if (!data) return <PageContainer><Card><EmptyState><p>No se encontró la visita</p></EmptyState></Card></PageContainer>;

  const { visit, installation, unit, responder } = data;

  return (
    <PageContainer>
      <div style={{ textAlign: 'right', marginBottom: 8 }}>

      </div>
      <Header title="Card de autorización" />
      <Card>
        <Title style={{ display: 'none' }}>Card de autorización</Title>
        {visit.visitor_photo ? <VisitorPhoto src={visit.visitor_photo} alt="Foto visitante" /> : null}
        <Field>
          <Label>Visitante</Label>
          <Value>{visit.visitor_name}</Value>
        </Field>
        <Field>
          <Label>Estado</Label>
          <Value><StatusBadge $status={visit.status}>{visit.status}</StatusBadge></Value>
        </Field>
        <Field>
          <Label>Instalación</Label>
          <Value>{installation?.name ?? '-'}</Value>
        </Field>
        <Field>
          <Label>Unidad</Label>
          <Value>{unit ? `${unit.code}${unit.floor ? ` (piso ${unit.floor})` : ''}` : '-'}</Value>
        </Field>
        <Field>
          <Label>Motivo</Label>
          <Value>{visit.reason ?? '-'}</Value>
        </Field>
        <Field>
          <Label>Empresa / procedencia</Label>
          <Value>{visit.company ?? '-'}</Value>
        </Field>
        <Field>
          <Label>Solicitado</Label>
          <Value>{new Date(visit.requested_at).toLocaleString()}</Value>
        </Field>
        {visit.responded_at ? (
          <Field>
            <Label>Respondido</Label>
            <Value>{new Date(visit.responded_at).toLocaleString()}</Value>
          </Field>
        ) : null}
        {responder ? (
          <Field>
            <Label>Autorizó</Label>
            <Value>{responder.email} ({responder.role})</Value>
          </Field>
        ) : null}
        {visit.decision_note ? (
          <Field>
            <Label>Nota</Label>
            <Value>{visit.decision_note}</Value>
          </Field>
        ) : null}
  
      </Card>
    </PageContainer>
  );
};
