/* ============================================================
   PIONEER ACADEMY — SITE SCRIPT
   Renders teacher & staff data, handles filters, modal,
   scroll reveals, sticky header and mobile nav.
   ============================================================ */
/*CLOCK FUNCTION*/
<script>
  function updateClock() {
    const now = new Date();
    let hours = now.getHours();
    let minutes = now.getMinutes();
    let seconds = now.getSeconds();

    // Convert 24-hour format to 12-hour format if needed
    // let ampm = hours >= 12 ? 'PM' : 'AM';
    // hours = hours % 12;
    // hours = hours ? hours : 12; // the hour '0' should be '12'

    // Add leading zero if the number is less than 10
    hours = hours < 10 ? '0' + hours : hours;
    minutes = minutes < 10 ? '0' + minutes : minutes;
    seconds = seconds < 10 ? '0' + seconds : seconds;

    const timeString = `${hours}:${minutes}:${seconds}`;
    document.getElementById('live-clock').textContent = timeString;
  }

  // Update the clock every 1 second (1000 milliseconds)
  setInterval(updateClock, 1000);
  
  // Initialize clock immediately when page loads
  updateClock();
</script>



/* ---------- Data ---------- */
const AVATAR_PALETTE = [
  ['#E9722E','#C6511C'], // sunrise
  ['#1F6F63','#164F47'], // teal
  ['#F3B23E','#C6511C'], // marigold->sunrise
  ['#223259','#17233F'], // indigo
  ['#B0563C','#7A3A28'], // clay
  ['#3D7A6B','#1F4F44'], // deep teal
];

function initials(name){
  return name.split(' ').filter(Boolean).slice(0,2).map(w=>w[0]).join('').toUpperCase();
}

const CATEGORIES = {
  english:'English', maths:'Mathematics', science:'Science',
  social:'Social Science', language:'Languages', computer:'Computer',
  primary:'Primary Wing', arts:'Arts & Sports'
};

const TEACHERS = [
  {name:'Mr. Rakhibul Ahmed', subject:'General Science', cat:'science', qual:'B.Sc.', bio:'Introduces science to the middle wing through observation walks around the school campus.'},
  {name:'Mr. Aminul Islam', subject:'Senior English', cat:'english', qual:'M.A. English, B.Ed.', bio:'Heads the English department and mentors students for debate and elocution competitions across the district.'},
  {name:'Ms. Rehana Khatun', subject:'English', cat:'english', qual:'B.A. English, B.Ed.', bio:'Believes storytelling is the fastest way into a new language, and runs the school\u2019s weekly reading circle.'},
  {name:'Mr. Nurul Haque', subject:'English (Junior)', cat:'english', qual:'B.A., D.El.Ed.', bio:'Teaches spoken English to the primary wing through songs, flashcards and classroom games.'},
  {name:'Mr. Bikram Das', subject:'Mathematics', cat:'maths', qual:'M.Sc. Mathematics, B.Ed.', bio:'Runs the Saturday Maths Club, where students build number sense through puzzles rather than formulas alone.'},
  {name:'Ms. Farida Yeasmin', subject:'Mathematics', cat:'maths', qual:'B.Sc., B.Ed.', bio:'Focuses on foundational arithmetic for Classes III\u2013V, with a special interest in mental maths drills.'},
  {name:'Mr. Jahirul Sk.', subject:'Mathematics (Senior)', cat:'maths', qual:'M.Sc. Mathematics', bio:'Prepares Class IX\u2013X students for board-level problem solving with a calm, patient style.'},
  {name:'Mr. Ranjit Sarkar', subject:'Physical Science', cat:'science', qual:'M.Sc. Physics, B.Ed.', bio:'Sets up simple physics demonstrations from everyday materials so every concept has something to touch.'},
  {name:'Ms. Sultana Parveen', subject:'Life Science', cat:'science', qual:'M.Sc. Botany, B.Ed.', bio:'Keeps a small kitchen-garden plot behind the school where biology lessons come to life.'},
  {name:'Mr. Abdus Salam', subject:'Chemistry', cat:'science', qual:'B.Sc. Chemistry, B.Ed.', bio:'Known for turning the periodic table into a classroom game students actually look forward to.'},

  {name:'Mr. Kamal Barman', subject:'History & Civics', cat:'social', qual:'M.A. History, B.Ed.', bio:'Brings local Assam history into the classroom alongside the national curriculum.'},
  {name:'Ms. Rupa Rani Das', subject:'Geography', cat:'social', qual:'M.A. Geography, B.Ed.', bio:'Uses hand-drawn maps and local river studies to teach geography grounded in the students\u2019 own surroundings.'},
  {name:'Mr. Idris Ali', subject:'Social Science', cat:'social', qual:'B.A., B.Ed.', bio:'Coordinates the annual school exhibition on civic awareness and community history.'},
  {name:'Ms. Nasima Akhtar', subject:'Assamese', cat:'language', qual:'M.A. Assamese, B.Ed.', bio:'Champions Assamese literature and organises the school\u2019s Bihu cultural programme every year.'},
  {name:'Mr. Zakir Hussain', subject:'Bengali', cat:'language', qual:'M.A. Bengali, B.Ed.', bio:'Runs handwriting and recitation clubs to build confidence in reading and writing.'},
  {name:'Ms. Suchitra Rani', subject:'Hindi', cat:'language', qual:'B.A. Hindi, B.Ed.', bio:'Makes Hindi grammar approachable through short skits performed by students themselves.'},
  {name:'Mr. Abdul Kalam', subject:'Sanskrit', cat:'language', qual:'Shastri, B.Ed.', bio:'Teaches Sanskrit shlokas alongside grammar to give the language a living rhythm.'},
  {name:'Mr. Saiful Islam', subject:'Computer Science', cat:'computer', qual:'BCA, B.Ed.', bio:'Set up the school\u2019s first computer lab and teaches basic digital literacy from Class VI onward.'},
  {name:'Ms. Jasmin Sultana', subject:'Computer Applications', cat:'computer', qual:'B.Sc. IT', bio:'Introduces typing, spreadsheets and simple design tools to the senior classes.'},
  {name:'Mr. Habibur Rahman', subject:'Physical Education', cat:'arts', qual:'B.P.Ed.', bio:'Leads morning assembly drills and coaches the school football and kabaddi teams.'},
  {name:'Ms. Shirin Nahar', subject:'Art & Craft', cat:'arts', qual:'B.F.A.', bio:'Fills the school corridors with student artwork and runs the annual art fair.'},
  {name:'Ms. Rahima Khatun', subject:'Pre-Primary Wing', cat:'primary', qual:'D.El.Ed., Montessori Cert.', bio:'Welcomes the school\u2019s youngest learners with rhymes, colours and their very first alphabet.'},
  {name:'Ms. Anwara Begum', subject:'Pre-Primary Wing', cat:'primary', qual:'D.El.Ed.', bio:'Believes play is the first classroom, and structures every nursery lesson around it.'},
];

const STAFF = [
  {name:'Mr. Sahabuddin Sk.', role:'Uncle', note:'Manages admissions, records and day-to-day school administration.'},
  {name:'Ms. Fulmoti Rani', role:'Aunty', note:'Keeps the school\u2019s accounts, fees and payroll in order.'},
  {name:'Mr. Motiur Rahman', role:'Aunty', note:'The first face students see each morning, keeping the campus running smoothly.'},
];

/* ---------- Render teacher grid ---------- */
const teacherGrid = document.getElementById('teacherGrid');
const filterBar = document.getElementById('filterBar');

function colorFor(index){
  return AVATAR_PALETTE[index % AVATAR_PALETTE.length];
}

TEACHERS.forEach((t,i)=>{
  const [c1,c2] = colorFor(i);
  const card = document.createElement('article');
  card.className = 'teacher-card shown';
  card.dataset.cat = t.cat;
  card.style.animationDelay = (i*35)+'ms';
  card.innerHTML = `
    <div class="avatar" style="background:linear-gradient(135deg, ${c1}, ${c2})">${initials(t.name)}</div>
    <h3>${t.name}</h3>
    <p class="subject">${t.subject}</p>
    <p class="qual">${t.qual}</p>
    <p class="card-hint">Tap for more \u2192</p>
  `;
  card.addEventListener('click', ()=>openModal(t,i));
  teacherGrid.appendChild(card);
});

/* filter chips */
const usedCats = [...new Set(TEACHERS.map(t=>t.cat))];
usedCats.forEach(cat=>{
  const btn = document.createElement('button');
  btn.className = 'filter-chip';
  btn.dataset.filter = cat;
  btn.textContent = CATEGORIES[cat] || cat;
  filterBar.appendChild(btn);
});

filterBar.addEventListener('click', (e)=>{
  const btn = e.target.closest('.filter-chip');
  if(!btn) return;
  filterBar.querySelectorAll('.filter-chip').forEach(b=>b.classList.remove('active'));
  btn.classList.add('active');
  const f = btn.dataset.filter;
  document.querySelectorAll('.teacher-card').forEach(card=>{
    const match = f === 'all' || card.dataset.cat === f;
    card.style.display = match ? '' : 'none';
  });
});

/* ---------- Render staff grid ---------- */
const staffGrid = document.getElementById('staffGrid');
STAFF.forEach((s,i)=>{
  const [c1,c2] = colorFor(i+3);
  const card = document.createElement('div');
  card.className = 'staff-card';
  card.innerHTML = `
    <div class="avatar" style="background:linear-gradient(135deg, ${c1}, ${c2})">${initials(s.name)}</div>
    <h3>${s.name}</h3>
    <p><strong>${s.role}</strong></p>
    <p>${s.note}</p>
  `;
  staffGrid.appendChild(card);
});

/* ---------- Modal ---------- */
const modalOverlay = document.getElementById('modalOverlay');
const modalBody = document.getElementById('modalBody');
const modalClose = document.getElementById('modalClose');

function openModal(t,i){
  const [c1,c2] = colorFor(i);
  modalBody.innerHTML = `
    <div class="avatar" style="background:linear-gradient(135deg, ${c1}, ${c2})">${initials(t.name)}</div>
    <h3>${t.name}</h3>
    <p class="subject">${t.subject}</p>
    <p class="qual">${t.qual}</p>
    <p class="bio">${t.bio}</p>
  `;
  modalOverlay.classList.add('open');
  document.body.style.overflow = 'hidden';
}
function closeModal(){
  modalOverlay.classList.remove('open');
  document.body.style.overflow = '';
}
modalClose.addEventListener('click', closeModal);
modalOverlay.addEventListener('click', (e)=>{ if(e.target === modalOverlay) closeModal(); });
document.addEventListener('keydown', (e)=>{ if(e.key === 'Escape') closeModal(); });

/* ---------- Scroll reveal ---------- */
const revealEls = document.querySelectorAll('.reveal-up');
const io = new IntersectionObserver((entries)=>{
  entries.forEach(entry=>{
    if(entry.isIntersecting){
      entry.target.classList.add('in-view');
      io.unobserve(entry.target);
    }
  });
},{threshold:0.15});
revealEls.forEach(el=>io.observe(el));

/* ---------- Sticky header + back to top ---------- */
const header = document.getElementById('siteHeader');
const toTop = document.getElementById('toTop');
window.addEventListener('scroll', ()=>{
  const y = window.scrollY;
  header.classList.toggle('scrolled', y > 20);
  toTop.classList.toggle('show', y > 500);
});
toTop.addEventListener('click', ()=> window.scrollTo({top:0, behavior:'smooth'}));

/* ---------- Mobile nav ---------- */
const navToggle = document.getElementById('navToggle');
const navLinks = document.getElementById('navLinks');
navToggle.addEventListener('click', ()=>{
  const open = navLinks.classList.toggle('open');
  navToggle.setAttribute('aria-expanded', open);
});
navLinks.querySelectorAll('a').forEach(a=>{
  a.addEventListener('click', ()=> navLinks.classList.remove('open'));
});

/* ---------- Loader ---------- */
window.addEventListener('load', ()=>{
  const loader = document.getElementById('loader');
  setTimeout(()=> loader.classList.add('done'), 400);
});
