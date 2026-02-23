const footerHTML = `
    <footer class="bg-gray-800 text-white py-12 relative z-20">
        <div class="container mx-auto px-6">
            <div class="grid md:grid-cols-4 gap-8">
                <div class="fade-in">
                    <div class="flex items-center space-x-4 mb-4">
                        <img src="logo dpm fh.png" alt="Logo DPM FH UNNES" class="w-8 h-8 object-contain">
                        <div class="flex flex-col">
                            <h2 class="text-lg font-bold text-white leading-tight">DPM FH UNNES</h2>
                            <p class="mt-1 text-xs text-gray-400 leading-tight">Parlemen Satya Mandala</p>
                        </div>
                    </div>
                    <p class="text-gray-300 mb-4 italic">Menjadi wadah aspirasi mahasiswa dan mengembangkan potensi mahasiswa Fakultas Hukum UNNES.</p>
                    <div class="flex space-x-4">
                        <a href="#" class="text-gray-400 hover:text-white transition"><i class="fab fa-facebook-f"></i></a>
                        <a href="#" class="text-gray-400 hover:text-white transition"><i class="fab fa-twitter"></i></a>
                        <a href="https://instagram.com/dpmfhunnes" class="text-gray-400 hover:text-white transition"><i class="fab fa-instagram"></i></a>
                        <a href="#" class="text-gray-400 hover:text-white transition"><i class="fab fa-linkedin-in"></i></a>
                    </div>
                </div>
                <div class="fade-in delay-1 space-x-8">
                    <h3 class="text-lg font-bold mb-4 mx-8">Tautan Cepat</h3>
                    <ul class="space-y-1">
                        <li><a href="index.html#home" class="text-gray-400 hover:text-white transition">Beranda</a></li>
                        <li><a href="index.html#about" class="text-gray-400 hover:text-white transition">Tentang Kami</a></li>
                        <li><a href="index.html#events" class="text-gray-400 hover:text-white transition">Program Kerja</a></li>
                        <li><a href="index.html#team" class="text-gray-400 hover:text-white transition">Daftar Komisi</a></li>
                    </ul>
                </div>
                <div class="fade-in delay-3" id="contact-column">
                    <h3 class="text-lg font-bold mb-4">Jam Operasional</h3>
                    <ul class="space-y-3">
                        <li class="flex items-start"><i class="fas fa-clock mr-3 text-blue-400"></i><span class="text-gray-400">Senin-Kamis: 07.00-17.00</span></li>
                        <li class="flex items-center"><i class="fas fa-clock mr-3 text-blue-400"></i><a class="text-gray-400">Jumat: 08:00-15.00</a></li>
                        <li class="flex items-center"><i class="fas fa-clock mr-3 text-blue-400"></i><a class="text-gray-400">Sabtu-Minggu: Tutup</a></li>
                    </ul>
                </div>
                <div class="fade-in delay-3" id="contact-column">
                    <h3 class="text-lg font-bold mb-4">Info Kontak</h3>
                    <ul class="space-y-3">
                        <li class="flex items-start"><i class="fas fa-map-marker-alt mt-1 mr-3 text-blue-400"></i><span class="text-gray-400"><a href="https://maps.google.com" target="blank" class="hover:text-white-400">Fakultas Hukum, Universitas Negeri Semarang<br>Sekaran, Gunungpati, Semarang, 50229</a></span></li>
                        <li class="flex items-center"><i class="fas fa-envelope mr-3 text-blue-400"></i><a href="mailto:dpmfhunnes2026@gmail.com" class="text-gray-400 hover:text-white transition">dpmfhunnes2026@gmail.com</a></li>
                        <li class="flex items-center"><i class="fas fa-phone-alt mr-3 text-blue-400"></i><a href="https://wa.me/6285786962003" class="text-gray-400 hover:text-white transition">0857-8696-2003</a></li>
                    </ul>
                </div>
            </div>
            <div class="border-t border-gray-700 mt-12 pt-8 text-center text-gray-500 text-sm fade-in">
                <p>&copy; 2025 DPM FH UNNES. All rights reserved.</p>
                <div class="mt-2">
                    <a href="Policy.html" class="hover:text-white transition">Privacy Policy</a> |  
                    <a href="https://www.instagram.com/lan.tease_" class="hover:text-white transition">Created by: Maulana Habibie Yahya</a> |
                    <a href="Terms.html" class="hover:text-white transition">Terms of Service</a>  
                </div>
            </div>
        </div>
    </footer>
`;

const target = document.getElementById("footer-placeholder");
if (target) {
    target.innerHTML = footerHTML;
}
