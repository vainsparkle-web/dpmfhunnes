/* ============================================================
   DPM FH UNNES — UNIVERSAL INTERACTION ENGINE v2
   Version: 2.0

   Responsibilities:
   - Universal dark/light mode (desktop + mobile toggle)
   - Theme persistence & system theme detection
   - Smooth mobile navigation (navMenu / mobileMenu)
   - Scroll reveal via IntersectionObserver
   - Navbar scroll state & active link highlight
   - Back-to-top
   - Hero subtle parallax
   - Accessibility (Escape, focus rings, reduced motion)
   ============================================================ */

(() => {

    'use strict';

    /* ============================================================
       01. DOM REFERENCES
       ============================================================ */

    const root = document.documentElement;

    const themeButton =
        document.getElementById('dark-toggle-btn');

    const mobileThemeButton =
        document.getElementById('dark-toggle-mobile');

    const nav =
        document.querySelector('nav');

    const navToggle =
        document.getElementById('navToggle');

    // Halaman modern memakai #navMenu sebagai panel mobile.
    // Halaman lama memakai #mobileMenu terpisah.
    const mobilePanel =
        document.getElementById('mobileMenu') ||
        document.getElementById('navMenu');

    const backToTop =
        document.getElementById('back-to-top');

    const heroBackground =
        document.getElementById('site-hero-bg');


    /* ============================================================
       02. THEME SYSTEM
       ============================================================ */

    const THEME_KEY = 'dpm-theme';

    function getPreferredTheme() {
        const savedTheme =
            localStorage.getItem(THEME_KEY);

        if (
            savedTheme === 'dark' ||
            savedTheme === 'light'
        ) {
            return savedTheme;
        }

        if (
            window.matchMedia &&
            window.matchMedia(
                '(prefers-color-scheme: dark)'
            ).matches
        ) {
            return 'dark';
        }

        return 'light';
    }

    function updateThemeIcons(isDark) {
        if (themeButton) {
            themeButton.setAttribute(
                'aria-pressed',
                String(isDark)
            );

            themeButton.setAttribute(
                'title',
                isDark
                    ? 'Gunakan Light Mode'
                    : 'Gunakan Dark Mode'
            );

            themeButton.setAttribute(
                'aria-label',
                isDark
                    ? 'Gunakan Light Mode'
                    : 'Gunakan Dark Mode'
            );

            const moon =
                themeButton.querySelector('.fa-moon');

            const sun =
                themeButton.querySelector('.fa-sun');

            if (moon) {
                moon.classList.toggle('hidden', isDark);
            }

            if (sun) {
                sun.classList.toggle('hidden', !isDark);
            }
        }

        if (mobileThemeButton) {
            let moon =
                mobileThemeButton.querySelector('.fa-moon');

            let sun =
                mobileThemeButton.querySelector('.fa-sun');

            if (!moon && !sun) {
                mobileThemeButton.innerHTML =
                    'Dark Mode <i class="fas fa-moon ml-2"></i>';
                moon =
                    mobileThemeButton.querySelector('.fa-moon');
            }

            if (moon) {
                moon.style.display =
                    isDark ? 'none' : 'inline-block';
            }

            if (sun) {
                sun.style.display =
                    isDark ? 'inline-block' : 'none';
            }
        }
    }

    function applyTheme(theme) {
        const isDark =
            theme === 'dark';

        root.classList.toggle('dark', isDark);
        root.dataset.theme = isDark ? 'dark' : 'light';

        updateThemeIcons(isDark);
    }

    // Inisialisasi tema secepat mungkin (sebelum paint).
    applyTheme(getPreferredTheme());

    function toggleTheme() {
        const isCurrentlyDark =
            root.classList.contains('dark');

        const nextTheme =
            isCurrentlyDark ? 'light' : 'dark';

        try {
            localStorage.setItem(THEME_KEY, nextTheme);
        } catch (e) { /* ignore storage errors */ }

        applyTheme(nextTheme);
    }

    themeButton?.addEventListener('click', toggleTheme);
    mobileThemeButton?.addEventListener('click', toggleTheme);

    // Ikuti perubahan tema sistem selama user belum memilih manual.
    if (window.matchMedia) {
        const mediaQuery =
            window.matchMedia('(prefers-color-scheme: dark)');

        const handleSystemThemeChange = (event) => {
            if (localStorage.getItem(THEME_KEY)) {
                return;
            }
            applyTheme(event.matches ? 'dark' : 'light');
        };

        if (mediaQuery.addEventListener) {
            mediaQuery.addEventListener(
                'change',
                handleSystemThemeChange
            );
        } else if (mediaQuery.addListener) {
            mediaQuery.addListener(handleSystemThemeChange);
        }
    }


    /* ============================================================
       03. MOBILE NAVIGATION (smooth — transisi ditangani CSS)
       ============================================================ */

    function closeMobileMenu() {
        if (!mobilePanel) {
            return;
        }

        mobilePanel.classList.add('hidden');

        navToggle?.setAttribute('aria-expanded', 'false');
        navToggle?.setAttribute('aria-label', 'Buka menu');
    }

    function toggleMobileMenu() {
        if (!mobilePanel) {
            return;
        }

        const isOpen =
            !mobilePanel.classList.contains('hidden');

        mobilePanel.classList.toggle('hidden', isOpen);

        navToggle?.setAttribute(
            'aria-expanded',
            String(!isOpen)
        );

        navToggle?.setAttribute(
            'aria-label',
            isOpen ? 'Buka menu' : 'Tutup menu'
        );
    }

    navToggle?.setAttribute('aria-expanded', 'false');
    navToggle?.setAttribute('aria-label', 'Buka menu');

    navToggle?.addEventListener('click', toggleMobileMenu);

    // Tutup menu setelah klik tautan dalam halaman (mobile).
    mobilePanel?.querySelectorAll(
        'a[href^="#"], a[href$=".html#"]'
    ).forEach(link => {
        link.addEventListener('click', () => {
            if (window.innerWidth < 768) {
                closeMobileMenu();
            }
        });
    });

    // Tutup menu saat klik di luar.
    document.addEventListener('click', (event) => {
        if (
            window.innerWidth >= 768 ||
            !mobilePanel ||
            mobilePanel.classList.contains('hidden')
        ) {
            return;
        }

        const clickedInsidePanel =
            mobilePanel.contains(event.target);

        const clickedToggle =
            navToggle?.contains(event.target);

        if (!clickedInsidePanel && !clickedToggle) {
            closeMobileMenu();
        }
    });

    // Tutup menu saat viewport menjadi desktop.
    window.addEventListener('resize', () => {
        if (window.innerWidth >= 768) {
            closeMobileMenu();
        }
    });


    /* ============================================================
       04. SCROLL REVEAL (IntersectionObserver)
       ============================================================ */

    if ('IntersectionObserver' in window) {

        /*
         * Kumpulkan elemen yang akan di-reveal:
         * 1. Elemen yang sudah memakai [data-reveal] (halaman modern)
         * 2. .glass-card
         * 3. Kartu .bg-white di dalam section/main (halaman lama)
         */
        const targets = new Set(
            document.querySelectorAll('[data-reveal]')
        );

        document
            .querySelectorAll(
                '.glass-card, section .bg-white, main .bg-white'
            )
            .forEach((el) => {
                if (el.hasAttribute('data-reveal')) {
                    return;
                }
                el.classList.add('dpm-reveal-target');
                targets.add(el);
            });

        targets.forEach((element, index) => {
            element.classList.add('dpm-reveal-ready');

            const delay =
                Math.min(index % 4, 3) * 70;

            element.style.transitionDelay =
                `${delay}ms`;
        });

        const revealObserver =
            new IntersectionObserver(
                (entries) => {
                    entries.forEach((entry) => {
                        if (!entry.isIntersecting) {
                            return;
                        }

                        entry.target.classList.add('is-visible');
                        entry.target.style.transitionDelay = '0ms';
                        revealObserver.unobserve(entry.target);
                    });
                },
                {
                    threshold: 0.12,
                    rootMargin: '0px 0px -40px 0px'
                }
            );

        targets.forEach((element) => {
            revealObserver.observe(element);
        });

    } else {

        // Fallback browser lama: semua tetap terlihat.
        document
            .querySelectorAll(
                '[data-reveal], .dpm-reveal-target'
            )
            .forEach((element) => {
                element.classList.add('is-visible');
            });
    }


    /* ============================================================
       05. SCROLL STATE (navbar + back-to-top + parallax)
       ============================================================ */

    const reducedMotion =
        window.matchMedia &&
        window.matchMedia(
            '(prefers-reduced-motion: reduce)'
        ).matches;

    let ticking = false;

    function updateScrollState() {
        const scrollY = window.scrollY;

        // Navbar shadow
        if (nav) {
            nav.classList.toggle(
                'nav-scrolled',
                scrollY > 12
            );
        }

        // Back to top
        if (backToTop) {
            backToTop.classList.toggle(
                'show',
                scrollY > 500
            );
        }

        // Hero parallax (dimatikan saat prefers-reduced-motion)
        if (
            heroBackground &&
            scrollY < 700 &&
            !reducedMotion
        ) {
            const offset =
                Math.min(scrollY * 0.035, 22);

            heroBackground.style.transform =
                `scale(1.02) translateY(${offset}px)`;
        }

        ticking = false;
    }

    function requestScrollUpdate() {
        if (ticking) {
            return;
        }

        ticking = true;

        window.requestAnimationFrame(updateScrollState);
    }

    window.addEventListener(
        'scroll',
        requestScrollUpdate,
        { passive: true }
    );

    updateScrollState();


    /* ============================================================
       06. BACK TO TOP
       ============================================================ */

    backToTop?.addEventListener('click', () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });


    /* ============================================================
       07. KEYBOARD ACCESSIBILITY
       ============================================================ */

    document.addEventListener('keydown', (event) => {
        if (event.key === 'Escape') {
            closeMobileMenu();
            navToggle?.focus();
        }
    });


    /* ============================================================
       08. EXPAND / COLLAPSE ALL (halaman Policy/Privacy)
       ============================================================ */

    const expandAllButton =
        document.getElementById('expand-all');

    const collapseAllButton =
        document.getElementById('collapse-all');

    if (expandAllButton || collapseAllButton) {

        const policyDetails = Array.from(
            document.querySelectorAll('main details')
        );

        function setAllDetails(open) {
            policyDetails.forEach((details) => {
                details.open = open;
            });

            updateButtonStates(open);
        }

        // Hanya perbarui tampilan tombol tanpa mengubah <details>.
        function updateButtonStates(allOpen) {
            expandAllButton?.classList.toggle(
                'opacity-40',
                allOpen
            );

            expandAllButton?.setAttribute(
                'aria-disabled',
                String(allOpen)
            );

            collapseAllButton?.classList.toggle(
                'opacity-40',
                !allOpen
            );

            collapseAllButton?.setAttribute(
                'aria-disabled',
                String(!allOpen)
            );
        }

        expandAllButton?.addEventListener(
            'click',
            () => setAllDetails(true)
        );

        collapseAllButton?.addEventListener(
            'click',
            () => setAllDetails(false)
        );

        // Sinkronkan tampilan tombol dengan state awal <details>
        // tanpa mengubah state buka/tutup halaman.
        const allInitiallyOpen = policyDetails.every(
            (details) => details.open
        );

        updateButtonStates(allInitiallyOpen);
    }


    /* ============================================================
       09. PAGE READY
       ============================================================ */

    document.documentElement.classList.add('dpm-ready');

})();
