// Life Grace Ministries - Main JavaScript (Churche Theme Effects)

document.addEventListener('DOMContentLoaded', function () {
  initHeaderScroll();
  initMobileMenu();
  initHeroSlider();
  initLearnMoreToggles();
  initGallerySwiper();
  initAOS();
  initGSAPAnimations();
  initScrollReveal();
  initGoFundMeModal();
  initVideoSlider();
  initContactForm();
  initScrollButtons();
  initActiveNav();
  initCursorGlow();
});

/* Sticky Header on Scroll (Churche style) */
function initHeaderScroll() {
  const header = document.getElementById('site-header');
  if (!header) return;

  function onScroll() {
    if (window.scrollY > 80) {
      header.classList.add('scrolled');
    } else {
      header.classList.remove('scrolled');
    }
  }

  window.addEventListener('scroll', onScroll, { passive: true });
  onScroll();
}

/* Active Nav Link */
function initActiveNav() {
  const sections = document.querySelectorAll('section[id]');
  const navLinks = document.querySelectorAll('.desktop-nav a, .mobile-nav a');

  window.addEventListener('scroll', function () {
    let current = '';
    sections.forEach(function (section) {
      const top = section.offsetTop - 120;
      if (window.scrollY >= top) {
        current = section.getAttribute('id');
      }
    });

    navLinks.forEach(function (link) {
      link.classList.remove('active');
      if (link.getAttribute('href') === '#' + current) {
        link.classList.add('active');
      }
    });
  }, { passive: true });
}

/* Mobile Menu */
function initMobileMenu() {
  const menuBtn = document.getElementById('mobile-menu-btn');
  const mobileNav = document.getElementById('mobile-nav');
  if (!menuBtn || !mobileNav) return;

  menuBtn.addEventListener('click', function () {
    mobileNav.classList.toggle('show');
  });

  mobileNav.querySelectorAll('a').forEach(function (link) {
    link.addEventListener('click', function () {
      mobileNav.classList.remove('show');
    });
  });
}

/* Hero Background Slider with fade */
function initHeroSlider() {
  const hero = document.getElementById('home');
  const heroText = document.getElementById('hero-slide-text');
  if (!hero) return;

  const slides = [
    { image: 'assets/about3.png', text: 'Welcome to Life Grace Ministries. Experience faith, worship and spiritual transformation.' },
    { image: 'https://images.unsplash.com/photo-1507692049790-de58290a4334', text: 'Join a welcoming community of worship, prayer and fellowship.' },
    { image: 'https://images.unsplash.com/photo-1519491050282-cf00c82424b4', text: 'Making a difference through outreach and compassionate service.' },
    { image: 'assets/bisoph.jpg', text: 'Transforming lives through faith, worship and community.' },
    { image: 'assets/rev-grace.jpg', text: 'Join a welcoming community of worship, prayer and fellowship.' }
  ];

  let current = 0;

  function updateSlide() {
    hero.style.transition = 'background-image 1.2s ease-in-out';
    hero.style.backgroundImage = "url('" + slides[current].image + "')";

    if (heroText) {
      heroText.style.opacity = '0';
      setTimeout(function () {
        heroText.textContent = slides[current].text;
        heroText.style.opacity = '1';
      }, 400);
    }

    if (typeof gsap !== 'undefined') {
      gsap.fromTo('.hero-line-two', { opacity: 0.6, y: 30 }, { opacity: 1, y: 0, duration: 0.8, ease: 'power2.out' });
    }
  }

  setInterval(function () {
    current = (current + 1) % slides.length;
    updateSlide();
  }, 5000);

  if (typeof gsap !== 'undefined') {
    gsap.from('.hero-welcome', { opacity: 0, y: 30, duration: 1, delay: 0.2 });
    gsap.from('.hero-line-one', { opacity: 0, y: 50, duration: 1, delay: 0.35 });
    gsap.from('.hero-right-col', { opacity: 0, x: 40, duration: 1, delay: 0.5 });
    gsap.from('.hero-line-two', { opacity: 0, y: 80, duration: 1.2, delay: 0.4 });
  }
}

/* GSAP Scroll Animations (Churche-style) */
function initGSAPAnimations() {
  if (typeof gsap === 'undefined' || typeof ScrollTrigger === 'undefined') return;

  gsap.registerPlugin(ScrollTrigger);

  var scrollToggle = 'play reverse play reverse';

  gsap.utils.toArray('.heading-xl, .heading-gallery, .heading-services, .heading-youth, .heading-gofundme, .heading-lordscity, .heading-counselling').forEach(function (el) {
    gsap.from(el, {
      scrollTrigger: { trigger: el, start: 'top 85%', end: 'bottom 15%', toggleActions: scrollToggle },
      opacity: 0,
      y: 50,
      duration: 0.9,
      ease: 'power2.out'
    });
  });

  gsap.utils.toArray('.mission-card, .vision-card, .stat-card, .service-card, .donate-card, .contact-card').forEach(function (el, i) {
    gsap.from(el, {
      scrollTrigger: { trigger: el, start: 'top 90%', end: 'bottom 10%', toggleActions: scrollToggle },
      opacity: 0,
      y: 40,
      duration: 0.7,
      delay: (i % 4) * 0.1,
      ease: 'power2.out'
    });
  });

  gsap.utils.toArray('.leader-img-wrap, .rev-card, .worship-img-wrap, .service-hero-card').forEach(function (el) {
    gsap.from(el, {
      scrollTrigger: { trigger: el, start: 'top 85%', end: 'bottom 15%', toggleActions: scrollToggle },
      opacity: 0,
      scale: 0.95,
      duration: 1,
      ease: 'power2.out'
    });
  });
}

/* Scroll Reveal fallback */
function initScrollReveal() {
  const items = document.querySelectorAll('.reveal-on-scroll');
  if (!items.length) return;

  const observer = new IntersectionObserver(function (entries) {
    entries.forEach(function (entry) {
      entry.target.classList.toggle('revealed', entry.isIntersecting);
    });
  }, { threshold: 0.15 });

  items.forEach(function (el) { observer.observe(el); });
}

/* Learn More Toggles */
function initLearnMoreToggles() {
  const leadershipBtn = document.getElementById('leadership-learn-more');
  const leadershipContent = document.getElementById('leadership-more-content');
  if (leadershipBtn && leadershipContent) {
    leadershipBtn.addEventListener('click', function () {
      const isHidden = leadershipContent.classList.contains('d-none');
      leadershipContent.classList.toggle('d-none');
      leadershipBtn.textContent = isHidden ? 'Show Less' : 'Learn More';
      if (isHidden && typeof gsap !== 'undefined') {
        gsap.from(leadershipContent, { opacity: 0, height: 0, duration: 0.5 });
      }
    });
  }

  const youthBtn = document.getElementById('youth-learn-more');
  const youthContent = document.getElementById('youth-more-content');
  if (youthBtn && youthContent) {
    youthBtn.addEventListener('click', function () {
      const isHidden = youthContent.classList.contains('d-none');
      youthContent.classList.toggle('d-none');
      youthBtn.textContent = isHidden ? 'Show Less' : 'Learn More';
    });
  }
}

/* Gallery Swiper */
function initGallerySwiper() {
  if (typeof Swiper === 'undefined') return;

  new Swiper('.gallery-swiper', {
    slidesPerView: 3,
    spaceBetween: 25,
    loop: true,
    navigation: { nextEl: '.swiper-button-next', prevEl: '.swiper-button-prev' },
    autoplay: { delay: 2500, disableOnInteraction: false },
    breakpoints: {
      320: { slidesPerView: 1 },
      768: { slidesPerView: 2 },
      1024: { slidesPerView: 3 }
    }
  });
}

/* AOS Animations */
function initAOS() {
  if (typeof AOS !== 'undefined') {
    AOS.init({
      duration: 1000,
      once: false,
      mirror: true,
      easing: 'ease-out-cubic',
      offset: 80
    });

    window.addEventListener('resize', function () {
      AOS.refresh();
    }, { passive: true });
  }
}

/* GoFundMe Modal */
function initGoFundMeModal() {
  const openBtn = document.getElementById('open-donate-modal');
  const modal = document.getElementById('donate-modal');
  const closeBtn = document.getElementById('close-donate-modal');
  const proceedBtn = document.getElementById('proceed-donate');

  if (openBtn && modal) {
    openBtn.addEventListener('click', function () {
      modal.classList.add('show');
      document.body.style.overflow = 'hidden';
    });
  }

  function closeModal() {
    modal.classList.remove('show');
    document.body.style.overflow = '';
  }

  if (closeBtn && modal) closeBtn.addEventListener('click', closeModal);
  if (modal) {
    modal.addEventListener('click', function (e) {
      if (e.target === modal) closeModal();
    });
  }
  if (proceedBtn) {
    proceedBtn.addEventListener('click', function () {
      window.open('https://pleasegofundme.com/', '_blank');
    });
  }
}

/* Lord's City Video Slider - auto carousel, one-by-one playback */
function initVideoSlider() {
  const mainVideo = document.getElementById('main-video');
  const videoCounter = document.getElementById('video-counter');
  const videoTitle = document.getElementById('video-title');
  const fadeLayer = document.getElementById('video-fade-layer');
  const dotsContainer = document.getElementById('video-dots');
  const progressBar = document.getElementById('video-progress-bar');
  const playOverlay = document.getElementById('video-play-overlay');
  const playBtn = document.getElementById('video-play-btn');
  const prevBtn = document.getElementById('video-prev');
  const nextBtn = document.getElementById('video-next');
  const section = document.getElementById('lordscity');
  const videoWrap = document.querySelector('.video-main-wrap');

  if (!mainVideo || !dotsContainer) return;

  const playlist = [
    {
      local: 'assets/video/video1.mp4',
      remote: 'https://videos.pexels.com/video-files/3571264/3571264-hd_1920_1080_30fps.mp4',
      poster: 'assets/about3.png',
      title: "Lord's City Worship"
    },
    {
      local: 'assets/video/video2.mp4',
      remote: 'https://videos.pexels.com/video-files/855529/855529-hd_1920_1080_25fps.mp4',
      poster: 'assets/sunday.jpg',
      title: 'Prayer & Fellowship'
    },
    {
      local: 'assets/video/video3.mp4',
      remote: 'https://videos.pexels.com/video-files/3195394/3195394-hd_1920_1080_25fps.mp4',
      poster: 'assets/thursday.jpg',
      title: 'Community Gathering'
    },
    {
      local: 'assets/video/video4.mp4',
      remote: 'https://videos.pexels.com/video-files/4772949/4772949-hd_1920_1080_25fps.mp4',
      poster: 'assets/youth.jpg',
      title: 'Spiritual Renewal'
    }
  ];

  let currentIndex = 0;
  let isTransitioning = false;
  let autoTimer = null;
  let sectionVisible = false;
  let loadGeneration = 0;
  let firstVideoPrepared = false;

  function playWhenReady(expectedGen) {
    mainVideo.muted = true;

    function attemptPlay() {
      if (expectedGen !== loadGeneration) return;
      if (section && !sectionVisible) return;

      const playPromise = mainVideo.play();
      if (!playPromise || !playPromise.catch) return;

      playPromise.catch(function () {
        if (expectedGen !== loadGeneration) return;
        if (playOverlay) playOverlay.classList.remove('hidden');
      });
    }

    function startPlayback() {
      if (expectedGen !== loadGeneration) return;

      if (mainVideo.readyState >= HTMLMediaElement.HAVE_FUTURE_DATA) {
        attemptPlay();
        return;
      }

      let played = false;
      function onReady() {
        if (played || expectedGen !== loadGeneration) return;
        played = true;
        mainVideo.removeEventListener('canplay', onReady);
        mainVideo.removeEventListener('loadeddata', onReady);
        attemptPlay();
      }

      mainVideo.addEventListener('canplay', onReady);
      mainVideo.addEventListener('loadeddata', onReady);

      setTimeout(function () {
        if (!played && expectedGen === loadGeneration) {
          onReady();
        }
      }, 2000);
    }

    startPlayback();
  }

  function prepareFirstVideo(callback) {
    getWorkingSrc(playlist[0], function (url) {
      if (firstVideoPrepared) {
        if (callback) callback();
        return;
      }
      firstVideoPrepared = true;
      mainVideo.poster = playlist[0].poster;
      mainVideo.src = url;
      mainVideo.load();
      if (callback) callback();
    });
  }

  function getWorkingSrc(item, callback) {
    if (item._resolvedUrl) {
      callback(item._resolvedUrl);
      return;
    }

    fetch(item.local, { method: 'HEAD' })
      .then(function (response) {
        item._resolvedUrl = response.ok ? item.local : item.remote;
        callback(item._resolvedUrl);
      })
      .catch(function () {
        item._resolvedUrl = item.remote;
        callback(item.remote);
      });
  }

  function loadAndPlay(index, useFade) {
    const item = playlist[index];
    const thisGen = ++loadGeneration;

    getWorkingSrc(item, function (url) {
      if (thisGen !== loadGeneration) return;

      mainVideo.pause();
      if (item.poster) mainVideo.poster = item.poster;

      if (useFade && fadeLayer) {
        fadeLayer.classList.add('is-fading');
      }

      setTimeout(function () {
        if (thisGen !== loadGeneration) return;

        mainVideo.src = url;
        mainVideo.load();
        currentIndex = index;
        updateUI(index);
        playWhenReady(thisGen);

        if (fadeLayer) fadeLayer.classList.remove('is-fading');
        isTransitioning = false;
      }, useFade ? 500 : 0);
    });
  }

  function buildDots() {
    dotsContainer.innerHTML = '';

    playlist.forEach(function (item, index) {
      const dot = document.createElement('button');
      dot.type = 'button';
      dot.className = 'video-dot' + (index === 0 ? ' active' : '');
      dot.setAttribute('aria-label', 'Go to video ' + (index + 1));
      dot.addEventListener('click', function () {
        goToVideo(index, true);
      });
      dotsContainer.appendChild(dot);
    });
  }

  function updateUI(index) {
    if (videoCounter) {
      videoCounter.textContent = 'Video ' + (index + 1) + ' of ' + playlist.length;
    }
    if (videoTitle) {
      videoTitle.textContent = playlist[index].title;
    }
    document.querySelectorAll('.video-dot').forEach(function (d, i) {
      d.classList.toggle('active', i === index);
    });
  }

  function goToVideo(index, manual) {
    if (isTransitioning) return;
    if (index === currentIndex && !mainVideo.paused) return;

    if (index === currentIndex && mainVideo.paused && mainVideo.src) {
      clearTimeout(autoTimer);
      if (manual && playOverlay) playOverlay.classList.add('hidden');
      playWhenReady(++loadGeneration);
      return;
    }

    isTransitioning = true;
    clearTimeout(autoTimer);
    loadAndPlay(index, true);
    if (manual && playOverlay) playOverlay.classList.add('hidden');
  }

  function nextVideo() {
    const next = (currentIndex + 1) % playlist.length;
    goToVideo(next, false);
  }

  function prevVideo() {
    const prev = (currentIndex - 1 + playlist.length) % playlist.length;
    goToVideo(prev, false);
  }

  function startAutoAdvance() {
    clearTimeout(autoTimer);
    autoTimer = setTimeout(function () {
      if (sectionVisible && !mainVideo.paused) {
        nextVideo();
      }
    }, 15000);
  }

  buildDots();
  updateUI(0);

  playlist.forEach(function (item) {
    getWorkingSrc(item, function () {});
  });

  prepareFirstVideo();

  mainVideo.addEventListener('ended', function () {
    nextVideo();
  });

  mainVideo.addEventListener('timeupdate', function () {
    if (progressBar && mainVideo.duration) {
      progressBar.style.width = (mainVideo.currentTime / mainVideo.duration * 100) + '%';
    }
  });

  mainVideo.addEventListener('play', function () {
    if (playOverlay) playOverlay.classList.add('hidden');
    if (videoWrap) videoWrap.classList.add('is-playing');
    startAutoAdvance();
  });

  mainVideo.addEventListener('pause', function () {
    if (videoWrap) videoWrap.classList.remove('is-playing');
    clearTimeout(autoTimer);
  });

  if (playBtn) {
    playBtn.addEventListener('click', function () {
      mainVideo.muted = false;
      mainVideo.play();
      if (playOverlay) playOverlay.classList.add('hidden');
    });
  }

  if (prevBtn) prevBtn.addEventListener('click', prevVideo);
  if (nextBtn) nextBtn.addEventListener('click', function () { nextVideo(); });

  if (section && 'IntersectionObserver' in window) {
    const observer = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        sectionVisible = entry.isIntersecting;
        if (entry.isIntersecting) {
          const startPlayback = function () {
            if (mainVideo.paused) {
              playWhenReady(++loadGeneration);
            }
          };

          if (!mainVideo.src) {
            prepareFirstVideo(startPlayback);
          } else {
            startPlayback();
          }
        } else {
          mainVideo.pause();
        }
      });
    }, { threshold: 0.35 });
    observer.observe(section);
  } else {
    prepareFirstVideo(function () {
      loadAndPlay(0, false);
    });
  }
}

/* Contact Form */
function initContactForm() {
  const form = document.getElementById('contact-form');
  if (!form) return;

  form.addEventListener('submit', function (e) {
    e.preventDefault();
    alert('Thank you for contacting Life Grace Ministries. We will get back to you soon.');
    form.reset();
  });
}

/* Scroll Buttons */
function initScrollButtons() {
  document.querySelectorAll('[data-scroll]').forEach(function (btn) {
    btn.addEventListener('click', function () {
      const target = document.getElementById(btn.getAttribute('data-scroll'));
      if (target) target.scrollIntoView({ behavior: 'smooth' });
    });
  });

  const scrollTopBtn = document.getElementById('scroll-top-btn');
  if (scrollTopBtn) {
    scrollTopBtn.addEventListener('click', function () {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    });
  }

  const donateHeaderBtn = document.getElementById('header-donate-btn');
  if (donateHeaderBtn) {
    donateHeaderBtn.addEventListener('click', function () {
      window.open('https://pleasegofundme.com/', '_blank');
    });
  }

  document.querySelectorAll('[data-scroll-section]').forEach(function (el) {
    el.addEventListener('click', function () {
      const target = document.getElementById(el.getAttribute('data-scroll-section'));
      if (target) target.scrollIntoView({ behavior: 'smooth' });
    });
  });
}

/* Cursor glow trail — dark sprinkle blue, fades when cursor stops */
function initCursorGlow() {
  if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
  if (window.matchMedia('(pointer: coarse)').matches) return;

  const canvas = document.getElementById('cursor-glow-canvas');
  if (!canvas) return;

  const cursorEl = document.getElementById('custom-cursor');
  document.body.classList.add('custom-cursor-active');

  const ctx = canvas.getContext('2d');
  if (!ctx) return;

  const points = [];
  const maxPoints = 24;
  const idleThreshold = 60;

  let width = 0;
  let height = 0;
  let dpr = 1;
  let mouseX = -100;
  let mouseY = -100;
  let lastMoveTime = 0;
  let isMoving = false;
  let rafId = null;

  function resize() {
    dpr = Math.min(window.devicePixelRatio || 1, 2);
    width = window.innerWidth;
    height = window.innerHeight;
    canvas.width = Math.floor(width * dpr);
    canvas.height = Math.floor(height * dpr);
    canvas.style.width = width + 'px';
    canvas.style.height = height + 'px';
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
  }

  function addPoint(x, y) {
    const last = points[points.length - 1];
    if (last && Math.hypot(x - last.x, y - last.y) < 3) return;

    points.push({ x: x, y: y, life: 1 });
    if (points.length > maxPoints) points.shift();
  }

  function decayPoints() {
    const idle = Date.now() - lastMoveTime > idleThreshold;
    const decay = idle ? 0.14 : 0.055;

    for (let i = points.length - 1; i >= 0; i--) {
      points[i].life -= decay;
      if (points[i].life <= 0) points.splice(i, 1);
    }

    if (idle) isMoving = false;
  }

  function draw() {
    ctx.clearRect(0, 0, width, height);
    decayPoints();

    if (points.length > 1) {
      for (let i = 1; i < points.length; i++) {
        const p0 = points[i - 1];
        const p1 = points[i];
        const progress = i / points.length;
        const fade = Math.min(p0.life, p1.life);
        if (fade <= 0) continue;

        const alpha = (0.2 + progress * 0.55) * fade;

        ctx.save();
        ctx.beginPath();
        ctx.moveTo(p0.x, p0.y);
        ctx.lineTo(p1.x, p1.y);
        ctx.strokeStyle = 'hsla(215, 72%, 28%, ' + alpha + ')';
        ctx.lineWidth = 2.5 + progress * 5.5;
        ctx.lineCap = 'round';
        ctx.lineJoin = 'round';
        ctx.shadowBlur = 8 + progress * 10;
        ctx.shadowColor = 'hsla(205, 90%, 52%, ' + (alpha * 0.75) + ')';
        ctx.stroke();
        ctx.restore();

        if (i % 4 === 0 && fade > 0.35) {
          ctx.save();
          ctx.beginPath();
          ctx.arc(p1.x, p1.y, 1.8 + progress * 1.6, 0, Math.PI * 2);
          ctx.fillStyle = 'hsla(200, 95%, 68%, ' + (fade * 0.9) + ')';
          ctx.shadowBlur = 6;
          ctx.shadowColor = 'hsla(205, 100%, 70%, 0.8)';
          ctx.fill();
          ctx.restore();
        }
      }
    }

    rafId = requestAnimationFrame(draw);
  }

  function updateCursorArrow() {
    if (!cursorEl) return;
    if (mouseX < 0) {
      cursorEl.classList.add('is-hidden');
      return;
    }
    cursorEl.classList.remove('is-hidden');
    cursorEl.style.transform = 'translate3d(' + mouseX + 'px, ' + mouseY + 'px, 0)';
  }

  function onMouseMove(e) {
    mouseX = e.clientX;
    mouseY = e.clientY;
    lastMoveTime = Date.now();
    isMoving = true;
    addPoint(mouseX, mouseY);
    updateCursorArrow();
  }

  function onMouseLeave() {
    mouseX = -100;
    mouseY = -100;
    isMoving = false;
    points.length = 0;
    updateCursorArrow();
  }

  function onVisibilityChange() {
    if (document.hidden && rafId) {
      cancelAnimationFrame(rafId);
      rafId = null;
    } else if (!rafId) {
      draw();
    }
  }

  resize();
  draw();

  window.addEventListener('resize', resize);
  document.addEventListener('mousemove', onMouseMove, { passive: true });
  document.addEventListener('mouseleave', onMouseLeave);
  document.addEventListener('visibilitychange', onVisibilityChange);
}
