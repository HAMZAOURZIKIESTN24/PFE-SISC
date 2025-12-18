import React, { useState } from 'react';
import { ChevronDown, Zap, Award, TrendingUp, Users, BookOpen, Target, Star, Lock, CheckCircle, ArrowRight, MessageCircle, Headphones, Clock, Shield, Sparkles } from 'lucide-react';
import { LineChart, Line, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { useNavigate } from 'react-router-dom';

export default function SISCPlatform() {
  const navigate = useNavigate()
  const [activeTab, setActiveTab] = useState('home');
  const [expandedFaq, setExpandedFaq] = useState(null);

  const filieres = [
    { 
      id: 1, 
      name: 'Management Logistique et Transport (MLT)', 
      code: 'DUT-1',
      intro: 'Maîtrisez la chaîne logistique moderne, du transport international à l\'optimisation des flux. Apprenez la gestion des entrepôts, la supply chain et les techniques avancées de distribution.'
    },
    { 
      id: 2, 
      name: 'Finance, Banque et Transformation Digitale (FBTD)', 
      code: 'DUT-2',
      intro: 'Devenez expert en finance numérique, banque digitale et gestion des risques financiers. Maîtrisez la blockchain, les fintechs et l\'analyse financière moderne.'
    },
    { 
      id: 3, 
      name: 'Web Marketing (WM)', 
      code: 'DUT-3',
      intro: 'Créez des stratégies marketing digitales percutantes avec SEO, réseaux sociaux et analytics. Apprenez le content marketing, la publicité en ligne et l\'e-commerce.'
    },
    { 
      id: 4, 
      name: 'Marketing et Gestion des Projets Digitaux Innovants (MGPDI)', 
      code: 'DUT-4',
      intro: 'Gérez des projets digitaux innovants en combinant marketing stratégique et transformation numérique. Maîtrisez l\'agile, le design thinking et la gestion d\'équipes digitales.'
    },
    { 
      id: 5, 
      name: 'Génie de l\'Eau et de l\'Environnement (GEE)', 
      code: 'DUT-5',
      intro: 'Contribuez à la gestion durable des ressources en eau et à la protection de l\'environnement. Apprenez le traitement des eaux, l\'écologie industrielle et les énergies renouvelables.'
    },
    { 
      id: 6, 
      name: 'Intelligence Artificielle et Ingénierie des Données (IAID)', 
      code: 'DUT-6',
      intro: 'Plongez dans l\'IA, le machine learning et l\'analyse avancée de données massives. Maîtrisez Python, TensorFlow, les réseaux de neurones et le deep learning.'
    },
    { 
      id: 7, 
      name: 'Génie civil - Construction Durable (GCCD)', 
      code: 'DUT-7',
      intro: 'Concevez des infrastructures durables avec les techniques de construction modernes et écologiques. Apprenez le BIM, les matériaux innovants et la construction verte.'
    },
    { 
      id: 8, 
      name: 'Développeur d\'Applications Web & Mobile (DAWM)', 
      code: 'DUT-8',
      intro: 'Créez des applications web et mobile performantes avec les frameworks les plus récents. Maîtrisez React, Node.js, Flutter et les architectures cloud natives.'
    },
    { 
      id: 9, 
      name: 'Ingénierie Logiciel et Cybersecurity (ILCS)', 
      code: 'DUT-9',
      intro: 'Développez des logiciels sécurisés et maîtrisez les techniques avancées de cybersécurité. Apprenez le pentesting, la cryptographie et la sécurité des réseaux.'
    },
    { 
      id: 10, 
      name: 'Informatique Décisionnelle et Sciences des Données (IDSD)', 
      code: 'DUT-10',
      intro: 'Transformez les données en décisions stratégiques avec le Big Data et la Business Intelligence. Maîtrisez SQL, Power BI, Tableau et l\'analyse prédictive.'
    },
    { 
      id: 11, 
      name: 'Réseaux et Télécommunication (RT)', 
      code: 'DUT-11',
      intro: 'Administrez des réseaux complexes et maîtrisez les technologies de télécommunication modernes. Apprenez Cisco, la 5G, la fibre optique et les infrastructures cloud.'
    },
    { 
      id: 12, 
      name: 'Génie Industriel 4.0 et Techniques Avancées de la Maintenance (GITAM)', 
      code: 'DUT-12',
      intro: 'Optimisez la production industrielle avec l\'Industrie 4.0 et la maintenance prédictive. Maîtrisez l\'IoT industriel, l\'automatisation et le lean manufacturing.'
    }
  ];
  const progressData = [
    { name: 'Semaine 1', progress: 20 },
    { name: 'Semaine 2', progress: 45 },
    { name: 'Semaine 3', progress: 65 },
    { name: 'Semaine 4', progress: 85 }
  ];

  const certificatePath = [
    { step: 1, title: 'S\'inscrire au Module', desc: 'Choisissez le module où vous avez besoin d\'amélioration', icon: '📝' },
    { step: 2, title: 'Accéder aux Ressources', desc: 'Cours, exercices et contenus adaptés à votre niveau', icon: '📚' },
    { step: 3, title: 'Compléter les Évaluations', desc: 'Exercices pratiques et quizz progressifs', icon: '✏️' },
    { step: 4, title: 'Réussir l\'Examen Final', desc: 'Test final avec un score minimum de 70%', icon: '🎯' },
    { step: 5, title: 'Obtenir le Certificat', desc: 'Certificat numérique PDF immédiatement', icon: '🏆' }
  ];

  const advantages = [
    {
      icon: '🎓',
      title: 'Formations Reconnues',
      desc: 'Certificats validés par EST Nador et reconnus nationalement'
    },
    {
      icon: '🤖',
      title: 'Apprentissage Adaptatif',
      desc: 'Contenu personnalisé basé sur votre niveau et progression'
    },
    {
      icon: '⚡',
      title: 'Flexibilité Totale',
      desc: 'Étudiez à votre rythme, 24/7 accessible en ligne'
    },
    {
      icon: '📊',
      title: 'Suivi en Temps Réel',
      desc: 'Dashboard complet avec vos statistiques et progrès détaillés'
    },
    {
      icon: '🤝',
      title: 'Accompagnement Personnalisé',
      desc: 'Support pédagogique et mentorat disponible tout le temps'
    },
    {
      icon: '💼',
      title: 'Taux de Réussite 95%',
      desc: 'Méthodologie éprouvée avec 1200+ étudiants satisfaits'
    }
  ];

  const faqs = [
    {
      q: 'Comment accéder à la plateforme SISC?',
      a: 'Connectez-vous avec vos identifiants EST Nador. Vous verrez immédiatement les modules nécessitant amélioration et pourrez débuter votre parcours.'
    },
    {
      q: 'Combien de temps faut-il pour obtenir un certificat?',
      a: 'En moyenne 4 à 6 semaines selon votre engagement. La plateforme est flexible - vous pouvez accélérer ou ralentir selon votre disponibilité.'
    },
    {
      q: 'Le certificat est-il valable officiellement?',
      a: 'Oui! Les certificats SISC sont reconnus par EST Nador et valident vos acquis académiques. Vous les téléchargez en PDF immédiatement.'
    },
    {
      q: 'Y a-t-il du support pédagogique?',
      a: 'Absolument. Vous avez accès à un support 24/7, des tutoriels, une communauté d\'étudiants et du mentorat personnalisé si nécessaire.'
    },
    {
      q: 'Puis-je suivre plusieurs modules en même temps?',
      a: 'Oui, vous pouvez vous inscrire à plusieurs modules simultanément. Cependant, nous recommandons de vous concentrer sur 2-3 modules maximum pour une progression optimale et éviter la surcharge cognitive.'
    },
    {
      q: 'Que se passe-t-il si j\'échoue à l\'examen final?',
      a: 'Vous pouvez repasser l\'examen après un délai de 48 heures. Vous aurez accès à un feedback détaillé de vos erreurs et à des ressources supplémentaires pour combler vos lacunes avant la prochaine tentative.'
    },
    {
      q: 'Les certificats SISC sont-ils reconnus par les employeurs?',
      a: 'Oui, nos certificats sont officiellement reconnus par EST Nador et l\'Université Mohammed Premier. De nombreux employeurs au Maroc valorisent ces certifications comme preuve de compétences validées et d\'engagement dans l\'apprentissage continu.'
    }
  ];

  const supportTeam = [
    { role: '📞 Support Technique', time: '24h/24 - 7j/7' },
    { role: '👨‍🏫 Mentors Académiques', time: 'Du lundi au vendredi' },
    { role: '💬 Chat Communautaire', time: 'En temps réel' },
    { role: '📧 Email Support', time: 'Réponse en 2h max' }
  ];

  return (
    <div style={{ background: 'linear-gradient(135deg, #0f0f23 0%, #1a1a3e 100%)', minHeight: '100vh', color: '#fff', fontFamily: "'Inter', 'Segoe UI', sans-serif" }}>
      {/* Background Orbs */}
      <div style={{ position: 'fixed', top: 0, left: 0, width: '100%', height: '100%', zIndex: 0, pointerEvents: 'none', overflow: 'hidden' }}>
        <div style={{
          position: 'absolute',
          width: '500px',
          height: '500px',
          background: 'radial-gradient(circle, rgba(0, 212, 255, 0.2), transparent)',
          borderRadius: '50%',
          top: '-10%',
          right: '-5%',
          filter: 'blur(100px)',
          animation: 'float 20s ease-in-out infinite'
        }} />
        <div style={{
          position: 'absolute',
          width: '400px',
          height: '400px',
          background: 'radial-gradient(circle, rgba(183, 0, 255, 0.2), transparent)',
          borderRadius: '50%',
          bottom: '10%',
          left: '5%',
          filter: 'blur(100px)',
          animation: 'float 25s ease-in-out infinite reverse'
        }} />
        <div style={{
          position: 'absolute',
          width: '350px',
          height: '350px',
          background: 'radial-gradient(circle, rgba(255, 0, 110, 0.15), transparent)',
          borderRadius: '50%',
          top: '50%',
          right: '10%',
          filter: 'blur(90px)',
          animation: 'float 30s ease-in-out infinite'
        }} />
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
        @keyframes slideDown {
          from { opacity: 0; max-height: 0; }
          to { opacity: 1; max-height: 500px; }
        }
        @keyframes fadeIn {
          from { opacity: 0; }
          to { opacity: 1; }
        }
        @keyframes pulse {
          0%, 100% { transform: scale(1); box-shadow: 0 0 40px rgba(0, 212, 255, 0.5); }
          50% { transform: scale(1.05); box-shadow: 0 0 60px rgba(0, 212, 255, 0.8); }
        }
        * {
          scroll-behavior: smooth;
        }
      `}</style>

      {/* Navigation - NOW CENTERED */}
      <nav style={{
        position: 'fixed',
        top: 0,
        width: '100%',
        zIndex: 100,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        padding: '1.2rem 5%',
        backdropFilter: 'blur(20px)',
        borderBottom: '1px solid rgba(0, 212, 255, 0.15)',
        backgroundColor: 'rgba(15, 15, 35, 0.5)'
      }}>
        <div style={{
          fontSize: '1.8rem',
          fontWeight: '900',
          background: 'linear-gradient(135deg, #00d4ff, #b700ff)',
          backgroundClip: 'text',
          WebkitBackgroundClip: 'text',
          WebkitTextFillColor: 'transparent',
          letterSpacing: '-1px',
          marginBottom: '1rem'
        }}>
          SISC
        </div>
        
        {/* CENTERED MENU */}
        <div style={{ 
          display: 'flex', 
          gap: '2.5rem', 
          alignItems: 'center', 
          flexWrap: 'wrap',
          justifyContent: 'center'
        }}>
          {[
            { id: 'home', label: 'Accueil' },
            { id: 'filieres', label: 'Filières' },
            { id: 'about', label: 'À Propos' },
            { id: 'how', label: 'Comment Ça Marche' },
            { id: 'contact', label: 'Support' }
          ].map(item => (
            <button
              key={item.id}
              onClick={() => setActiveTab(item.id)}
              style={{
                background: 'none',
                border: 'none',
                color: activeTab === item.id ? '#00d4ff' : '#b0b0d9',
                cursor: 'pointer',
                fontSize: '0.9rem',
                transition: 'all 0.3s ease',
                fontWeight: activeTab === item.id ? '700' : '400',
                borderBottom: activeTab === item.id ? '2px solid #00d4ff' : 'none',
                paddingBottom: '0.5rem'
              }}
              onMouseEnter={e => e.target.style.color = '#00d4ff'}
              onMouseLeave={e => e.target.style.color = activeTab === item.id ? '#00d4ff' : '#b0b0d9'}
            >
              {item.label}
            </button>
          ))}
          
          {/* Se Connecter Button - PROMINENT */}
          <button style={{
            padding: '0.9rem 2rem',
            background: 'linear-gradient(135deg, #00d4ff, #b700ff)',
            border: 'none',
            borderRadius: '12px',
            color: '#000',
            fontSize: '0.95rem',
            fontWeight: '800',
            cursor: 'pointer',
            transition: 'all 0.3s ease',
            boxShadow: '0 0 30px rgba(0, 212, 255, 0.6)',
            animation: 'pulse 2s ease-in-out infinite',
            letterSpacing: '0.5px'
          }} 
          onMouseEnter={e => {
            e.target.style.transform = 'translateY(-3px) scale(1.05)';
            e.target.style.boxShadow = '0 5px 40px rgba(0, 212, 255, 0.9)';
          }} 
          onMouseLeave={e => {
            e.target.style.transform = 'translateY(0) scale(1)';
            e.target.style.boxShadow = '0 0 30px rgba(0, 212, 255, 0.6)';
          }}
          onClick={() => navigate('/login')}
          >
             Se Connecter
          </button>
        </div>
      </nav>

      {/* HOME TAB */}
      {activeTab === 'home' && (
        <div>
          {/* Hero Section */}
          <section style={{
            position: 'relative',
            zIndex: 5,
            minHeight: '100vh',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            padding: '8rem 5% 4rem',
            textAlign: 'center',
            marginTop: '100px'
          }}>
            <div style={{ maxWidth: '1100px', animation: 'slideUp 1s ease-out' }}>
              <div style={{
                display: 'inline-block',
                background: 'linear-gradient(135deg, rgba(0, 212, 255, 0.2), rgba(183, 0, 255, 0.2))',
                border: '1px solid rgba(0, 212, 255, 0.3)',
                padding: '1rem 2rem',
                borderRadius: '50px',
                marginBottom: '2rem',
                fontSize: '0.95rem',
                color: '#00d4ff',
                fontWeight: '700',
                letterSpacing: '0.5px'
              }}>
                ✨ Plateforme de Soutien Académique Intelligente & Complète
              </div>

              <h1 style={{
                fontSize: 'clamp(2.5rem, 8vw, 5rem)',
                fontWeight: '950',
                marginBottom: '2rem',
                lineHeight: 1.1,
                letterSpacing: '-2px'
              }}>
                Transformez vos <span style={{
                  background: 'linear-gradient(135deg, #00d4ff, #b700ff)',
                  backgroundClip: 'text',
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent'
                }}>Difficultés en Succès</span>
              </h1>

              <p style={{
                fontSize: '1.25rem',
                color: '#b0b0d9',
                marginBottom: '3.5rem',
                maxWidth: '750px',
                marginLeft: 'auto',
                marginRight: 'auto',
                lineHeight: 1.8,
                fontWeight: '400'
              }}>
                SISC est une plateforme d'apprentissage intelligente conçue pour les étudiants d'EST Nador. Dépassez vos lacunes académiques avec des ressources personnalisées, des exercices adaptatifs, et obtenez des certificats reconnus instantanément.
              </p>

              <div style={{ display: 'flex', gap: '1.5rem', justifyContent: 'center', flexWrap: 'wrap', marginBottom: '4rem' }}>
                <button style={{
                  padding: '1.3rem 3.5rem',
                  background: 'linear-gradient(135deg, #00d4ff, #b700ff)',
                  border: 'none',
                  borderRadius: '14px',
                  color: '#000',
                  fontSize: '1.05rem',
                  fontWeight: '700',
                  cursor: 'pointer',
                  transition: 'all 0.3s ease',
                  boxShadow: '0 0 40px rgba(0, 212, 255, 0.5)',
                  letterSpacing: '0.5px'
                }} onMouseEnter={e => {
                  e.target.style.transform = 'translateY(-4px)';
                  e.target.style.boxShadow = '0 10px 50px rgba(0, 212, 255, 0.7)';
                }} onMouseLeave={e => {
                  e.target.style.transform = 'translateY(0)';
                  e.target.style.boxShadow = '0 0 40px rgba(0, 212, 255, 0.5)';
                }}>
                  Commencer Maintenant
                </button>
                <button style={{
                  padding: '1.3rem 3.5rem',
                  background: 'transparent',
                  border: '2px solid #00d4ff',
                  borderRadius: '14px',
                  color: '#00d4ff',
                  fontSize: '1.05rem',
                  fontWeight: '700',
                  cursor: 'pointer',
                  transition: 'all 0.3s ease',
                  letterSpacing: '0.5px'
                }} onMouseEnter={e => {
                  e.target.style.background = 'rgba(0, 212, 255, 0.1)';
                  e.target.style.transform = 'translateY(-4px)';
                }} onMouseLeave={e => {
                  e.target.style.background = 'transparent';
                  e.target.style.transform = 'translateY(0)';
                }}>
                  Découvrir Plus →
                </button>
              </div>

              {/* Stats */}
              <div style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fit, minmax(150px, 1fr))',
                gap: '2.5rem',
                marginTop: '5rem',
                paddingTop: '3rem',
                borderTop: '1px solid rgba(0, 212, 255, 0.1)'
              }}>
                {[
                  { num: '1200+', label: 'Étudiants' },
                  { num: '95%', label: 'Réussite' },
                  { num: '12', label: 'Filières' },
                  { num: '24/7', label: 'Support' }
                ].map((stat, i) => (
                  <div key={i} style={{ textAlign: 'center' }}>
                    <div style={{ fontSize: '2.8rem', fontWeight: '900', background: 'linear-gradient(135deg, #00d4ff, #b700ff)', backgroundClip: 'text', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>
                      {stat.num}
                    </div>
                    <div style={{ color: '#b0b0d9', fontSize: '0.95rem', marginTop: '0.5rem', fontWeight: '500' }}>
                      {stat.label}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </section>

          {/* Why Choose SISC */}
          <section style={{
            position: 'relative',
            zIndex: 5,
            padding: '7rem 5%',
            maxWidth: '1400px',
            margin: '0 auto'
          }}>
            <h2 style={{
              fontSize: 'clamp(2rem, 5vw, 3rem)',
              fontWeight: '900',
              marginBottom: '1.5rem',
              textAlign: 'center',
              letterSpacing: '-1px'
            }}>
              Pourquoi Choisir SISC?
            </h2>
            <p style={{
              fontSize: '1.15rem',
              color: '#b0b0d9',
              textAlign: 'center',
              marginBottom: '5rem',
              maxWidth: '800px',
              marginLeft: 'auto',
              marginRight: 'auto',
              fontWeight: '400'
            }}>
              Nous combinons technologie avancée, pédagogie moderne et accompagnement personnalisé pour garantir votre réussite académique
            </p>

            <div style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(340px, 1fr))',
              gap: '2.5rem'
            }}>
              {advantages.map((adv, i) => (
                <div
                  key={i}
                  style={{
                    background: 'rgba(20, 20, 50, 0.7)',
                    border: '1px solid rgba(0, 212, 255, 0.2)',
                    borderRadius: '18px',
                    padding: '2.8rem',
                    backdropFilter: 'blur(15px)',
                    transition: 'all 0.4s cubic-bezier(0.34, 1.56, 0.64, 1)',
                    animation: `slideUp 0.6s ease-out ${i * 0.1}s both`,
                    cursor: 'pointer',
                    position: 'relative',
                    overflow: 'hidden'
                  }}
                  onMouseEnter={e => {
                    e.currentTarget.style.borderColor = 'rgba(0, 212, 255, 0.5)';
                    e.currentTarget.style.boxShadow = '0 0 60px rgba(0, 212, 255, 0.25), inset 0 0 30px rgba(0, 212, 255, 0.1)';
                    e.currentTarget.style.transform = 'translateY(-12px)';
                  }}
                  onMouseLeave={e => {
                    e.currentTarget.style.borderColor = 'rgba(0, 212, 255, 0.2)';
                    e.currentTarget.style.boxShadow = 'none';
                    e.currentTarget.style.transform = 'translateY(0)';
                  }}
                >
                  <div style={{
                    position: 'absolute',
                    top: 0,
                    left: 0,
                    right: 0,
                    height: '2px',
                    background: 'linear-gradient(90deg, transparent, #00d4ff, transparent)'
                  }} />
                  <div style={{ fontSize: '3.5rem', marginBottom: '1.5rem' }}>
                    {adv.icon}
                  </div>
                  <h3 style={{ fontSize: '1.35rem', fontWeight: '800', marginBottom: '1rem', color: '#fff' }}>
                    {adv.title}
                  </h3>
                  <p style={{ color: '#b0b0d9', lineHeight: 1.7, fontSize: '0.95rem', fontWeight: '400' }}>
                    {adv.desc}
                  </p>
                </div>
              ))}
            </div>
          </section>

          {/* Progress Chart */}
          <section style={{
            position: 'relative',
            zIndex: 5,
            padding: '5rem 5%',
            maxWidth: '1100px',
            margin: '0 auto'
          }}>
            <div style={{
              background: 'rgba(20, 20, 50, 0.7)',
              border: '1px solid rgba(0, 212, 255, 0.2)',
              borderRadius: '18px',
              padding: '3.5rem',
              backdropFilter: 'blur(15px)',
              animation: 'slideUp 0.8s ease-out'
            }}>
              <h3 style={{ marginBottom: '2.5rem', fontSize: '1.6rem', fontWeight: '800', color: '#fff' }}>
                📊 Progression Moyenne des Étudiants
              </h3>
              <ResponsiveContainer width="100%" height={350}>
                <LineChart data={progressData}>
                  <CartesianGrid strokeDasharray="3 3" stroke="rgba(0, 212, 255, 0.1)" />
                  <XAxis dataKey="name" stroke="#b0b0d9" />
                  <YAxis stroke="#b0b0d9" />
                  <Tooltip contentStyle={{ background: 'rgba(20, 20, 50, 0.95)', border: '2px solid #00d4ff', color: '#fff', borderRadius: '10px' }} />
                  <Line type="monotone" dataKey="progress" stroke="#00d4ff" strokeWidth={4} dot={{ fill: '#b700ff', r: 6 }} activeDot={{ r: 8 }} />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </section>
        </div>
      )}

      {/* FILIERES TAB - WITH VISIBLE DESCRIPTIONS */}
      {activeTab === 'filieres' && (
        <div style={{ position: 'relative', zIndex: 5, padding: '10rem 5% 4rem', maxWidth: '1400px', margin: '0 auto' }}>
          <h2 style={{ fontSize: 'clamp(2.5rem, 6vw, 3.5rem)', fontWeight: '900', marginBottom: '2rem', animation: 'slideUp 0.6s ease-out', letterSpacing: '-1px', textAlign: 'center' }}>
            Nos 12 Filières Disponibles
          </h2>
          <p style={{
            fontSize: '1.2rem',
            color: '#b0b0d9',
            marginBottom: '5rem',
            maxWidth: '900px',
            animation: 'slideUp 0.8s ease-out',
            textAlign: 'center',
            marginLeft: 'auto',
            marginRight: 'auto'
          }}>
            Explorez toutes les filières de DUT proposées par EST Nador. Chacune offre une formation professionnalisante de 2 ans avec certification reconnue.
          </p>

          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(380px, 1fr))',
            gap: '2.5rem'
          }}>
            {filieres.map((filiere, i) => (
              <div
                key={filiere.id}
                style={{
                  background: 'rgba(20, 20, 50, 0.7)',
                  border: '1px solid rgba(0, 212, 255, 0.2)',
                  borderRadius: '16px',
                  padding: '2.5rem',
                  backdropFilter: 'blur(15px)',
                  transition: 'all 0.4s ease',
                  animation: `slideUp 0.6s ease-out ${i * 0.08}s both`,
                  cursor: 'pointer',
                  position: 'relative',
                  overflow: 'hidden',
                  display: 'flex',
                  flexDirection: 'column'
                }}
                onMouseEnter={e => {
                  e.currentTarget.style.borderColor = 'rgba(0, 212, 255, 0.5)';
                  e.currentTarget.style.boxShadow = '0 0 50px rgba(0, 212, 255, 0.2)';
                  e.currentTarget.style.transform = 'translateY(-8px)';
                }}
                onMouseLeave={e => {
                  e.currentTarget.style.borderColor = 'rgba(0, 212, 255, 0.2)';
                  e.currentTarget.style.boxShadow = 'none';
                  e.currentTarget.style.transform = 'translateY(0)';
                }}
              >
                <div style={{
                  position: 'absolute',
                  top: 0,
                  left: 0,
                  right: 0,
                  height: '2px',
                  background: 'linear-gradient(90deg, transparent, #00d4ff, transparent)'
                }} />
                
                <div style={{
                  display: 'inline-block',
                  background: 'rgba(0, 212, 255, 0.15)',
                  border: '1px solid rgba(0, 212, 255, 0.3)',
                  padding: '0.6rem 1.2rem',
                  borderRadius: '20px',
                  marginBottom: '1.2rem',
                  fontSize: '0.85rem',
                  color: '#00d4ff',
                  fontWeight: '700',
                  alignSelf: 'flex-start'
                }}>
                  {filiere.code}
                </div>

                <h3 style={{ 
                  fontSize: '1.35rem', 
                  fontWeight: '800', 
                  marginBottom: '1.2rem', 
                  color: '#fff', 
                  lineHeight: 1.4,
                  minHeight: '65px'
                }}>
                  {filiere.name}
                </h3>

                {/* CLEAR DESCRIPTION - VISIBLE NOW */}
                <p style={{ 
                  color: '#b0b0d9', 
                  fontSize: '0.98rem', 
                  lineHeight: 1.7, 
                  marginBottom: '2rem',
                  flex: 1,
                  fontWeight: '400',
                  minHeight: '100px'
                }}>
                  {filiere.intro}
                </p>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* ABOUT TAB */}
      {activeTab === 'about' && (
        <div style={{ position: 'relative', zIndex: 5, padding: '10rem 5% 4rem', maxWidth: '1200px', margin: '0 auto' }}>
          <h2 style={{ fontSize: '3.2rem', fontWeight: '900', marginBottom: '2.5rem', animation: 'slideUp 0.6s ease-out', letterSpacing: '-1px' }}>
            À Propos de SISC
          </h2>

          {/* Mission */}
          <div style={{
            background: 'rgba(20, 20, 50, 0.7)',
            border: '2px solid rgba(0, 212, 255, 0.3)',
            borderRadius: '18px',
            padding: '4rem',
            backdropFilter: 'blur(15px)',
            marginBottom: '3rem',
            animation: 'slideUp 0.8s ease-out'
          }}>
            <h3 style={{ fontSize: '2rem', fontWeight: '900', marginBottom: '1.5rem', color: '#00d4ff' }}>
              🎯 Notre Mission
            </h3>
            <p style={{ fontSize: '1.15rem', color: '#b0b0d9', lineHeight: 2, marginBottom: '1.5rem', fontWeight: '400' }}>
              SISC (Système Intégré de Soutien et Certification) a été conçu pour résoudre un problème majeur rencontré par nos étudiants : lorsqu'ils obtiennent des notes insuffisantes dans certains modules, ils doivent attendre longtemps pour reprendre leur formation, ce qui ralentit leur progression académique et crée de la frustration.
            </p>
            <p style={{ fontSize: '1.15rem', color: '#b0b0d9', lineHeight: 2, fontWeight: '400' }}>
              Notre plateforme offre une solution complète et accessible : des ressources pédagogiques de haute qualité, des exercices adaptatifs intelligents, et surtout, une certification immédiate après réussite - sans attendre des mois.
            </p>
          </div>

          {/* Vision */}
          <div style={{
            background: 'rgba(20, 20, 50, 0.7)',
            border: '2px solid rgba(183, 0, 255, 0.3)',
            borderRadius: '18px',
            padding: '4rem',
            backdropFilter: 'blur(15px)',
            marginBottom: '3rem',
            animation: 'slideUp 0.9s ease-out'
          }}>
            <h3 style={{ fontSize: '2rem', fontWeight: '900', marginBottom: '1.5rem', color: '#b700ff' }}>
              ✨ Notre Vision
            </h3>
            <p style={{ fontSize: '1.15rem', color: '#b0b0d9', lineHeight: 2, fontWeight: '400' }}>
              Créer une plateforme d'apprentissage moderne, sécurisée et 100% numérique qui centralise le suivi académique de tous nos étudiants. Nous utilisons l'Intelligence Artificielle et le Machine Learning pour personnaliser les parcours d'apprentissage et générer automatiquement des certificats numériques validant les acquis de chaque étudiant.
            </p>
          </div>

          {/* Key Features */}
          <h3 style={{ fontSize: '2rem', fontWeight: '900', marginBottom: '3rem' }}>
            🚀 Caractéristiques Clés du Système
          </h3>
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
            gap: '2.5rem',
            marginBottom: '4rem'
          }}>
            {[
              { title: 'Identification Automatique', desc: 'Les modules avec notes insuffisantes sont détectés automatiquement via le système académique' },
              { title: 'Contenu Adaptatif IA', desc: 'Exercices et ressources ajustées à votre niveau de compétence en temps réel' },
              { title: 'Certificats Numériques Instant', desc: 'Télécharger vos certificats en PDF immédiatement après réussite' },
              { title: 'Dashboard Analytique', desc: 'Suivi détaillé avec statistiques et conseils personnalisés basés sur vos performances' },
              { title: 'Support Humain 24/7', desc: 'Accès à des mentors académiques, tutoriels vidéo et communauté d\'étudiants active' },
              { title: 'Multi-Rôles Sécurisé', desc: 'Système d\'authentification avancé pour étudiants, enseignants et administrateurs' }
            ].map((feat, i) => (
              <div
                key={i}
                style={{
                  background: 'rgba(20, 20, 50, 0.7)',
                  border: '1px solid rgba(0, 212, 255, 0.2)',
                  borderRadius: '14px',
                  padding: '2.5rem',
                  animation: `slideUp 0.6s ease-out ${i * 0.08}s both`,
                  transition: 'all 0.3s',
                  cursor: 'pointer'
                }}
                onMouseEnter={e => {
                  e.currentTarget.style.borderColor = 'rgba(0, 212, 255, 0.4)';
                  e.currentTarget.style.transform = 'translateY(-5px)';
                }}
                onMouseLeave={e => {
                  e.currentTarget.style.borderColor = 'rgba(0, 212, 255, 0.2)';
                  e.currentTarget.style.transform = 'translateY(0)';
                }}
              >
                <h4 style={{ fontSize: '1.2rem', fontWeight: '800', marginBottom: '1rem', color: '#00d4ff' }}>
                  {feat.title}
                </h4>
                <p style={{ color: '#b0b0d9', fontSize: '0.95rem', lineHeight: 1.7 }}>
                  {feat.desc}
                </p>
              </div>
            ))}
          </div>

          {/* Team Support */}
          <div style={{
            background: 'linear-gradient(135deg, rgba(0, 212, 255, 0.1), rgba(183, 0, 255, 0.1))',
            border: '2px solid rgba(0, 212, 255, 0.3)',
            borderRadius: '18px',
            padding: '4rem',
            backdropFilter: 'blur(15px)'
          }}>
            <h3 style={{ fontSize: '2rem', fontWeight: '900', marginBottom: '2rem' }}>
              👥 Notre Équipe de Support Dédiée
            </h3>
            <p style={{ fontSize: '1.1rem', color: '#b0b0d9', marginBottom: '3rem', fontWeight: '400' }}>
              Chez SISC, votre réussite est notre priorité absolue. Nous avons mis en place une équipe multidisciplinaire disponible en permanence :
            </p>
            <div style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
              gap: '2rem'
            }}>
              {supportTeam.map((member, i) => (
                <div key={i} style={{
                  background: 'rgba(0, 0, 0, 0.4)',
                  padding: '2rem',
                  borderRadius: '14px',
                  border: '1px solid rgba(0, 212, 255, 0.2)',
                  animation: `slideUp 0.6s ease-out ${i * 0.1}s both`,
                  transition: 'all 0.3s',
                  cursor: 'pointer'
                }}
                onMouseEnter={e => {
                  e.currentTarget.style.borderColor = 'rgba(0, 212, 255, 0.4)';
                  e.currentTarget.style.transform = 'translateY(-5px)';
                }}
                onMouseLeave={e => {
                  e.currentTarget.style.borderColor = 'rgba(0, 212, 255, 0.2)';
                  e.currentTarget.style.transform = 'translateY(0)';
                }}>
                  <h4 style={{ fontSize: '1.15rem', fontWeight: '800', color: '#00d4ff', marginBottom: '0.8rem' }}>
                    {member.role}
                  </h4>
                  <p style={{ color: '#b0b0d9', fontSize: '0.95rem', fontWeight: '500' }}>
                    ⏰ {member.time}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* HOW IT WORKS TAB */}
      {activeTab === 'how' && (
        <div style={{ position: 'relative', zIndex: 5, padding: '10rem 5% 4rem', maxWidth: '1200px', margin: '0 auto' }}>
          <h2 style={{ fontSize: '3.2rem', fontWeight: '900', marginBottom: '2rem', animation: 'slideUp 0.6s ease-out', letterSpacing: '-1px' }}>
            Comment SISC Fonctionne?
          </h2>
          <p style={{
            fontSize: '1.2rem',
            color: '#b0b0d9',
            marginBottom: '5rem',
            maxWidth: '900px',
            fontWeight: '400'
          }}>
            Un parcours simple, efficace et pensé pour votre réussite - De l'identification de vos lacunes jusqu'à la certification immédiate
          </p>

          {/* Step by Step */}
          <div style={{ marginBottom: '5rem' }}>
            <h3 style={{ fontSize: '1.8rem', fontWeight: '800', marginBottom: '4rem', color: '#00d4ff' }}>
              📋 Les 5 Étapes Vers Votre Certificat
            </h3>

            <div style={{
              position: 'relative',
              display: 'flex',
              flexDirection: 'column',
              gap: '3rem'
            }}>
              {certificatePath.map((path, i) => (
                <div
                  key={i}
                  style={{
                    display: 'flex',
                    gap: '3rem',
                    animation: `slideUp 0.6s ease-out ${i * 0.15}s both`,
                    alignItems: 'flex-start'
                  }}
                >
                  {/* Circle */}
                  <div style={{
                    minWidth: '120px',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center'
                  }}>
                    <div style={{
                      width: '100px',
                      height: '100px',
                      borderRadius: '50%',
                      background: 'linear-gradient(135deg, #00d4ff, #b700ff)',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      fontSize: '2.5rem',
                      boxShadow: '0 0 40px rgba(0, 212, 255, 0.4)',
                      position: 'relative',
                      fontWeight: '700'
                    }}>
                      {path.icon}
                      <div style={{
                        position: 'absolute',
                        bottom: '-15px',
                        right: '-15px',
                        background: '#ff006e',
                        width: '45px',
                        height: '45px',
                        borderRadius: '50%',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        fontWeight: '900',
                        border: '3px solid #0f0f23',
                        color: '#fff',
                        fontSize: '1.3rem'
                      }}>
                        {path.step}
                      </div>
                    </div>
                  </div>

                  {/* Content */}
                  <div style={{
                    background: 'rgba(20, 20, 50, 0.7)',
                    border: '1px solid rgba(0, 212, 255, 0.2)',
                    borderRadius: '14px',
                    padding: '2.5rem',
                    backdropFilter: 'blur(15px)',
                    flex: 1,
                    transition: 'all 0.3s'
                  }}>
                    <h4 style={{ fontSize: '1.4rem', fontWeight: '800', marginBottom: '1rem', color: '#00d4ff' }}>
                      {path.title}
                    </h4>
                    <p style={{ color: '#b0b0d9', fontSize: '1rem', lineHeight: 1.7, fontWeight: '400' }}>
                      {path.desc}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Timeline Details */}
          <div style={{
            background: 'linear-gradient(135deg, rgba(0, 212, 255, 0.1), rgba(183, 0, 255, 0.1))',
            border: '2px solid rgba(0, 212, 255, 0.3)',
            borderRadius: '18px',
            padding: '4rem',
            backdropFilter: 'blur(15px)',
            marginBottom: '5rem',
            animation: 'slideUp 1s ease-out'
          }}>
            <h3 style={{ fontSize: '1.8rem', fontWeight: '800', marginBottom: '3rem' }}>
              ⏱️ Timeline Typique d'Apprentissage
            </h3>
            <div style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))',
              gap: '2rem'
            }}>
              {[
                { period: 'Jour 1', action: 'Inscription & Accès' },
                { period: 'Semaine 1', action: 'Cours Fondamentaux' },
                { period: 'Semaine 2-3', action: 'Exercices Pratiques' },
                { period: 'Semaine 4', action: 'Examen Final' },
                { period: 'Jour 28', action: 'Certificat PDF' }
              ].map((item, i) => (
                <div key={i} style={{
                  textAlign: 'center',
                  padding: '2rem',
                  background: 'rgba(0, 0, 0, 0.4)',
                  borderRadius: '12px',
                  border: '1px solid rgba(0, 212, 255, 0.2)',
                  animation: `slideUp 0.6s ease-out ${i * 0.1}s both`,
                  transition: 'all 0.3s',
                  cursor: 'pointer'
                }}
                onMouseEnter={e => {
                  e.currentTarget.style.borderColor = 'rgba(0, 212, 255, 0.4)';
                  e.currentTarget.style.transform = 'translateY(-5px)';
                }}
                onMouseLeave={e => {
                  e.currentTarget.style.borderColor = 'rgba(0, 212, 255, 0.2)';
                  e.currentTarget.style.transform = 'translateY(0)';
                }}>
                  <div style={{ fontSize: '1.5rem', fontWeight: '900', color: '#00d4ff', marginBottom: '0.8rem' }}>
                    {item.period}
                  </div>
                  <div style={{ color: '#b0b0d9', fontSize: '0.95rem', fontWeight: '600' }}>
                    {item.action}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* How to Get Certificate */}
          <div style={{
            background: 'rgba(20, 20, 50, 0.7)',
            border: '2px solid #b700ff',
            borderRadius: '18px',
            padding: '4rem',
            backdropFilter: 'blur(15px)',
            animation: 'slideUp 1.1s ease-out'
          }}>
            <h3 style={{ fontSize: '1.8rem', fontWeight: '800', marginBottom: '2.5rem', color: '#b700ff' }}>
              🏆 Comment Obtenir Votre Certificat de Réussite?
            </h3>
            <div style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
              gap: '2rem'
            }}>
              {[
                {
                  req: '✓ Compléter 100% du Contenu',
                  desc: 'Regardez tous les cours, tutoriels vidéo et ressources disponibles dans votre parcours personnalisé'
                },
                {
                  req: '✓ Exercices: Minimum 70%',
                  desc: 'Réussissez tous les quizz et exercices pratiques avec un score cumulé d\'au moins 70%'
                },
                {
                  req: '✓ Examen Final Validé',
                  desc: 'Passez l\'examen final de synthèse avec un minimum de 70% pour valider votre apprentissage complet'
                },
                {
                  req: '✓ Téléchargement Instantané',
                  desc: 'Recevez votre certificat PDF immédiatement - zéro attente, certification valide 24h après réussite'
                }
              ].map((cert, i) => (
                <div key={i} style={{
                  background: 'rgba(0, 212, 255, 0.05)',
                  border: '1px solid rgba(0, 212, 255, 0.2)',
                  padding: '2rem',
                  borderRadius: '12px',
                  display: 'flex',
                  gap: '1.5rem',
                  animation: `slideUp 0.6s ease-out ${i * 0.1}s both`,
                  transition: 'all 0.3s',
                  cursor: 'pointer'
                }}
                onMouseEnter={e => {
                  e.currentTarget.style.borderColor = 'rgba(0, 212, 255, 0.4)';
                  e.currentTarget.style.transform = 'translateY(-5px)';
                }}
                onMouseLeave={e => {
                  e.currentTarget.style.borderColor = 'rgba(0, 212, 255, 0.2)';
                  e.currentTarget.style.transform = 'translateY(0)';
                }}>
                  <div style={{ color: '#00d4ff', fontSize: '1.8rem', fontWeight: '900', minWidth: '30px' }}></div>
                  <div>
                    <h4 style={{ fontSize: '1.05rem', fontWeight: '800', color: '#00d4ff', marginBottom: '0.6rem' }}>
                      {cert.req}
                    </h4>
                    <p style={{ color: '#b0b0d9', fontSize: '0.95rem', lineHeight: 1.6 }}>
                      {cert.desc}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* SUPPORT/CONTACT TAB - FAQ WITH 3 MORE QUESTIONS */}
      {activeTab === 'contact' && (
        <div style={{ position: 'relative', zIndex: 5, padding: '10rem 5% 4rem', maxWidth: '1200px', margin: '0 auto' }}>
          <h2 style={{ fontSize: '3.2rem', fontWeight: '900', marginBottom: '2rem', animation: 'slideUp 0.6s ease-out', letterSpacing: '-1px' }}>
            Support & Contact
          </h2>
          <p style={{
            fontSize: '1.2rem',
            color: '#b0b0d9',
            marginBottom: '5rem',
            maxWidth: '900px',
            fontWeight: '400'
          }}>
            Nous sommes là pour vous aider 24/7. Contactez-nous de la manière qui vous convient le mieux.
          </p>

          {/* Contact Methods */}
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
            gap: '2.5rem',
            marginBottom: '5rem'
          }}>
            {[
              {
                icon: '💬',
                title: 'Chat en Temps Réel',
                desc: 'Discutez avec un agent de support en direct',
                contact: 'Disponible 24/7'
              },
              {
                icon: '📧',
                title: 'Email Support',
                desc: 'Envoyez vos questions détaillées et documents',
                contact: 'support@sisc.estn.ma'
              },
              {
                icon: '📞',
                title: 'Téléphone Direct',
                desc: 'Appelez notre équipe pédagogique qualifiée',
                contact: '+212 5 36 XX XX XX'
              },
              {
                icon: '👨‍💼',
                title: 'Mentor Personnel',
                desc: 'Obtenez un accompagnement 100% individualisé',
                contact: 'Sur demande - Premium'
              }
            ].map((method, i) => (
              <div
                key={i}
                style={{
                  background: 'rgba(20, 20, 50, 0.7)',
                  border: '1px solid rgba(0, 212, 255, 0.2)',
                  borderRadius: '16px',
                  padding: '3rem',
                  backdropFilter: 'blur(15px)',
                  animation: `slideUp 0.6s ease-out ${i * 0.1}s both`,
                  transition: 'all 0.4s cubic-bezier(0.34, 1.56, 0.64, 1)',
                  cursor: 'pointer'
                }}
                onMouseEnter={e => {
                  e.currentTarget.style.borderColor = 'rgba(0, 212, 255, 0.5)';
                  e.currentTarget.style.transform = 'translateY(-12px)';
                  e.currentTarget.style.boxShadow = '0 0 50px rgba(0, 212, 255, 0.2)';
                }}
                onMouseLeave={e => {
                  e.currentTarget.style.borderColor = 'rgba(0, 212, 255, 0.2)';
                  e.currentTarget.style.transform = 'translateY(0)';
                  e.currentTarget.style.boxShadow = 'none';
                }}
              >
                <div style={{ fontSize: '3.5rem', marginBottom: '1.5rem' }}>
                  {method.icon}
                </div>
                <h3 style={{ fontSize: '1.3rem', fontWeight: '800', marginBottom: '1rem', color: '#00d4ff' }}>
                  {method.title}
                </h3>
                <p style={{ color: '#b0b0d9', marginBottom: '1.5rem', fontSize: '0.95rem', lineHeight: 1.6 }}>
                  {method.desc}
                </p>
                <div style={{ color: '#00ff88', fontWeight: '700', fontSize: '1rem' }}>
                  {method.contact}
                </div>
              </div>
            ))}
          </div>

          {/* FAQ - NOW WITH 7 QUESTIONS TOTAL */}
          <div style={{
            background: 'rgba(20, 20, 50, 0.7)',
            border: '2px solid rgba(0, 212, 255, 0.3)',
            borderRadius: '18px',
            padding: '4rem',
            backdropFilter: 'blur(15px)',
            marginBottom: '4rem',
            animation: 'slideUp 0.8s ease-out'
          }}>
            <h3 style={{ fontSize: '1.8rem', fontWeight: '800', marginBottom: '3rem', color: '#00d4ff' }}>
              ❓ Questions Fréquemment Posées
            </h3>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
              {faqs.map((faq, i) => (
                <div
                  key={i}
                  style={{
                    background: 'rgba(0, 212, 255, 0.05)',
                    border: '1px solid rgba(0, 212, 255, 0.15)',
                    borderRadius: '12px',
                    overflow: 'hidden',
                    animation: `slideUp 0.6s ease-out ${i * 0.1}s both`
                  }}
                >
                  <button
                    onClick={() => setExpandedFaq(expandedFaq === i ? null : i)}
                    style={{
                      width: '100%',
                      padding: '2rem',
                      background: 'transparent',
                      border: 'none',
                      color: '#fff',
                      fontSize: '1.05rem',
                      fontWeight: '700',
                      cursor: 'pointer',
                      display: 'flex',
                      justifyContent: 'space-between',
                      alignItems: 'center',
                      transition: 'all 0.3s',
                      textAlign: 'left'
                    }}
                    onMouseEnter={e => e.currentTarget.style.background = 'rgba(0, 212, 255, 0.1)'}
                    onMouseLeave={e => e.currentTarget.style.background = 'transparent'}
                  >
                    <span>{faq.q}</span>
                    <span style={{
                      color: '#00d4ff',
                      transition: 'transform 0.3s',
                      transform: expandedFaq === i ? 'rotate(180deg)' : 'rotate(0deg)',
                      fontSize: '1.2rem'
                    }}>
                      ▼
                    </span>
                  </button>

                  {expandedFaq === i && (
                    <div style={{
                      padding: '0 2rem 2rem',
                      color: '#b0b0d9',
                      fontSize: '1rem',
                      lineHeight: 1.8,
                      borderTop: '1px solid rgba(0, 212, 255, 0.15)',
                      animation: 'slideDown 0.3s ease-out',
                      fontWeight: '400'
                    }}>
                      {faq.a}
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>

          {/* CTA */}
          <div style={{
            background: 'linear-gradient(135deg, rgba(0, 212, 255, 0.15), rgba(183, 0, 255, 0.15))',
            border: '2px solid rgba(0, 212, 255, 0.3)',
            borderRadius: '18px',
            padding: '4rem',
            textAlign: 'center',
            animation: 'slideUp 0.9s ease-out'
          }}>
            <h3 style={{ fontSize: '1.8rem', fontWeight: '900', marginBottom: '1.5rem' }}>
              🚀 Besoin d'aide immédiatement?
            </h3>
            <p style={{ color: '#b0b0d9', marginBottom: '2.5rem', fontSize: '1.1rem', fontWeight: '400' }}>
              Notre équipe de support est disponible maintenant pour répondre à vos questions et vous aider à démarrer
            </p>
            <button style={{
              padding: '1.3rem 3.5rem',
              background: 'linear-gradient(135deg, #00d4ff, #b700ff)',
              border: 'none',
              borderRadius: '14px',
              color: '#000',
              fontSize: '1.05rem',
              fontWeight: '700',
              cursor: 'pointer',
              transition: 'all 0.3s',
              boxShadow: '0 0 40px rgba(0, 212, 255, 0.5)',
              letterSpacing: '0.5px'
            }} onMouseEnter={e => {
              e.target.style.transform = 'translateY(-4px)';
              e.target.style.boxShadow = '0 10px 50px rgba(0, 212, 255, 0.7)';
            }} onMouseLeave={e => {
              e.target.style.transform = 'translateY(0)';
              e.target.style.boxShadow = '0 0 40px rgba(0, 212, 255, 0.5)';
            }}>
              Contacter Support Maintenant
            </button>
          </div>
        </div>
      )}

      {/* Footer */}
      <footer style={{
        position: 'relative',
        zIndex: 5,
        borderTop: '1px solid rgba(0, 212, 255, 0.2)',
        padding: '4rem 5%',
        marginTop: '6rem'
      }}>
        <div style={{
          maxWidth: '1400px',
          margin: '0 auto',
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
          gap: '3rem',
          marginBottom: '3rem'
        }}>
          <div>
            <h4 style={{ fontSize: '1.3rem', fontWeight: '800', marginBottom: '1.5rem', color: '#00d4ff' }}>
              SISC
            </h4>
            <p style={{ color: '#b0b0d9', fontSize: '0.95rem', lineHeight: 1.7 }}>
              Système Intégré de Soutien et Certification pour les étudiants d'EST Nador
            </p>
          </div>
          <div>
            <h4 style={{ fontSize: '1.1rem', fontWeight: '700', marginBottom: '1.5rem', color: '#00d4ff' }}>
              Navigation
            </h4>
            <ul style={{ listStyle: 'none', color: '#b0b0d9', fontSize: '0.95rem' }}>
              <li style={{ marginBottom: '0.8rem' }}><a href="#" style={{ color: '#b0b0d9', textDecoration: 'none', transition: 'color 0.3s' }} onMouseEnter={e => e.target.style.color = '#00d4ff'} onMouseLeave={e => e.target.style.color = '#b0b0d9'}>Accueil</a></li>
              <li style={{ marginBottom: '0.8rem' }}><a href="#" style={{ color: '#b0b0d9', textDecoration: 'none', transition: 'color 0.3s' }} onMouseEnter={e => e.target.style.color = '#00d4ff'} onMouseLeave={e => e.target.style.color = '#b0b0d9'}>Filières</a></li>
              <li><a href="#" style={{ color: '#b0b0d9', textDecoration: 'none', transition: 'color 0.3s' }} onMouseEnter={e => e.target.style.color = '#00d4ff'} onMouseLeave={e => e.target.style.color = '#b0b0d9'}>Support</a></li>
            </ul>
          </div>
          <div>
            <h4 style={{ fontSize: '1.1rem', fontWeight: '700', marginBottom: '1.5rem', color: '#00d4ff' }}>
              Contact
            </h4>
            <p style={{ color: '#b0b0d9', fontSize: '0.95rem', marginBottom: '0.8rem' }}>
              📧 support@sisc.estn.ma
            </p>
            <p style={{ color: '#b0b0d9', fontSize: '0.95rem' }}>
              📞 +212 5 36 XX XX XX
            </p>
          </div>
        </div>

        <div style={{
          borderTop: '1px solid rgba(0, 212, 255, 0.15)',
          paddingTop: '2rem',
          textAlign: 'center',
          color: '#b0b0d9',
          fontSize: '0.9rem'
        }}>
          <p style={{ marginBottom: '0.5rem' }}>
            © 2025 SISC - Système Intégré de Soutien et Certification | EST Nador - Université Mohammed Premier
          </p>
          <p style={{ fontSize: '0.85rem', color: '#9090a8' }}>
            Transforming Academic Excellence Through Intelligent Technology
          </p>
        </div>
      </footer>
    </div>
  );
}
