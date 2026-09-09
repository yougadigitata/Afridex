import { Hono } from 'hono'
import { serveStatic } from 'hono/cloudflare-pages'

const app = new Hono()

// Serve static assets
app.use('/static/*', serveStatic())

// API endpoint for contact form
app.post('/api/contact', async (c) => {
  try {
    const body = await c.req.json()
    const { nom, email, telephone, message } = body
    if (!nom || !email || !message) {
      return c.json({ success: false, error: 'Champs obligatoires manquants.' }, 400)
    }
    // For now, just acknowledge receipt
    return c.json({ success: true, message: 'Votre message a bien été envoyé. Nous vous recontacterons dans les plus brefs délais.' })
  } catch (e) {
    return c.json({ success: false, error: 'Erreur lors du traitement de votre message.' }, 500)
  }
})

// Main page - SPA
app.get('*', (c) => {
  const html = getFullPage()
  return c.html(html)
})

function getFullPage(): string {
  return `<!DOCTYPE html>
<html lang="fr">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>AFRIDEX – Afrique Expertise | Cabinet d'Expertise au Burkina Faso</title>
  <meta name="description" content="AFRIDEX (Afrique Expertise) est un cabinet d'expertise burkinabè spécialisé en études, consulting, formation, communication et accompagnement au Burkina Faso et en Afrique.">
  <meta name="keywords" content="AFRIDEX, expertise, consulting, Burkina Faso, Ouagadougou, études, formation, Afrique, développement">
  <meta name="author" content="AFRIDEX">
  <meta property="og:title" content="AFRIDEX – Afrique Expertise">
  <meta property="og:description" content="Cabinet d'expertise au Burkina Faso. Études, consulting, formation et accompagnement.">
  <meta property="og:type" content="website">
  <meta property="og:url" content="https://afridex.pages.dev">
  <link rel="icon" type="image/png" href="/static/images/logo-afridex.png">
  <link href="https://cdn.jsdelivr.net/npm/@fortawesome/fontawesome-free@6.5.0/css/all.min.css" rel="stylesheet">
  <link href="https://fonts.googleapis.com/css2?family=Playfair+Display:wght@400;600;700;800&family=Inter:wght@300;400;500;600;700&display=swap" rel="stylesheet">
  <link href="/static/style.css" rel="stylesheet">
</head>
<body>

  <!-- HEADER / NAVIGATION -->
  <header id="header">
    <nav class="navbar">
      <div class="nav-container">
        <a href="#accueil" class="nav-logo">
          <img src="/static/images/logo-afridex.png" alt="Logo AFRIDEX" class="logo-img">
          <span class="logo-text">Afride<span class="logo-x">X</span></span>
        </a>
        <button class="nav-toggle" id="navToggle" aria-label="Menu">
          <span></span><span></span><span></span>
        </button>
        <ul class="nav-menu" id="navMenu">
          <li><a href="#accueil" class="nav-link active" data-section="accueil">Accueil</a></li>
          <li><a href="#a-propos" class="nav-link" data-section="a-propos">À propos</a></li>
          <li><a href="#services" class="nav-link" data-section="services">Services</a></li>
          <li><a href="#realisations" class="nav-link" data-section="realisations">Réalisations</a></li>
          <li><a href="#contact" class="nav-link" data-section="contact">Contact</a></li>
          <li><a href="#contact" class="nav-btn-cta">Demander un devis</a></li>
        </ul>
      </div>
    </nav>
  </header>

  <!-- HERO / ACCUEIL -->
  <section id="accueil" class="hero-section">
    <div class="hero-overlay"></div>
    <div class="hero-particles" id="heroParticles"></div>
    <div class="hero-content">
      <div class="hero-badge">
        <i class="fas fa-globe-africa"></i>
        Cabinet d'Expertise Africain
      </div>
      <h1 class="hero-title">
        L'expertise au service du <span class="text-gradient">développement</span> en Afrique
      </h1>
      <p class="hero-subtitle">
        AFRIDEX (Afrique Expertise) accompagne les organisations, institutions et entreprises 
        dans leurs projets de développement au Burkina Faso, dans la sous-région et à l'international.
      </p>
      <div class="hero-actions">
        <a href="#services" class="btn btn-primary btn-lg">
          <i class="fas fa-arrow-right"></i> Découvrir nos services
        </a>
        <a href="#contact" class="btn btn-outline btn-lg">
          <i class="fas fa-envelope"></i> Nous contacter
        </a>
      </div>
      <div class="hero-stats">
        <div class="stat-item">
          <div class="stat-number" data-count="10">10+</div>
          <div class="stat-label">Années d'expérience</div>
        </div>
        <div class="stat-item">
          <div class="stat-number" data-count="150">150+</div>
          <div class="stat-label">Projets réalisés</div>
        </div>
        <div class="stat-item">
          <div class="stat-number" data-count="6">6</div>
          <div class="stat-label">Domaines d'expertise</div>
        </div>
        <div class="stat-item">
          <div class="stat-number" data-count="12">12+</div>
          <div class="stat-label">Pays couverts</div>
        </div>
      </div>
    </div>
    <div class="hero-scroll">
      <a href="#a-propos" aria-label="Défiler vers le bas">
        <div class="scroll-indicator">
          <div class="scroll-dot"></div>
        </div>
      </a>
    </div>
  </section>

  <!-- DOMAINES CLÉS (bandeau) -->
  <section class="domains-bar">
    <div class="container">
      <div class="domains-grid">
        <div class="domain-chip"><i class="fas fa-chart-line"></i> Études &amp; Consulting</div>
        <div class="domain-chip"><i class="fas fa-graduation-cap"></i> Formation</div>
        <div class="domain-chip"><i class="fas fa-bullhorn"></i> Communication</div>
        <div class="domain-chip"><i class="fas fa-handshake"></i> Accompagnement</div>
        <div class="domain-chip"><i class="fas fa-exchange-alt"></i> Intermédiation</div>
        <div class="domain-chip"><i class="fas fa-plane"></i> Excursions</div>
      </div>
    </div>
  </section>

  <!-- À PROPOS -->
  <section id="a-propos" class="section section-about">
    <div class="container">
      <div class="section-header">
        <span class="section-tag">Qui sommes-nous</span>
        <h2 class="section-title">Un cabinet d'expertise au cœur de l'Afrique</h2>
        <p class="section-subtitle">
          Fort de plusieurs années d'expérience, AFRIDEX s'est imposé comme un acteur de référence 
          dans le conseil et l'accompagnement au développement en Afrique de l'Ouest.
        </p>
      </div>

      <div class="about-grid">
        <div class="about-card about-mission">
          <div class="about-icon"><i class="fas fa-bullseye"></i></div>
          <h3>Notre mission</h3>
          <p>
            Apporter une expertise de qualité aux organisations, institutions publiques, ONG 
            et entreprises privées engagées dans des dynamiques de développement. Nous mettons 
            notre savoir-faire au service de l'Afrique pour un impact durable et mesurable.
          </p>
        </div>

        <div class="about-card about-vision">
          <div class="about-icon"><i class="fas fa-eye"></i></div>
          <h3>Notre vision</h3>
          <p>
            Être le cabinet d'expertise de référence en Afrique de l'Ouest, reconnu pour la qualité 
            de ses interventions, son intégrité et sa capacité à transformer les défis du développement 
            en opportunités concrètes pour les communautés.
          </p>
        </div>

        <div class="about-card about-values">
          <div class="about-icon"><i class="fas fa-gem"></i></div>
          <h3>Nos valeurs</h3>
          <ul class="values-list">
            <li><i class="fas fa-check-circle"></i> Excellence et rigueur professionnelle</li>
            <li><i class="fas fa-check-circle"></i> Intégrité et transparence</li>
            <li><i class="fas fa-check-circle"></i> Innovation et adaptabilité</li>
            <li><i class="fas fa-check-circle"></i> Ancrage africain et vision internationale</li>
            <li><i class="fas fa-check-circle"></i> Engagement pour le développement durable</li>
          </ul>
        </div>
      </div>

      <div class="about-presence">
        <div class="presence-content">
          <h3><i class="fas fa-map-marked-alt"></i> Notre présence</h3>
          <p>
            Basé à <strong>Ouagadougou</strong> (quartier 14 Yaar), AFRIDEX intervient sur l'ensemble 
            du <strong>Burkina Faso</strong>, dans la <strong>sous-région ouest-africaine</strong> 
            (Mali, Niger, Côte d'Ivoire, Sénégal, Togo, Bénin…) et à <strong>l'international</strong>.
          </p>
          <div class="presence-tags">
            <span class="tag"><i class="fas fa-map-pin"></i> Burkina Faso</span>
            <span class="tag"><i class="fas fa-globe-africa"></i> Afrique de l'Ouest</span>
            <span class="tag"><i class="fas fa-globe"></i> International</span>
          </div>
        </div>
      </div>
    </div>
  </section>

  <!-- SERVICES -->
  <section id="services" class="section section-services">
    <div class="container">
      <div class="section-header">
        <span class="section-tag">Nos expertises</span>
        <h2 class="section-title">Six domaines d'intervention stratégiques</h2>
        <p class="section-subtitle">
          AFRIDEX offre un éventail complet de services couvrant les besoins essentiels 
          des organisations engagées dans le développement.
        </p>
      </div>

      <div class="services-grid">
        <div class="service-card" data-aos="fade-up">
          <div class="service-icon-wrap">
            <i class="fas fa-chart-bar"></i>
          </div>
          <h3>Études &amp; Consulting</h3>
          <p>
            Études diagnostiques, études d'impact environnemental et social, études prospectives, 
            audits institutionnels et organisationnels. Nous fournissons des analyses rigoureuses 
            pour éclairer la prise de décision.
          </p>
          <ul class="service-tags">
            <li>Études diagnostiques</li>
            <li>Études d'impact</li>
            <li>Études prospectives</li>
            <li>Audits institutionnels</li>
          </ul>
        </div>

        <div class="service-card" data-aos="fade-up">
          <div class="service-icon-wrap">
            <i class="fas fa-chalkboard-teacher"></i>
          </div>
          <h3>Formation &amp; Renforcement des capacités</h3>
          <p>
            Conception et animation de programmes de formation sur mesure, ateliers de renforcement 
            des compétences, coaching organisationnel. Nous accompagnons le développement du capital 
            humain de nos partenaires.
          </p>
          <ul class="service-tags">
            <li>Formations sur mesure</li>
            <li>Ateliers pratiques</li>
            <li>Coaching</li>
            <li>Transfert de compétences</li>
          </ul>
        </div>

        <div class="service-card" data-aos="fade-up">
          <div class="service-icon-wrap">
            <i class="fas fa-bullhorn"></i>
          </div>
          <h3>Communication &amp; Marketing social</h3>
          <p>
            Stratégies de communication pour le changement de comportement, campagnes de sensibilisation, 
            marketing social, production de supports de communication. Nous mobilisons les communautés 
            autour des enjeux de développement.
          </p>
          <ul class="service-tags">
            <li>Changement de comportement</li>
            <li>Sensibilisation</li>
            <li>Marketing social</li>
            <li>Supports de communication</li>
          </ul>
        </div>

        <div class="service-card" data-aos="fade-up">
          <div class="service-icon-wrap">
            <i class="fas fa-hands-helping"></i>
          </div>
          <h3>Appuis, Conseils &amp; Accompagnement</h3>
          <p>
            Assistance technique et conseil stratégique aux organisations, montage et gestion de projets, 
            appui institutionnel et accompagnement à la mise en œuvre de politiques de développement.
          </p>
          <ul class="service-tags">
            <li>Assistance technique</li>
            <li>Conseil stratégique</li>
            <li>Montage de projets</li>
            <li>Appui institutionnel</li>
          </ul>
        </div>

        <div class="service-card" data-aos="fade-up">
          <div class="service-icon-wrap">
            <i class="fas fa-handshake"></i>
          </div>
          <h3>Intermédiation commerciale &amp; financière</h3>
          <p>
            Facilitation des partenariats commerciaux et financiers, mise en relation d'acteurs 
            économiques, accompagnement dans la recherche de financements et la structuration 
            de montages financiers.
          </p>
          <ul class="service-tags">
            <li>Partenariats commerciaux</li>
            <li>Recherche de financements</li>
            <li>Mise en relation</li>
            <li>Montages financiers</li>
          </ul>
        </div>

        <div class="service-card" data-aos="fade-up">
          <div class="service-icon-wrap">
            <i class="fas fa-route"></i>
          </div>
          <h3>Excursions &amp; Immersions</h3>
          <p>
            Organisation de voyages d'études, visites de terrain et immersions sur des problématiques 
            de développement. Échanges d'expériences entre acteurs, découverte de réalisations exemplaires 
            et bonnes pratiques.
          </p>
          <ul class="service-tags">
            <li>Voyages d'études</li>
            <li>Visites de terrain</li>
            <li>Échanges d'expériences</li>
            <li>Immersions thématiques</li>
          </ul>
        </div>
      </div>

      <div class="services-cta">
        <a href="#contact" class="btn btn-primary btn-lg">
          <i class="fas fa-paper-plane"></i> Demander un devis personnalisé
        </a>
      </div>
    </div>
  </section>

  <!-- RÉALISATIONS -->
  <section id="realisations" class="section section-projects">
    <div class="container">
      <div class="section-header">
        <span class="section-tag">Nos réalisations</span>
        <h2 class="section-title">Des interventions à fort impact</h2>
        <p class="section-subtitle">
          Découvrez une sélection de nos projets et missions réalisés au Burkina Faso 
          et dans la sous-région.
        </p>
      </div>

      <div class="projects-grid">
        <div class="project-card">
          <div class="project-category">
            <i class="fas fa-chart-line"></i> Études d'impact
          </div>
          <h3>Étude d'impact socio-économique dans la région du Sahel</h3>
          <p>
            Réalisation d'une étude d'impact environnemental et social (EIES) pour un projet 
            d'infrastructure routière dans la région du Sahel burkinabè, impliquant des consultations 
            communautaires et l'élaboration d'un plan de gestion environnementale.
          </p>
          <div class="project-meta">
            <span><i class="fas fa-map-marker-alt"></i> Sahel, Burkina Faso</span>
            <span><i class="fas fa-calendar-alt"></i> 2023</span>
          </div>
        </div>

        <div class="project-card">
          <div class="project-category">
            <i class="fas fa-chalkboard-teacher"></i> Formation
          </div>
          <h3>Renforcement des capacités des OSC en gestion de projets</h3>
          <p>
            Programme de formation de 120 responsables d'organisations de la société civile 
            sur le montage, la gestion et le suivi-évaluation de projets de développement 
            dans 5 régions du Burkina Faso.
          </p>
          <div class="project-meta">
            <span><i class="fas fa-map-marker-alt"></i> Burkina Faso</span>
            <span><i class="fas fa-calendar-alt"></i> 2022–2023</span>
          </div>
        </div>

        <div class="project-card">
          <div class="project-category">
            <i class="fas fa-bullhorn"></i> Communication
          </div>
          <h3>Campagne de sensibilisation sur la santé communautaire</h3>
          <p>
            Conception et mise en œuvre d'une campagne de communication pour le changement 
            de comportement (CCC) en matière de santé maternelle et infantile, incluant la production 
            de supports audiovisuels et des activités de mobilisation communautaire.
          </p>
          <div class="project-meta">
            <span><i class="fas fa-map-marker-alt"></i> Afrique de l'Ouest</span>
            <span><i class="fas fa-calendar-alt"></i> 2023</span>
          </div>
        </div>

        <div class="project-card">
          <div class="project-category">
            <i class="fas fa-hands-helping"></i> Accompagnement
          </div>
          <h3>Appui à la mise en place d'une stratégie de développement local</h3>
          <p>
            Assistance technique à une commune rurale pour l'élaboration de son Plan Communal 
            de Développement (PCD), incluant le diagnostic territorial, les consultations 
            participatives et la planification stratégique.
          </p>
          <div class="project-meta">
            <span><i class="fas fa-map-marker-alt"></i> Centre-Ouest, Burkina Faso</span>
            <span><i class="fas fa-calendar-alt"></i> 2022</span>
          </div>
        </div>

        <div class="project-card">
          <div class="project-category">
            <i class="fas fa-route"></i> Excursions
          </div>
          <h3>Voyage d'études sur les énergies renouvelables</h3>
          <p>
            Organisation d'un voyage d'études pour une délégation d'acteurs du secteur énergétique, 
            avec visite de centrales solaires et échanges d'expériences sur les modèles de transition 
            énergétique en Afrique de l'Ouest.
          </p>
          <div class="project-meta">
            <span><i class="fas fa-map-marker-alt"></i> Sénégal, Mali</span>
            <span><i class="fas fa-calendar-alt"></i> 2024</span>
          </div>
        </div>

        <div class="project-card">
          <div class="project-category">
            <i class="fas fa-handshake"></i> Intermédiation
          </div>
          <h3>Facilitation de partenariats pour une coopérative agricole</h3>
          <p>
            Intermédiation commerciale et financière pour la mise en relation d'une coopérative 
            de producteurs de sésame avec des acheteurs internationaux et des institutions 
            de microfinance pour le financement de la campagne.
          </p>
          <div class="project-meta">
            <span><i class="fas fa-map-marker-alt"></i> Burkina Faso</span>
            <span><i class="fas fa-calendar-alt"></i> 2024</span>
          </div>
        </div>
      </div>
    </div>
  </section>

  <!-- CONTACT -->
  <section id="contact" class="section section-contact">
    <div class="container">
      <div class="section-header">
        <span class="section-tag">Nous contacter</span>
        <h2 class="section-title">Parlons de votre projet</h2>
        <p class="section-subtitle">
          Vous avez un projet, un besoin d'expertise ou une question ? 
          N'hésitez pas à nous écrire. Notre équipe vous répondra dans les meilleurs délais.
        </p>
      </div>

      <div class="contact-grid">
        <div class="contact-info">
          <div class="contact-info-card">
            <div class="contact-info-item">
              <div class="contact-icon"><i class="fas fa-map-marker-alt"></i></div>
              <div>
                <h4>Adresse</h4>
                <p>Quartier 14 Yaar<br>Ouagadougou, Burkina Faso</p>
              </div>
            </div>
            <div class="contact-info-item">
              <div class="contact-icon"><i class="fas fa-phone-alt"></i></div>
              <div>
                <h4>Téléphone</h4>
                <p>+226 XX XX XX XX</p>
              </div>
            </div>
            <div class="contact-info-item">
              <div class="contact-icon"><i class="fas fa-envelope"></i></div>
              <div>
                <h4>Email</h4>
                <p>contact@afridex.com</p>
              </div>
            </div>
            <div class="contact-info-item">
              <div class="contact-icon"><i class="fas fa-clock"></i></div>
              <div>
                <h4>Horaires</h4>
                <p>Lundi – Vendredi : 8h – 17h</p>
              </div>
            </div>
          </div>

          <div class="contact-social">
            <h4>Suivez-nous</h4>
            <div class="social-links">
              <a href="https://www.facebook.com/afridex" target="_blank" rel="noopener noreferrer" 
                 class="social-link social-facebook" aria-label="Facebook">
                <i class="fab fa-facebook-f"></i>
              </a>
              <a href="https://www.tiktok.com/@afridex" target="_blank" rel="noopener noreferrer" 
                 class="social-link social-tiktok" aria-label="TikTok">
                <i class="fab fa-tiktok"></i>
              </a>
            </div>
          </div>
        </div>

        <div class="contact-form-wrap">
          <form id="contactForm" class="contact-form">
            <div class="form-group">
              <label for="nom">Nom complet <span class="required">*</span></label>
              <input type="text" id="nom" name="nom" placeholder="Votre nom complet" required>
            </div>
            <div class="form-row">
              <div class="form-group">
                <label for="email">Email <span class="required">*</span></label>
                <input type="email" id="email" name="email" placeholder="votre@email.com" required>
              </div>
              <div class="form-group">
                <label for="telephone">Téléphone</label>
                <input type="tel" id="telephone" name="telephone" placeholder="+226 XX XX XX XX">
              </div>
            </div>
            <div class="form-group">
              <label for="sujet">Sujet</label>
              <select id="sujet" name="sujet">
                <option value="">Sélectionnez un sujet</option>
                <option value="devis">Demande de devis</option>
                <option value="etudes">Études &amp; Consulting</option>
                <option value="formation">Formation</option>
                <option value="communication">Communication</option>
                <option value="accompagnement">Accompagnement</option>
                <option value="intermediation">Intermédiation</option>
                <option value="excursions">Excursions &amp; Immersions</option>
                <option value="autre">Autre</option>
              </select>
            </div>
            <div class="form-group">
              <label for="message">Message <span class="required">*</span></label>
              <textarea id="message" name="message" rows="5" placeholder="Décrivez votre projet ou votre besoin..." required></textarea>
            </div>
            <button type="submit" class="btn btn-primary btn-lg btn-full">
              <i class="fas fa-paper-plane"></i> Envoyer le message
            </button>
            <div id="formStatus" class="form-status" style="display:none;"></div>
          </form>
        </div>
      </div>
    </div>
  </section>

  <!-- FOOTER -->
  <footer class="footer">
    <div class="container">
      <div class="footer-grid">
        <div class="footer-brand">
          <div class="footer-logo">
            <img src="/static/images/logo-afridex.png" alt="AFRIDEX" class="logo-img">
            <span class="logo-text">Afride<span class="logo-x">X</span></span>
          </div>
          <p class="footer-desc">
            Cabinet d'expertise africain au service du développement. Études, consulting, 
            formation, communication et accompagnement au Burkina Faso et en Afrique.
          </p>
          <div class="social-links">
            <a href="https://www.facebook.com/afridex" target="_blank" rel="noopener noreferrer" 
               class="social-link" aria-label="Facebook">
              <i class="fab fa-facebook-f"></i>
            </a>
            <a href="https://www.tiktok.com/@afridex" target="_blank" rel="noopener noreferrer" 
               class="social-link" aria-label="TikTok">
              <i class="fab fa-tiktok"></i>
            </a>
          </div>
        </div>

        <div class="footer-links">
          <h4>Navigation</h4>
          <ul>
            <li><a href="#accueil">Accueil</a></li>
            <li><a href="#a-propos">À propos</a></li>
            <li><a href="#services">Services</a></li>
            <li><a href="#realisations">Réalisations</a></li>
            <li><a href="#contact">Contact</a></li>
          </ul>
        </div>

        <div class="footer-links">
          <h4>Services</h4>
          <ul>
            <li><a href="#services">Études &amp; Consulting</a></li>
            <li><a href="#services">Formation</a></li>
            <li><a href="#services">Communication</a></li>
            <li><a href="#services">Accompagnement</a></li>
            <li><a href="#services">Intermédiation</a></li>
            <li><a href="#services">Excursions</a></li>
          </ul>
        </div>

        <div class="footer-contact">
          <h4>Contact</h4>
          <ul>
            <li><i class="fas fa-map-marker-alt"></i> Quartier 14 Yaar, Ouagadougou</li>
            <li><i class="fas fa-phone-alt"></i> +226 XX XX XX XX</li>
            <li><i class="fas fa-envelope"></i> contact@afridex.com</li>
          </ul>
        </div>
      </div>

      <div class="footer-bottom">
        <div class="footer-bottom-content">
          <p>&copy; ${new Date().getFullYear()} AFRIDEX – Afrique Expertise. Tous droits réservés.</p>
          <div class="footer-legal">
            <a href="#mentions-legales" id="mentionsLegalesLink">Mentions légales</a>
            <span>|</span>
            <a href="#politique-confidentialite">Politique de confidentialité</a>
          </div>
        </div>
      </div>
    </div>
  </footer>

  <!-- MODAL MENTIONS LÉGALES -->
  <div id="mentionsLegalesModal" class="modal-overlay" style="display:none;">
    <div class="modal-content">
      <button class="modal-close" id="modalClose" aria-label="Fermer">&times;</button>
      <h2>Mentions légales</h2>
      <div class="modal-body">
        <h3>Éditeur du site</h3>
        <p>
          <strong>AFRIDEX – Afrique Expertise</strong><br>
          Cabinet d'expertise et de consulting<br>
          Quartier 14 Yaar, Ouagadougou, Burkina Faso<br>
          Email : contact@afridex.com
        </p>
        <h3>Hébergement</h3>
        <p>
          Ce site est hébergé par <strong>Cloudflare, Inc.</strong><br>
          101 Townsend St, San Francisco, CA 94107, États-Unis<br>
          Site web : <a href="https://www.cloudflare.com" target="_blank" rel="noopener noreferrer">www.cloudflare.com</a>
        </p>
        <h3>Propriété intellectuelle</h3>
        <p>
          L'ensemble des contenus présents sur ce site (textes, images, logos, graphismes) 
          sont la propriété exclusive d'AFRIDEX ou de leurs auteurs respectifs. 
          Toute reproduction, même partielle, est interdite sans autorisation préalable.
        </p>
        <h3>Protection des données</h3>
        <p>
          Les informations collectées via le formulaire de contact sont destinées exclusivement 
          au traitement de votre demande. Elles ne sont ni vendues, ni transmises à des tiers. 
          Conformément à la législation en vigueur, vous disposez d'un droit d'accès, de modification 
          et de suppression de vos données personnelles.
        </p>
      </div>
    </div>
  </div>

  <!-- BOUTON RETOUR EN HAUT -->
  <button id="scrollTopBtn" class="scroll-top-btn" aria-label="Retour en haut">
    <i class="fas fa-chevron-up"></i>
  </button>

  <script src="/static/app.js"></script>
</body>
</html>`
}

export default app
