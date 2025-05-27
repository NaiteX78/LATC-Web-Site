const toggleBtn = document.getElementById('toggle-btn');
const menu = document.getElementById('menu');

toggleBtn.addEventListener('click', () => {
    toggleBtn.classList.toggle('open');
    menu.classList.toggle('collapsed');
})


const canvas = document.getElementById('canvas');
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

animate();