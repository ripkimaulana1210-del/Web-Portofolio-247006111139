/**
 * Portfolio — Ripki Maulana
 * Vanilla JS, no dependencies
 */
(function () {
    'use strict';

    var prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    document.addEventListener('DOMContentLoaded', function () {
        initNavbar();
        initMobileMenu();
        initScrollSpy();
        initScrollReveal();
        initTypingEffect();
        initCVModal();
    });


    /* ===================================================
       NAVBAR — scroll background
       =================================================== */

    function initNavbar() {
        var nav = document.getElementById('nav');
        if (!nav) return;

        function onScroll() {
            if (window.scrollY > 40) {
                nav.classList.add('is-scrolled');
            } else {
                nav.classList.remove('is-scrolled');
            }
        }

        window.addEventListener('scroll', onScroll, { passive: true });
        onScroll();
    }


    /* ===================================================
       MOBILE MENU
       =================================================== */

    function initMobileMenu() {
        var toggle = document.getElementById('navToggle');
        var mobile = document.getElementById('navMobile');
        if (!toggle || !mobile) return;

        var links = mobile.querySelectorAll('.nav__mobile-link');
        var isOpen = false;

        function openMenu() {
            isOpen = true;
            toggle.classList.add('is-open');
            toggle.setAttribute('aria-expanded', 'true');
            toggle.setAttribute('aria-label', 'Tutup menu');
            mobile.classList.add('is-open');
            mobile.setAttribute('aria-hidden', 'false');
            document.body.style.overflow = 'hidden';
        }

        function closeMenu() {
            isOpen = false;
            toggle.classList.remove('is-open');
            toggle.setAttribute('aria-expanded', 'false');
            toggle.setAttribute('aria-label', 'Buka menu');
            mobile.classList.remove('is-open');
            mobile.setAttribute('aria-hidden', 'true');
            document.body.style.overflow = '';
        }

        toggle.addEventListener('click', function () {
            if (isOpen) {
                closeMenu();
            } else {
                openMenu();
            }
        });

        // Close on link click
        for (var i = 0; i < links.length; i++) {
            links[i].addEventListener('click', closeMenu);
        }

        // Close on ESC
        document.addEventListener('keydown', function (e) {
            if (e.key === 'Escape' && isOpen) {
                closeMenu();
                toggle.focus();
            }
        });

        // Close on resize to desktop
        var mql = window.matchMedia('(min-width: 769px)');
        mql.addEventListener('change', function (e) {
            if (e.matches && isOpen) {
                closeMenu();
            }
        });
    }


    /* ===================================================
       SCROLL SPY
       =================================================== */

    function initScrollSpy() {
        var sections = document.querySelectorAll('main section[id]');
        var navLinks = document.querySelectorAll('.nav__link');
        var mobileLinks = document.querySelectorAll('.nav__mobile-link');
        if (!sections.length) return;

        var observerOptions = {
            rootMargin: '-20% 0px -70% 0px',
            threshold: 0
        };

        var currentId = '';

        var observer = new IntersectionObserver(function (entries) {
            entries.forEach(function (entry) {
                if (entry.isIntersecting) {
                    currentId = entry.target.getAttribute('id');
                    setActiveLink(currentId);
                }
            });
        }, observerOptions);

        sections.forEach(function (section) {
            observer.observe(section);
        });

        function setActiveLink(id) {
            for (var i = 0; i < navLinks.length; i++) {
                var link = navLinks[i];
                var href = link.getAttribute('href');
                if (href === '#' + id) {
                    link.classList.add('is-active');
                } else {
                    link.classList.remove('is-active');
                }
            }

            for (var j = 0; j < mobileLinks.length; j++) {
                var mLink = mobileLinks[j];
                var mHref = mLink.getAttribute('href');
                if (mHref === '#' + id) {
                    mLink.classList.add('is-active');
                } else {
                    mLink.classList.remove('is-active');
                }
            }
        }
    }


    /* ===================================================
       SCROLL REVEAL
       =================================================== */

    function initScrollReveal() {
        if (prefersReducedMotion) {
            var reveals = document.querySelectorAll('.reveal');
            for (var i = 0; i < reveals.length; i++) {
                reveals[i].classList.add('is-visible');
            }
            return;
        }

        var revealElements = document.querySelectorAll('.reveal');
        if (!revealElements.length) return;

        var revealObserver = new IntersectionObserver(function (entries) {
            entries.forEach(function (entry) {
                if (entry.isIntersecting) {
                    // Apply stagger delay if data attribute exists
                    var delay = entry.target.getAttribute('data-reveal-delay');
                    if (delay) {
                        entry.target.style.transitionDelay = delay + 'ms';
                    }
                    entry.target.classList.add('is-visible');
                    revealObserver.unobserve(entry.target);
                }
            });
        }, {
            rootMargin: '0px 0px -60px 0px',
            threshold: 0.1
        });

        revealElements.forEach(function (el) {
            revealObserver.observe(el);
        });
    }


    /* ===================================================
       TYPING EFFECT
       =================================================== */

    function initTypingEffect() {
        var el = document.getElementById('typingText');
        if (!el) return;

        if (prefersReducedMotion) {
            el.textContent = 'Web Developer';
            return;
        }

        var roles = [
            'Web Developer',
            'Data & AI Enthusiast',
            'Software Engineering Student'
        ];

        var roleIndex = 0;
        var charIndex = 0;
        var isDeleting = false;
        var isPaused = false;

        var TYPING_SPEED = 70;
        var DELETING_SPEED = 40;
        var PAUSE_AFTER_TYPE = 2000;
        var PAUSE_AFTER_DELETE = 400;

        function tick() {
            var current = roles[roleIndex];

            if (isPaused) {
                return;
            }

            if (!isDeleting) {
                // Typing
                charIndex++;
                el.textContent = current.substring(0, charIndex);

                if (charIndex === current.length) {
                    isPaused = true;
                    setTimeout(function () {
                        isPaused = false;
                        isDeleting = true;
                        tick();
                    }, PAUSE_AFTER_TYPE);
                    return;
                }

                setTimeout(tick, TYPING_SPEED);
            } else {
                // Deleting
                charIndex--;
                el.textContent = current.substring(0, charIndex);

                if (charIndex === 0) {
                    isDeleting = false;
                    roleIndex = (roleIndex + 1) % roles.length;
                    isPaused = true;
                    setTimeout(function () {
                        isPaused = false;
                        tick();
                    }, PAUSE_AFTER_DELETE);
                    return;
                }

                setTimeout(tick, DELETING_SPEED);
            }
        }

        setTimeout(tick, 800);
    }


    /* ===================================================
       CV MODAL
       =================================================== */

    function initCVModal() {
        var modal = document.getElementById('cvModal');
        var cvBtn = document.getElementById('cvBtn');
        var overlay = document.getElementById('modalOverlay');
        var closeBtn = document.getElementById('modalClose');
        var cvFrame = document.getElementById('cvFrame');

        if (!modal || !cvBtn) return;

        var triggerElement = null;

        function openModal() {
            triggerElement = document.activeElement;
            modal.classList.add('is-open');
            modal.setAttribute('aria-hidden', 'false');
            document.body.style.overflow = 'hidden';

            // Load iframe src if not already loaded
            if (cvFrame && !cvFrame.getAttribute('src') && cvFrame.dataset.src) {
                cvFrame.src = cvFrame.dataset.src;
            }

            // Focus the close button
            setTimeout(function () {
                if (closeBtn) closeBtn.focus();
            }, 100);
        }

        function closeModal() {
            modal.classList.remove('is-open');
            modal.setAttribute('aria-hidden', 'true');
            document.body.style.overflow = '';

            // Return focus to trigger
            if (triggerElement) {
                triggerElement.focus();
                triggerElement = null;
            }
        }

        cvBtn.addEventListener('click', openModal);

        if (overlay) {
            overlay.addEventListener('click', closeModal);
        }

        if (closeBtn) {
            closeBtn.addEventListener('click', closeModal);
        }

        // ESC to close
        document.addEventListener('keydown', function (e) {
            if (e.key === 'Escape' && modal.classList.contains('is-open')) {
                closeModal();
            }
        });

        // Focus trap inside modal
        modal.addEventListener('keydown', function (e) {
            if (e.key !== 'Tab') return;
            if (!modal.classList.contains('is-open')) return;

            var focusable = modal.querySelectorAll(
                'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
            );

            if (focusable.length === 0) return;

            var first = focusable[0];
            var last = focusable[focusable.length - 1];

            if (e.shiftKey) {
                if (document.activeElement === first) {
                    e.preventDefault();
                    last.focus();
                }
            } else {
                if (document.activeElement === last) {
                    e.preventDefault();
                    first.focus();
                }
            }
        });
    }

})();
