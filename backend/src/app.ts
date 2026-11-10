import express from 'express';
import cors from 'cors';
import healthRoutes from './routes/health.routes';
import authRoutes from './routes/auth.routes';
import visitsRoutes from './routes/visits.routes';

export const app = express();

app.use(cors());
app.use(express.json({ limit: '10mb' }));

app.use('/health', healthRoutes);
app.use('/auth', authRoutes);
app.use('/visits', visitsRoutes);
