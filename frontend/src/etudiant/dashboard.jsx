import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  LayoutDashboard, BookOpen, PlayCircle, BarChart3, 
  ClipboardCheck, Award, Download, History, LogOut, 
  Bell, Search, ChevronRight, CheckCircle, FileText
} from 'lucide-react';
import { 
  LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer 
} from 'recharts';
import '../admin/admin.css'; // We reuse the Cyberpunk styles


export default function StudentDashboard() {
  const navigate = useNavigate();
  const [userName, setUserName] = useState('Etudiant');
  const [activeTab, setActiveTab] = useState('dashboard');
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [selectedModule, setSelectedModule] = useState(null); // For UC2 & UC4

  // --- MOCK DATA BASED ON YOUR UC ---
  const studentStats = {
    modulesToValidate: 3, // UC1
    certificatesEarned: 4,
    avgScore: '12.5/20',
    nextExam: '14 Juin (Algèbre)'
  };

  const academicHistory = [ // UC8
    { id: 1, semester: 'S1', module: 'Analyse 1', grade: 14, status: 'Validé', date: '2023-01-20' },
    { id: 2, semester: 'S1', module: 'Algèbre', grade: 8, status: 'Non Validé', date: '2023-01-22' },
    { id: 3, semester: 'S2', module: 'Algorithmique', grade: 16, status: 'Validé', date: '2023-06-10' },
    { id: 4, semester: 'S2', module: 'Web Statique', grade: 9.5, status: 'Non Validé', date: '2023-06-12' },
  ];

  // Modules needing SISC intervention (Grade < 10)
  const modulesToRetake = [ // UC2
    { 
      id: 101, 
      name: 'Algèbre Linéaire', 
      code: 'MATH-02', 
      currentGrade: 8, 
      target: 10, 
      progress: 45, 
      method: 'Cours Vidéo + Quiz', // UC3
      chapters: [
        { id: 1, title: 'Matrices', completed: true },
        { id: 2, title: 'Déterminants', completed: true },
        { id: 3, title: 'Espaces Vectoriels', completed: false }, // UC4
      ]
    },
    { 
      id: 102, 
      name: 'Web Statique (HTML/CSS)', 
      code: 'DEV-01', 
      currentGrade: 9.5, 
      target: 10, 
      progress: 80, 
      method: 'Projet Pratique',
      chapters: [
        { id: 1, title: 'Structure HTML', completed: true },
        { id: 2, title: 'Flexbox & Grid', completed: true },
        { id: 3, title: 'Responsive Design', completed: true }, 
      ]
    }
  ];

  const certificates = [ // UC6, UC7
    { id: 1, title: 'Algorithmique Avancée', date: '10 Juin 2023', grade: 16, downloadUrl: '#' },
    { id: 2, title: 'Base de Données SQL', date: '15 Mai 2023', grade: 14.5, downloadUrl: '#' },
  ];

  useEffect(() => {
      const token = localStorage.getItem('token');
      const userStr = localStorage.getItem('user');
  
      // 1. If no token, kick to login
      if (!token || !userStr) {
        navigate('/login');
        return;
      }
    }, [navigate]);

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    navigate('/login');
  };

  // --- VIEW RENDERERS ---

  // UC1: Dashboard Global
  const renderDashboard = () => (
    <div className="dashboard-grid">
      {/* Stats Row */}
      <div className="stats-row">
        <div className="stat-card">
          <div className="stat-header">
            <div className="stat-icon-bg trend-down"><AlertTriangleIcon /></div>
            <span className="stat-change down">Urgent</span>
          </div>
          <h3>{studentStats.modulesToValidate}</h3>
          <p>Modules à Valider</p>
        </div>
        <div className="stat-card">
          <div className="stat-header">
            <div className="stat-icon-bg trend-up"><Award /></div>
            <span className="stat-change up">Bravo!</span>
          </div>
          <h3>{studentStats.certificatesEarned}</h3>
          <p>Certificats Obtenus</p>
        </div>
        <div className="stat-card">
          <div className="stat-header">
            <div className="stat-icon-bg trend-neutral"><BarChart3 /></div>
          </div>
          <h3>{studentStats.avgScore}</h3>
          <p>Moyenne Générale</p>
        </div>
      </div>

      {/* Priority Modules (UC1 Details) */}
      <div className="chart-card big">
        <div className="card-header">
          <h3>🚀 Reprendre ma progression (Priorité)</h3>
        </div>
        <div className="modules-grid">
          {modulesToRetake.map(module => (
            <div key={module.id} className="module-card-item" onClick={() => { setActiveTab('modules'); setSelectedModule(module); }}>
              <div className="module-info">
                <h4>{module.name}</h4>
                <span className="module-code">{module.code}</span>
              </div>
              <div className="module-progress">
                <div className="progress-bar-bg">
                  <div className="progress-bar-fill" style={{width: `${module.progress}%`}}></div>
                </div>
                <span>{module.progress}%</span>
              </div>
              <button className="continue-btn">Continuer <ChevronRight size={16}/></button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );

  // UC2, UC3, UC4, UC5: Learning Path
  const renderModules = () => {
    if (selectedModule) {
      // DETAIL VIEW (Active Learning)
      return (
        <div className="learning-interface">
          <button className="back-btn" onClick={() => setSelectedModule(null)}>← Retour aux modules</button>
          
          <div className="learning-header">
            <div>
              <h2>{selectedModule.name}</h2>
              <p className="method-badge"><PlayCircle size={16}/> Méthode: {selectedModule.method}</p> 
            </div>
            <div className="grade-badge">
              Note Actuelle: <span>{selectedModule.currentGrade}/20</span>
            </div>
          </div>

          <div className="learning-grid">
            {/* UC4: Suivre progression */}
            <div className="chapters-list card-glass">
              <h3>Chapitres</h3>
              {selectedModule.chapters.map(chap => (
                <div key={chap.id} className={`chapter-item ${chap.completed ? 'completed' : 'active'}`}>
                  <div className="chap-status">
                    {chap.completed ? <CheckCircle size={20} color="#00ff9d"/> : <div className="circle-pending"></div>}
                  </div>
                  <span>{chap.title}</span>
                  {chap.completed ? <span className="status-text">Terminé</span> : <button className="start-chap-btn">Démarrer</button>}
                </div>
              ))}
            </div>

            {/* UC5: Evaluation */}
            <div className="evaluation-card card-glass">
              <h3>Évaluation Finale</h3>
              <p>Complétez tous les chapitres pour débloquer l'examen de validation.</p>
              <div className="progress-circle">
                <span>{selectedModule.progress}%</span>
              </div>
              <button className="eval-btn" disabled={selectedModule.progress < 100}>
                <ClipboardCheck size={20}/> Passer l'Examen
              </button>
              {selectedModule.progress < 100 && <p className="lock-msg">🔒 Verrouillé jusqu'à 100%</p>}
            </div>
          </div>
        </div>
      );
    }

    // LIST VIEW (Select Module)
    return (
      <div className="modules-list-view">
        <h2>📚 Mes Modules SISC</h2>
        <p>Sélectionnez un module où votre note est inférieure à 10 pour commencer le rattrapage.</p>
        <div className="grid-cards">
          {modulesToRetake.map(module => (
            <div key={module.id} className="glass-card-hover" onClick={() => setSelectedModule(module)}>
              <div className="card-top">
                <span className="tag-fail">Non Validé ({module.currentGrade}/20)</span>
              </div>
              <h3>{module.name}</h3>
              <p>{module.method}</p>
              <div className="progress-mini">
                <div className="bar" style={{width: `${module.progress}%`}}></div>
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  };

  // UC6, UC7: Certificates
  const renderCertificates = () => (
    <div className="certs-container">
      <h2>🏆 Mes Certificats</h2>
      <div className="certs-grid">
        {certificates.map(cert => (
          <div key={cert.id} className="cert-card">
            <div className="cert-icon"><Award size={40} color="#b700ff"/></div>
            <div className="cert-details">
              <h3>{cert.title}</h3>
              <p>Obtenu le {cert.date}</p>
              <span className="cert-grade">Note SISC: {cert.grade}/20</span>
            </div>
            <button className="download-btn">
              <Download size={18}/> PDF
            </button>
          </div>
        ))}
      </div>
    </div>
  );

  // UC8: History
  const renderHistory = () => (
    <div className="history-container">
      <h2>📜 Historique Académique</h2>
      <table className="glass-table">
        <thead>
          <tr>
            <th>Semestre</th>
            <th>Module</th>
            <th>Date</th>
            <th>Note</th>
            <th>Statut</th>
          </tr>
        </thead>
        <tbody>
          {academicHistory.map((item) => (
            <tr key={item.id}>
              <td>{item.semester}</td>
              <td style={{fontWeight:'bold'}}>{item.module}</td>
              <td>{item.date}</td>
              <td>{item.grade}/20</td>
              <td>
                <span className={`status-badge ${item.status === 'Validé' ? 'success' : 'urgent'}`}>
                  {item.status}
                </span>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );

  return (
    <div className="admin-container">
      {/* SIDEBAR */}
      <aside className={`sidebar ${sidebarOpen ? 'open' : 'closed'}`}>
        <div className="sidebar-header">
          <div className="logo-text">SISC<span className="dot">.</span>Etud</div>
        </div>
        <nav className="sidebar-nav">
          <button onClick={() => setActiveTab('dashboard')} className={`nav-item ${activeTab === 'dashboard' ? 'active' : ''}`}>
            <LayoutDashboard size={20} /> <span>Dashboard</span>
          </button>
          <button onClick={() => setActiveTab('modules')} className={`nav-item ${activeTab === 'modules' ? 'active' : ''}`}>
            <BookOpen size={20} /> <span>Mes Cours (SISC)</span>
          </button>
          <button onClick={() => setActiveTab('history')} className={`nav-item ${activeTab === 'history' ? 'active' : ''}`}>
            <History size={20} /> <span>Historique</span>
          </button>
          <button onClick={() => setActiveTab('certificates')} className={`nav-item ${activeTab === 'certificates' ? 'active' : ''}`}>
            <Award size={20} /> <span>Certificats</span>
          </button>
        </nav>
        <div className="sidebar-footer">
          <button onClick={handleLogout} className="logout-btn">
            <LogOut size={20} /> <span>Déconnexion</span>
          </button>
        </div>
      </aside>

      {/* MAIN CONTENT */}
      <main className="main-content">
        <header className="top-header">
          <div className="header-left">
            <h2>Bonjour, {userName} 👋</h2>
            <p>Prêt pour atteindre l'excellence ?</p>
          </div>
          <div className="header-actions">
            <button className="icon-btn"><Bell size={20} /><span className="badge">1</span></button>
            <div className="user-profile"><div className="avatar">E</div></div>
          </div>
        </header>

        <div className="content-area">
          {activeTab === 'dashboard' && renderDashboard()}
          {activeTab === 'modules' && renderModules()}
          {activeTab === 'certificates' && renderCertificates()}
          {activeTab === 'history' && renderHistory()}
        </div>
      </main>
    </div>
  );
}

// Simple Icon component for the mock data
const AlertTriangleIcon = () => <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="m21.73 18-8-14a2 2 0 0 0-3.48 0l-8 14A2 2 0 0 0 4 21h16a2 2 0 0 0 1.73-3Z"></path><path d="M12 9v4"></path><path d="M12 17h.01"></path></svg>;