const fs = require('fs');
const c = fs.readFileSync('src/app/trip-planner/page.tsx', 'utf8');
const matches = [...c.matchAll(/getyourguide\.com\/[^"'\s]+/g)];
matches.forEach(m => console.log(m[0]));
console.log('---');
const klook = [...c.matchAll(/klook\.com\/activity\/[^"'\s]+/g)];
klook.forEach(m => console.log(m[0]));
