if (window.tailwind) {
    tailwind.config = {
        theme: {
            extend: {
                animation: {
                    'fade-in': 'fadeIn 1s ease-out',
                    'fade-in-up': 'fadeInUp 1s ease-out'
                },
                keyframes: {
                    fadeIn: { '0%': { opacity: '0' }, '100%': { opacity: '1' } },
                    fadeInUp: {
                        '0%': { opacity: '0', transform: 'translateY(40px)' },
                        '100%': { opacity: '1', transform: 'translateY(0)' }
                    }
                }
            }
        }
    };
}

document.documentElement.style.scrollBehavior = 'smooth';

const navToggle = document.getElementById('navToggle');
const mobileMenu = document.getElementById('mobileMenu');

if (mobileMenu) {
    mobileMenu.classList.remove('hidden'); // serahkan tampil/sembunyi ke CSS
}

navToggle?.addEventListener('click', () => {
    mobileMenu?.classList.toggle('menu-open');
});

// ----------------------------------------------------------------
// 4. DARK MODE TOGGLE
// Prinsip: simpan pilihan user ('dark'/'light') ke localStorage,
// supaya saat halaman dibuka lagi nanti, tema yang sama langsung
// dipakai tanpa user perlu klik ulang.
// ----------------------------------------------------------------
(function initDarkMode() {
    const KEY = 'dpmfh-theme';
    const btn = document.getElementById('dark-toggle-btn');
    const mobileBtn = document.getElementById('dark-toggle-mobile');

    function updateDesktopIcon(isDark) {
        if (!btn) return;
        const moon = btn.querySelector('.fa-moon');
        const sun = btn.querySelector('.fa-sun');
        if (moon) moon.style.display = isDark ? 'none' : 'inline-block';
        if (sun) sun.style.display = isDark ? 'inline-block' : 'none';
        btn.setAttribute('aria-pressed', isDark);
    }

    function updateMobileIcon(isDark) {
        if (!mobileBtn) return;
        const hasSun = mobileBtn.querySelector('.fa-sun');
        const hasMoon = mobileBtn.querySelector('.fa-moon');
        if (hasSun || hasMoon) {
            if (hasSun) hasSun.style.display = isDark ? 'inline-block' : 'none';
            if (hasMoon) hasMoon.style.display = isDark ? 'none' : 'inline-block';
        } else {
            mobileBtn.innerHTML = 'Dark Mode <i class="fas ' + (isDark ? 'fa-sun' : 'fa-moon') + ' ml-2"></i>';
        }
    }

    function applyTheme(theme) {
        const isDark = theme === 'dark';
        document.documentElement.classList.toggle('dark', isDark);
        updateDesktopIcon(isDark);
        updateMobileIcon(isDark);
    }

    function toggleTheme() {
        const isDark = document.documentElement.classList.contains('dark');
        const next = isDark ? 'light' : 'dark';
        try { localStorage.setItem(KEY, next); } catch (e) { /* localStorage mungkin dimatikan */ }
        applyTheme(next);
    }

    btn?.addEventListener('click', toggleTheme);
    mobileBtn?.addEventListener('click', toggleTheme);

    try {
        const saved = localStorage.getItem(KEY);
        applyTheme(saved === 'dark' ? 'dark' : 'light'); // default selalu Light kalau belum pernah pilih
    } catch (e) {
        applyTheme('light');
    }
})();
const backToTopBtn = document.getElementById('back-to-top');

if (backToTopBtn) {
    window.addEventListener('scroll', () => {
        if (window.scrollY > 300) {
            backToTopBtn.classList.add('show');
        } else {
            backToTopBtn.classList.remove('show');
        }
    });

    backToTopBtn.addEventListener('click', () => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    });
}

(function initScrollReveal() {
    const revealElements = document.querySelectorAll('[data-reveal]');
    if (!revealElements.length) return;

    // Fallback untuk browser sangat lawas tanpa IntersectionObserver
    if (!('IntersectionObserver' in window)) {
        revealElements.forEach(el => el.classList.add('is-visible'));
        return;
    }

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('is-visible');
                observer.unobserve(entry.target); // sudah muncul, tak perlu dipantau lagi
            }
        });
    }, {
        threshold: 0.15,
        rootMargin: '0px 0px -40px 0px'
    });

    revealElements.forEach(el => observer.observe(el));
})();
