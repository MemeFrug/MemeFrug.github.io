const canvas = document.getElementById('backgroundCanvas');
const textDiv = document.getElementById('text');

// Typewriter effect - only on home page
if (textDiv) {
    setTimeout(() => {
        typeWriter("Hi (;", 0, () => {
            setTimeout(() => {
                textDiv.textContent = '';
                typeWriter("Max Knight", 0);
            }, 2000);
        });
    }, 1000);
}

function typeWriter(text, i, callback) {
    if (i < text.length) {
        textDiv.textContent += text.charAt(i);
        i++;
        setTimeout(() => typeWriter(text, i, callback), 100);
    } else if (callback) {
        callback();
    }
}

// Mobile menu toggle
const menuToggle = document.getElementById('menuToggle');
const navMenu = document.getElementById('navMenu');

menuToggle.addEventListener('click', () => {
    navMenu.parentElement.classList.toggle('mobile-open');
});

// Close menu when clicking on a link
document.querySelectorAll('nav a').forEach(link => {
    link.addEventListener('click', () => {
        navMenu.parentElement.classList.remove('mobile-open');
    });
});

// Mouse tracking
let mouseX = 0;
let mouseY = 0;

document.addEventListener('mousemove', (e) => {
    mouseX = e.clientX;
    mouseY = e.clientY;
});

    
// Returns a random number between two values (inclusive)
function randInt(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min
}
function randFloat(min, max) {
    return (Math.random() * (max - min)) + min
}

// Clamp function
function clamp(value, min, max) {
    return Math.min(Math.max(value, min), max);
}

let particles = []
let maxParticleNum = 10000 // Overridden when temp particles are added
let tempNewParticles = 0
var colors = ["#FFFFFF","#F00","#0F0",
                "#22F","#F0F", "#FF0",
                "#F70","#0EE"];
let lastTime = 0

if (pageDistance === undefined) {
    var pageDistance = 150; // Default distance for mouse repulsion
}

function backgroundUpdate(timestamp) {
    const dt = timestamp - lastTime;
    lastTime = timestamp;

    const canvas = document.getElementById("backgroundCanvas");
    const ctx = canvas.getContext('2d');

    // Set canvas size to match window
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    maxParticleNum = 100 + Math.floor((canvas.width * canvas.height) / 500); // Dynamic max particles based on screen size

    // Clear canvas
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    // Generate new Particles
    if (particles.length < maxParticleNum + tempNewParticles) {
        // console.log("Generation new particles:", maxParticleNum - particles.length);
        for (let i = 0; i < maxParticleNum - particles.length + tempNewParticles; i++) {
            let newParticle = {};
            newParticle.c = colors[randInt(0, colors.length - 1)];
            newParticle.r = randInt(2, 8);
            newParticle.x = randInt(0, canvas.width - newParticle.r * 2 + 130);
            newParticle.y = canvas.height + randInt(0, 400);
            newParticle.o = 0.5;
            newParticle.vo = randFloat(0.998, 0.9935); // Much slower fade rate
            newParticle.vx = randFloat(-0.5, 0.5);
            newParticle.vy = randFloat(-0.05, -0.3);
            if (tempNewParticles > 0) tempNewParticles -= 1;
            particles.push(newParticle);
        }
    }

    // Update particle's position + Draw the background
    particles.forEach(particle => {
        // Delete if out of view
        if (particle.y + particle.r * 2 < -300 || particle.x < -100 || particle.x > canvas.width + 100 || particle.o < 0.01) {
            particles.splice(particles.indexOf(particle), 1);
            return;
        }
        // Add the particle's velocity to its coordinates
        particle.x += particle.vx * dt;
        particle.vx = clamp(particle.vx * randFloat(0.98, 1), -1, 1);
        particle.y += particle.vy * dt;
        particle.vy = clamp(particle.vy * 1.001, -0.5, 0.5);
        particle.o = particle.o * particle.vo;

        // Push away from center if very close
        let centerX = canvas.width / 2;
        let centerY = canvas.height / 2 + 100;
        let dx = particle.x - centerX;
        let dy = particle.y - centerY;
        let dist = Math.sqrt(dx * dx + dy * dy);
        if (dist < pageDistance && dist > 0) {
            let force = 0.01;
            particle.vx += (dx / dist) * force;
            particle.vy += (dy / dist) * force/100;
        }

        // Push away from mouse cursor if very close
        dx = particle.x - mouseX;
        dy = particle.y - mouseY;
        dist = Math.sqrt(dx * dx + dy * dy);
        if (dist < 40 && dist > 0) {
            let force = 0.04;
            particle.vx += (dx / dist) * force;
            particle.vy += (dy / dist) * force/10;
        }

        // Draw
        ctx.save();
        ctx.globalAlpha = particle.o;
        ctx.fillStyle = particle.c;
        ctx.beginPath();
        ctx.arc(particle.x + particle.r, particle.y + particle.r, particle.r, 0, 2 * Math.PI);
        ctx.fill();
        ctx.restore();
    });

    requestAnimationFrame(backgroundUpdate);
}

// Start the animation loop
requestAnimationFrame(backgroundUpdate);