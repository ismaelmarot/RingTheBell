import { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { getToken } from '@/services/auth.service';
import { ListIcon } from '@/components/Icons';
import { Header } from '@/components/Header';
import { apiFetch } from '@/services/api';
import {
  AuditAction,
  AuditItem,
  AuditList,
  AuditMeta,
  BackLink,
  EmptyState,
  LoadingSpinner,
  PageContainer,
} from './Audit.styles';

interface AuditEntry {
  id: string;
  user_id: string | null;
  action: string;
  entity: string;
  entity_id: string | null;
  details: string | null;
  created_at: string;
}

export const Audit = () => {
  const navigate = useNavigate();
  const [entries, setEntries] = useState<AuditEntry[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!getToken()) {
      navigate('/login');
      return;
    }
    const run = async () => {
      try {
        const data = await apiFetch<AuditEntry[]>('/audit');
        setEntries(data);
      } catch (err) {
        setError((err as Error).message);
      } finally {
        setLoading(false);
      }
    };
    void run();
  }, [navigate]);


  return (
    <PageContainer>
      <Header title="Auditoría" />
      {loading ? <LoadingSpinner /> : null}
      {error ? <EmptyState><p>{error}</p></EmptyState> : null}
      {!loading && entries.length === 0 ? (
        <EmptyState><div className="icon"><ListIcon size={48} /></div><p>Sin registros</p></EmptyState>
      ) : null}
      <AuditList>
        {entries.map((e) => (
          <AuditItem key={e.id}>
            <AuditAction>{e.action}</AuditAction>
            <AuditMeta>
              {e.entity} {e.entity_id ? `· ${e.entity_id.slice(0, 8)}` : ''} · {new Date(e.created_at).toLocaleString()}
            </AuditMeta>
          </AuditItem>
        ))}
      </AuditList>
      <BackLink as={Link} href="/">← Volver</BackLink>
    </PageContainer>
  );
};
