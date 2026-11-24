const events = [
  { name: 'The First Pause', type: 'Mental reset', date: '5 Apr 2026', venue: 'Rashi Sandwich Corner', text: 'Where it all began: a 90-minute mental reset experience to slow down and breathe.' },
  { name: "The Founder's Pause", type: "Entrepreneur's edition", date: '16 Apr 2026', venue: 'Coimbatore', text: 'A pause made for founders carrying a lot on their shoulders.' },
  { name: 'The Break', type: 'Self-reflection workshop', date: '2026', venue: 'Discover Workspace', text: 'Challenging the belief that rest is lazy, with reflection and honest expression.' },
  { name: 'Between Breathe & Beat', type: 'Dance + yoga', date: '21 Jun 2026', venue: 'MUV Feet Dance Academy', text: 'Yoga Day with 45 members: breathwork, fusion dance and a freestyle finale.' },
  { name: 'Hearts & Minds', type: 'Mental health awareness', date: '12 Jul 2026', venue: 'Discover Workspace', text: 'Creative activities, group games and quiet reflection in a safe, open space.' },
  { name: 'Off the Grid (For a Bit.)', type: 'Corporate wellbeing', date: '1 Aug 2026', venue: 'Kriya & Reeths, Vadavalli', text: 'Practical stress tools for working professionals, with Team Kriya.' },
  { name: 'Bonds Beyond Borders', type: 'Friendship Day special', date: '1 Aug', venue: 'Tirumathi Coffee Centre', text: 'Playful team games, shared laughter and new friendships.' },
  { name: 'Chai & Create', type: 'Creative pause', date: '2026', venue: 'Coimbatore', text: 'Warm chai, hands-on creating and easy conversations with new friends.' },
  { name: 'The Feminine Pause', type: 'Women\'s circle', date: '2026', venue: 'Coimbatore', text: 'A gentle space for women to rest, share and feel heard.' },
  { name: 'Thiruvonam Therapy', type: 'Onam celebration', date: '23 Aug 2026', venue: 'WOCABO Cafe', text: 'A festive Onam gathering with our feelings-first approach.' },
];

const talks = [
  { name: 'Understanding Adolescence & Responsible Choices', where: 'Corporation Hr. Sec. School, Ramanathapuram', date: '24 Aug 2026', text: 'Understanding adolescence & responsible choices, with CSW Foundation.', img: 'p06' },
  { name: 'From Idea to Impact', where: 'Hindusthan College of Arts & Science', date: '11 Sep 2026', text: 'A guest lecture introducing social entrepreneurship to social work students.', img: 'talk-idea' },
  { name: 'One Team – One Mind', where: 'PSGR Krishnammal College for Women', date: '10 Oct 2026', text: 'Sports psychology and team building for the basketball team.', img: 'talk-team' },
  { name: 'Drug Awareness Sessions', where: 'Schools & colleges', date: '2026', text: 'Honest, judgement-free conversations with students on substance use and making safe choices.', img: 'p14' },
];

const photos = ['p11','p01','p02','p09','p13','p05','p08','p16','p15','p03','p14','p20','p21','p07','p22','p23','p19','p24'];

document.getElementById('eventList').innerHTML = events.map((e) => `
  <article class="card w-72 shrink-0 snap-start sm:w-80">
    <span class="tag">${e.type}</span>
    <h3 class="mt-3 text-lg font-semibold">${e.name}</h3>
    <p class="mt-1 text-xs text-ink/50">${e.date} · ${e.venue}</p>
    <p class="mt-3 text-sm text-ink/70">${e.text}</p>
  </article>`).join('');

document.getElementById('talkList').innerHTML = talks.map((t) => `
  <article class="overflow-hidden rounded-3xl bg-cream">
    <img src="images/${t.img}.webp" alt="${t.name}" loading="lazy" class="aspect-video w-full object-cover" />
    <div class="p-5">
      <h3 class="font-semibold">${t.name}</h3>
      <p class="mt-1 text-xs text-ink/50">${t.date} · ${t.where}</p>
      <p class="mt-2 text-sm text-ink/70">${t.text}</p>
    </div>
  </article>`).join('');

document.getElementById('galleryGrid').innerHTML = photos.map((p) => `
  <button class="mb-3 block w-full overflow-hidden rounded-2xl" data-src="images/${p}.webp">
    <img src="images/${p}.webp" alt="Pause Kommune moment" loading="lazy" class="w-full transition duration-300 hover:scale-105" />
  </button>`).join('');

document.querySelectorAll('[data-scroll]').forEach((b) => b.addEventListener('click', () => {
  const list = document.getElementById('eventList');
  list.scrollBy({ left: b.dataset.scroll * (list.firstElementChild.offsetWidth + 20), behavior: 'smooth' });
}));

const box = document.getElementById('lightbox');
const boxImg = box.querySelector('img');
document.getElementById('galleryGrid').addEventListener('click', (e) => {
  const btn = e.target.closest('button');
  if (!btn) return;
  boxImg.src = btn.dataset.src;
  box.classList.replace('hidden', 'flex');
});
box.addEventListener('click', (e) => { if (e.target !== boxImg) box.classList.replace('flex', 'hidden'); });
document.addEventListener('keydown', (e) => { if (e.key === 'Escape') box.classList.replace('flex', 'hidden'); });

const menu = document.getElementById('menu');
const menuBtn = document.getElementById('menuBtn');
menuBtn.addEventListener('click', () => {
  const open = menu.classList.toggle('hidden') === false;
  menu.classList.toggle('flex', open);
  menuBtn.setAttribute('aria-expanded', open);
});
menu.addEventListener('click', (e) => {
  if (e.target.closest('a') && window.innerWidth < 768) { menu.classList.add('hidden'); menu.classList.remove('flex'); }
});

// Scroll reveal: headings, cards and gallery tiles fade up, siblings staggered
const revealTargets = [...document.querySelectorAll('main section:not(:first-child) :is(.tag, h2, .h2 + p, .card, article, #galleryGrid button, .rounded-3xl, .text-center, img)')]
  .filter((el, _, all) => !all.some((p) => p !== el && p.contains(el)));
revealTargets.forEach((el) => {
  el.classList.add('reveal');
  const i = [...el.parentElement.children].indexOf(el);
  el.style.transitionDelay = `${Math.min(i, 6) * 80}ms`;
});

const countUp = (el) => {
  const end = +el.dataset.count;
  const start = performance.now();
  const tick = (now) => {
    const t = Math.min((now - start) / 1200, 1);
    el.textContent = Math.round(end * (1 - Math.pow(1 - t, 3))) + el.dataset.suffix;
    if (t < 1) requestAnimationFrame(tick);
  };
  requestAnimationFrame(tick);
};

const io = new IntersectionObserver((entries) => {
  entries.forEach((e) => {
    if (!e.isIntersecting) return;
    e.target.classList.add('in');
    e.target.querySelectorAll('[data-count]').forEach(countUp);
    io.unobserve(e.target);
  });
}, { threshold: 0.15 });
revealTargets.forEach((el) => io.observe(el));
