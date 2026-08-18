const footerHTML = `
<footer class="site-footer relative z-20">
    <div class="container mx-auto px-6 py-14">
        <div class="grid md:grid-cols-2 lg:grid-cols-4 gap-10 lg:gap-8">

            <!-- Brand & Sosial -->
            <div data-reveal>
                <div class="flex items-center gap-3 mb-4">
                    <img src="picset/logo dpm fh.png" alt="Logo DPM FH UNNES" class="w-10 h-10 object-contain rounded-xl p-1 bg-white/85 shadow-sm">
                    <div class="flex flex-col">
                        <h2 class="footer-brand-name text-lg leading-tight">DPM FH UNNES</h2>
                        <p class="footer-tagline mt-1">Parlemen Satya Mandala</p>
                    </div>
                </div>

                <p class="footer-blurb">
                    Menjadi wadah aspirasi mahasiswa dan mengembangkan potensi mahasiswa Fakultas Hukum UNNES.
                </p>

                <div class="flex gap-3 mt-6">
                    <a href="#" class="footer-social" aria-label="Facebook"><i class="fab fa-facebook-f"></i></a>
                    <a href="#" class="footer-social" aria-label="Twitter"><i class="fab fa-twitter"></i></a>
                    <a href="https://instagram.com/dpmfhunnes" class="footer-social" aria-label="Instagram"><i class="fab fa-instagram"></i></a>
                    <a href="#" class="footer-social" aria-label="LinkedIn"><i class="fab fa-linkedin-in"></i></a>
                </div>
            </div>

            <!-- Tautan Cepat -->
            <div data-reveal>
                <h3 class="footer-title mb-5">Tautan Cepat</h3>
                <ul class="space-y-3">
                    <li><a href="index.html#home" class="footer-link"><i class="fas fa-chevron-right text-[0.55rem]"></i>Beranda</a></li>
                    <li><a href="index.html#about" class="footer-link"><i class="fas fa-chevron-right text-[0.55rem]"></i>Tentang Kami</a></li>
                    <li><a href="index.html#events" class="footer-link"><i class="fas fa-chevron-right text-[0.55rem]"></i>Program Kerja</a></li>
                    <li><a href="index.html#team" class="footer-link"><i class="fas fa-chevron-right text-[0.55rem]"></i>Daftar Komisi</a></li>
                </ul>
            </div>

            <!-- Jam Operasional -->
            <div data-reveal>
                <h3 class="footer-title mb-5">Jam Operasional</h3>
                <ul class="space-y-3">
                    <li class="flex items-start gap-3"><i class="fas fa-clock mt-1 text-blue-400"></i><span class="footer-text">Senin-Kamis: 07.00-17.00</span></li>
                    <li class="flex items-center gap-3"><i class="fas fa-clock text-blue-400"></i><span class="footer-text">Jumat: 08:00-15.00</span></li>
                    <li class="flex items-center gap-3"><i class="fas fa-clock text-blue-400"></i><span class="footer-text">Sabtu-Minggu: Tutup</span></li>
                </ul>
            </div>

            <!-- Info Kontak -->
            <div data-reveal>
                <h3 class="footer-title mb-5">Info Kontak</h3>
                <ul class="space-y-3">
                    <li class="flex items-start gap-3">
                        <i class="fas fa-map-marker-alt mt-1 text-blue-400"></i>
                        <a href="https://maps.google.com" target="_blank" rel="noopener" class="footer-block-link">
                            Fakultas Hukum, Universitas Negeri Semarang<br>Sekaran, Gunungpati, Semarang, 50229
                        </a>
                    </li>
                    <li class="flex items-center gap-3">
                        <i class="fas fa-envelope text-blue-400"></i>
                        <a href="mailto:dpmfhunnes2026@gmail.com" class="footer-link">dpmfhunnes2026@gmail.com</a>
                    </li>
                    <li class="flex items-center gap-3">
                        <i class="fas fa-phone-alt text-blue-400"></i>
                        <a href="https://wa.me/6285786962003" class="footer-link">0857-8696-2003</a>
                    </li>
                </ul>
            </div>

        </div>

        <!-- Bottom bar -->
        <div class="footer-divider mt-12 pt-8 text-center text-sm">
            <p>&copy; 2025 DPM FH UNNES. All rights reserved.</p>
            <div class="mt-3 flex flex-wrap justify-center items-center gap-x-3 gap-y-2">
                <a href="Policy.html" class="footer-bottom-link">Privacy Policy</a>
                <span class="footer-sep">|</span>
                <a href="https://www.instagram.com/lan.tease_" class="footer-bottom-link">Created by: Maulana Habibie Yahya</a>
                <span class="footer-sep">|</span>
                <a href="Terms.html" class="footer-bottom-link">Terms of Service</a>
            </div>
        </div>
    </div>
</footer>
`;

const target = document.getElementById("footer-placeholder");
if (target) {
    target.innerHTML = footerHTML;
}
