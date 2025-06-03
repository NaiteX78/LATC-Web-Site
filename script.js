const toggleBtn = document.getElementById('toggle-btn');
const menu = document.getElementById('menu');

toggleBtn.addEventListener('click', () => {
    toggleBtn.classList.toggle('open');
    menu.classList.toggle('collapsed');
})


/*const canvas = document.getElementById('canvas');
const ctx = canvas.getContext('2d');

let w, h;

function resize(){
    w = canvas.width = window.innerWidth;
    h = canvas.height = window.innerHeight;
}

window.addEventListener('resize', resize);
resize();

class SmoothCurve{
    constructor(){
        this.startY = Math.random() * h;
        this.amplitude = 30 + Math.random() * 40;
        this.speed = 0.15 + Math.random() * 0.25;
        this.thickness = 1.15 + Math.random() * 2;
        this.offset = Math.random() * 1000;

        this.colorHue = Math.random() * 360;
    }

    draw(time) {
        ctx.beginPath();
        let yOffset = this.startY;
        const step = 8;
        ctx.moveTo(-w, yOffset);

        for (let x = -w; x < w * 2; x+= step){
            let y = yOffset + Math.sin((x + time * this.speed + this.offset) * 0.002) * this.amplitude;
            ctx.lineTo(x, y);
        }

        this.colorHue = (this.colorHue + 0.5) % 360;
        const color1 = `hsl(${this.colorHue}, 80%, 60%)`;
        const color2 = `hsl(${(this.colorHue + 60) % 360}, 80%, 60%)`;

        const grad = ctx.createLinearGradient(0, 0, w, h);
        grad.addColorStop(0, color1);
        grad.addColorStop(1, color2);

        ctx.strokeStyle = grad;
        ctx.lineWidth = this.thickness;

        ctx.shadowColor = color1;
        ctx.shadowBlur = 15;

        ctx.stroke();
    }
}

const curves = Array.from({ length: 7}, () => new SmoothCurve());

function animate(time = 0){
    ctx.fillStyle = "rgba(0, 0, 0,)";
    ctx.fillRect(0, 0, w, h);

    for (const curve of curves){
        curve.draw(time);
    }

    requestAnimationFrame(animate);
}

animate();*/ //Lignes pour les aurores boréales









/*const canvas = document.getElementById('canvas');
const ctx = canvas.getContext('2d');

// Définir la taille du canvas à la taille de la fenêtre
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

// Couleurs pour les aurores boréales
const colors = ['#14e81e', '#00ea8d', '#017ed5', '#b53dff', '#8d00c4'];

// Particules pour les aurores boréales
let particles = [];
const particleCount = 100;

// Classe Particule
class Particle {
    constructor() {
        this.x = Math.random() * canvas.width;
        this.y = Math.random() * canvas.height;
        this.size = Math.random() * 3 + 1;
        this.speedX = Math.random() * 0.5 - 0.25;
        this.speedY = Math.random() * 0.5 - 0.25;
        this.color = colors[Math.floor(Math.random() * colors.length)];
        this.opacity = Math.random() * 0.5 + 0.1;
    }

    update() {
        this.x += this.speedX;
        this.y += this.speedY;

        if (this.x < 0 || this.x > canvas.width) this.speedX *= -1;
        if (this.y < 0 || this.y > canvas.height) this.speedY *= -1;
    }

    draw() {
        ctx.fillStyle = this.color;
        ctx.globalAlpha = this.opacity;
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
        ctx.closePath();
        ctx.fill();
    }
}

// Initialiser les particules
function init() {
    particles = [];
    for (let i = 0; i < particleCount; i++) {
        particles.push(new Particle());
    }
}

// Boucle d'animation
function animate() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.globalAlpha = 1;

    for (let i = 0; i < particles.length; i++) {
        particles[i].update();
        particles[i].draw();
    }

    requestAnimationFrame(animate);
}

// Gérer le redimensionnement de la fenêtre
window.addEventListener('resize', () => {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    init();
});

// Démarrer l'animation
init();
animate();*/ //Point se baladant partouts


const canvas = document.getElementById('canvas');
const ctx = canvas.getContext('2d');

// Définir la taille du canvas à la taille de la fenêtre
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

// Couleurs pour les particules
const colors = ['#ff0000', '#0000ff'];

// Trou noir
const blackHole = {
    x: canvas.width / 2,
    y: canvas.height / 2,
    radius: 30,
    color: '#000'
};

// Particules
let particles = [];
const particleCount = 200;

// Classe Particule
class Particle {
    constructor() {
        this.x = Math.random() * canvas.width;
        this.y = Math.random() * canvas.height;
        this.size = Math.random() * 2 + 1;
        this.speedX = Math.random() * 2 - 1;
        this.speedY = Math.random() * 2 - 1;
        this.color = colors[Math.floor(Math.random() * colors.length)];
        this.opacity = Math.random() * 0.8 + 0.2;
    }

    update() {
        // Calculer la distance entre la particule et le trou noir
        const dx = blackHole.x - this.x;
        const dy = blackHole.y - this.y;
        const distance = Math.sqrt(dx * dx + dy * dy);

        // Calculer la force de gravité
        const force = 5000;
        const gravity = force / (distance * distance + 1000);

        // Mettre à jour la vitesse en fonction de la gravité
        this.speedX += dx * gravity / distance;
        this.speedY += dy * gravity / distance;

        // Mettre à jour la position
        this.x += this.speedX;
        this.y += this.speedY;

        // Réduire l'opacité en fonction de la distance au trou noir
        this.opacity = Math.max(0.1, distance / canvas.width * 1.5);
    }

    draw() {
        ctx.fillStyle = this.color;
        ctx.globalAlpha = this.opacity;
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
        ctx.closePath();
        ctx.fill();
    }
}

// Dessiner le trou noir avec distorsion de lumière
function drawBlackHole() {
    const gradient = ctx.createRadialGradient(blackHole.x, blackHole.y, blackHole.radius, blackHole.x, blackHole.y, blackHole.radius * 3);
    gradient.addColorStop(0, 'rgba(0, 0, 0, 1)');
    gradient.addColorStop(0.5, 'rgba(127, 0, 255, 0.2)');
    gradient.addColorStop(1, 'rgba(0, 0, 0, 0)');

    ctx.fillStyle = gradient;
    ctx.beginPath();
    ctx.arc(blackHole.x, blackHole.y, blackHole.radius * 3, 0, Math.PI * 2);
    ctx.closePath();
    ctx.fill();

    // Dessiner le trou noir
    ctx.fillStyle = blackHole.color;
    ctx.beginPath();
    ctx.arc(blackHole.x, blackHole.y, blackHole.radius, 0, Math.PI * 2);
    ctx.closePath();
    ctx.fill();
}

// Initialiser les particules
function init() {
    particles = [];
    for (let i = 0; i < particleCount; i++) {
        particles.push(new Particle());
    }
}

// Boucle d'animation
function animate() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.globalAlpha = 1;

    // Dessiner le trou noir avec distorsion de lumière
    drawBlackHole();

    // Mettre à jour et dessiner les particules
    particles.forEach(particle => {
        particle.update();
        particle.draw();
    });

    requestAnimationFrame(animate);
}

// Gérer le redimensionnement de la fenêtre
window.addEventListener('resize', () => {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    blackHole.x = canvas.width / 2;
    blackHole.y = canvas.height / 2;
    init();
});

// Démarrer l'animation
init();
animate();