import { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { createVisit } from '@/services/visits.service';
import { SuccessIcon as SuccessIco } from '@/components/Icons';
import { Header } from '@/components/Header';
import { resolveQr } from '@/services/qr.service';
import {
  ActionButton,
  Card,
  EmptyState,
  FormRow,
  Input,
  LinkButton,
  LoadingSpinner,
  PageContainer,
  Subtitle,
  SuccessIcon,
  SuccessText,
  Title,
} from './VisitRequest.styles';

interface ResolvedQr {
  installation: { id: string; name: string; type: string };
  unit: { id: string; code: string; floor: string | null } | null;
  qr: { id: string; mode: 'GENERAL' | 'SINGLE' };
}

export const VisitRequest = () => {
  const { token } = useParams<{ token: string }>();
  const [resolved, setResolved] = useState<ResolvedQr | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);

  const [name, setName] = useState('');
  const [reason, setReason] = useState('');
  const [company, setCompany] = useState('');
  const [submitting, setSubmitting] = useState(false);
  const [createdVisitId, setCreatedVisitId] = useState<string | null>(null);

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
      } catch (err) {
        setError((err as Error).message);
      } finally {
        setLoading(false);
      }
    };
    void run();
  }, [token]);

  const handleSubmit = async () => {
    if (!resolved || !name.trim()) return;
    setSubmitting(true);
    setError(null);
    try {
      const visit = await createVisit({
        installationId: resolved.installation.id,
        unitId: resolved.unit?.id ?? null,
        visitorName: name.trim(),
        reason: reason.trim() || null,
        company: company.trim() || null,
      });
      setCreatedVisitId(visit.id);
    } catch (err) {
      setError((err as Error).message);
    } finally {
      setSubmitting(false);
    }
  };

  if (loading) return <PageContainer><LoadingSpinner /></PageContainer>;
  if (error) return <PageContainer><Card><EmptyState><p>{error}</p></EmptyState></Card></PageContainer>;
  if (!resolved) return <PageContainer><Card><EmptyState><p>No se pudo resolver el código QR</p></EmptyState></Card></PageContainer>;

  if (createdVisitId) {
    return (
      <PageContainer>
        <Card>
          <SuccessIcon><SuccessIco size={48} /></SuccessIcon>
          <Title>Solicitud enviada</Title>
          <SuccessText>Tu solicitud de visita fue registrada. Espera la respuesta del residente.</SuccessText>
          <LinkButton as={Link} to={`/card/${createdVisitId}`}>Ver card de autorización →</LinkButton>
        </Card>
      </PageContainer>
    );
  }

  return (
    <PageContainer>
      <div style={{ textAlign: 'right', marginBottom: 8 }}>

      </div>
      <Header title="Solicitud de visita" />
      <Card>
        <Title style={{ display: 'none' }}>Solicitud de visita</Title>
        <Subtitle>{resolved.installation.name} {resolved.unit ? `· Unidad ${resolved.unit.code}` : ''}</Subtitle>
        <FormRow>
          <Input placeholder="Nombre y apellido" value={name} onChange={(e) => setName(e.target.value)} />
        </FormRow>
        <FormRow>
          <Input placeholder="Motivo de visita" value={reason} onChange={(e) => setReason(e.target.value)} />
        </FormRow>
        <FormRow>
          <Input placeholder="Empresa / procedencia" value={company} onChange={(e) => setCompany(e.target.value)} />
        </FormRow>
        <ActionButton type="button" onClick={handleSubmit} disabled={submitting || !name.trim()}>
          {submitting ? 'Enviando...' : 'Enviar solicitud'}
        </ActionButton>
      </Card>
    </PageContainer>
  );
};
