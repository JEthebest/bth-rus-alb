let currentMessage = 1;
const totalMessages = 7;
const crazyEmojis = ['💥', '🔥', '💯', '🎉', '🎊', '💫', '⚡️', '🌟', '✨', '🚀', '🎯', '🎸', '🔮', '💎'];
const glitchChars = '!@#$%^&*()_+-=[]{}|;:,.<>?';

// Создаем матричный эффект на фоне
function createMatrixEffect() {
    const canvas = document.createElement('canvas');
    canvas.style.position = 'fixed';
    canvas.style.top = '0';
    canvas.style.left = '0';
    canvas.style.width = '100%';
    canvas.style.height = '100%';
    canvas.style.zIndex = '-1';
    canvas.style.opacity = '0.1';
    document.body.appendChild(canvas);

    const ctx = canvas.getContext('2d');
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    const characters = '01';
    const fontSize = 10;
    const columns = canvas.width / fontSize;
    const drops = Array(Math.floor(columns)).fill(1);

    function draw() {
        ctx.fillStyle = 'rgba(0, 0, 0, 0.05)';
        ctx.fillRect(0, 0, canvas.width, canvas.height);
        ctx.fillStyle = '#0F0';
        ctx.font = fontSize + 'px monospace';

        for (let i = 0; i < drops.length; i++) {
            const text = characters[Math.floor(Math.random() * characters.length)];
            ctx.fillText(text, i * fontSize, drops[i] * fontSize);
            if (drops[i] * fontSize > canvas.height && Math.random() > 0.975) {
                drops[i] = 0;
            }
            drops[i]++;
        }
    }

    setInterval(draw, 33);
}

// Добавляем случайные эмодзи в фон
function addRandomEmoji() {
    const emoji = document.createElement('div');
    emoji.className = 'floating-emoji';
    emoji.textContent = crazyEmojis[Math.floor(Math.random() * crazyEmojis.length)];
    emoji.style.left = Math.random() * 100 + 'vw';
    emoji.style.transform = `scale(${Math.random() * 2 + 0.5}) rotate(${Math.random() * 360}deg)`;
    document.body.appendChild(emoji);
    
    setTimeout(() => {
        document.body.removeChild(emoji);
    }, 5000);
}

// Эффект глюка для текста
function glitchText(element) {
    const originalText = element.textContent;
    let iterations = 0;
    
    const interval = setInterval(() => {
        element.textContent = originalText
            .split('')
            .map((char, index) => {
                if (index < iterations) {
                    return originalText[index];
                }
                return glitchChars[Math.floor(Math.random() * glitchChars.length)];
            })
            .join('');
        
        iterations += 1/3;
        
        if (iterations >= originalText.length) {
            clearInterval(interval);
            element.textContent = originalText;
        }
    }, 30);
}

// Создаем эффект искажения экрана
function createDistortionEffect() {
    const distortion = document.createElement('div');
    distortion.style.position = 'fixed';
    distortion.style.top = '0';
    distortion.style.left = '0';
    distortion.style.width = '100%';
    distortion.style.height = '100%';
    distortion.style.pointerEvents = 'none';
    distortion.style.zIndex = '1000';
    distortion.style.background = 'url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADIAAAAyBAMAAADsEZWCAAAAGFBMVEUAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAVfk6YAAAACHRSTlMoEhALBgQDAgIrpfgAAABCSURBVDjLY2AgErBAqYIwBqMaFHRQg4LOaBgUNKrBGCAwGg2jYVDQqAZj0EFhELKGYWsYEgbhaxgRBpFoGDkGkWoAAKxXBP0kB0KgAAAAAElFTkSuQmCC)';
    distortion.style.opacity = '0.1';
    document.body.appendChild(distortion);
}

// Инициализация всех эффектов
createMatrixEffect();
createDistortionEffect();
setInterval(addRandomEmoji, 300);

function nextMessage() {
    // Эффект глюка для текущего сообщения
    const currentElement = document.getElementById(`message${currentMessage}`);
    currentElement.style.animation = 'glitchOut 0.5s forwards';
    
    setTimeout(() => {
        currentElement.classList.add('hidden');
        currentMessage++;
        
        if (currentMessage === totalMessages) {
            const finalElement = document.getElementById('final');
            finalElement.classList.remove('hidden');
            finalElement.style.animation = 'glitchIn 0.5s forwards';
            
            // Добавляем больше безумных эффектов для финального экрана
            for(let i = 0; i < 30; i++) {
                setTimeout(addRandomEmoji, i * 100);
            }
            
            // Глючим все тексты в финальном экране
            finalElement.querySelectorAll('h1, p').forEach(element => {
                glitchText(element);
            });
        } else {
            const nextElement = document.getElementById(`message${currentMessage}`);
            nextElement.classList.remove('hidden');
            nextElement.style.animation = 'glitchIn 0.5s forwards';
            
            // Глючим заголовок нового сообщения
            const header = nextElement.querySelector('h1');
            if (header) {
                glitchText(header);
            }
        }
    }, 500);
}

function restart() {
    // Эффект глюка при перезапуске
    document.querySelectorAll('.message').forEach(msg => {
        msg.style.animation = 'glitchOut 0.5s forwards';
    });
    
    setTimeout(() => {
        for (let i = 1; i < totalMessages; i++) {
            document.getElementById(`message${i}`).classList.add('hidden');
        }
        document.getElementById('final').classList.add('hidden');
        
        currentMessage = 1;
        const firstMessage = document.getElementById('message1');
        firstMessage.classList.remove('hidden');
        firstMessage.style.animation = 'glitchIn 0.5s forwards';
        
        // Глючим заголовок первого сообщения
        const header = firstMessage.querySelector('h1');
        if (header) {
            glitchText(header);
        }
    }, 500);
}

// Добавляем стили для новых анимаций
const style = document.createElement('style');
style.textContent = `
    @keyframes glitchOut {
        0% {
            transform: translate(0);
            opacity: 1;
        }
        20% {
            transform: translate(-10px) skew(-10deg);
        }
        40% {
            transform: translate(10px) skew(10deg);
        }
        60% {
            transform: translate(-5px) skew(5deg);
        }
        80% {
            transform: translate(5px) skew(-5deg);
        }
        100% {
            transform: translate(0);
            opacity: 0;
        }
    }
    
    @keyframes glitchIn {
        0% {
            transform: translate(0);
            opacity: 0;
        }
        20% {
            transform: translate(-10px) skew(-10deg);
        }
        40% {
            transform: translate(10px) skew(10deg);
        }
        60% {
            transform: translate(-5px) skew(5deg);
        }
        80% {
            transform: translate(5px) skew(-5deg);
        }
        100% {
            transform: translate(0);
            opacity: 1;
        }
    }
    
    .floating-emoji {
        position: fixed;
        font-size: 24px;
        animation: float 5s linear forwards;
        z-index: 1000;
        pointer-events: none;
    }
    
    @keyframes float {
        0% {
            transform: translateY(-100%) rotate(0deg);
            opacity: 1;
        }
        100% {
            transform: translateY(100vh) rotate(720deg);
            opacity: 0;
        }
    }
`;
document.head.appendChild(style);
