/* ============================================================
   DPM FH UNNES — UNIVERSAL INTERACTION ENGINE
   Version: 1.0

   Responsibilities:
   - Universal dark/light mode
   - Theme persistence
   - System theme detection
   - Theme button state
   - Mobile navigation
   - Scroll reveal
   - Navbar scroll state
   - Back-to-top
   - Hero subtle parallax
   - Accessibility
   ============================================================ */

(() => {

    'use strict';


    /* ============================================================
       01. DOM REFERENCES
       ============================================================ */

    const root = document.documentElement;

    const themeButton =
        document.getElementById('dark-toggle-btn');

    const nav =
        document.querySelector('nav');

    const navToggle =
        document.getElementById('navToggle');

    const navMenu =
        document.getElementById('navMenu');

    const backToTop =
        document.getElementById('back-to-top');

    const heroBackground =
        document.getElementById('site-hero-bg');


    /* ============================================================
       02. THEME SYSTEM
       ============================================================ */

    const THEME_KEY = 'dpm-theme';


    /**
     * Get user's preferred theme.
     *
     * Priority:
     * 1. Saved preference
     * 2. System preference
     * 3. Light mode
     */
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


    /**
     * Apply theme to entire document.
     *
     * IMPORTANT:
     * This function does NOT decide how every page looks.
     *
     * It only controls:
     *
     * <html class="dark">
     *
     * Each HTML page can then style its own components
     * using html.dark selectors / global CSS variables.
     */
    function applyTheme(theme) {

        const isDark =
            theme === 'dark';

        root.classList.toggle(
            'dark',
            isDark
        );

        root.dataset.theme =
            isDark
                ? 'dark'
                : 'light';

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
                themeButton.querySelector(
                    '.fa-moon'
                );

            const sun =
                themeButton.querySelector(
                    '.fa-sun'
                );

            if (moon) {
                moon.classList.toggle(
                    'hidden',
                    isDark
                );
            }

            if (sun) {
                sun.classList.toggle(
                    'hidden',
                    !isDark
                );
            }
        }
    }


    /**
     * Initialize theme immediately.
     */
    applyTheme(
        getPreferredTheme()
    );


    /**
     * Theme toggle.
     */
    themeButton?.addEventListener(
        'click',
        () => {

            const isCurrentlyDark =
                root.classList.contains('dark');

            const nextTheme =
                isCurrentlyDark
                    ? 'light'
                    : 'dark';

            localStorage.setItem(
                THEME_KEY,
                nextTheme
            );

            applyTheme(
                nextTheme
            );
        }
    );


    /**
     * If user has NOT manually selected a theme,
     * follow operating-system theme changes.
     */
    if (window.matchMedia) {

        const mediaQuery =
            window.matchMedia(
                '(prefers-color-scheme: dark)'
            );

        const handleSystemThemeChange =
            (event) => {

                const savedTheme =
                    localStorage.getItem(
                        THEME_KEY
                    );

                /*
                 * Do not override user's explicit choice.
                 */
                if (savedTheme) {
                    return;
                }

                applyTheme(
                    event.matches
                        ? 'dark'
                        : 'light'
                );
            };


        /*
         * Modern browsers.
         */
        if (mediaQuery.addEventListener) {

            mediaQuery.addEventListener(
                'change',
                handleSystemThemeChange
            );

        }

        /*
         * Compatibility fallback.
         */
        else if (mediaQuery.addListener) {

            mediaQuery.addListener(
                handleSystemThemeChange
            );
        }
    }


    /* ============================================================
       03. MOBILE NAVIGATION
       ============================================================ */

    function closeMobileMenu() {

        if (!navMenu) {
            return;
        }

        navMenu.classList.add(
            'hidden'
        );

        navToggle?.setAttribute(
            'aria-expanded',
            'false'
        );
    }


    function toggleMobileMenu() {

        if (!navMenu) {
            return;
        }

        const isOpen =
            !navMenu.classList.contains(
                'hidden'
            );

        navMenu.classList.toggle(
            'hidden'
        );

        navToggle?.setAttribute(
            'aria-expanded',
            String(!isOpen)
        );
    }


    navToggle?.setAttribute(
        'aria-expanded',
        'false'
    );


    navToggle?.addEventListener(
        'click',
        toggleMobileMenu
    );


    /**
     * Close mobile menu after clicking an in-page link.
     */
    navMenu?.querySelectorAll(
        'a[href^="#"]'
    ).forEach(link => {

        link.addEventListener(
            'click',
            () => {

                if (
                    window.innerWidth < 768
                ) {
                    closeMobileMenu();
                }

            }
        );

    });


    /**
     * Close mobile menu when clicking outside.
     */
    document.addEventListener(
        'click',
        (event) => {

            if (
                window.innerWidth >= 768 ||
                !navMenu ||
                navMenu.classList.contains('hidden')
            ) {
                return;
            }

            const clickedInsideMenu =
                navMenu.contains(event.target);

            const clickedToggle =
                navToggle?.contains(event.target);

            if (
                !clickedInsideMenu &&
                !clickedToggle
            ) {
                closeMobileMenu();
            }

        }
    );


    /**
     * Close mobile menu when viewport becomes desktop.
     */
    window.addEventListener(
        'resize',
        () => {

            if (
                window.innerWidth >= 768
            ) {
                closeMobileMenu();
            }

        }
    );


   /* ============================================================
   04. SCROLL REVEAL
   ============================================================ */

if ('IntersectionObserver' in window) {

    const revealElements =
        document.querySelectorAll(
            '[data-reveal]'
        );


    /*
     * Enable the reveal system ONLY after JavaScript
     * is confirmed to be running.
     *
     * Without this class, elements stay visible.
     * This prevents a blank page if JS fails.
     */
    revealElements.forEach(
        (element, index) => {

            element.classList.add(
                'dpm-reveal-ready'
            );


            /*
             * Small stagger.
             *
             * Maximum delay:
             * 210ms
             */
            const delay =
                Math.min(
                    index % 4,
                    3
                ) * 70;


            element.style.transitionDelay =
                `${delay}ms`;

        }
    );


    const revealObserver =
        new IntersectionObserver(
            (entries) => {

                entries.forEach(
                    (entry) => {

                        if (
                            !entry.isIntersecting
                        ) {
                            return;
                        }


                        entry.target.classList.add(
                            'is-visible'
                        );


                        revealObserver.unobserve(
                            entry.target
                        );

                    }
                );

            },
            {
                threshold: 0.12,

                rootMargin:
                    '0px 0px -40px 0px'
            }
        );


    revealElements.forEach(
        (element) => {

            revealObserver.observe(
                element
            );

        }
    );


} else {

    /*
     * Fallback for browsers that don't support
     * IntersectionObserver.
     *
     * Everything stays visible.
     */
    document
        .querySelectorAll(
            '[data-reveal]'
        )
        .forEach(
            (element) => {

                element.classList.add(
                    'is-visible'
                );

            }
        );
}


/* ============================================================
   05. SCROLL STATE
   ============================================================ */

let ticking = false;


function updateScrollState() {

    const scrollY =
        window.scrollY;


    /*
     * Navbar shadow.
     */
    if (nav) {

        nav.classList.toggle(
            'shadow-lg',
            scrollY > 12
        );

    }


    /*
     * Back to top.
     */
    if (backToTop) {

        backToTop.classList.toggle(
            'show',
            scrollY > 500
        );

    }


    /*
     * Hero parallax.
     */
    if (
        heroBackground &&
        scrollY < 700 &&
        !window.matchMedia(
            '(prefers-reduced-motion: reduce)'
        ).matches
    ) {

        const offset =
            Math.min(
                scrollY * 0.035,
                22
            );


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


    window.requestAnimationFrame(
        updateScrollState
    );
}


window.addEventListener(
    'scroll',
    requestScrollUpdate,
    {
        passive: true
    }
);


/*
 * Initial state.
 */
updateScrollState();


    /* ============================================================
       06. BACK TO TOP
       ============================================================ */

    backToTop?.addEventListener(
        'click',
        () => {

            window.scrollTo({
                top: 0,
                behavior: 'smooth'
            });

        }
    );


    /* ============================================================
       07. KEYBOARD ACCESSIBILITY
       ============================================================ */

    document.addEventListener(
        'keydown',
        (event) => {

            /*
             * Escape closes mobile navigation.
             */
            if (
                event.key === 'Escape'
            ) {

                closeMobileMenu();

                navToggle?.focus();
            }

        }
    );


    /* ============================================================
       08. PAGE READY
       ============================================================ */

    document.documentElement.classList.add(
        'dpm-ready'
    );

})();
