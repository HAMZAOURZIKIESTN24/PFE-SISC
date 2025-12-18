import React, { useState, useEffect, useMemo } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import { 
  Users, BookOpen, Activity, AlertTriangle, Search, Bell, 
  LogOut, Menu, Settings, FileText, ChevronDown, Filter 
} from 'lucide-react';
import { 
  BarChart, Bar, XAxis, YAxis, CartesianGrid, 
  Tooltip, ResponsiveContainer, AreaChart, Area 
} from 'recharts';
import './admin.css';

export default function AdminDashboard() {
  const navigate = useNavigate();
  const [sidebarOpen, setSidebarOpen] = useState(true);

  // --- FIX: Initialize userName here directly, not in useEffect ---
  const [userName] = useState(() => {
    const userStr = localStorage.getItem('user');
    if (userStr) {
      try {
        const userData = JSON.parse(userStr);
        return userData.name || 'Admin';
      } catch {
        return 'Admin';
      }
    }
    return 'Admin';
  });

  // Check authentication ONLY (removed setUserName from here)
  useEffect(() => {
    const token = localStorage.getItem('token');
    const userStr = localStorage.getItem('user');

    if (!token || !userStr) {
      navigate('/login');
    }
  }, [navigate]);

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    navigate('/login');
  };

  const stats = useMemo(() => ([
    { title: 'Total Étudiants', value: '1,245', change: '+12%', icon: <Users size={24} />, trend: 'up' },
    { title: 'Taux de Réussite', value: '84.5%', change: '+2.4%', icon: <Activity size={24} />, trend: 'up' },
  ]), []);

  const activityData = useMemo(() => ([
    { name: 'Lun', connexions: 400, completions: 240 },
    { name: 'Mar', connexions: 300, completions: 139 },
    { name: 'Mer', connexions: 200, completions: 980 },
    { name: 'Jeu', connexions: 278, completions: 390 },
    { name: 'Ven', connexions: 189, completions: 480 },
    { name: 'Sam', connexions: 239, completions: 380 },
    { name: 'Dim', connexions: 349, completions: 430 },
  ]), []);

  const filiereData = useMemo(() => ([
    { name: 'IAID', count: 9 },
    { name: 'Finance', count: 12 },
    { name: 'Mktg', count: 13 },
    { name: 'IDSD', count: 20 },
    { name: 'Dev', count: 12 },
    { name: 'Indus.', count: 9 },
  ]), []);

  const recentAlerts = useMemo(() => ([
    { id: 1, name: 'Karim Bennani', filiere: 'Genie Info', issue: 'Note < 8', status: 'Urgent' },
    { id: 2, name: 'Sara Alami', filiere: 'Finance', issue: 'Absence', status: 'Moyen' },
    { id: 3, name: 'Mohamed Tazi', filiere: 'Management', issue: 'Non validé', status: 'Urgent' },
    { id: 4, name: 'Hajar Moussa', filiere: 'Marketing', issue: 'Retard', status: 'Faible' },
  ]), []);

  const avatarLetter = userName ? userName.charAt(0).toUpperCase() : 'A';

  return (
    <div className="admin-container">
      {/* SIDEBAR */}
      <aside className={`sidebar ${sidebarOpen ? 'open' : 'closed'}`}>
        <div className="sidebar-header">
          <div className="logo-text">SISC<span className="dot">.</span></div>
        </div>

        <nav className="sidebar-nav">
          <NavLink to="/admin/dashboard" className={({ isActive }) => `nav-item ${isActive ? 'active' : ''}`}>
            <Activity size={20} /><span>Dashboard</span>
          </NavLink>
          <NavLink to="/admin/etudiants" className={({ isActive }) => `nav-item ${isActive ? 'active' : ''}`}>
            <Users size={20} /><span>Étudiants</span>
          </NavLink>
          <NavLink to="/admin/filieres" className={({ isActive }) => `nav-item ${isActive ? 'active' : ''}`}>
            <BookOpen size={20} /><span>Modules</span>
          </NavLink>
          <NavLink to="/admin/rapports" className={({ isActive }) => `nav-item ${isActive ? 'active' : ''}`}>
            <FileText size={20} /><span>Rapports</span>
          </NavLink>
          <NavLink to="/admin/demandes" className={({ isActive }) => `nav-item ${isActive ? 'active' : ''}`}>
            <FileText size={20} /><span>Demandes</span>
          </NavLink>
          <NavLink to="/admin/settings" className={({ isActive }) => `nav-item ${isActive ? 'active' : ''}`}>
            <Settings size={20} /><span>Paramètres</span>
          </NavLink>
        </nav>

        <div className="sidebar-footer">
          <button onClick={handleLogout} className="logout-btn">
            <LogOut size={20} /><span>Déconnexion</span>
          </button>
        </div>
      </aside>

      {/* MAIN CONTENT */}
      <main className="main-content">
        <header className="top-header">
          <button className="menu-toggle" onClick={() => setSidebarOpen(!sidebarOpen)}>
            <Menu size={24} color="#fff" />
          </button>
          <div className="search-bar">
            <Search size={18} className="search-icon" />
            <input type="text" placeholder="Rechercher..." />
          </div>
          <div className="header-actions">
            <button className="icon-btn"><Bell size={20} /><span className="badge">3</span></button>
            <div className="user-profile">
              <div className="avatar">{avatarLetter}</div>
              <div className="user-info">
                <span className="name">{userName}</span>
                <span className="role">Admin</span>
              </div>
            </div>
          </div>
        </header>

        <div className="dashboard-grid">
          {/* STATS */}
          <section className="stats-row">
            {stats.map((stat, index) => (
              <article key={index} className="stat-card">
                <div className="stat-header">
                  <div className={`stat-icon-bg trend-${stat.trend}`}>{stat.icon}</div>
                  <span className={`stat-change ${stat.trend}`}>{stat.change}</span>
                </div>
                <h3>{stat.value}</h3>
                <p>{stat.title}</p>
              </article>
            ))}
          </section>

          {/* CHARTS */}
          <section className="charts-row">
            {/* Chart 1 */}
            <div className="chart-card big">
              <div className="card-header">
                <h3>Activité Hebdomadaire</h3>
                <button className="filter-btn"><Filter size={16} /><span>Filtrer</span></button>
              </div>
              <div style={{ width: '100%', height: '300px', minHeight: '300px' }}>
                <ResponsiveContainer width="100%" height="100%">
                  <AreaChart data={activityData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                    <defs>
                      <linearGradient id="colorConnexions" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="5%" stopColor="#00d4ff" stopOpacity={0.4} />
                        <stop offset="95%" stopColor="#00d4ff" stopOpacity={0} />
                      </linearGradient>
                      <linearGradient id="colorCompletions" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="5%" stopColor="#b700ff" stopOpacity={0.4} />
                        <stop offset="95%" stopColor="#b700ff" stopOpacity={0} />
                      </linearGradient>
                    </defs>
                    <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.08)" vertical={false} />
                    <XAxis dataKey="name" stroke="#8080a0" tick={{fontSize: 12}} />
                    <YAxis stroke="#8080a0" tick={{fontSize: 12}} />
                    <Tooltip contentStyle={{ backgroundColor: '#111329', borderColor: '#00d4ff', color: '#fff' }} />
                    <Area type="monotone" dataKey="connexions" stroke="#00d4ff" fillOpacity={1} fill="url(#colorConnexions)" strokeWidth={3} />
                    <Area type="monotone" dataKey="completions" stroke="#b700ff" fillOpacity={1} fill="url(#colorCompletions)" strokeWidth={3} />
                  </AreaChart>
                </ResponsiveContainer>
              </div>
            </div>

            {/* Chart 2 */}
            <div className="chart-card small">
              <div className="card-header">
                <h3>Par Filière</h3>
              </div>
              <div style={{ width: '100%', height: '300px', minHeight: '300px' }}>
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={filiereData} layout="vertical" margin={{ top: 0, right: 20, left: 0, bottom: 0 }}>
                    <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.08)" horizontal vertical={false} />
                    <XAxis type="number" stroke="#8080a0" hide />
                    <YAxis dataKey="name" type="category" stroke="#fff" width={60} tick={{ fontSize: 11 }} />
                    <Tooltip cursor={{ fill: 'rgba(255,255,255,0.03)' }} contentStyle={{ backgroundColor: '#111329', borderColor: '#b700ff', color: '#fff' }} />
                    <Bar dataKey="count" fill="#00d4ff" radius={[0, 10, 10, 0]} barSize={20} />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </div>
          </section>

          {/* ALERTS */}
          <section className="table-section">
            <div className="chart-card">
              <div className="card-header">
                <h3>⚠️ Étudiants - Attention Requise</h3>
                <button className="view-all"><span>Voir Tout</span><ChevronDown size={16} /></button>
              </div>
              <div className="table-responsive">
                <table className="glass-table">
                  <thead>
                    <tr>
                      <th>Nom</th>
                      <th>Filière</th>
                      <th>Problème</th>
                      <th>Statut</th>
                      <th>Action</th>
                    </tr>
                  </thead>
                  <tbody>
                    {recentAlerts.map((student) => (
                      <tr key={student.id}>
                        <td className="cell-strong">{student.name}</td>
                        <td className="cell-muted">{student.filiere}</td>
                        <td>{student.issue}</td>
                        <td><span className={`status-badge ${student.status.toLowerCase()}`}>{student.status}</span></td>
                        <td><button className="action-btn">Contacter</button></td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </section>
        </div>
      </main>
    </div>
  );
}