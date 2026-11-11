import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import rateLimit from 'express-rate-limit';
import healthRoutes from './routes/health.routes';
import authRoutes from './routes/auth.routes';
import visitsRoutes from './routes/visits.routes';
import installationsRoutes from './routes/installations.routes';
import qrRoutes from './routes/qr.routes';
import notificationsRoutes from './routes/notifications.routes';
import messagesRoutes from './routes/messages.routes';
import callsRoutes from './routes/calls.routes';
import rtcRoutes from './routes/rtc.routes';
import geoRoutes from './routes/geo.routes';
import auditRoutes from './routes/audit.routes';
import pushRoutes from './routes/push.routes';

export const app = express();

app.use(helmet());
app.use(cors());
app.use(express.json({ limit: '10mb' }));

const limiter = rateLimit({ windowMs: 15 * 60 * 1000, max: 300 });
app.use(limiter);

const authLimiter = rateLimit({ windowMs: 15 * 60 * 1000, max: 20 });
app.use('/api/auth', authLimiter);

app.use('/api/health', healthRoutes);
app.use('/api/auth', authRoutes);
app.use('/api/visits', visitsRoutes);
app.use('/api/installations', installationsRoutes);
app.use('/api/qr', qrRoutes);
app.use('/api/notifications', notificationsRoutes);
app.use('/api/messages', messagesRoutes);
app.use('/api/calls', callsRoutes);
app.use('/api/rtc-config', rtcRoutes);
app.use('/api/geo', geoRoutes);
app.use('/api/audit', auditRoutes);
app.use('/api/push', pushRoutes);
