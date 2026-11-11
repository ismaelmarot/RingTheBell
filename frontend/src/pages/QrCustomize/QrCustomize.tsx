import { useState } from 'react';

import { Header } from '@/components/Header';
import { BellIcon } from '@/components/Icons';
import {
  ActionButton,
  ActionRow,
  Checkbox,
  CheckboxInput,
  FormPanel,
  FormGroup,
  Input,
  Label,
  Layout,
  PageContainer,
  PreviewCard,
  PreviewInstructions,
  PreviewMessage,
  PreviewPanel,
  PreviewQr,
  PreviewSubtitle,
  PreviewTitle,
  SectionCard,
  SectionTitle,
} from './QrCustomize.styles';

export const QrCustomize = () => {
  const [installationName, setInstallationName] = useState('Mi Instalación');
  const [department, setDepartment] = useState('');
  const [area, setArea] = useState('');
  const [personName, setPersonName] = useState('');
  const [welcomeMessage, setWelcomeMessage] = useState('Bienvenido, escanea el código para solicitar visita');
  const [instructions, setInstructions] = useState('Apunta la cámara de tu teléfono al código QR');
  const [showLogo, setShowLogo] = useState(true);
  const [showName, setShowName] = useState(true);
  const [showDept, setShowDept] = useState(true);
  const [showArea, setShowArea] = useState(false);
  const [showPerson, setShowPerson] = useState(false);
  const [showWelcome, setShowWelcome] = useState(true);
  const [showInstructions, setShowInstructions] = useState(true);

  // Mock QR data URL - in production this would come from the selected QR
  const qrDataUrl = 'https://api.qrserver.com/v1/create-qr-code/?size=200x200&data=RingTheBell';

  return (
    <PageContainer>
      <Header title="Personalizar QR" />

      <Layout>
        <FormPanel>
          <SectionCard>
            <SectionTitle>Información de la instalación</SectionTitle>
            <FormGroup>
              <Label>Nombre de la instalación</Label>
              <Input value={installationName} onChange={(e) => setInstallationName(e.target.value)} placeholder="Ej: Edificio Principal" />
            </FormGroup>
            <FormGroup>
              <Label>Departamento</Label>
              <Input value={department} onChange={(e) => setDepartment(e.target.value)} placeholder="Ej: Administración" />
            </FormGroup>
            <FormGroup>
              <Label>Área</Label>
              <Input value={area} onChange={(e) => setArea(e.target.value)} placeholder="Ej: Recepción" />
            </FormGroup>
            <FormGroup>
              <Label>Nombre de la persona</Label>
              <Input value={personName} onChange={(e) => setPersonName(e.target.value)} placeholder="Ej: Juan Pérez" />
            </FormGroup>
          </SectionCard>

          <SectionCard>
            <SectionTitle>Mensajes</SectionTitle>
            <FormGroup>
              <Label>Mensaje de bienvenida</Label>
              <Input value={welcomeMessage} onChange={(e) => setWelcomeMessage(e.target.value)} placeholder="Bienvenido..." />
            </FormGroup>
            <FormGroup>
              <Label>Instrucciones para el visitante</Label>
              <Input value={instructions} onChange={(e) => setInstructions(e.target.value)} placeholder="Apunta la cámara..." />
            </FormGroup>
          </SectionCard>

          <SectionCard>
            <SectionTitle>Elementos visibles</SectionTitle>
            <Checkbox>
              <CheckboxInput type="checkbox" checked={showLogo} onChange={(e) => setShowLogo(e.target.checked)} />
              Logotipo
            </Checkbox>
            <Checkbox>
              <CheckboxInput type="checkbox" checked={showName} onChange={(e) => setShowName(e.target.checked)} />
              Nombre de la instalación
            </Checkbox>
            <Checkbox>
              <CheckboxInput type="checkbox" checked={showDept} onChange={(e) => setShowDept(e.target.checked)} />
              Departamento
            </Checkbox>
            <Checkbox>
              <CheckboxInput type="checkbox" checked={showArea} onChange={(e) => setShowArea(e.target.checked)} />
              Área
            </Checkbox>
            <Checkbox>
              <CheckboxInput type="checkbox" checked={showPerson} onChange={(e) => setShowPerson(e.target.checked)} />
              Nombre de la persona
            </Checkbox>
            <Checkbox>
              <CheckboxInput type="checkbox" checked={showWelcome} onChange={(e) => setShowWelcome(e.target.checked)} />
              Mensaje de bienvenida
            </Checkbox>
            <Checkbox>
              <CheckboxInput type="checkbox" checked={showInstructions} onChange={(e) => setShowInstructions(e.target.checked)} />
              Instrucciones
            </Checkbox>
          </SectionCard>
        </FormPanel>

        <PreviewPanel>
          <PreviewCard>
            {showLogo ? <div style={{ marginBottom: 8 }}><BellIcon size={32} /></div> : null}
            {showName ? <PreviewTitle>{installationName || 'Instalación'}</PreviewTitle> : null}
            {showDept && department ? <PreviewSubtitle>{department}</PreviewSubtitle> : null}
            {showArea && area ? <PreviewSubtitle>{area}</PreviewSubtitle> : null}
            {showPerson && personName ? <PreviewSubtitle>{personName}</PreviewSubtitle> : null}
            <PreviewQr src={qrDataUrl} alt="QR Code" />
            {showWelcome ? <PreviewMessage>{welcomeMessage}</PreviewMessage> : null}
            {showInstructions ? <PreviewInstructions>{instructions}</PreviewInstructions> : null}
          </PreviewCard>

          <ActionRow>
            <ActionButton type="button" onClick={() => window.print()}>
              🖨️ Imprimir
            </ActionButton>
            <ActionButton $variant="secondary" type="button" onClick={() => {
              const a = document.createElement('a');
              a.href = qrDataUrl;
              a.download = 'qr-ringthebell.png';
              a.click();
            }}>
              📥 PNG
            </ActionButton>
            <ActionButton $variant="secondary" type="button" onClick={() => {
              navigator.clipboard.writeText(window.location.href);
            }}>
              📋 Copiar enlace
            </ActionButton>
          </ActionRow>
        </PreviewPanel>
      </Layout>


    </PageContainer>
  );
};
