// ===== FORM PENDAFTARAN =====

const form = document.getElementById("registrationForm");
const successMessage = document.getElementById("successMessage");

const fields = [
    ["nama", "namaError", "Nama minimal 3 karakter."],
    ["email", "emailError", "Format email tidak valid."],
    ["password", "passwordError", "Password minimal 8 karakter."],
    ["confirmPassword", "confirmPasswordError", "Konfirmasi password harus sama."],
    ["ekskul", "ekskulError", "Silakan pilih ekstrakurikuler."]
];


// ===== MENAMPILKAN PASSWORD =====

function togglePassword(id, tombol) {

    const input = document.getElementById(id);

    if (input.type === "password") {
        input.type = "text";
        tombol.textContent = "Sembunyikan";
    } else {
        input.type = "password";
        tombol.textContent = "Lihat";
    }
}


// ===== VALIDASI FORM =====

function validasi() {

    let semuaBenar = true;

    // Mengecek semua input menggunakan for
    for (let i = 0; i < fields.length; i++) {

        const input = document.getElementById(fields[i][0]);
        const error = document.getElementById(fields[i][1]);

        let benar = true;


        // Nama minimal 3 karakter
        if (fields[i][0] === "nama") {

            if (input.value.trim().length < 3) {
                benar = false;
            }
        }


        // Email harus sesuai format
        else if (fields[i][0] === "email") {

            const polaEmail =
                /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

            if (!polaEmail.test(input.value.trim())) {
                benar = false;
            }
        }


        // Password minimal 8 karakter
        else if (fields[i][0] === "password") {

            if (input.value.length < 8) {
                benar = false;
            }
        }


        // Konfirmasi password harus sama
        else if (fields[i][0] === "confirmPassword") {

            const password =
                document.getElementById("password").value;

            if (input.value !== password ||
                input.value === "") {

                benar = false;
            }
        }


        // Ekstrakurikuler harus dipilih
        else if (fields[i][0] === "ekskul") {

            if (input.value === "") {
                benar = false;
            }
        }


        // Jika benar
        if (benar) {

            input.classList.add("valid");
            input.classList.remove("invalid");

            error.textContent = "";
            error.classList.remove("show");

        }

        // Jika salah
        else {

            input.classList.add("invalid");
            input.classList.remove("valid");

            error.textContent = fields[i][2];
            error.classList.add("show");

            semuaBenar = false;
        }
    }

    return semuaBenar;
}


// ===== VALIDASI SAAT DIKETIK =====

for (let i = 0; i < fields.length; i++) {

    const input =
        document.getElementById(fields[i][0]);

    if (input.tagName === "SELECT") {

        input.addEventListener("change", validasi);

    } else {

        input.addEventListener("input", validasi);
    }
}


// ===== SAAT SUBMIT =====

form.addEventListener("submit", function(event) {

    // Mencegah halaman refresh
    event.preventDefault();

    if (validasi()) {

        const nama =
            document.getElementById("nama").value;

        successMessage.textContent =
            "Pendaftaran berhasil! Terima kasih, " +
            nama + ".";

        successMessage.classList.add("show");

    } else {

        successMessage.textContent = "";
        successMessage.classList.remove("show");
    }
});


// ==================================================
//                     CHATBOT
// ==================================================

const chatToggle =
    document.getElementById("chatToggle");

const chatWindow =
    document.getElementById("chatWindow");

const chatClose =
    document.getElementById("chatClose");

const chatBody =
    document.getElementById("chatBody");

const chatInput =
    document.getElementById("chatInput");

const chatSend =
    document.getElementById("chatSend");

const chatBadge =
    document.getElementById("chatBadge");


// Kata kunci chatbot
const pertanyaan = [
    "ekskul",
    "password",
    "email",
    "nama",
    "gagal",
    "biaya",
    "cara daftar",
    "halo"
];


// Jawaban chatbot
const jawaban = [
    "Ekskul yang tersedia: Pramuka, PMR, Paskibra, OSIS, Rohis, Futsal, Basket, Voli, Seni Musik, dan Seni Tari.",
    "Password minimal 8 karakter dan konfirmasi password harus sama.",
    "Email harus menggunakan format yang benar, contoh: nama@email.com.",
    "Nama lengkap minimal 3 karakter.",
    "Cek kolom yang berwarna merah. Kolom yang benar akan berwarna hijau.",
    "Pendaftaran ekstrakurikuler ini gratis.",
    "Isi Nama, Email, Password, Konfirmasi Password, pilih Ekstrakurikuler, lalu klik Daftar Sekarang.",
    "Halo! Ada yang bisa saya bantu?"
];


// Menambahkan pesan chatbot
function tambahPesan(teks, pengirim) {

    const pesan =
        document.createElement("div");

    pesan.className =
        "msg " + pengirim;

    pesan.textContent = teks;

    chatBody.appendChild(pesan);

    chatBody.scrollTop =
        chatBody.scrollHeight;
}


// Mencari jawaban menggunakan for
function jawabChatbot(teks) {

    teks = teks.toLowerCase();

    for (let i = 0; i < pertanyaan.length; i++) {

        if (teks.includes(pertanyaan[i])) {

            return jawaban[i];
        }
    }

    return "Maaf, saya belum memahami pertanyaan tersebut.";
}


// Mengirim pesan
function kirimPesan() {

    const teks =
        chatInput.value.trim();

    if (teks === "") {
        return;
    }

    tambahPesan(teks, "user");

    chatInput.value = "";

    const jawabanBot =
        jawabChatbot(teks);

    tambahPesan(jawabanBot, "bot");
}


// ===== BUKA CHATBOT =====

chatToggle.addEventListener("click", function() {

    chatWindow.classList.toggle("open");

    chatBadge.style.display = "none";

    if (chatBody.children.length === 0) {

        tambahPesan(
            "Halo! Ada yang bisa saya bantu tentang pendaftaran?",
            "bot"
        );
    }
});


// ===== TUTUP CHATBOT =====

chatClose.addEventListener("click", function() {

    chatWindow.classList.remove("open");
});


// ===== TOMBOL KIRIM =====

chatSend.addEventListener("click", function() {

    kirimPesan();
});


// ===== KIRIM DENGAN ENTER =====

chatInput.addEventListener("keydown", function(event) {

    if (event.key === "Enter") {

        kirimPesan();
    }
});