// ===== ELEMEN FORM =====
const form = document.getElementById("registrationForm");
const successMessage = document.getElementById("successMessage");

// Setiap kolom didaftar di sini: elemen, id pesan error, dan cara mengeceknya.
const fields = [
    { el: document.getElementById("nama"), errorId: "namaError",
      cek: function (v) { return v.trim().length >= 3; },
      pesan: "Nama minimal 3 karakter." },

    { el: document.getElementById("email"), errorId: "emailError",
      cek: function (v) { return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v.trim()); },
      pesan: "Format email tidak valid." },

    { el: document.getElementById("password"), errorId: "passwordError",
      cek: function (v) { return v.length >= 8; },
      pesan: "Password minimal 8 karakter." },

    { el: document.getElementById("confirmPassword"), errorId: "confirmPasswordError",
      cek: function (v) { return v !== "" && v === document.getElementById("password").value; },
      pesan: "Konfirmasi password harus sama." },

    { el: document.getElementById("ekskul"), errorId: "ekskulError",
      cek: function (v) { return v !== ""; },
      pesan: "Silakan pilih ekstrakurikuler." }
];

function togglePassword(fieldId, btn) {
    const field = document.getElementById(fieldId);
    const tampil = field.type === "password";
    field.type = tampil ? "text" : "password";
    btn.textContent = tampil ? "Sembunyikan" : "Lihat";
}

// Mengecek semua kolom satu per satu memakai perulangan for.
function validasi() {
    let semuaBenar = true;

    for (let i = 0; i < fields.length; i++) {
        const f = fields[i];
        const valid = f.cek(f.el.value);
        const errorEl = document.getElementById(f.errorId);

        f.el.classList.toggle("valid", valid);
        f.el.classList.toggle("invalid", !valid);
        errorEl.textContent = valid ? "" : f.pesan;
        errorEl.classList.toggle("show", !valid);

        if (!valid) semuaBenar = false;
    }

    return semuaBenar;
}

for (let i = 0; i < fields.length; i++) {
    const event = fields[i].el.tagName === "SELECT" ? "change" : "input";
    fields[i].el.addEventListener(event, validasi);
}

form.addEventListener("submit", function (event) {
    event.preventDefault();
    const namaEl = document.getElementById("nama");

    if (validasi()) {
        successMessage.textContent = "Pendaftaran berhasil! Terima kasih, " + namaEl.value.trim() + ".";
        successMessage.classList.add("show");
    } else {
        successMessage.textContent = "";
        successMessage.classList.remove("show");
    }
});

// ===== CHATBOT =====
const chatToggle = document.getElementById("chatToggle");
const chatWindow = document.getElementById("chatWindow");
const chatClose = document.getElementById("chatClose");
const chatBody = document.getElementById("chatBody");
const chatInput = document.getElementById("chatInput");
const chatSend = document.getElementById("chatSend");
const chatBadge = document.getElementById("chatBadge");

const faq = [
    { keys: ["ekskul apa", "pilihan ekskul", "ekstrakurikuler apa saja", "list ekskul"],
      answer: "Ekstrakurikuler yang tersedia: Pramuka, PMR, Paskibra, OSIS, Rohis, Futsal, Basket, Voli, Seni Musik, dan Seni Tari." },
    { keys: ["password", "kata sandi"],
      answer: "Password minimal 8 karakter, dan Konfirmasi Password harus sama persis dengan Password." },
    { keys: ["email"],
      answer: "Email harus memakai format yang valid, contohnya namakamu@email.com." },
    { keys: ["nama"],
      answer: "Nama lengkap wajib diisi minimal 3 karakter." },
    { keys: ["gagal", "error", "tidak bisa"],
      answer: "Kalau gagal, cek kolom yang bertanda merah. Kolom valid akan berwarna hijau." },
    { keys: ["biaya", "bayar", "gratis"],
      answer: "Pendaftaran ekstrakurikuler ini gratis, tidak dipungut biaya." },
    { keys: ["cara daftar", "bagaimana cara", "gimana cara", "panduan"],
      answer: "Isi Nama, Email, Password, Konfirmasi Password, pilih Ekstrakurikuler, lalu klik \"Daftar Sekarang\"." },
    { keys: ["halo", "hai", "hi", "selamat"],
      answer: "Halo! Aku Asisten Ekskul. Ada yang bisa dibantu soal pendaftaran?" },
    { keys: ["terima kasih", "makasih", "thanks"],
      answer: "Sama-sama! Semangat mengembangkan bakat dan minatmu 🎓" }
];

const defaultAnswer = "Maaf, aku belum paham. Coba tanyakan soal ekskul, cara daftar, atau syarat password ya.";
const quickQuestions = ["Ekskul apa saja yang tersedia?", "Bagaimana cara daftar?", "Syarat password apa?"];

function addMessage(text, sender) {
    const el = document.createElement("div");
    el.className = "msg " + sender;
    el.textContent = text;
    chatBody.appendChild(el);
    chatBody.scrollTop = chatBody.scrollHeight;
}

function addQuickReplies() {
    const wrap = document.createElement("div");
    wrap.className = "quick-replies";

    for (let i = 0; i < quickQuestions.length; i++) {
        const q = quickQuestions[i];
        const btn = document.createElement("button");
        btn.className = "quick-reply-btn";
        btn.textContent = q;
        btn.onclick = function () { handleUserMessage(q); };
        wrap.appendChild(btn);
    }

    chatBody.appendChild(wrap);
    chatBody.scrollTop = chatBody.scrollHeight;
}

// Mencari jawaban dengan mengecek tiap FAQ dan tiap kata kunci di dalamnya.
function botReply(userText) {
    const lower = userText.toLowerCase();

    for (let i = 0; i < faq.length; i++) {
        for (let j = 0; j < faq[i].keys.length; j++) {
            if (lower.indexOf(faq[i].keys[j]) !== -1) {
                return faq[i].answer;
            }
        }
    }

    return defaultAnswer;
}

function handleUserMessage(text) {
    const trimmed = text.trim();
    if (trimmed === "") return;

    addMessage(trimmed, "user");
    chatInput.value = "";
    setTimeout(function () { addMessage(botReply(trimmed), "bot"); }, 350);
}

chatToggle.addEventListener("click", function () {
    chatWindow.classList.toggle("open");
    chatBadge.style.display = "none";

    if (chatBody.children.length === 0) {
        addMessage("Halo! Tanyakan apa saja soal pendaftaran, atau pilih salah satu di bawah ini 👇", "bot");
        addQuickReplies();
    }
});

chatClose.addEventListener("click", function () {
    chatWindow.classList.remove("open");
});

chatSend.addEventListener("click", function () {
    handleUserMessage(chatInput.value);
});

chatInput.addEventListener("keydown", function (e) {
    if (e.key === "Enter") handleUserMessage(chatInput.value);
});