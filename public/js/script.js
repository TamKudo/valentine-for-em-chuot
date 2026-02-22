// 1. Hiệu ứng trái tim rơi (Dùng chung)
function createHeart() {
    const heart = document.createElement('div');
    heart.classList.add('heart');
    heart.innerHTML = '❤️';
    heart.style.left = Math.random() * 100 + 'vw';
    heart.style.animationDuration = Math.random() * 3 + 2 + 's';
    document.body.appendChild(heart);
    setTimeout(() => heart.remove(), 5000);
}
setInterval(createHeart, 300);

// 2. Hiệu ứng gõ chữ
const text = "Gửi em bé Trang iu của anhhh...\n Valentine này anh không biết nói gì hơn ngoài việc cảm ơn em đã ở bên cạnh anh. Chúc em luôn xinh đẹp, hạnh phúc và yêu anh nhiều hơn mỗi ngày nhéeee ạaaaaaaaaa :3! ❤️";
let index = 0;

function typeWriter() {
    const typingElement = document.getElementById("typing-text");
    if (typingElement && index < text.length) {
        typingElement.innerHTML += text.charAt(index);
        index++;
        setTimeout(typeWriter, 50);
    }
}

// 3. Logic Mật khẩu (Chỉ chạy ở trang chủ)
let currentPin = "";
const CORRECT_PIN = "3001";

function pressPin(num) {
    if (currentPin.length < 4) {
        currentPin += num;
        updateDots();

        if (currentPin.length === 4) {
            const lockScreen = document.getElementById('lock-screen');
            const container = document.querySelector('.lock-container');
            const msg = document.getElementById('pin-msg');

            if (currentPin === CORRECT_PIN) {
                // PHÁT NHẠC KHI ĐÚNG PIN
                const music = document.getElementById('bg-music');
                if (music) music.play().catch(e => console.log("Cần tương tác để phát nhạc"));

                lockScreen.style.transition = "opacity 0.8s ease";
                lockScreen.style.opacity = "0";
                setTimeout(() => {
                    lockScreen.style.display = "none";
                    document.getElementById('main-content').style.display = "block";
                }, 800);
            } else {
                if (container) container.classList.add('shake');
                if (msg) msg.innerText = "Ôi sai rùi, em bé nhập lại đi ạaaa! 😡";
                setTimeout(() => {
                    if (container) container.classList.remove('shake');
                    currentPin = "";
                    updateDots();
                }, 500);
            }
        }
    }
}

function updateDots() {
    const dots = document.querySelectorAll('.dot');
    if (dots.length === 0) return;
    dots.forEach((dot, idx) => {
        dot.classList.toggle('active', idx < currentPin.length);
    });
}

// 4. Mini game & Hiệu ứng nút "Có"
function moveButton() {
    const noBtn = document.getElementById('no-btn');
    if (!noBtn) return;
    const maxX = window.innerWidth - noBtn.offsetWidth - 20;
    const maxY = window.innerHeight - noBtn.offsetHeight - 20;
    noBtn.style.position = 'fixed';
    noBtn.style.left = Math.max(10, Math.floor(Math.random() * maxX)) + 'px';
    noBtn.style.top = Math.max(10, Math.floor(Math.random() * maxY)) + 'px';
    noBtn.style.transform = `rotate(${Math.random() * 40 - 20}deg)`;
}

function sayYes() {
    // Pháo hoa trái tim
    for (let i = 0; i < 30; i++) {
        setTimeout(() => {
            const h = document.createElement('div');
            h.innerHTML = '💖';
            h.style.cssText = `position:fixed; left:${Math.random() * 100}vw; top:${Math.random() * 100}vh; font-size:2rem; z-index:9999;`;
            document.body.appendChild(h);
            h.animate([{ transform: 'scale(0)', opacity: 1 }, { transform: 'scale(2) translateY(-100px)', opacity: 0 }], 1000);
            setTimeout(() => h.remove(), 1000);
        }, i * 50);
    }
    setTimeout(() => { alert("Hihi cảm ơn em bé đã iu anh ạaa! Yêu Trang nhất trên đời! ❤️"); }, 500);
}

// Khởi tạo trang
window.onload = () => {
    typeWriter();
    document.body.addEventListener('click', () => {
        const m = document.getElementById('bg-music');
        if (m && m.paused) m.play();
    }, { once: true });
};