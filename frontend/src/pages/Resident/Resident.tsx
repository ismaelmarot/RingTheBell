import { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { getToken } from '@/services/auth.service';
import { ListIcon } from '@/components/Icons';
import { Header } from '@/components/Header';
import { finalizeVisit, listVisits, respondVisit } from '@/services/visits.service';
import type { Visit } from '@/interface';
import {
  ActionButton,
  ActionRow,
  EmptyState,
  LinkButton,
  LoadingSpinner,
  PageContainer,
  StatusBadge,
  VisitCard,
  VisitHeader,
  VisitList,
  VisitMeta,
  VisitName,
} from './Resident.styles';

function getUserIdFromToken(): string | null {
  const token = getToken();
  if (!token) return null;
  try {
    const payload = JSON.parse(atob(token.split('.')[1]));
    return payload.id ?? null;
  } catch {
    return null;
  }
}

export const Resident = () => {
  const navigate = useNavigate();
  const [visits, setVisits] = useState<Visit[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const userId = getUserIdFromToken();

  const refreshVisits = async () => {
    setLoading(true);
    setError(null);
    try {
      const data = await listVisits();
      setVisits(data);
    } catch (err) {
      setError((err as Error).message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (!getToken()) {
      navigate('/login');
      return;
    }
    let cancelled = false;
    const run = async () => {
      if (cancelled) return;
      setLoading(true);
      setError(null);
      try {
        const data = await listVisits();
        if (cancelled) return;
        setVisits(data);
      } catch (err) {
        if (cancelled) return;
        setError((err as Error).message);
      } finally {
        if (!cancelled) setLoading(false);
      }
    };
    void run();
    return () => {
      cancelled = true;
    };
  }, [navigate]);

  const handleRespond = async (id: string, decision: 'ACCEPTED' | 'REJECTED') => {
    if (!userId) return;
    try {
      await respondVisit(id, decision, userId);
      await refreshVisits();
    } catch (err) {
      setError((err as Error).message);
    }
  };

  const handleFinalize = async (id: string) => {
    if (!userId) return;
    try {
      await finalizeVisit(id, userId);
      await refreshVisits();
    } catch (err) {
      setError((err as Error).message);
    }
  };


  return (
    <PageContainer>
      <Header title="Panel Residente" />
      {loading ? <LoadingSpinner /> : null}
      {error ? <EmptyState><p>{error}</p></EmptyState> : null}
      {!loading && visits.length === 0 ? (
        <EmptyState>
          <div className="icon"><ListIcon size={48} /></div>
          <p>Sin visitas pendientes</p>
        </EmptyState>
      ) : null}
      <VisitList>
        {visits.map((visit) => (
          <VisitCard key={visit.id}>
            <VisitHeader>
              <div>
                <VisitName>{visit.visitor_name}</VisitName>
                <VisitMeta>
                  {visit.reason ? visit.reason : 'Sin motivo'} · {new Date(visit.requested_at).toLocaleString()}
                </VisitMeta>
              </div>
              <StatusBadge $status={visit.status}>{visit.status}</StatusBadge>
            </VisitHeader>
            {visit.status === 'PENDING' ? (
              <ActionRow>
                <ActionButton type="button" onClick={() => handleRespond(visit.id, 'ACCEPTED')}>
                  Aceptar
                </ActionButton>
                <ActionButton $variant="danger" type="button" onClick={() => handleRespond(visit.id, 'REJECTED')}>
                  Rechazar
                </ActionButton>
              </ActionRow>
            ) : null}
            {visit.status === 'ACCEPTED' ? (
              <ActionRow>
                <ActionButton type="button" onClick={() => handleFinalize(visit.id)}>
                  Finalizar
                </ActionButton>
              </ActionRow>
            ) : null}
            <ActionRow>
              <LinkButton as={Link} to={`/chat/${visit.id}`}>💬 Chat</LinkButton>
              <LinkButton as={Link} to={`/call/${visit.id}`}>📞 Llamar</LinkButton>
              <LinkButton as={Link} to={`/card/${visit.id}`}>🪪 Card</LinkButton>
            </ActionRow>
          </VisitCard>
        ))}
      </VisitList>
      <div style={{ marginTop: 24, textAlign: 'center' }}>
        <LinkButton as={Link} to="/">← Volver</LinkButton>
      </div>
    </PageContainer>
  );
};
