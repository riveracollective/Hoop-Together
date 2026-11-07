// Hoop Together offline support. Bump VERSION whenever you upload a new index.html.
const VERSION='hoop-v67';
const CORE=["./", "index.html", "manifest.webmanifest", "privacy.html", "icons/apple-touch-180.png", "icons/favicon-32.png", "icons/favicon.svg", "img/brand/wordmark.svg", "icons/icon-192.png", "icons/icon-512.png", "icons/maskable-512.png", "img/01-triple-threat.webp", "img/02-direct-drive.webp", "img/03-crossover-drive.webp", "img/06-defensive-stance.webp", "img/07-defensive-slide.webp", "img/08-close-out.webp", "img/09-shot-contest.webp", "img/10-block-out.webp", "img/11-post-defense.webp", "img/12-chest-pass.webp", "img/13-bounce-pass.webp", "img/14-overhead-pass.webp", "img/15-catch-ready.webp", "img/16-control-dribble.webp", "img/17-speed-dribble.webp", "img/18-crossover-dribble.webp", "img/19-shooting-palm-up.webp", "img/20-shooting-lock-it-in.webp", "img/21-shooting-load-it-up.webp", "img/22-shooting-follow-through.webp", "img/home/drive-defenders.webp", "img/home/dribble-cones-line.webp", "img/home/driveway.webp", "img/home/family-cones.webp", "img/home/fast-break.webp", "img/home/game-jumpshot.webp", "img/home/gym-jumpshot.webp", "img/home/home-passing.webp", "img/home/low-dribble.webp", "img/home/one-on-one.webp", "img/home/passing.webp", "img/home/team-huddle.webp", "img/home/walk-lit-hoop.webp", "img/players/generic.webp"];
self.addEventListener('install',e=>{e.waitUntil(caches.open(VERSION).then(c=>c.addAll(CORE)).then(()=>self.skipWaiting()))});
self.addEventListener('activate',e=>{e.waitUntil(caches.keys().then(ks=>Promise.all(ks.filter(k=>k!==VERSION).map(k=>caches.delete(k)))).then(()=>self.clients.claim()))});
self.addEventListener('fetch',e=>{
  const r=e.request;if(r.method!=='GET')return;
  const url=new URL(r.url);
  // Pages: network first so updates show up, fall back to the saved copy offline
  if(r.mode==='navigate'){e.respondWith(fetch(r).then(res=>{const cp=res.clone();caches.open(VERSION).then(c=>c.put('./',cp));return res}).catch(()=>caches.match('./')));return}
  // Everything else (photos, icons, fonts): saved copy first, then network
  e.respondWith(caches.match(r).then(hit=>hit||fetch(r).then(res=>{if(res.ok||res.type==='opaque'){const cp=res.clone();caches.open(VERSION).then(c=>c.put(r,cp))}return res})));
});
