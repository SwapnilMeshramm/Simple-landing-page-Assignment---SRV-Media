/* =s==== HERO SLIDER ====s= */
const heroTrack = document.querySelector('.hero__track');
const heroSlides = document.querySelectorAll('.hero__slide');
const heroNext = document.querySelector('.hero__nav--next');
const heroPrev = document.querySelector('.hero__nav--prev');
let heroIndex = 0;

function showHeroSlide(i){
  heroSlides.forEach(slide=>slide.classList.remove('active'));
  heroSlides[i].classList.add('active');
  heroTrack.style.transform = `translateX(-${i*100}%)`;
}

heroNext.onclick = () => { heroIndex = (heroIndex + 1) % heroSlides.length; showHeroSlide(heroIndex); };
heroPrev.onclick = () => { heroIndex = (heroIndex - 1 + heroSlides.length) % heroSlides.length; showHeroSlide(heroIndex); };

/* Auto-play */
let heroAuto = setInterval(()=>heroNext.click(),5000);
heroTrack.addEventListener('mouseenter',()=>clearInterval(heroAuto));
heroTrack.addEventListener('mouseleave',()=>heroAuto=setInterval(()=>heroNext.click(),5000));

const schoolTrack = document.querySelector('.schools__track');
const schoolCards = document.querySelectorAll('.school-card');
const schoolDots = document.querySelectorAll('.dot');

function updateDots(index) {
  schoolDots.forEach(dot => dot.classList.remove('active'));
  if (schoolDots[index]) schoolDots[index].classList.add('active');
}

function detectActiveCard() {
  const cardWidth = schoolCards[0].offsetWidth;
  const index = Math.round(schoolTrack.scrollLeft / cardWidth);
  updateDots(index);
}

schoolTrack.addEventListener('scroll', () => {
  if (window.innerWidth <= 768) {
    clearTimeout(schoolTrack.scrollTimeout);
    schoolTrack.scrollTimeout = setTimeout(detectActiveCard, 100);
  }
});

schoolDots.forEach((dot, i) => {
  dot.addEventListener('click', () => {
    schoolTrack.scrollTo({
      left: schoolCards[0].offsetWidth * i,
      behavior: 'smooth'
    });
    updateDots(i);
  });
});



/* =s==== EXHIBITION CONTINUOUS SCROLL ====s= */
const track = document.querySelector('.exhibition__track');
const cards = Array.from(track.children);

const isMobile = window.matchMedia('(max-width: 768px)').matches;

if (!isMobile) {
  // Duplicate cards ONLY for desktop
  cards.forEach(card => track.appendChild(card.cloneNode(true)));

  let position = 0;
  let speed = 0.4;
  let paused = false;

  function animate() {
    if (!paused) {
      position += speed;
      if (position >= track.scrollWidth / 2) position = 0;
      track.style.transform = `translateX(${-position}px)`;
    }
    requestAnimationFrame(animate);
  }

  track.addEventListener('mouseenter', () => paused = true);
  track.addEventListener('mouseleave', () => paused = false);
  track.addEventListener('focusin', () => paused = true);
  track.addEventListener('focusout', () => paused = false);

  animate();
}

