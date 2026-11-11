import { useCallback, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { getToken } from '@/services/auth.service';
import { QrIcon } from '@/components/Icons';
import { Header } from '@/components/Header';
import { listInstallations } from '@/services/installations.service';
import { generateQr, getQr, listQrs, revokeQr, replaceQr } from '@/services/qr.service';
import type { Installation, QrCode } from '@/interface';
import {
  ActionButton,
  EmptyState,
  FormCard,
  FormRow,
  Input,
  LoadingSpinner,
  PageContainer,
  QrCard,
  QrGrid,
  QrImage,
  QrMeta,
  Select,
} from './Qr.styles';

export const Qr = () => {
  const navigate = useNavigate();
  const [installations, setInstallations] = useState<Installation[]>([]);
  const [selectedInstallation, setSelectedInstallation] = useState<string>('');
  const [qrs, setQrs] = useState<QrCode[]>([]);
  const [mode, setMode] = useState<'GENERAL' | 'SINGLE'>('GENERAL');
  const [unitId, setUnitId] = useState('');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [dataUrls, setDataUrls] = useState<Record<string, string>>({});

  const loadInstallations = useCallback(async () => {
    const data = await listInstallations();
    setInstallations(data);
    if (data.length > 0 && !selectedInstallation) {
      setSelectedInstallation(data[0].id);
    }
  }, [selectedInstallation]);

  const loadQrs = useCallback(async (installationId: string) => {
    if (!installationId) return;
    setLoading(true);
    setError(null);
    try {
      const data = await listQrs(installationId);
      setQrs(data);
      const urls: Record<string, string> = {};
      await Promise.all(
        data.map(async (qr) => {
          if (qr.status === 'ACTIVE') {
            const full = await getQr(qr.id);
            if (full.dataUrl) urls[qr.id] = full.dataUrl;
          }
        }),
      );
      setDataUrls(urls);
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
      await loadInstallations();
    };
    void run();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [navigate]);

  useEffect(() => {
    if (!selectedInstallation) return;
    const run = async () => {
      setLoading(true);
      setError(null);
      try {
        const data = await listQrs(selectedInstallation);
        setQrs(data);
        const urls: Record<string, string> = {};
        await Promise.all(
          data.map(async (qr) => {
            if (qr.status === 'ACTIVE') {
              const full = await getQr(qr.id);
              if (full.dataUrl) urls[qr.id] = full.dataUrl;
            }
          }),
        );
        setDataUrls(urls);
      } catch (err) {
        setError((err as Error).message);
      } finally {
        setLoading(false);
      }
    };
    void run();
  }, [selectedInstallation]);

  const handleGenerate = async () => {
    if (!selectedInstallation) return;
    try {
      const qr = await generateQr({
        installationId: selectedInstallation,
        unitId: mode === 'SINGLE' ? unitId || null : null,
        mode,
      });
      if (qr.dataUrl) setDataUrls((prev) => ({ ...prev, [qr.id]: qr.dataUrl as string }));
      setUnitId('');
      await loadQrs(selectedInstallation);
    } catch (err) {
      setError((err as Error).message);
    }
  };

  const handleRevoke = async (id: string) => {
    try {
      await revokeQr(id);
      await loadQrs(selectedInstallation);
    } catch (err) {
      setError((err as Error).message);
    }
  };

  const handleReplace = async (id: string) => {
    try {
      const qr = await replaceQr(id);
      if (qr.dataUrl) setDataUrls((prev) => ({ ...prev, [qr.id]: qr.dataUrl as string }));
      await loadQrs(selectedInstallation);
    } catch (err) {
      setError((err as Error).message);
    }
  };

  const handleDownload = (qr: QrCode) => {
    const url = dataUrls[qr.id];
    if (!url) return;
    const a = document.createElement('a');
    a.href = url;
    a.download = `qr-${qr.token.slice(0, 8)}.png`;
    a.click();
  };


  return (
    <PageContainer>
      <Header title="Códigos QR" />
      {error ? <EmptyState><p>{error}</p></EmptyState> : null}

      <FormCard>
        <FormRow>
        <Select value={selectedInstallation} onChange={(e) => setSelectedInstallation(e.target.value)}>
          {installations.map((inst) => (
            <option key={inst.id} value={inst.id}>
              {inst.name}
            </option>
          ))}
        </Select>
        <Select value={mode} onChange={(e) => setMode(e.target.value as 'GENERAL' | 'SINGLE')}>
          <option value="GENERAL">General</option>
          <option value="SINGLE">Individual</option>
        </Select>
        {mode === 'SINGLE' ? (
          <Input placeholder="ID de unidad" value={unitId} onChange={(e) => setUnitId(e.target.value)} />
        ) : null}
        <ActionButton type="button" onClick={handleGenerate}>
          Generar QR
        </ActionButton>
        </FormRow>
      </FormCard>

      {loading ? <LoadingSpinner /> : null}
      {!loading && qrs.length === 0 ? <EmptyState><div className="icon"><QrIcon size={48} /></div><p>Sin códigos QR</p></EmptyState> : null}

      <QrGrid>
      {qrs.map((qr) => (
        <QrCard key={qr.id}>
          {qr.status === 'ACTIVE' && dataUrls[qr.id] ? <QrImage src={dataUrls[qr.id]} alt="QR" /> : null}
          <QrMeta>{qr.mode} · {qr.status} · {qr.token.slice(0, 12)}...</QrMeta>
          {qr.status === 'ACTIVE' ? (
            <>
              <ActionButton type="button" onClick={() => handleDownload(qr)}>
                Descargar
              </ActionButton>
              <ActionButton type="button" onClick={() => handleRevoke(qr.id)}>
                Revocar
              </ActionButton>
              <ActionButton type="button" onClick={() => handleReplace(qr.id)}>
                Reemplazar
              </ActionButton>
            </>
          ) : null}
        </QrCard>
      ))}
      </QrGrid>


    </PageContainer>
  );
};