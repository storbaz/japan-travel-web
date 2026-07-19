const fs = require('fs');

// Fix GYG /s/?q= URLs in 5 pages
const files = [
  'src/app/culture/page.tsx',
  'src/app/nature/page.tsx',
  'src/app/freaky/page.tsx',
  'src/app/sports/page.tsx',
  'src/app/reservations/page.tsx'
];

files.forEach(f => {
  let content = fs.readFileSync(f, 'utf8');
  content = content.replace(
    /getyourguide\.com\/s\/\?q=([^"']+)/g,
    'getyourguide.com/tokyo-l193/?q=$1&partner_id=NRWCY1R'
  );
  fs.writeFileSync(f, content, 'utf8');
  console.log('Fixed GYG in: ' + f);
});

// Fix trip-planner page
let tp = fs.readFileSync('src/app/trip-planner/page.tsx', 'utf8');

// Fix Klook links
tp = tp.replace('klook.com/activity/736-shibuya-sky/', 'klook.com/activity/70672-shibuya-sky-tokyo/');
tp = tp.replace('klook.com/activity/152-tokyo-skytree/', 'klook.com/activity/41352-tokyo-skytree/');
tp = tp.replace('klook.com/activity/1334-kyoto-kinkakuji/', 'klook.com/en-US/destination/p50263392-golden-pavilion-temple/');
tp = tp.replace('klook.com/activity/1335-miyajima-ferry/', 'klook.com/activity/140942-day-trip-to-hiroshima-and-miyajima-with-ferry-ride/');

// Fix GYG links in trip-planner: replace invalid IDs with correct city pages
tp = tp.replace(/getyourguide\.com\/tokyo-l502849\//g, 'getyourguide.com/tokyo-l193/');
tp = tp.replace(/getyourguide\.com\/hakone-l497109\//g, 'getyourguide.com/hakone-l845/');
tp = tp.replace(/getyourguide\.com\/kyoto-l503064\//g, 'getyourguide.com/kyoto-l96826/');
tp = tp.replace(/getyourguide\.com\/osaka-l501234\//g, 'getyourguide.com/osaka-l1204/');

// Add partner_id to GYG links that don't have it
tp = tp.replace(
  /getyourguide\.com\/(tokyo-l193|hakone-l845|kyoto-l96826|osaka-l1204)\/"/g,
  'getyourguide.com/$1/?partner_id=NRWCY1R"'
);

fs.writeFileSync('src/app/trip-planner/page.tsx', tp, 'utf8');
console.log('Fixed trip-planner');
