// Countdown Timer
document.addEventListener('DOMContentLoaded', () => {
    let timeLeft = 29 * 60 + 39; // 29 minutes and 39 seconds
    const countdownElement = document.getElementById('countdown');

    if (countdownElement) {
        const countdownTimer = setInterval(() => {
            const minutes = Math.floor(timeLeft / 60);
            const seconds = timeLeft % 60;
            countdownElement.textContent = `${minutes}:${seconds < 10 ? '0' : ''}${seconds}`;
            timeLeft--;

            if (timeLeft < 0) {
                clearInterval(countdownTimer);
                countdownElement.textContent = "Offer expired";
            }
        }, 1000);
    }

    // Initialize Matrix Rain Effect
    const canvas = document.getElementById('matrix');
    const ctx = canvas.getContext('2d');

    // Set canvas to full screen
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    // Characters for the Matrix effect
    const chars = 'アァカサタナハマヤャラワガザダバパイィキシチニヒミリヰギジヂビピウゥクスツヌフムユュルグズヅブプエェケセテネヘメレヱゲゼデベペオォコソトノホモヨョロゴゾドボポン0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZ';
    const fontSize = 16;
    const columns = canvas.width / fontSize;
    const drops = [];

    // Initialize drops
    for (let x = 0; x < columns; x++) {
        drops[x] = Math.floor(Math.random() * canvas.height / fontSize);
    }

    // Draw the Matrix rain effect
    function drawMatrix() {
        ctx.fillStyle = 'rgba(0, 0, 0, 0.05)';
        ctx.fillRect(0, 0, canvas.width, canvas.height);

        ctx.fillStyle = '#00ff00'; // Matrix green text
        ctx.font = `${fontSize}px 'VT323', monospace`;

        for (let i = 0; i < drops.length; i++) {
            const text = chars.charAt(Math.floor(Math.random() * chars.length));
            ctx.fillText(text, i * fontSize, drops[i] * fontSize);

            // Randomly reset drop to the top
            if (drops[i] * fontSize > canvas.height || Math.random() > 0.975) {
                drops[i] = 0;
            }

            drops[i]++;
        }
    }

    setInterval(drawMatrix, 33); // Approximately 30 frames per second

    // Handle window resize
    window.addEventListener('resize', () => {
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
        // Reinitialize drops on resize
        for (let x = 0; x < columns; x++) {
            drops[x] = Math.floor(Math.random() * canvas.height / fontSize);
        }
    });

    // Initialize YouTube API for Audio
    let player;
    window.onYouTubeIframeAPIReady = function () {
        player = new YT.Player('player', {
            height: '0',
            width: '0',
            videoId: '_fTMAZsnc-0',  // YouTube video ID
            events: {
                'onReady': onPlayerReady,
            }
        });
    };

    function onPlayerReady(event) {
        // Loop the audio
        event.target.setVolume(100);
        event.target.playVideo();
        player.mute();  // Mute the video by default
        player.setLoop(true);
    }

    // Function to play audio when user clicks or scrolls
    function playAudio() {
        if (player && player.getPlayerState() !== YT.PlayerState.PLAYING) {
            player.unMute(); // Unmute the video when user interacts
            player.playVideo();
        }
    }

    // Event listeners for play on click or scroll
    document.addEventListener('click', playAudio);
    window.addEventListener('scroll', playAudio);
});
