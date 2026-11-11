import { Route, Routes } from 'react-router-dom';
import { AuthProvider } from '@/context/AuthContext';
import { ThemeProvider } from '@/context/ThemeContext';
import { BottomNav } from '@/components/BottomNav';
import { Footer } from '@/components/Footer';
import { ProtectedRoute } from '@/components/ProtectedRoute';
import { Audit } from '@/pages/Audit';
import { AuthorizationCard } from '@/pages/AuthorizationCard';
import { Call } from '@/pages/Call';
import { Chat } from '@/pages/Chat';
import { Home } from '@/pages/Home';
import { Welcome } from '@/pages/Welcome';
import { Installations } from '@/pages/Installations';
import { Login } from '@/pages/Login';
import { NotFound } from '@/pages/NotFound';
import { Notifications } from '@/pages/Notifications';
import { Qr } from '@/pages/Qr';
import { QrCustomize } from '@/pages/QrCustomize';
import { Settings } from '@/pages/Settings';
import { SelectBell } from '@/pages/SelectBell';
import { Admin } from '@/pages/Admin';
import { Resident } from '@/pages/Resident';
import { VisitRequest } from '@/pages/VisitRequest';

export default function App() {
  return (
    <ThemeProvider>
      <AuthProvider>
        <div style={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/visit/:token" element={<VisitRequest />} />
          <Route path="/select-bell/:token" element={<SelectBell />} />
          <Route path="/welcome" element={<ProtectedRoute><Welcome /></ProtectedRoute>} />
          <Route
            path="/"
            element={
              <ProtectedRoute>
                <Home />
              </ProtectedRoute>
            }
          />
          <Route
            path="/resident"
            element={
              <ProtectedRoute>
                <Resident />
              </ProtectedRoute>
            }
          />
          <Route
            path="/installations"
            element={
              <ProtectedRoute allowedRoles={['ENCARGADO', 'ADMIN', 'ADMIN_PRINCIPAL']}>
                <Installations />
              </ProtectedRoute>
            }
          />
          <Route
            path="/qr"
            element={
              <ProtectedRoute allowedRoles={['ENCARGADO', 'ADMIN', 'ADMIN_PRINCIPAL']}>
                <Qr />
              </ProtectedRoute>
            }
 />
          <Route
            path="/qr-customize"
            element={
              <ProtectedRoute allowedRoles={['ENCARGADO', 'ADMIN', 'ADMIN_PRINCIPAL']}>
                <QrCustomize />
              </ProtectedRoute>
            }
          />
          <Route
            path="/notifications"
            element={
              <ProtectedRoute>
                <Notifications />
              </ProtectedRoute>
            }
          />
          <Route
            path="/audit"
            element={
              <ProtectedRoute allowedRoles={['ADMIN', 'ADMIN_PRINCIPAL']}>
                <Audit />
              </ProtectedRoute>
            }
 />
          <Route
            path="/admin"
            element={
              <ProtectedRoute allowedRoles={['ADMIN', 'ADMIN_PRINCIPAL']}>
                <Admin />
              </ProtectedRoute>
            }
 />
          <Route
            path="/settings"
            element={
              <ProtectedRoute>
                <Settings />
              </ProtectedRoute>
            }
          />
          <Route
            path="/chat/:visitId"
            element={
              <ProtectedRoute>
                <Chat />
              </ProtectedRoute>
            }
          />
          <Route
            path="/call/:visitId"
            element={
              <ProtectedRoute>
                <Call />
              </ProtectedRoute>
            }
          />
          <Route
            path="/card/:visitId"
            element={
              <ProtectedRoute>
                <AuthorizationCard />
              </ProtectedRoute>
            }
          />
          <Route path="*" element={<NotFound />} />
        </Routes>
        <BottomNav />
        <Footer />
        </div>
      </AuthProvider>
    </ThemeProvider>
  );
}
