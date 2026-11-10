import 'dotenv/config';
import { app } from './app';
import { initDatabase } from './db/database';
import { initializeAdmin } from './services/auth.service';

const PORT = process.env.PORT || 3001;

initDatabase();
initializeAdmin();

app.listen(PORT, () => {
  console.log(`RingTheBell backend running on http://localhost:${PORT}`);
});
