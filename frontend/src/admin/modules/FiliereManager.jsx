import React, { useEffect, useMemo, useState } from 'react';
import './style.css';
import { useNavigate } from 'react-router-dom';

const API_BASE = 'http://127.0.0.1:8000/api/admin'; // change if needed

const emptySemesters = () => ({ S1: [], S2: [], S3: [], S4: [] });

// Convert backend -> frontend filiere shape
function apiToUiFiliere(f) {
  const semesters = emptySemesters();

  (f.modules || []).forEach((m) => {
    const s = m.semestre;
    if (!semesters[s]) return;
    // store as object so we can update/delete later
    semesters[s].push({ id: m.id, nom: m.nom });
  });

  // sort each semester by name
  Object.keys(semesters).forEach((s) => {
    semesters[s].sort((a, b) => a.nom.localeCompare(b.nom));
  });

  return {
    id: f.id,
    nom: f.nom,
    semesters, // {S1:[{id,nom}],...}
    description: f.description,
  };
}

// Convert frontend -> backend POST payload
function uiToApiCreatePayload(formData) {
  return {
    nom: formData.nom,
    description: formData.description.trim() ,
    semestres: ['S1', 'S2', 'S3', 'S4']
      .map((s) => ({
        nom: s,
        modules: (formData.semesters[s] || []).map((m) => ({
          nom: typeof m === 'string' ? m : m.nom,
        })),
      }))
      // keep only semesters that have modules
      .filter((x) => x.modules.length > 0),
  };
}

export default function FiliereManager() {
  const navigate = useNavigate();

  // --- STATE ---
  const [filieres, setFilieres] = useState([]);
  const [loadingList, setLoadingList] = useState(false);

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [currentStep, setCurrentStep] = useState(1);
  const [editingId, setEditingId] = useState(null);

  const [saving, setSaving] = useState(false);

  const [formData, setFormData] = useState({
    nom: '',
    description: '',
    semesters: emptySemesters(),
  });

  const [moduleInputs, setModuleInputs] = useState({ S1: '', S2: '', S3: '', S4: '' });

  // ---------- API helpers ----------
  const fetchFilieres = async () => {
    setLoadingList(true);
    try {
      const res = await fetch(`${API_BASE}/filieres`);
      if (!res.ok) throw new Error('Failed to load filieres');
      const data = await res.json();
      setFilieres(data.map(apiToUiFiliere));
    } finally {
      setLoadingList(false);
    }
  };

  const apiCreateFiliere = async (payload) => {
    const res = await fetch(`${API_BASE}/filieres`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload),
    });
    const data = await res.json();
    if (!res.ok) throw data;
    return apiToUiFiliere(data);
  };

  const apiUpdateFiliere = async (id, payload) => {
    const res = await fetch(`${API_BASE}/filieres/${id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload),
    });
    const data = await res.json();
    if (!res.ok) throw data;
    return data;
  };

  const apiDeleteFiliere = async (id) => {
    const res = await fetch(`${API_BASE}/filieres/${id}`, { method: 'DELETE' });
    const data = await res.json().catch(() => ({}));
    if (!res.ok) throw data;
    return data;
  };

  const apiCreateModule = async ({ filiere_id, nom, semestre }) => {
    const res = await fetch(`${API_BASE}/modules`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ filiere_id, nom, semestre }),
    });
    const data = await res.json();
    if (!res.ok) throw data;
    return data;
  };

  const apiDeleteModule = async (moduleId) => {
    const res = await fetch(`${API_BASE}/modules/${moduleId}`, { method: 'DELETE' });
    const data = await res.json().catch(() => ({}));
    if (!res.ok) throw data;
    return data;
  };

  // Load from backend
  useEffect(() => {
    fetchFilieres();
  }, []);

  // --- HELPERS ---
  const countModules = (semesters) => Object.values(semesters).flat().length;

  // chart uses numbers only
  const chartData = useMemo(() => {
    const maxModules = Math.max(...filieres.map((f) => countModules(f.semesters)), 1);
    return filieres.map((f) => {
      const total = countModules(f.semesters);
      const heightPercent = Math.max((total / maxModules) * 100, 10);
      return { ...f, total, heightPercent };
    });
  }, [filieres]);

  // --- HANDLERS ---

  const handleOpenCreate = () => {
    setEditingId(null);
    setCurrentStep(1);
    setFormData({ nom: '', description: '', semesters: emptySemesters() });
    setModuleInputs({ S1: '', S2: '', S3: '', S4: '' });
    setIsModalOpen(true);
  };

  const handleOpenEdit = (filiere) => {
    setEditingId(filiere.id);
    setCurrentStep(1);

    // Convert semesters objects -> UI wants strings in tags input
    const semestersStrings = emptySemesters();
    ['S1', 'S2', 'S3', 'S4'].forEach((s) => {
      semestersStrings[s] = (filiere.semesters[s] || []).map((m) => m.nom);
    });

    setFormData({
      nom: filiere.nom,
      description: filiere.description, // if you store it, load it from backend show endpoint
      semesters: semestersStrings,
    });

    setModuleInputs({ S1: '', S2: '', S3: '', S4: '' });
    setIsModalOpen(true);
  };

  const handleDelete = async (id) => {
    if (!window.confirm('Supprimer cette filière ?')) return;
    try {
      await apiDeleteFiliere(id);
      setFilieres((prev) => prev.filter((f) => f.id !== id));
    } catch {
      alert('Erreur suppression filière');
    }
  };

  // --- STEP 1: NAME VALIDATION (Only Characters) ---
  const handleNameChange = (e) => {
    const val = e.target.value;
    const regex = /^[a-zA-Z\u00C0-\u00FF\s]*$/;
    if (regex.test(val)) setFormData({ ...formData, nom: val });
  };
  const handleDescriptionChange = (e) => {
    const val = e.target.value;
    const regex = /^[a-zA-Z' \u00C0-\u00FF\s]*$/;
    if (regex.test(val)) setFormData({ ...formData, description: val });
  };

  const handleNextStep = () => {
    if (!formData.nom.trim()) {
      alert('Veuillez entrer le nom de la formation.');
      return;
    }
    if (!formData.description.trim()) return alert('Veuillez entrer la description.');

    const isDuplicate = filieres.some(
      (f) => f.nom.toLowerCase().trim() === formData.nom.toLowerCase().trim() && f.id !== editingId
    );
    if (isDuplicate) {
      alert(`⚠️ Une filière avec le nom "${formData.nom}" existe déjà.`);
      return;
    }

    setCurrentStep(2);
  };

  const handlePrevStep = () => setCurrentStep(1);

  // --- STEP 2: MODULE INPUT ---
  const handleModuleInputChange = (e, sem) => {
    const val = e.target.value;
    const regex = /^[a-zA-Z0-9\u00C0-\u00FF\s]*$/;
    if (regex.test(val)) setModuleInputs((prev) => ({ ...prev, [sem]: val }));
  };

  const handleKeyDown = (e, sem) => {
    if (e.key !== 'Enter') return;
    e.preventDefault();

    if (formData.semesters[sem].length >= 7) {
      alert(`Maximum 7 modules atteints pour ${sem}.`);
      return;
    }

    const val = moduleInputs[sem].trim();
    if (!val) return;

    if (formData.semesters[sem].includes(val)) {
      alert('Ce module existe déjà dans ce semestre.');
      return;
    }

    setFormData((prev) => ({
      ...prev,
      semesters: { ...prev.semesters, [sem]: [...prev.semesters[sem], val] },
    }));
    setModuleInputs((prev) => ({ ...prev, [sem]: '' }));
  };

  const removeTag = (sem, index) => {
    setFormData((prev) => ({
      ...prev,
      semesters: { ...prev.semesters, [sem]: prev.semesters[sem].filter((_, i) => i !== index) },
    }));
  };

  // Save (create or update) - CONNECTED TO BACKEND
  const handleSave = async () => {
    // local validation (min 4, max 7)
    const errors = [];
    ['S1', 'S2', 'S3', 'S4'].forEach((sem) => {
      const count = formData.semesters[sem].length;
      if (count < 4) errors.push(`${sem} : ${count} modules (Minimum 4 requis)`);
      if (count > 7) errors.push(`${sem} : ${count} modules (Maximum 7)`);
    });
    if (errors.length > 0) {
      alert('⚠️ Validation impossible :\n\n' + errors.join('\n'));
      return;
    }

    // duplicate check
    const isDuplicate = filieres.some(
      (f) => f.nom.toLowerCase().trim() === formData.nom.toLowerCase().trim() && f.id !== editingId
    );
    if (isDuplicate) {
      alert(`⚠️ Une filière avec le nom "${formData.nom}" existe déjà.`);
      return;
    }

    setSaving(true);
    try {
      if (!editingId) {
        // CREATE: one POST /filieres (backend creates modules)
        const payload = uiToApiCreatePayload(formData);
        const created = await apiCreateFiliere(payload);
        setFilieres((prev) => [...prev, created]);
        setIsModalOpen(false);
      } else {
        // EDIT: update filiere name + sync modules
        // 1) update filiere info
        await apiUpdateFiliere(editingId, { nom: formData.nom, description: formData.description || null });

        // 2) sync modules by diff
        const current = filieres.find((f) => f.id === editingId);
        if (!current) throw new Error('Filiere not found in state');

        // current modules from backend
        const currentModules = [];
        ['S1', 'S2', 'S3', 'S4'].forEach((s) => {
          (current.semesters[s] || []).forEach((m) => currentModules.push({ ...m, semestre: s }));
        });

        // desired modules from form (strings)
        const desiredModules = [];
        ['S1', 'S2', 'S3', 'S4'].forEach((s) => {
          (formData.semesters[s] || []).forEach((name) => desiredModules.push({ nom: name, semestre: s }));
        });

        // Determine deletions: items that exist currently but not in desired (by name+semestre)
        const toDelete = currentModules.filter((cm) => {
          return !desiredModules.some((dm) => dm.semestre === cm.semestre && dm.nom.trim() === cm.nom.trim());
        });

        // Determine creations: items that are desired but not currently present
        const toCreate = desiredModules.filter((dm) => {
          return !currentModules.some((cm) => cm.semestre === dm.semestre && cm.nom.trim() === dm.nom.trim());
        });

        // perform API calls
        await Promise.all(toDelete.map((m) => apiDeleteModule(m.id)));
        await Promise.all(
          toCreate.map((m) => apiCreateModule({ filiere_id: editingId, nom: m.nom, semestre: m.semestre }))
        );

        // reload list from backend for clean state
        await fetchFilieres();
        setIsModalOpen(false);
      }
    } catch (e) {
      console.error(e);
      alert('Erreur: vérifiez les APIs / CORS / validations Laravel.');
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className="app-container">
      {/* Header */}
      <div className="top-header">
        <div className="logo">
          <span>⚡</span> SISC Admin
        </div>
        <div className="header-actions">
          <button className="btn-secondary" onClick={() => navigate('/admin/dashboard')}>
            Retour Dashboard
          </button>
          <button className="btn-pro" onClick={handleOpenCreate}>
            Nouvelle Filière
          </button>
        </div>
      </div>

      {/* Chart */}
      <div className="chart-section">
        <h3 className="chart-title">Aperçu de la charge des modules par filière</h3>
        <div className="bar-chart">
          {chartData.map((data) => (
            <div key={data.id} className="chart-column">
              <div className="bar" style={{ height: `${data.heightPercent}%` }} data-value={`${data.total} Modules`} />
              <div className="bar-label">{data.nom}</div>
            </div>
          ))}
          {chartData.length === 0 && (
            <p style={{ width: '100%', textAlign: 'center', color: '#666' }}>
              {loadingList ? 'Chargement...' : 'Aucune donnée à afficher'}
            </p>
          )}
        </div>
      </div>

      {/* Stats */}
      <div className="stats-grid">
        <div className="stat-card">
          <div className="stat-icon">🎓</div>
          <div className="stat-info">
            <h3>{filieres.length}</h3>
            <p>Filières Actives</p>
          </div>
        </div>
        <div className="stat-card">
          <div className="stat-icon">📚</div>
          <div className="stat-info">
            <h3>{filieres.reduce((acc, f) => acc + countModules(f.semesters), 0)}</h3>
            <p>Modules Totaux</p>
          </div>
        </div>
      </div>

      {/* Filiere Grid */}
      <div className="filiere-grid">
        {filieres.map((filiere) => (
          <div key={filiere.id} className="filiere-card">
            <div className="card-header">
              <h3>{filiere.nom}</h3>
              <span className="badge-count">{countModules(filiere.semesters)} Mods</span>
            </div>

            <div className="sem-timeline">
              {['S1', 'S2', 'S3', 'S4'].map((sem) => {
                const count = (filiere.semesters[sem] || []).length;
                return (
                  <div key={sem} className={`sem-pill ${count > 0 ? 'active' : ''}`}>
                    {sem} ({count})
                  </div>
                );
              })}
            </div>

            <div style={{ marginTop: '1.5rem', display: 'flex', gap: '10px', justifyContent: 'flex-end' }}>
              <button className="btn-icon" onClick={() => handleOpenEdit(filiere)} title="Modifier" disabled={saving}>
                ✏️
              </button>
              <button className="btn-icon danger" onClick={() => handleDelete(filiere.id)} title="Supprimer" disabled={saving}>
                X
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Modal */}
      {isModalOpen && (
        <div className="modal-overlay">
          <div className="modal-content">
            <div className="modal-header">
              <div style={{ display: 'flex', alignItems: 'center', gap: '15px' }}>
                <h2 style={{ margin: 0, color: 'white' }}>{editingId ? 'Modifier' : 'Créer'} une Filière</h2>
                <div className="step-indicator">
                  <div className={`step-dot ${currentStep >= 1 ? 'active' : ''}`}></div>
                  <div className={`step-dot ${currentStep >= 2 ? 'active' : ''}`}></div>
                </div>
              </div>
              <button
                onClick={() => setIsModalOpen(false)}
                style={{ background: 'none', border: 'none', color: 'white', fontSize: '1.5rem', cursor: 'pointer' }}
                disabled={saving}
              >
                ✕
              </button>
            </div>

            <div className="modal-body">
              {/* Step 1 */}
              {currentStep === 1 && (
                <div className="fade-in">
                  <div className="form-group">
                    <label>Nom de la formation</label>
                    <input
                      className="form-input"
                      placeholder="Ex: Génie Logiciel "
                      value={formData.nom}
                      onChange={handleNameChange}
                      autoFocus
                      disabled={saving}
                    />
                    <p style={{ color: '#64748b', fontSize: '0.85rem', marginTop: '8px' }}>
                      * Le nom ne doit contenir que des lettres et des espaces.
                    </p>
                  </div>
                  <div className="form-group">
                    <label>Description de la formation</label>
                    <textarea
                      className="form-input"
                      placeholder="ecrire un description ..."
                      value={formData.description}
                      onChange={handleDescriptionChange}
                      required
                      rows="4"
                      disabled={saving}
                    />
                    <p style={{ color: '#64748b', fontSize: '0.85rem', marginTop: '8px' }}>
                      * La description ne doit contenir que des lettres et des espaces.
                    </p>
                  </div>

                  <div style={{ display: 'flex', justifyContent: 'flex-end', marginTop: '3rem' }}>
                    <button className="btn-pro" style={{ background: '#8b5cf6', color: 'white' }} onClick={handleNextStep} disabled={saving}>
                      Suivant 
                    </button>
                  </div>
                </div>
              )}

              {/* Step 2 */}
              {currentStep === 2 && (
                <div className="fade-in">
                  <div className="form-group">
                    <label style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '1.5rem' }}>
                      <span>Configuration des Semestres</span>
                      <span
                        style={{
                          fontSize: '0.85rem',
                          color: '#94a3b8',
                          background: 'rgba(255,255,255,0.05)',
                          padding: '4px 10px',
                          borderRadius: '6px',
                        }}
                      >
                        ⚠️ Min: 4 / Max: 7 par semestre
                      </span>
                    </label>

                    <div className="semester-grid-input">
                      {['S1', 'S2', 'S3', 'S4'].map((sem) => {
                        const currentCount = formData.semesters[sem].length;
                        const isCountValid = currentCount >= 4 && currentCount <= 7;
                        const countColor = isCountValid ? '#4ade80' : '#ef4444';

                        return (
                          <div key={sem} className="sem-input-card">
                            <div className="sem-header">
                              <span>{sem}</span>
                              <span
                                style={{
                                  fontSize: '0.85rem',
                                  color: countColor,
                                  fontWeight: '700',
                                  background: isCountValid ? 'rgba(74, 222, 128, 0.1)' : 'rgba(239, 68, 68, 0.1)',
                                  padding: '2px 8px',
                                  borderRadius: '4px',
                                }}
                              >
                                {currentCount} / 7
                              </span>
                            </div>

                            <div className="module-tags">
                              {formData.semesters[sem].map((mod, idx) => (
                                <div key={idx} className="tag">
                                  {mod}
                                  <span className="tag-remove" onClick={() => removeTag(sem, idx)}>
                                    ×
                                  </span>
                                </div>
                              ))}
                            </div>

                            <input
                              className="mini-input"
                              placeholder={currentCount >= 7 ? 'Max atteint' : '+ Ajouter module...'}
                              value={moduleInputs[sem]}
                              disabled={saving || currentCount >= 7}
                              onChange={(e) => handleModuleInputChange(e, sem)}
                              onKeyDown={(e) => handleKeyDown(e, sem)}
                              style={{
                                cursor: currentCount >= 7 ? 'not-allowed' : 'text',
                                opacity: currentCount >= 7 ? 0.5 : 1,
                              }}
                            />
                          </div>
                        );
                      })}
                    </div>
                  </div>

                  <div style={{ marginTop: '2rem', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <button className="btn-secondary" onClick={handlePrevStep} disabled={saving}>
                       Retour
                    </button>
                    <button className="btn-pro" style={{ background: '#8b5cf6', color: 'white' }} onClick={handleSave} disabled={saving}>
                      {saving ? 'Enregistrement...' : editingId ? 'Enregistrer ✅' : 'Terminer ✅'}
                    </button>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
