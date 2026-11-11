import { Router } from 'express';
import { authMiddleware } from '../middleware/auth.middleware';
import { requireRole } from '../middleware/role.middleware';
import {
  createInstallation,
  listInstallations,
  getInstallation,
  deleteInstallation,
  updateInstallationLocation,
} from '../services/installation.service';
import { createUnit, listUnitsByInstallation, deleteUnit } from '../services/unit.service';
import { logAction } from '../services/audit.service';

const router = Router();

router.get('/', authMiddleware, (req, res) => {
  res.json({ success: true, data: listInstallations() });
});

router.get('/:id', authMiddleware, (req, res) => {
  const installation = getInstallation(req.params.id);
  if (!installation) {
    res.status(404).json({ success: false, error: 'Instalación no encontrada' });
    return;
  }
  res.json({ success: true, data: installation });
});

router.post('/', authMiddleware, requireRole('ADMIN_PRINCIPAL', 'ADMIN'), (req, res) => {
  const { name, type } = req.body ?? {};
  if (!name || !type) {
    res.status(400).json({ success: false, error: 'Nombre y tipo requeridos' });
    return;
  }
  const installation = createInstallation({ name, type });
  logAction({ userId: req.user?.id ?? null, action: 'CREATE_INSTALLATION', entity: 'installation', entityId: installation.id, details: name });
  res.status(201).json({ success: true, data: installation });
});

router.delete('/:id', authMiddleware, requireRole('ADMIN_PRINCIPAL', 'ADMIN'), (req, res) => {
  const ok = deleteInstallation(req.params.id);
  if (!ok) {
    res.status(404).json({ success: false, error: 'Instalación no encontrada' });
    return;
  }
  logAction({ userId: req.user?.id ?? null, action: 'DELETE_INSTALLATION', entity: 'installation', entityId: req.params.id, details: null });
  res.json({ success: true, data: { deleted: true } });
});

router.patch('/:id/location', authMiddleware, requireRole('ADMIN_PRINCIPAL', 'ADMIN'), (req, res) => {
  const { latitude, longitude, geofenceRadiusMeters } = req.body ?? {};
  if (latitude == null || longitude == null) {
    res.status(400).json({ success: false, error: 'Latitud y longitud requeridas' });
    return;
  }
  const ok = updateInstallationLocation({ id: req.params.id, latitude, longitude, geofenceRadiusMeters });
  if (!ok) {
    res.status(404).json({ success: false, error: 'Instalación no encontrada' });
    return;
  }
  logAction({ userId: req.user?.id ?? null, action: 'UPDATE_INSTALLATION_LOCATION', entity: 'installation', entityId: req.params.id, details: `${latitude},${longitude}` });
  res.json({ success: true, data: { updated: true } });
});

router.get('/:id/units', authMiddleware, (req, res) => {
  res.json({ success: true, data: listUnitsByInstallation(req.params.id) });
});

router.post('/:id/units', authMiddleware, requireRole('ADMIN_PRINCIPAL', 'ADMIN', 'ENCARGADO'), (req, res) => {
  const { code, floor } = req.body ?? {};
  if (!code) {
    res.status(400).json({ success: false, error: 'Código de unidad requerido' });
    return;
  }
  const unit = createUnit({ installationId: req.params.id, code, floor: floor ?? null });
  res.status(201).json({ success: true, data: unit });
});

router.delete('/:id/units/:unitId', authMiddleware, requireRole('ADMIN_PRINCIPAL', 'ADMIN'), (req, res) => {
  const ok = deleteUnit(req.params.unitId);
  if (!ok) {
    res.status(404).json({ success: false, error: 'Unidad no encontrada' });
    return;
  }
  res.json({ success: true, data: { deleted: true } });
});

export default router;
