window.onload = () => {

    setTimeout(() => {
        document.body.classList.remove("not-loaded");
    }, 1000);
    createHearts();
    setupOverlays();
    setupAlbum();
};


function createHearts() {
    const container = document.querySelector('.heart-container');
    if(!container) return; 

    const heartCount = 25; 

    for (let i = 0; i < heartCount; i++) {
        const heart = document.createElement('div');
        heart.classList.add('bg-heart');
        

        heart.style.left = Math.random() * 100 + 'vw';
        heart.style.animationDuration = Math.random() * 10 + 5 + 's, ' + (Math.random() * 2 + 1) + 's';
        heart.style.animationDelay = Math.random() * 5 + 's';
        

        const size = Math.random() * 15 + 10;
        heart.style.width = size + 'px';
        heart.style.height = size + 'px';
        
        container.appendChild(heart);
    }
}


function setupOverlays() {
    const letterBtn = document.getElementById('letterTrigger');
    const albumBtn = document.getElementById('albumTrigger');
    const letterOverlay = document.getElementById('letterOverlay');
    const albumOverlay = document.getElementById('albumOverlay');
    const closeBtns = document.querySelectorAll('.close-overlay');


    if(!letterBtn || !albumBtn) return;

    function openOverlay(overlay) {
        document.querySelectorAll('.overlay').forEach(el => el.classList.remove('active'));
        overlay.classList.add('active');
    }

    function closeAll() {
        document.querySelectorAll('.overlay').forEach(el => el.classList.remove('active'));
    }

    letterBtn.addEventListener('click', () => openOverlay(letterOverlay));
    albumBtn.addEventListener('click', () => openOverlay(albumOverlay));
    
    closeBtns.forEach(btn => btn.addEventListener('click', closeAll));
}

function setupAlbum() {
    if(!document.getElementById('albumImage')) return;
    const photos = [
        { 
            url: "pic1.jpg", 
            text: "Phio" 
        },
        { 
            url: "pic2.jpg", 
            text: "Peony from the other day" 
        },
        { 
            url: "pic3.jpg", 
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
        
     
        imgEl.style.opacity = 0.5;
        
        setTimeout(() => {
            imgEl.src = photos[idx].url;
            txtEl.innerText = photos[idx].text;
     
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

  
    updatePhoto();
}
