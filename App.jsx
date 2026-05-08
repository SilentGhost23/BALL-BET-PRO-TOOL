import { Toaster } from "sonner"
import { QueryClientProvider } from '@tanstack/react-query'
import { queryClientInstance } from '@/lib/query-client'
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import PageNotFound from './lib/PageNotFound';
import { AuthProvider, useAuth } from '@/lib/AuthContext';
import UserNotRegisteredError from '@/components/UserNotRegisteredError';

import AppLayout from '@/components/layout/AppLayout';
import Dashboard from '@/pages/Dashboard';
import Tomorrow from '@/pages/Tomorrow';
import Playoffs from '@/pages/Playoffs';
import Standings from '@/pages/Standings';
import PredEngine from '@/pages/PredEngine';
import Injuries from '@/pages/Injuries';
import BetHistory from '@/pages/BetHistory';
import Alerts from '@/pages/Alerts';
import Settings from '@/pages/Settings';

const AuthenticatedApp = () => {
  const { isLoadingAuth, isLoadingPublicSettings, authError, navigateToLogin } = useAuth();

  if (isLoadingPublicSettings || isLoadingAuth) {
    return (
      <div className="fixed inset-0 flex items-center justify-center" style={{
        background: '#05050f',
        backgroundImage: 'radial-gradient(ellipse at 20% 0%, rgba(0,80,180,0.08) 0%, transparent 60%)'
      }}>
        <div className="text-center">
          <div className="w-10 h-10 rounded-full mx-auto mb-4 flex items-center justify-center shadow-[0_0_16px_rgba(255,194,0,0.5)]"
            style={{ background: 'conic-gradient(#ffc200 0deg, #ff8800 120deg, #ffc200 240deg, #c47a00 360deg)', animation: 'orb-spin 2s linear infinite' }}>
            <span className="font-bold text-black text-lg" style={{ fontFamily: 'Rajdhani, sans-serif' }}>B</span>
          </div>
          <div className="w-8 h-8 border-4 border-[#252545] border-t-[#cc44ff] rounded-full animate-spin mx-auto" />
        </div>
      </div>
    );
  }

  if (authError) {
    if (authError.type === 'user_not_registered') {
      return <UserNotRegisteredError />;
    } else if (authError.type === 'auth_required') {
      navigateToLogin();
      return null;
    }
  }

  return (
    <Routes>
      <Route element={<AppLayout />}>
        <Route path="/" element={<Dashboard />} />
        <Route path="/tomorrow" element={<Tomorrow />} />
        <Route path="/playoffs" element={<Playoffs />} />
        <Route path="/standings" element={<Standings />} />
        <Route path="/engine" element={<PredEngine />} />
        <Route path="/injuries" element={<Injuries />} />
        <Route path="/history" element={<BetHistory />} />
        <Route path="/alerts" element={<Alerts />} />
        <Route path="/settings" element={<Settings />} />
      </Route>
      <Route path="*" element={<PageNotFound />} />
    </Routes>
  );
};


function App() {
  return (
    <AuthProvider>
      <QueryClientProvider client={queryClientInstance}>
        <Router>
          <AuthenticatedApp />
        </Router>
        <Toaster richColors position="top-right" />
      </QueryClientProvider>
    </AuthProvider>
  )
}

export default App