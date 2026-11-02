import React, { useState, useEffect } from 'react';
import { getSubdomain, SubdomainType } from './utils/subdomain';
import { LandingPage } from './components/landing/LandingPage';
import { CoachApp } from './apps/CoachApp';
import { AthleteApp } from './apps/AthleteApp';
import { GymApp } from './apps/GymApp';
import { AdminApp } from './apps/AdminApp';
import { AuthApp } from './apps/AuthApp';
import { UserRole, SportTypeCode } from './types';

export function App() {
  const [currentRoute, setCurrentRoute] = useState<string>(window.location.pathname);

  // Sync state with browser URL & history
  useEffect(() => {
    const handlePopState = () => {
      setCurrentRoute(window.location.pathname);
    };
    window.addEventListener('popstate', handlePopState);
    return () => window.removeEventListener('popstate', handlePopState);
  }, []);

  const navigate = (path: string) => {
    window.history.pushState({}, '', path);
    setCurrentRoute(path);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const detectedSubdomain = getSubdomain();

  // If on a dedicated production subdomain, lock to that panel
  if (detectedSubdomain === 'coach') {
    return <CoachApp onBackToLanding={() => navigate('/')} />;
  }
  if (detectedSubdomain === 'athlete') {
    return <AthleteApp onBackToLanding={() => navigate('/')} />;
  }
  if (detectedSubdomain === 'gym') {
    return <GymApp onBackToLanding={() => navigate('/')} />;
  }
  if (detectedSubdomain === 'admin') {
    return <AdminApp onBackToLanding={() => navigate('/')} />;
  }
  if (detectedSubdomain === 'auth') {
    return (
      <AuthApp
        onSuccess={(role) => navigate(`/${role}`)}
        onBackToLanding={() => navigate('/')}
      />
    );
  }

  // Routing on primary domain (Landing, /coach, /athlete, /gym, /admin, /auth)
  if (currentRoute.startsWith('/coach')) {
    return <CoachApp onBackToLanding={() => navigate('/')} />;
  }
  if (currentRoute.startsWith('/athlete')) {
    return <AthleteApp onBackToLanding={() => navigate('/')} />;
  }
  if (currentRoute.startsWith('/gym')) {
    return <GymApp onBackToLanding={() => navigate('/')} />;
  }
  if (currentRoute.startsWith('/admin')) {
    return <AdminApp onBackToLanding={() => navigate('/')} />;
  }
  if (currentRoute.startsWith('/auth') || currentRoute.startsWith('/login')) {
    return (
      <AuthApp
        onSuccess={(role) => navigate(`/${role}`)}
        onBackToLanding={() => navigate('/')}
      />
    );
  }

  // Default: Landing Page
  return <LandingPage onNavigate={navigate} />;
}

export default App;
