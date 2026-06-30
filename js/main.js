// Life Grace Ministries - Main JavaScript (Churche Theme Effects)

/* Active donation destinations — update URLs here if campaigns change */
var DONATION_LINKS = {
  lordsCity: 'https://pleasegofundme.com/#lords-city-adoration-ground',
  church: 'https://www.lifegraceministries.com/'
};

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
  initAnchorScroll();
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
      const top = section.offsetTop - getScrollOffset() - 20;
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
    const isOpen = mobileNav.classList.toggle('show');
    document.body.style.overflow = isOpen ? 'hidden' : '';
  });

  mobileNav.querySelectorAll('a').forEach(function (link) {
    link.addEventListener('click', function () {
      mobileNav.classList.remove('show');
      document.body.style.overflow = '';
    });
  });

  document.addEventListener('click', function (e) {
    if (!mobileNav.classList.contains('show')) return;
    if (mobileNav.contains(e.target) || menuBtn.contains(e.target)) return;
    mobileNav.classList.remove('show');
    document.body.style.overflow = '';
  });
}

/* Hero Background Slider — img layers for reliable face framing */
function initHeroSlider() {
  const hero = document.getElementById('home');
  const heroText = document.getElementById('hero-slide-text');
  const imgA = document.getElementById('hero-bg-img-a');
  const imgB = document.getElementById('hero-bg-img-b');
  if (!hero || !imgA || !imgB) return;

  const slides = [
    {
      image: 'assets/about3.png',
      objectPosition: 'center 17%',
      tabletPosition: '61% 16%',
      mobilePosition: '62% 15%',
      type: 'portrait',
      text: 'Welcome to LifeGrace Ministries. Experience faith, worship and spiritual transformation.'
    },
    {
      image: 'https://images.unsplash.com/photo-1519491050282-cf00c82424b4',
      objectPosition: 'center center',
      type: 'scene',
      text: 'Making a difference through outreach and compassionate service.'
    },
    {
      image: 'assets/bisoph1.jpeg',
      fallback: 'assets/bisoph.jpg',
      objectPosition: 'center 32%',
      mobilePosition: 'center 32%',
      type: 'portrait',
      text: 'Transforming lives through faith, worship and community.'
    },
    {
      image: 'assets/rev-grace.jpg',
      objectPosition: 'center 13%',
      mobilePosition: 'center 11%',
      type: 'portrait',
      text: 'Join a welcoming community of worship, prayer and fellowship.'
    }
  ];

  let current = 0;
  let activeLayer = 0;

  function getObjectPosition(slide) {
    if (window.innerWidth <= 767 && slide.mobilePosition) {
      return slide.mobilePosition;
    }
    if (window.innerWidth <= 991 && slide.tabletPosition) {
      return slide.tabletPosition;
    }
    return slide.objectPosition;
  }

  function applySlideFrame(img, slide) {
    img.style.objectPosition = getObjectPosition(slide);
    const zoom = slide.zoom || 1;
    if (zoom < 1) {
      const size = (100 / zoom).toFixed(3) + '%';
      img.style.inset = 'auto';
      img.style.width = size;
      img.style.height = size;
      img.style.minWidth = size;
      img.style.minHeight = size;
      img.style.left = '50%';
      img.style.top = '50%';
      img.style.transform = 'translate(-50%, -50%)';
    } else {
      img.style.inset = '0';
      img.style.width = '100%';
      img.style.height = '100%';
      img.style.minWidth = '100%';
      img.style.minHeight = '100%';
      img.style.left = '';
      img.style.top = '';
      img.style.transform = 'none';
    }
  }

  function setImageSource(img, slide) {
    img.dataset.slideType = slide.type || 'scene';
    img.onerror = function () {
      if (slide.fallback && img.src.indexOf(slide.fallback) === -1) {
        img.src = slide.fallback;
      }
    };
    img.src = slide.image;
    applySlideFrame(img, slide);
  }

  slides.forEach(function (slide) {
    const preload = new Image();
    preload.src = slide.image;
    if (slide.fallback) {
      const fallback = new Image();
      fallback.src = slide.fallback;
    }
  });

  function showSlide(index) {
    const slide = slides[index];
    const nextImg = activeLayer === 0 ? imgB : imgA;
    const currentImg = activeLayer === 0 ? imgA : imgB;
    function reveal() {
      applySlideFrame(nextImg, slide);
      nextImg.classList.add('is-active');
      currentImg.classList.remove('is-active');
      activeLayer = activeLayer === 0 ? 1 : 0;
    }

    setImageSource(nextImg, slide);

    if (nextImg.complete && nextImg.naturalWidth > 0) {
      reveal();
    } else {
      nextImg.onload = function () {
        nextImg.onload = null;
        reveal();
      };
    }
  }

  function updateSlide() {
    showSlide(current);

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

  setImageSource(imgA, slides[0]);
  imgA.classList.add('is-active');

  window.addEventListener('resize', function () {
    const slide = slides[current];
    if (imgA.classList.contains('is-active')) applySlideFrame(imgA, slide);
    if (imgB.classList.contains('is-active')) applySlideFrame(imgB, slide);
  }, { passive: true });

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

/* GSAP Scroll Animations — replay on re-enter, never hide on scroll away */
function initGSAPAnimations() {
  if (typeof gsap === 'undefined' || typeof ScrollTrigger === 'undefined') return;

  gsap.registerPlugin(ScrollTrigger);

  /* play | leave-down | enter-back | leave-up — no reverse so content stays visible */
  var scrollToggle = 'play none restart none';

  function isInLeadershipSection(el) {
    return el.closest && el.closest('.section-leadership');
  }

  function isInStaticSection(el) {
    return el.closest && el.closest('.section-our-church');
  }

  gsap.utils.toArray('.heading-xl, .heading-gallery, .heading-services, .heading-youth, .heading-gofundme, .heading-lordscity, .heading-counselling').forEach(function (el) {
    if (isInStaticSection(el) || isInLeadershipSection(el)) return;

    gsap.from(el, {
      scrollTrigger: { trigger: el, start: 'top 85%', toggleActions: scrollToggle },
      opacity: 0,
      y: 50,
      duration: 0.9,
      ease: 'power2.out'
    });
  });

  gsap.utils.toArray('.mission-card, .vision-card, .stat-card, .service-card, .donate-card, .contact-card').forEach(function (el, i) {
    if (isInStaticSection(el) || isInLeadershipSection(el)) return;

    gsap.from(el, {
      scrollTrigger: { trigger: el, start: 'top 90%', toggleActions: scrollToggle },
      opacity: 0,
      y: 40,
      duration: 0.7,
      delay: (i % 4) * 0.1,
      ease: 'power2.out'
    });
  });

  gsap.utils.toArray('.leader-img-wrap, .rev-card, .worship-img-wrap, .service-hero-card').forEach(function (el) {
    if (isInStaticSection(el) || isInLeadershipSection(el)) return;

    gsap.from(el, {
      scrollTrigger: { trigger: el, start: 'top 85%', toggleActions: scrollToggle },
      opacity: 0,
      scale: 0.95,
      duration: 1,
      ease: 'power2.out'
    });
  });

  initLeadershipScrollAnimations(scrollToggle);

  function refreshScrollTriggers() {
    if (typeof ScrollTrigger !== 'undefined') ScrollTrigger.refresh();
    if (typeof AOS !== 'undefined') AOS.refresh();
  }

  window.addEventListener('load', refreshScrollTriggers, { once: true });

  var resizeTimer;
  window.addEventListener('resize', function () {
    clearTimeout(resizeTimer);
    resizeTimer = setTimeout(refreshScrollTriggers, 200);
  }, { passive: true });
}

function initLeadershipScrollAnimations(scrollToggle) {
  var section = document.querySelector('.section-leadership');
  if (!section) return;

  var isMobile = window.matchMedia('(max-width: 991px)').matches;
  var slideX = isMobile ? 28 : 55;
  var slideY = isMobile ? 30 : 45;

  if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
    return;
  }

  var heading = section.querySelector('.section-heading-center');
  if (heading) {
    gsap.from(heading, {
      scrollTrigger: { trigger: heading, start: 'top 85%', toggleActions: scrollToggle },
      opacity: 0,
      y: slideY,
      duration: 0.85,
      ease: 'power2.out'
    });
  }

  var bishopCopy = section.querySelector('.leadership-bishop-copy');
  var bishopPhoto = section.querySelector('.leadership-bishop-photo');
  if (bishopCopy) {
    gsap.from(bishopCopy, {
      scrollTrigger: { trigger: bishopCopy, start: 'top 82%', toggleActions: scrollToggle },
      opacity: 0,
      x: -slideX,
      duration: 0.9,
      ease: 'power2.out'
    });
  }
  if (bishopPhoto) {
    gsap.from(bishopPhoto, {
      scrollTrigger: { trigger: bishopPhoto, start: 'top 82%', toggleActions: scrollToggle },
      opacity: 0,
      x: slideX,
      scale: 0.98,
      duration: 0.95,
      ease: 'power2.out'
    });
  }

  section.querySelectorAll('.leadership-bishop-copy .stat-card').forEach(function (card, i) {
    gsap.from(card, {
      scrollTrigger: { trigger: card, start: 'top 88%', toggleActions: scrollToggle },
      opacity: 0,
      y: 35,
      duration: 0.65,
      delay: i * 0.12,
      ease: 'power2.out'
    });
  });

  var revPhoto = section.querySelector('.leadership-photo-card');
  var revCopy = section.querySelector('.leadership-copy');
  if (revPhoto) {
    gsap.from(revPhoto, {
      scrollTrigger: { trigger: revPhoto, start: 'top 82%', toggleActions: scrollToggle },
      opacity: 0,
      x: -slideX,
      scale: 0.98,
      duration: 0.95,
      ease: 'power2.out'
    });
  }
  if (revCopy) {
    gsap.from(revCopy, {
      scrollTrigger: { trigger: revCopy, start: 'top 82%', toggleActions: scrollToggle },
      opacity: 0,
      x: slideX,
      duration: 0.9,
      ease: 'power2.out'
    });
  }

}

/* Scroll Reveal fallback */
function initScrollReveal() {
  const items = document.querySelectorAll('.reveal-on-scroll');
  if (!items.length) return;

  const observer = new IntersectionObserver(function (entries) {
    entries.forEach(function (entry) {
      if (entry.isIntersecting) {
        entry.target.classList.add('revealed');
      }
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
      320: { slidesPerView: 1, spaceBetween: 16 },
      576: { slidesPerView: 1.15, spaceBetween: 18 },
      768: { slidesPerView: 2, spaceBetween: 20 },
      1024: { slidesPerView: 3, spaceBetween: 25 }
    }
  });
}

/* AOS Animations — replay on re-enter, never hide when scrolling away */
function initAOS() {
  if (typeof AOS === 'undefined') return;

  AOS.init({
    duration: 850,
    once: false,
    mirror: false,
    easing: 'ease-out-cubic',
    offset: 60,
    disable: window.matchMedia('(prefers-reduced-motion: reduce)').matches
  });

  window.addEventListener('resize', function () {
    AOS.refresh();
  }, { passive: true });

  window.addEventListener('orientationchange', function () {
    setTimeout(function () {
      AOS.refresh();
      if (typeof ScrollTrigger !== 'undefined') ScrollTrigger.refresh();
    }, 350);
  }, { passive: true });
}

/* Donation chooser — Lord's City (PleaseGoFundMe) vs Church (LGM) */
function initGoFundMeModal() {
  const modal = document.getElementById('donate-modal');
  const closeBtn = document.getElementById('close-donate-modal');
  if (!modal) return;

  function openModal() {
    modal.classList.add('show');
    modal.setAttribute('aria-hidden', 'false');
    document.body.style.overflow = 'hidden';
  }

  function closeModal() {
    modal.classList.remove('show');
    modal.setAttribute('aria-hidden', 'true');
    document.body.style.overflow = '';
  }

  function goToDonation(target) {
    const url = DONATION_LINKS[target];
    if (!url) return;
    closeModal();
    window.open(url, '_blank', 'noopener,noreferrer');
  }

  document.querySelectorAll('[data-open-donate]').forEach(function (btn) {
    btn.addEventListener('click', function (e) {
      e.preventDefault();
      openModal();
    });
  });

  document.querySelectorAll('[data-donate-target]').forEach(function (btn) {
    btn.addEventListener('click', function () {
      goToDonation(btn.getAttribute('data-donate-target'));
    });
  });

  if (closeBtn) closeBtn.addEventListener('click', closeModal);

  modal.addEventListener('click', function (e) {
    if (e.target === modal) closeModal();
  });

  document.addEventListener('keydown', function (e) {
    if (e.key === 'Escape' && modal.classList.contains('show')) closeModal();
  });
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
  const form = document.getElementById('contact-form-el');
  const statusEl = document.getElementById('contact-form-status');
  const submitBtn = document.getElementById('contact-submit-btn');
  if (!form) return;

  function showStatus(type, message) {
    if (!statusEl) return;
    statusEl.hidden = false;
    statusEl.className = 'contact-form-status contact-form-status--' + type;
    statusEl.textContent = message;
  }

  function clearStatus() {
    if (!statusEl) return;
    statusEl.hidden = true;
    statusEl.textContent = '';
    statusEl.className = 'contact-form-status';
  }

  form.addEventListener('submit', function (e) {
    e.preventDefault();
    clearStatus();

    if (!form.checkValidity()) {
      form.reportValidity();
      return;
    }

    const firstName = form.querySelector('[name="first_name"]').value.trim();
    const lastName = form.querySelector('[name="last_name"]').value.trim();
    const email = form.querySelector('[name="email"]').value.trim();
    const phone = form.querySelector('[name="phone"]').value.trim();
    const subject = form.querySelector('[name="subject"]').value.trim();
    const message = form.querySelector('[name="message"]').value.trim();

    const mailSubject = encodeURIComponent('LifeGrace Ministries — ' + subject);
    const mailBody = encodeURIComponent(
      'Name: ' + firstName + ' ' + lastName + '\n' +
      'Email: ' + email + '\n' +
      'Phone: ' + phone + '\n' +
      'Topic: ' + subject + '\n\n' +
      message
    );
    const mailtoUrl = 'mailto:info@lifegraceministries.com?subject=' + mailSubject + '&body=' + mailBody;

    if (submitBtn) {
      submitBtn.disabled = true;
      submitBtn.textContent = 'Opening email…';
    }

    window.location.href = mailtoUrl;

    showStatus(
      'success',
      'Your email app should open with your message ready to send. If it did not open, please email us directly at info@lifegraceministries.com or call +44 (0)20 8617 9624.'
    );

    setTimeout(function () {
      if (submitBtn) {
        submitBtn.disabled = false;
        submitBtn.innerHTML = 'Send Message<span class="tw-hover-btn-circle-dot"></span>';
      }
    }, 2500);
  });
}

function applyContactTopic(topic) {
  const subjectField = document.getElementById('contact-subject');
  if (!subjectField || !topic) return;

  for (var i = 0; i < subjectField.options.length; i++) {
    if (subjectField.options[i].value === topic) {
      subjectField.selectedIndex = i;
      break;
    }
  }
}

function focusContactField(fieldId) {
  const field = document.getElementById(fieldId);
  if (!field) return;
  field.focus({ preventScroll: true });
  field.classList.add('form-input-highlight');
  setTimeout(function () {
    field.classList.remove('form-input-highlight');
  }, 2200);
}

/* Smooth scroll with fixed header offset */
function getScrollOffset() {
  const header = document.getElementById('site-header');
  return (header ? header.offsetHeight : 80) + 16;
}

function scrollToSection(id, options) {
  options = options || {};
  const target = document.getElementById(id);
  if (!target) return false;
  const top = target.getBoundingClientRect().top + window.scrollY - getScrollOffset();
  window.scrollTo({ top: Math.max(0, top), behavior: 'smooth' });

  if (history.replaceState) {
    history.replaceState(null, '', '#' + id);
  } else {
    location.hash = id;
  }

  if (options.topic) {
    setTimeout(function () {
      applyContactTopic(options.topic);
    }, 450);
  }

  if (options.focus) {
    setTimeout(function () {
      focusContactField(options.focus);
    }, 650);
  }

  return true;
}

function handleScrollTrigger(el, e) {
  if (e) e.preventDefault();
  const sectionId = el.getAttribute('data-scroll') || (el.getAttribute('href') || '').replace('#', '');
  if (!sectionId) return;

  scrollToSection(sectionId, {
    focus: el.getAttribute('data-scroll-focus') || null,
    topic: el.getAttribute('data-contact-topic') || null
  });
}

function initAnchorScroll() {
  document.querySelectorAll('a[href^="#"]').forEach(function (link) {
    link.addEventListener('click', function (e) {
      const href = link.getAttribute('href');
      if (!href || href === '#') return;
      const id = href.slice(1);
      if (!document.getElementById(id)) return;
      e.preventDefault();

      if (id === 'contact-form') {
        scrollToSection('contact', {
          focus: link.getAttribute('data-scroll-focus') || 'contact-subject',
          topic: link.getAttribute('data-contact-topic') || null
        });
        return;
      }

      scrollToSection(id, {
        focus: link.getAttribute('data-scroll-focus') || null,
        topic: link.getAttribute('data-contact-topic') || null
      });
    });
  });

  if (location.hash) {
    const id = location.hash.slice(1);
    window.addEventListener('load', function () {
      setTimeout(function () {
        if (id === 'contact-form') {
          scrollToSection('contact', { focus: 'contact-subject' });
        } else {
          scrollToSection(id);
        }
      }, 100);
    });
  }
}

/* Scroll Buttons */
function initScrollButtons() {
  document.querySelectorAll('[data-scroll]').forEach(function (btn) {
    if (btn.tagName === 'A' && btn.getAttribute('href') && btn.getAttribute('href').charAt(0) === '#') {
      return;
    }
    btn.addEventListener('click', function (e) {
      handleScrollTrigger(btn, e);
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
    donateHeaderBtn.setAttribute('data-open-donate', '');
  }

  document.querySelectorAll('[data-scroll-section]').forEach(function (el) {
    el.addEventListener('click', function () {
      scrollToSection(el.getAttribute('data-scroll-section'));
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
