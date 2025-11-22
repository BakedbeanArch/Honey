window.onload = () => {
    // 1. Remove Not Loaded Class (Starts Animation)
    setTimeout(() => {
        document.body.classList.remove("not-loaded");
    }, 1000);

    // 2. Generate Floating Hearts (Works on both pages)
    createHearts();

    // 3. Setup Logic (Only runs if elements exist)
    setupOverlays();
    setupAlbum();
};

// --- HEART ANIMATION ---
function createHearts() {
    const container = document.querySelector('.heart-container');
    if(!container) return; // Exit if not found

    const heartCount = 25; 

    for (let i = 0; i < heartCount; i++) {
        const heart = document.createElement('div');
        heart.classList.add('bg-heart');
        
        // Random Position & Animation
        heart.style.left = Math.random() * 100 + 'vw';
        heart.style.animationDuration = Math.random() * 10 + 5 + 's, ' + (Math.random() * 2 + 1) + 's';
        heart.style.animationDelay = Math.random() * 5 + 's';
        
        // Random Size
        const size = Math.random() * 15 + 10;
        heart.style.width = size + 'px';
        heart.style.height = size + 'px';
        
        container.appendChild(heart);
    }
}

// --- OVERLAY/POPUP LOGIC ---
function setupOverlays() {
    const letterBtn = document.getElementById('letterTrigger');
    const albumBtn = document.getElementById('albumTrigger');
    const letterOverlay = document.getElementById('letterOverlay');
    const albumOverlay = document.getElementById('albumOverlay');
    const closeBtns = document.querySelectorAll('.close-overlay');

    // Only proceed if buttons exist (prevents error on index.html)
    if(!letterBtn || !albumBtn) return;

    function openOverlay(overlay) {
        // Close any currently open overlay
        document.querySelectorAll('.overlay').forEach(el => el.classList.remove('active'));
        // Open the requested one
        overlay.classList.add('active');
    }

    function closeAll() {
        document.querySelectorAll('.overlay').forEach(el => el.classList.remove('active'));
    }

    letterBtn.addEventListener('click', () => openOverlay(letterOverlay));
    albumBtn.addEventListener('click', () => openOverlay(albumOverlay));
    
    closeBtns.forEach(btn => btn.addEventListener('click', closeAll));
}

// --- PHOTO ALBUM LOGIC ---
function setupAlbum() {
    // Only proceed if album image element exists
    if(!document.getElementById('albumImage')) return;

    // === YOUR IMAGES HERE ===
    // Ensure your files are named exactly like this inside the "images" folder.
    const photos = [
        { 
            url: "images/pic1.jpg", 
            text: "Phio" 
        },
        { 
            url: "images/pic2.jpg", 
            text: "Peony from the other day" 
        },
        { 
            url: "images/pic3.jpg", 
            text: "MEEE" 
        }
    ];

    let idx = 0;
    const imgEl = document.getElementById('albumImage');
    const txtEl = document.getElementById('albumCaption');
    const prevBtn = document.getElementById('prevPhoto');
    const nextBtn = document.getElementById('nextPhoto');

    function updatePhoto() {
        if(photos.length === 0) return;
        
        // Fade out slightly before changing
        imgEl.style.opacity = 0.5;
        
        setTimeout(() => {
            imgEl.src = photos[idx].url;
            txtEl.innerText = photos[idx].text;
            // Fade back in
            imgEl.style.opacity = 1;
        }, 200);
    }

    if(prevBtn) {
        prevBtn.addEventListener('click', () => { 
            idx = (idx === 0) ? photos.length - 1 : idx - 1; 
            updatePhoto(); 
        });
    }

    if(nextBtn) {
        nextBtn.addEventListener('click', () => { 
            idx = (idx === photos.length - 1) ? 0 : idx + 1; 
            updatePhoto(); 
        });
    }

    // Load initial photo
    updatePhoto();
}