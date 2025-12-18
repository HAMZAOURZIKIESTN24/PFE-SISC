import React, { useState } from 'react';
// 1. Add ArrowLeft to imports
import { Eye, EyeOff, Mail, Lock, ArrowRight, ArrowLeft } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

export default function SISCLogin() {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [rememberMe, setRememberMe] = useState(false);

  const handleSubmit = async () => {
    setError('');
    setLoading(true);

    if (!email || !password) {
      setError('Veuillez remplir tous les champs');
      setLoading(false);
      return;
    }

    try {
     const response = await fetch('http://127.0.0.1:8000/api/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json' 
        },
        body: JSON.stringify({ email, password }),
      });
      const data = await response.json();

      if (!response.ok) {
        // Laravel validation errors often come in an "errors" object, or a "message"
        throw new Error(data.msg || data.message || 'Erreur de connexion');
      }

      // 2. Success navigate('/dashboard');
      localStorage.setItem('token', data.token);
      localStorage.setItem('user', JSON.stringify(data.user));

      setLoading(false);
      if (data.user.role === 'admin') {
        // If Admin -> Go to Admin Dashboard
        navigate('/admin/dashboard');
      } else {
        // If Student -> Go to Student Platform
        navigate('/etudiant/dashboard'); 
        }
    } catch (err) {
      setLoading(false);
      setError(err.message);
    }
  };

  return (
    <div style={{ background: 'linear-gradient(135deg, #0f0f23 0%, #1a1a3e 100%)', minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '2rem', fontFamily: "'Inter', 'Segoe UI', sans-serif", color: '#fff', position: 'relative', overflow: 'hidden' }}>
      
      {/* 2. BACK BUTTON - Positioned Absolutely so it doesn't break the grid */}
      <button
        onClick={() => navigate('/')}
        style={{
          position: 'absolute',
          top: '2rem',
          left: '2rem',
          zIndex: 20,
          background: 'rgba(20, 20, 50, 0.6)',
          border: '1px solid rgba(0, 212, 255, 0.2)',
          borderRadius: '50px',
          padding: '0.8rem 1.5rem',
          color: '#b0b0d9',
          fontSize: '0.9rem',
          fontWeight: '600',
          cursor: 'pointer',
          display: 'flex',
          alignItems: 'center',
          gap: '0.6rem',
          backdropFilter: 'blur(10px)',
          transition: 'all 0.3s ease'
        }}
        onMouseEnter={(e) => {
          e.currentTarget.style.borderColor = '#00d4ff';
          e.currentTarget.style.color = '#fff';
          e.currentTarget.style.transform = 'translateX(-5px)';
        }}
        onMouseLeave={(e) => {
          e.currentTarget.style.borderColor = 'rgba(0, 212, 255, 0.2)';
          e.currentTarget.style.color = '#b0b0d9';
          e.currentTarget.style.transform = 'translateX(0)';
        }}
      >
        <ArrowLeft size={18} />
        Retour à l'accueil
      </button>

      {/* Background Orbs */}
      <div style={{ position: 'fixed', top: 0, left: 0, width: '100%', height: '100%', zIndex: 0, pointerEvents: 'none' }}>
        <div style={{ position: 'absolute', width: '500px', height: '500px', background: 'radial-gradient(circle, rgba(0, 212, 255, 0.2), transparent)', borderRadius: '50%', top: '-10%', right: '-5%', filter: 'blur(100px)', animation: 'float 20s ease-in-out infinite' }} />
        <div style={{ position: 'absolute', width: '400px', height: '400px', background: 'radial-gradient(circle, rgba(183, 0, 255, 0.2), transparent)', borderRadius: '50%', bottom: '10%', left: '-5%', filter: 'blur(100px)', animation: 'float 25s ease-in-out infinite reverse' }} />
        <div style={{ position: 'absolute', width: '350px', height: '350px', background: 'radial-gradient(circle, rgba(0, 212, 255, 0.15), transparent)', borderRadius: '50%', top: '50%', right: '10%', filter: 'blur(90px)', animation: 'float 30s ease-in-out infinite' }} />
      </div>

      <style>{`
        @keyframes float {
          0%, 100% { transform: translate(0, 0); }
          50% { transform: translate(40px, -40px); }
        }
        @keyframes slideUp {
          from { opacity: 0; transform: translateY(50px); }
          to { opacity: 1; transform: translateY(0); }
        }
        @keyframes spin {
          to { transform: rotate(360deg); }
        }
        input::placeholder {
          color: #8080a0;
        }
        input:focus {
          outline: none;
        }
        @media (max-width: 1024px) {
          .grid-login {
            grid-template-columns: 1fr !important;
          }
        }
      `}</style>

      {/* Main Container */}
      <div style={{ position: 'relative', zIndex: 5, display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '4rem', maxWidth: '1200px', width: '100%', alignItems: 'center' }} className="grid-login">
        
        {/* Left Side - Welcome */}
        <div style={{ animation: 'slideUp 1s ease-out' }}>
          <div style={{ marginBottom: '3rem' }}>
            <h1 style={{ fontSize: '3.5rem', fontWeight: '950', marginBottom: '1.5rem', lineHeight: 1.2 }}>
              Bienvenue sur <span style={{ background: 'linear-gradient(135deg, #00d4ff, #b700ff)', backgroundClip: 'text', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>SISC</span>
            </h1>
            <p style={{ fontSize: '1.25rem', color: '#b0b0d9', lineHeight: 1.8, marginBottom: '2rem' }}>
              Connectez-vous à votre espace étudiant et commencez votre parcours vers la réussite académique.
            </p>
          </div>

          {/* Features */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
            {[
              { icon: '📊', title: 'Suivi en Temps Réel', desc: 'Suivez votre progression détaillée' },
              { icon: '🎓', title: 'Certificats Instantanés', desc: 'Obtenez vos certifications immédiatement' },
              { icon: '🤖', title: 'Apprentissage Adaptatif', desc: 'Contenu personnalisé pour vous' }
            ].map((feature, i) => (
              <div key={i} style={{ display: 'flex', gap: '1.5rem', alignItems: 'flex-start', animation: `slideUp 1s ease-out ${(i + 1) * 0.2}s both` }}>
                <div style={{ fontSize: '2rem', minWidth: '50px' }}>
                  {feature.icon}
                </div>
                <div>
                  <h3 style={{ fontSize: '1.1rem', fontWeight: '700', marginBottom: '0.5rem', color: '#fff' }}>
                    {feature.title}
                  </h3>
                  <p style={{ fontSize: '0.95rem', color: '#b0b0d9' }}>
                    {feature.desc}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Right Side - Login Form */}
        <div style={{ animation: 'slideUp 1.2s ease-out' }}>
          <div style={{ background: 'rgba(20, 20, 50, 0.8)', border: '1px solid rgba(0, 212, 255, 0.2)', borderRadius: '24px', padding: '3.5rem', backdropFilter: 'blur(20px)', boxShadow: '0 0 60px rgba(0, 212, 255, 0.1)', position: 'relative' }}>
            <div style={{ position: 'absolute', top: 0, left: 0, right: 0, height: '2px', background: 'linear-gradient(90deg, transparent, #00d4ff, transparent)', borderRadius: '24px 24px 0 0' }} />

            <h2 style={{ fontSize: '1.8rem', fontWeight: '900', marginBottom: '1rem', color: '#fff' }}>
              Connexion
            </h2>
            <p style={{ fontSize: '0.95rem', color: '#b0b0d9', marginBottom: '2.5rem' }}>
              Entrez vos identifiants EST Nador
            </p>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
              {/* Email Field */}
              <div>
                <label style={{ display: 'block', marginBottom: '0.8rem', fontSize: '0.95rem', fontWeight: '600', color: '#fff' }}>
                  Email 
                </label>
                <div style={{ position: 'relative', display: 'flex', alignItems: 'center' }}>
                  <Mail style={{ position: 'absolute', left: '1.5rem', width: '20px', height: '20px', color: '#00d4ff', pointerEvents: 'none' }} />
                  <input
                    type="text"
                    placeholder="exemple@ump.ac.ma"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    style={{
                      width: '100%',
                      padding: '1.2rem 1.2rem 1.2rem 3.5rem',
                      background: 'rgba(0, 212, 255, 0.05)',
                      border: '1px solid rgba(0, 212, 255, 0.2)',
                      borderRadius: '12px',
                      color: '#fff',
                      fontSize: '1rem',
                      transition: 'all 0.3s',
                      boxSizing: 'border-box'
                    }}
                    onFocus={(e) => {
                      e.target.style.borderColor = 'rgba(0, 212, 255, 0.5)';
                      e.target.style.boxShadow = '0 0 20px rgba(0, 212, 255, 0.2)';
                      e.target.style.background = 'rgba(0, 212, 255, 0.08)';
                    }}
                    onBlur={(e) => {
                      e.target.style.borderColor = 'rgba(0, 212, 255, 0.2)';
                      e.target.style.boxShadow = 'none';
                      e.target.style.background = 'rgba(0, 212, 255, 0.05)';
                    }}
                  />
                </div>
              </div>

              {/* Password Field */}
              <div>
                <label style={{ display: 'block', marginBottom: '0.8rem', fontSize: '0.95rem', fontWeight: '600', color: '#fff' }}>
                  Mot de passe
                </label>
                <div style={{ position: 'relative', display: 'flex', alignItems: 'center' }}>
                  <Lock style={{ position: 'absolute', left: '1.5rem', width: '20px', height: '20px', color: '#00d4ff', pointerEvents: 'none' }} />
                  <input
                    type={showPassword ? 'text' : 'password'}
                    placeholder="••••••••"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    style={{
                      width: '100%',
                      padding: '1.2rem 3.5rem 1.2rem 3.5rem',
                      background: 'rgba(0, 212, 255, 0.05)',
                      border: '1px solid rgba(0, 212, 255, 0.2)',
                      borderRadius: '12px',
                      color: '#fff',
                      fontSize: '1rem',
                      transition: 'all 0.3s',
                      boxSizing: 'border-box'
                    }}
                    onFocus={(e) => {
                      e.target.style.borderColor = 'rgba(0, 212, 255, 0.5)';
                      e.target.style.boxShadow = '0 0 20px rgba(0, 212, 255, 0.2)';
                      e.target.style.background = 'rgba(0, 212, 255, 0.08)';
                    }}
                    onBlur={(e) => {
                      e.target.style.borderColor = 'rgba(0, 212, 255, 0.2)';
                      e.target.style.boxShadow = 'none';
                      e.target.style.background = 'rgba(0, 212, 255, 0.05)';
                    }}
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    style={{
                      position: 'absolute',
                      right: '1.5rem',
                      background: 'none',
                      border: 'none',
                      cursor: 'pointer',
                      color: '#00d4ff',
                      display: 'flex',
                      alignItems: 'center',
                      transition: 'all 0.3s'
                    }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.color = '#b700ff';
                      e.currentTarget.style.transform = 'scale(1.1)';
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.color = '#00d4ff';
                      e.currentTarget.style.transform = 'scale(1)';
                    }}
                  >
                    {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                  </button>
                </div>
              </div>

              {/* Error Message */}
              {error && (
                <div style={{ padding: '1rem', background: 'rgba(255, 0, 110, 0.15)', border: '1px solid rgba(255, 0, 110, 0.3)', borderRadius: '10px', color: '#ff006e', fontSize: '0.95rem', fontWeight: '500' }}>
                  {error}
                </div>
              )}

              {/* Remember Me & Forgot Password */}
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <label style={{ display: 'flex', alignItems: 'center', gap: '0.8rem', cursor: 'pointer', fontSize: '0.95rem', color: '#b0b0d9' }}>
                  <input
                    type="checkbox"
                    checked={rememberMe}
                    onChange={(e) => setRememberMe(e.target.checked)}
                    style={{
                      width: '18px',
                      height: '18px',
                      cursor: 'pointer',
                      accentColor: '#00d4ff'
                    }}
                  />
                  Se souvenir de moi
                </label>
                <div style={{ color: '#00d4ff', textDecoration: 'none', fontSize: '0.95rem', fontWeight: '600', transition: 'color 0.3s', cursor: 'pointer' }} onMouseEnter={(e) => e.target.style.color = '#b700ff'} onMouseLeave={(e) => e.target.style.color = '#00d4ff'}>
                   <button
                    onClick={() => navigate('/auth/forgot-password')}
                    >
                        Forgot Password?
                    </button>
                </div>
              </div>

              {/* Login Button */}
              <button
                type="button"
                onClick={handleSubmit}
                disabled={loading}
                style={{
                  width: '100%',
                  padding: '1.3rem',
                  background: loading ? 'linear-gradient(135deg, #00a8cc, #9400cc)' : 'linear-gradient(135deg, #00d4ff, #b700ff)',
                  border: 'none',
                  borderRadius: '12px',
                  color: '#000',
                  fontSize: '1.05rem',
                  fontWeight: '700',
                  cursor: loading ? 'not-allowed' : 'pointer',
                  transition: 'all 0.3s',
                  boxShadow: '0 0 30px rgba(0, 212, 255, 0.5)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  gap: '0.8rem',
                  opacity: loading ? 0.8 : 1
                }}
                onMouseEnter={(e) => {
                  if (!loading) {
                    e.target.style.transform = 'translateY(-3px)';
                    e.target.style.boxShadow = '0 5px 40px rgba(0, 212, 255, 0.7)';
                  }
                }}
                onMouseLeave={(e) => {
                  if (!loading) {
                    e.target.style.transform = 'translateY(0)';
                    e.target.style.boxShadow = '0 0 30px rgba(0, 212, 255, 0.5)';
                  }
                }}
              >
                {loading ? (
                  <>
                    <div style={{ width: '20px', height: '20px', border: '2px solid #000', borderTop: '2px solid transparent', borderRadius: '50%', animation: 'spin 1s linear infinite' }} />
                    Connexion...
                  </>
                ) : (
                  <>
                    Se Connecter
                    <ArrowRight size={20} />
                  </>
                )}
              </button>
            </div>
          </div>
          {/* Support Contact */}
          <div style={{ marginTop: '2rem', padding: '1.5rem', background: 'rgba(0, 212, 255, 0.08)', border: '1px solid rgba(0, 212, 255, 0.15)', borderRadius: '12px', textAlign: 'center' }}>
            <p style={{ fontSize: '0.85rem', color: '#b0b0d9', marginBottom: '0.8rem' }}>
              Besoin d'aide?
            </p>
            <div style={{ color: '#00d4ff', textDecoration: 'none', fontSize: '0.9rem', fontWeight: '600', cursor: 'pointer' }}>
              support@sisc.estn.ma
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}