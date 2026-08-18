// ========================================================= */
// 4. محرك الخلفية النيون المتحركة (Cyber perspective Matrix Grid)
// ========================================================= */
const canvas = document.getElementById("neonBackground");
const ctx = canvas.getContext("2d");
let width = (canvas.width = window.innerWidth);
let height = (canvas.height = window.innerHeight);

const mouse = { x: width / 2, y: height / 2, targetX: width / 2, targetY: height / 2 };
window.addEventListener("mousemove", (e) => {
    mouse.targetX = e.clientX;
    mouse.targetY = e.clientY;
});
window.addEventListener("resize", () => {
    width = canvas.width = window.innerWidth;
    height = canvas.height = window.innerHeight;
});

function updateMouse() {
    mouse.x += (mouse.targetX - mouse.x) * 0.08;
    mouse.y += (mouse.targetY - mouse.y) * 0.08;
}

class DigitalParticle {
    constructor() {
        this.reset();
        this.y = Math.random() * height;
    }
    reset() {
        this.x = Math.random() * width;
        this.y = height + Math.random() * 20;
        this.size = Math.random() * 3 + 2;
        this.speedY = Math.random() * 0.5 + 0.3;
        this.alpha = Math.random() * 0.2 + 0.05;
        this.color = Math.random() > 0.5 ? `rgba(0, 242, 254, ${this.alpha})` : `rgba(188, 186, 234, ${this.alpha})`;
    }
    update() {
        this.y -= this.speedY;
        if (this.y < -10) this.reset();
    }
    draw() {
        ctx.fillStyle = this.color;
        ctx.fillRect(this.x, this.y, this.size, this.size);
    }
}

const particles = Array.from({ length: 45 }, () => new DigitalParticle());
let gridOffset = 0;

function drawBackgroundEngine() {
    // تحديث مستمر يحافظ على استمرارية حركة النيون وتفاعله
    ctx.fillStyle = "#040510";
    ctx.fillRect(0, 0, width, height);

    // إنشاء وهج نيون متحرك ذكي يتبع الماوس
    const gradient = ctx.createRadialGradient(mouse.x, mouse.y, 10, mouse.x, mouse.y, width * 0.4);
    gradient.addColorStop(0, "rgba(0, 242, 254, 0.07)");
    gradient.addColorStop(0.5, "rgba(188, 186, 234, 0.04)");
    gradient.addColorStop(1, "rgba(4, 5, 16, 0)");
    ctx.fillStyle = gradient;
    ctx.fillRect(0, 0, width, height);

    ctx.strokeStyle = "rgba(188, 186, 234, 0.025)";
    ctx.lineWidth = 1;

    // إحداث حركة انسيابية مستمرة للخطوط الشبكية المودرن لتبدو متحركة نيون
    gridOffset += 0.5;
    if (gridOffset >= 40) gridOffset = 0;
    for (let y = height * 0.3; y < height; y += 40) {
        let currentY = y + gridOffset;
        if (currentY < height) {
            ctx.beginPath();
            ctx.moveTo(0, currentY);
            ctx.lineTo(width, currentY);
            ctx.stroke();
        }
    }
    const vX = width / 2,
        vY = height * 0.2;
    for (let i = 0; i <= 30; i++) {
        ctx.beginPath();
        ctx.moveTo(vX, vY);
        ctx.lineTo((width / 30) * i, height);
        ctx.stroke();
    }
}

// تشغيل الحلقة اللانهائية للأنيميشن وتحديث حركة الجزيئات
function animate() {
    updateMouse();
    drawBackgroundEngine();
    particles.forEach((p) => {
        p.update();
        p.draw();
    });
    requestAnimationFrame(animate);
}
animate();
