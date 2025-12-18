import { Routes, Route } from 'react-router-dom';
import React from 'react';
import SISCPlatform from './pages/SISCHome';
import SISCLogin from './auth/login';
import StudentDashboard from './etudiant/dashboard';
import ForgotPassword from './auth/forget/ForgotPassword';
import ResetPassword from './auth/forget/ResetPassword';
import DashboardA from './admin/dashboard';
import FiliereManager from './admin/modules/FiliereManager';

function App() {
  return (
    <div>
      <Routes>
        <Route path="/" element={<SISCPlatform />} />
        <Route path="/login" element={<SISCLogin />} />
        <Route path="/etudiant/dashboard" element={<StudentDashboard />} />
        <Route path="/auth/forgot-password" element={<ForgotPassword />} />
        <Route path="/reset-password" element={<ResetPassword />} />
        <Route path="/admin/dashboard" element={<DashboardA />} />
        <Route path="/admin/filieres" element={<FiliereManager />} />
      </Routes>
    </div>
  )
}

export default App;
