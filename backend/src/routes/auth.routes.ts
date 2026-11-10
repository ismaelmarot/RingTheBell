import { Router } from 'express';
import { createUser, login, UserRole } from '../services/auth.service';

const router = Router();

router.post('/login', (req, res) => {
  const { email, password } = req.body ?? {};

  if (!email || !password) {
    res.status(400).json({ success: false, error: 'Email y contraseña requeridos' });
    return;
  }

  try {
    const result = login({ email, password });
    res.json({ success: true, data: result });
  } catch (err) {
    res.status(401).json({ success: false, error: (err as Error).message });
  }
});

router.post('/register', (req, res) => {
  const { installationId, email, password, role } = req.body ?? {};

  if (!installationId || !email || !password || !role) {
    res.status(400).json({ success: false, error: 'Instalación, email, contraseña y rol requeridos' });
    return;
  }

  try {
    const user = createUser({ installationId, email, password, role: role as UserRole });
    res.status(201).json({ success: true, data: user });
  } catch (err) {
    res.status(400).json({ success: false, error: (err as Error).message });
  }
});

export default router;
