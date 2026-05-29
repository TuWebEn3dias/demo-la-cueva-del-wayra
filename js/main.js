(function(){
  'use strict';

  const WHATSAPP_NUMBER = '5491144262610';

  /* Navbar toggle */
  const navToggle = document.getElementById('navToggle');
  const navMenu = document.getElementById('navMenu');

  if (navToggle && navMenu) {
    navToggle.addEventListener('click', function(){
      const expanded = navToggle.getAttribute('aria-expanded') === 'true' ? false : true;
      navToggle.setAttribute('aria-expanded', expanded);
      navToggle.classList.toggle('active');
      navMenu.classList.toggle('open');
      document.body.classList.toggle('nav-open');
    });

    navMenu.querySelectorAll('.nav-link').forEach(function(link){
      link.addEventListener('click', function(){
        navToggle.classList.remove('active');
        navMenu.classList.remove('open');
        navToggle.setAttribute('aria-expanded', 'false');
        document.body.classList.remove('nav-open');
      });
    });
  }

  /* Navbar scroll: hide/show + active link + scrolled class */
  let lastScroll = 0;
  const navbar = document.getElementById('navbar');

  function updateNavbar(){
    const currentY = window.scrollY;

    /* Scrolled class */
    if (currentY > 50) {
      navbar.classList.add('scrolled');
    } else {
      navbar.classList.remove('scrolled');
    }

    /* Hide on scroll down, show on scroll up (only past hero) */
    if (currentY > 200) {
      if (currentY > lastScroll && currentY > 300) {
        navbar.classList.add('hidden');
      } else {
        navbar.classList.remove('hidden');
      }
    } else {
      navbar.classList.remove('hidden');
    }

    lastScroll = currentY;
  }

  window.addEventListener('scroll', updateNavbar, { passive: true });

  /* Active link on scroll */
  function updateActiveLink(){
    const sections = document.querySelectorAll('section[id]');
    let current = '';

    sections.forEach(function(section){
      const top = section.offsetTop - 120;
      if (window.scrollY >= top) {
        current = section.getAttribute('id');
      }
    });

    navMenu.querySelectorAll('.nav-link').forEach(function(link){
      link.classList.remove('active');
      const href = link.getAttribute('href');
      if (href === '#' + current) {
        link.classList.add('active');
      }
    });
  }

  window.addEventListener('scroll', updateActiveLink, { passive: true });

  /* Intersection Observer for fade-in */
  const observerOptions = {
    threshold: 0.15,
    rootMargin: '0px 0px -50px 0px'
  };

  const observer = new IntersectionObserver(function(entries){
    entries.forEach(function(entry){
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        observer.unobserve(entry.target);
      }
    });
  }, observerOptions);

  document.querySelectorAll('.fade-in').forEach(function(el){
    observer.observe(el);
  });

  /* Form → WhatsApp */
  const form = document.getElementById('reservaForm');
  if (form) {
    form.addEventListener('submit', function(e){
      e.preventDefault();

      var nombre = document.getElementById('nombre').value.trim();
      var fecha = document.getElementById('fecha').value;
      var personas = document.getElementById('personas').value;
      var telefono = document.getElementById('telefono').value.trim();
      var mensaje = document.getElementById('mensaje').value.trim();

      var text = '¡Hola! Quiero hacer una reserva en La Cueva del Wayra.%0A%0A';
      text += '👤 Nombre: ' + encodeURIComponent(nombre) + '%0A';
      text += '📅 Fecha: ' + encodeURIComponent(fecha) + '%0A';
      text += '👥 Personas: ' + encodeURIComponent(personas) + '%0A';
      text += '📞 Teléfono: ' + encodeURIComponent(telefono) + '%0A';

      if (mensaje) {
        text += '💬 Mensaje: ' + encodeURIComponent(mensaje) + '%0A';
      }

      window.open('https://wa.me/' + WHATSAPP_NUMBER + '?text=' + text, '_blank');
    });
  }

  /* Set min date on date inputs */
  var fechaInput = document.getElementById('fecha');
  if (fechaInput) {
    var today = new Date();
    var dd = String(today.getDate()).padStart(2, '0');
    var mm = String(today.getMonth() + 1).padStart(2, '0');
    var yyyy = today.getFullYear();
    fechaInput.setAttribute('min', yyyy + '-' + mm + '-' + dd);
  }

})();
