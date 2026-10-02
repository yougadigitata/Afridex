document.addEventListener('DOMContentLoaded', () => {
  const $ = (selector, scope = document) => scope.querySelector(selector)
  const $$ = (selector, scope = document) => [...scope.querySelectorAll(selector)]
  const navToggle = $('#navToggle')
  const navMenu = $('#navMenu')
  const header = $('#header')

  navToggle?.addEventListener('click', () => {
    const open = navMenu.classList.toggle('open')
    navToggle.classList.toggle('active', open)
    navToggle.setAttribute('aria-expanded', String(open))
    document.body.style.overflow = open ? 'hidden' : ''
  })
  $$('.nav-link, .nav-btn-cta').forEach((link) => link.addEventListener('click', () => {
    navMenu?.classList.remove('open'); navToggle?.classList.remove('active'); navToggle?.setAttribute('aria-expanded', 'false'); document.body.style.overflow = ''
  }))

  const onScroll = () => { header?.classList.toggle('scrolled', window.scrollY > 30); $('#scrollTopBtn')?.classList.toggle('visible', window.scrollY > 600) }
  window.addEventListener('scroll', onScroll, { passive: true }); onScroll()
  $('#scrollTopBtn')?.addEventListener('click', () => window.scrollTo({ top: 0, behavior: 'smooth' }))

  if (document.body.dataset.page === 'formations') setTimeout(() => $('#formations')?.scrollIntoView({ behavior: 'smooth' }), 80)

  const courseCards = $$('.course-card')
  const themeButtons = $$('.theme-card')
  const search = $('#courseSearch')
  const duration = $('#durationFilter')
  const cost = $('#costFilter')
  const count = $('#courseCount')
  const empty = $('#emptyState')
  let activeTheme = 'all'
  const filterCourses = () => {
    const term = (search?.value || '').trim().toLowerCase()
    let visible = 0
    courseCards.forEach((card) => {
      const matchesTheme = activeTheme === 'all' || card.dataset.theme === activeTheme
      const matchesDuration = !duration || duration.value === 'all' || card.dataset.duration === duration.value
      const matchesCost = !cost || cost.value === 'all' || card.dataset.cost === cost.value
      const matchesTerm = !term || card.dataset.title.includes(term)
      const show = matchesTheme && matchesDuration && matchesCost && matchesTerm
      card.classList.toggle('is-hidden', !show)
      if (show) visible++
    })
    if (count) count.textContent = String(visible)
    if (empty) empty.hidden = visible !== 0
    $$('[data-table-row]').forEach((row, index) => { row.hidden = !!courseCards[index]?.classList.contains('is-hidden') })
  }
  themeButtons.forEach((button) => button.addEventListener('click', () => {
    activeTheme = activeTheme === button.dataset.theme ? 'all' : button.dataset.theme
    themeButtons.forEach((item) => item.classList.toggle('active', item === button && activeTheme !== 'all'))
    filterCourses()
    $('#courseGrid')?.scrollIntoView({ behavior: 'smooth', block: 'start' })
  }))
  ;[search, duration, cost].forEach((control) => control?.addEventListener('input', filterCourses))
  $('#resetFilters')?.addEventListener('click', () => { activeTheme = 'all'; if (search) search.value = ''; if (duration) duration.value = 'all'; if (cost) cost.value = 'all'; themeButtons.forEach((item) => item.classList.remove('active')); filterCourses() })

  $$('.course-cta').forEach((link) => link.addEventListener('click', () => {
    const subject = $('#sujet'); const message = $('#message'); const course = link.dataset.course
    if (subject) subject.value = 'formation'
    if (message && course) message.value = `Bonjour, je souhaite obtenir des informations et demander une inscription à la formation : ${course}.`
  }))
  const query = new URLSearchParams(window.location.search)
  if (query.get('sujet') === 'formation') $('#sujet').value = 'formation'

  const form = $('#contactForm'); const status = $('#formStatus')
  form?.addEventListener('submit', async (event) => {
    event.preventDefault(); const button = $('button[type="submit"]', form); const original = button.innerHTML
    button.disabled = true; button.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Envoi en cours…'
    try {
      const payload = Object.fromEntries(new FormData(form).entries())
      const response = await fetch('/api/contact', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(payload) })
      const result = await response.json(); if (!response.ok || !result.success) throw new Error(result.error || 'Une erreur est survenue.')
      status.className = 'form-status success'; status.textContent = result.message; form.reset()
    } catch (error) { status.className = 'form-status error'; status.textContent = error.message || 'Impossible d’envoyer la demande.' }
    button.disabled = false; button.innerHTML = original
  })

  const reveal = $$('.service-card, .impact-grid article, .mosaic-card, .course-card')
  if ('IntersectionObserver' in window && !window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
    const observer = new IntersectionObserver((entries) => entries.forEach((entry) => { if (entry.isIntersecting) { entry.target.classList.add('visible'); observer.unobserve(entry.target) } }), { threshold: .08 })
    reveal.forEach((element) => { element.classList.add('reveal'); observer.observe(element) })
  }
})
