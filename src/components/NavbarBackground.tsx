"use client";

import { useSeason } from "@/hooks/useSeason";

function SpringBG() {
  return (
    <svg className="absolute bottom-0 left-0 w-full h-full" viewBox="0 0 1400 70" preserveAspectRatio="xMidYMax slice">
      {/* Gradient sky */}
      <defs>
        <linearGradient id="springSky" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="rgba(255,183,197,0.15)"/>
          <stop offset="100%" stopColor="rgba(255,105,180,0.08)"/>
        </linearGradient>
      </defs>
      <rect width="1400" height="70" fill="url(#springSky)"/>
      
      {/* Mt Fuji with snow cap */}
      <path d="M-30,70 L100,8 L230,70" fill="rgba(135,20,80,0.2)"/>
      <path d="M70,30 L100,8 L130,30" fill="white" opacity="0.25"/>
      <path d="M80,25 L100,12 L120,25" fill="rgba(200,230,255,0.2)"/>
      
      {/* Cherry blossom tree */}
      <path d="M320,70 Q330,50 340,55 Q350,40 370,45 Q380,30 400,35 Q420,20 440,30 Q460,25 470,35" 
        fill="none" stroke="rgba(139,69,19,0.3)" strokeWidth="3" strokeLinecap="round"/>
      <path d="M370,45 Q385,35 375,28" fill="none" stroke="rgba(139,69,19,0.25)" strokeWidth="2"/>
      <path d="M400,35 Q415,25 405,20" fill="none" stroke="rgba(139,69,19,0.25)" strokeWidth="2"/>
      
      {/* Cherry blossoms - bright pink */}
      {[[350,38],[375,30],[395,22],[420,18],[445,22],[465,30],[380,42],[410,38]].map(([x,y], i) => (
        <g key={i} transform={`translate(${x},${y})`} opacity={0.3 + (i % 3) * 0.1}>
          {[0,72,144,216,288].map((a, j) => (
            <ellipse key={j} cx="0" cy="-5" rx="4" ry="7" fill="#ff69b4" transform={`rotate(${a})`}/>
          ))}
          <circle cx="0" cy="0" r="2" fill="#ff1493"/>
        </g>
      ))}
      
      {/* Koi pond at bottom */}
      <ellipse cx="700" cy="58" rx="80" ry="8" fill="rgba(100,180,255,0.15)"/>
      <ellipse cx="700" cy="58" rx="60" ry="5" fill="rgba(100,180,255,0.1)"/>
      
      {/* Koi fish - orange */}
      <g transform="translate(680,55) scale(0.9)" opacity="0.3">
        <ellipse cx="0" cy="0" rx="16" ry="7" fill="#ff6b35"/>
        <path d="M16,0 Q24,-6 24,0 Q24,6 16,0" fill="#ff6b35"/>
        <circle cx="-10" cy="-1.5" r="1.5" fill="#1f2937"/>
        <path d="M-4,-5 Q0,-8 4,-5" fill="none" stroke="#ff8c42" strokeWidth="1.5"/>
      </g>
      
      {/* Koi fish - white/red */}
      <g transform="translate(730,60) scale(0.7) rotate(-8)" opacity="0.25">
        <ellipse cx="0" cy="0" rx="16" ry="7" fill="white"/>
        <ellipse cx="2" cy="-1" rx="6" ry="4" fill="rgba(220,38,38,0.5)"/>
        <circle cx="-10" cy="-1.5" r="1.5" fill="#1f2937"/>
      </g>
      
      {/* Torii gate */}
      <g transform="translate(1000,12)" opacity="0.2">
        <rect x="0" y="0" width="5" height="58" fill="#cc0000" rx="1"/>
        <rect x="50" y="0" width="5" height="58" fill="#cc0000" rx="1"/>
        <rect x="-8" y="3" width="71" height="6" fill="#cc0000" rx="2"/>
        <rect x="-4" y="16" width="63" height="3" fill="#cc0000" rx="1"/>
        <path d="M-10,3 Q25,-3 57,3" fill="none" stroke="#cc0000" strokeWidth="2"/>
      </g>
      
      {/* Falling petals */}
      {[[550,15],[620,35],[780,10],[850,40],[920,20],[1100,30],[1200,12]].map(([x,y], i) => (
        <ellipse key={i} cx={x} cy={y} rx="3" ry="4.5" fill="#ffb7c5" opacity={0.2 + (i % 3) * 0.05}
          transform={`rotate(${i * 40} ${x} ${y})`}/>
      ))}
    </svg>
  );
}

function SummerBG() {
  return (
    <svg className="absolute bottom-0 left-0 w-full h-full" viewBox="0 0 1400 70" preserveAspectRatio="xMidYMax slice">
      <defs>
        <linearGradient id="summerSky" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="rgba(255,140,0,0.12)"/>
          <stop offset="100%" stopColor="rgba(200,100,0,0.06)"/>
        </linearGradient>
      </defs>
      <rect width="1400" height="70" fill="url(#summerSky)"/>
      
      {/* Large pagoda */}
      <g transform="translate(120,0)" opacity="0.2">
        <rect x="20" y="28" width="18" height="42" fill="#8B4513"/>
        <path d="M0,28 L29,5 L58,28" fill="#cc0000"/>
        <path d="M3,33 L29,12 L55,33" fill="#cc0000"/>
        <path d="M6,38 L29,18 L52,38" fill="#cc0000"/>
        <rect x="24" y="-2" width="10" height="10" fill="#cc0000"/>
        <circle cx="29" cy="-5" r="4" fill="gold"/>
      </g>
      
      {/* Torii gate - red */}
      <g transform="translate(400,8)" opacity="0.22">
        <rect x="0" y="0" width="6" height="62" fill="#cc0000" rx="1"/>
        <rect x="58" y="0" width="6" height="62" fill="#cc0000" rx="1"/>
        <rect x="-10" y="3" width="84" height="7" fill="#cc0000" rx="2"/>
        <rect x="-6" y="18" width="76" height="3" fill="#cc0000" rx="1"/>
        <path d="M-12,3 Q29,-4 64,3" fill="none" stroke="#cc0000" strokeWidth="2.5"/>
      </g>
      
      {/* Fireworks - colorful */}
      {[[750,15],[950,20],[1150,12],[1300,18]].map(([x,y], i) => {
        const colors = ["#ff6b6b","#ffd93d","#6bcb77","#4d96ff","#ff6eb4"];
        return (
          <g key={i} transform={`translate(${x},${y})`} opacity="0.25">
            {[0,30,60,90,120,150,180,210,240,270,300,330].map((angle, j) => (
              <line key={j} x1="0" y1="0" 
                x2={Math.cos(angle * Math.PI / 180) * (12 + (j % 3) * 4)} 
                y2={Math.sin(angle * Math.PI / 180) * (12 + (j % 3) * 4)}
                stroke={colors[(i + j) % colors.length]} strokeWidth="1.2" strokeLinecap="round"
                opacity={0.8 - j * 0.05}/>
            ))}
            <circle cx="0" cy="0" r="3" fill={colors[i]}/>
          </g>
        );
      })}
      
      {/* Goldfish/lanterns */}
      {[[550,45],[650,50]].map(([x,y], i) => (
        <g key={i} transform={`translate(${x},${y})`} opacity="0.2">
          <ellipse cx="0" cy="0" rx="12" ry="8" fill="#ff4444"/>
          <path d="M12,0 Q18,-5 18,0 Q18,5 12,0" fill="#ff4444"/>
          <circle cx="-7" cy="-1" r="1" fill="#1f2937"/>
          <rect x="-2" y="-10" width="4" height="4" fill="gold" rx="1"/>
        </g>
      ))}
      
      {/* Wave pattern */}
      <path d="M0,60 Q50,50 100,58 Q150,66 200,54 Q250,42 300,52 Q350,62 400,50 Q450,38 500,48 Q550,58 600,46 Q650,34 700,44 Q750,54 800,42 Q850,30 900,40 Q950,50 1000,38 Q1050,26 1100,36 Q1150,46 1200,34 Q1250,22 1300,32 Q1350,42 1400,30 L1400,70 L0,70 Z"
        fill="rgba(255,140,0,0.06)"/>
    </svg>
  );
}

function AutumnBG() {
  return (
    <svg className="absolute bottom-0 left-0 w-full h-full" viewBox="0 0 1400 70" preserveAspectRatio="xMidYMax slice">
      <defs>
        <linearGradient id="autumnSky" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="rgba(200,100,0,0.12)"/>
          <stop offset="100%" stopColor="rgba(150,60,0,0.06)"/>
        </linearGradient>
      </defs>
      <rect width="1400" height="70" fill="url(#autumnSky)"/>
      
      {/* Red bridge */}
      <g transform="translate(180,20)" opacity="0.2">
        <path d="M0,45 Q45,10 90,10 Q135,10 180,45" fill="none" stroke="#cc0000" strokeWidth="4" strokeLinecap="round"/>
        <line x1="10" y1="45" x2="10" y2="55" stroke="#8B4513" strokeWidth="2.5"/>
        <line x1="45" y1="22" x2="45" y2="55" stroke="#8B4513" strokeWidth="2"/>
        <line x1="90" y1="10" x2="90" y2="55" stroke="#8B4513" strokeWidth="2"/>
        <line x1="135" y1="22" x2="135" y2="55" stroke="#8B4513" strokeWidth="2"/>
        <line x1="170" y1="45" x2="170" y2="55" stroke="#8B4513" strokeWidth="2.5"/>
      </g>
      
      {/* Maple leaves - vibrant */}
      {[[420,15],[480,30],[540,12],[600,25],[460,40],[520,45]].map(([x,y], i) => (
        <g key={i} transform={`translate(${x},${y}) rotate(${i * 50 - 80}) scale(${1.3 - (i % 3) * 0.2})`} opacity={0.2 + (i % 3) * 0.05}>
          <path d="M0,-16 L4,-7 L12,-8 L7,-1 L10,7 L3,3 L0,10 L-3,3 L-10,7 L-7,-1 L-12,-8 L-4,-7 Z"
            fill={["#dc2626","#ea580c","#d97706","#b45309","#ff4500","#cd853f"][i]}/>
          <line x1="0" y1="-10" x2="0" y2="7" stroke="rgba(139,69,19,0.3)" strokeWidth="0.5"/>
        </g>
      ))}
      
      {/* Golden temple */}
      <g transform="translate(850,5)" opacity="0.18">
        <rect x="18" y="28" width="22" height="42" fill="#DAA520"/>
        <path d="M0,28 L29,5 L58,28" fill="#B8860B"/>
        <path d="M3,33 L29,12 L55,33" fill="#DAA520"/>
        <path d="M6,38 L29,18 L52,38" fill="#B8860B"/>
        <rect x="23" y="-2" width="12" height="9" fill="#DAA520"/>
        <circle cx="29" cy="-5" r="5" fill="gold"/>
      </g>
      
      {/* Scattered leaves */}
      {[[80,25],[250,15],[650,20],[1050,18],[1200,22],[1350,15]].map(([x,y], i) => (
        <g key={i} transform={`translate(${x},${y}) rotate(${i * 60}) scale(0.8)`} opacity="0.15">
          <path d="M0,-12 L3,-5 L9,-6 L5,0 L7,5 L2,3 L0,7 L-2,3 L-7,5 L-5,0 L-9,-6 L-3,-5 Z"
            fill={["#dc2626","#ea580c","#d97706"][i % 3]}/>
        </g>
      ))}
      
      {/* Mountain silhouette */}
      <path d="M0,65 Q150,35 300,55 Q450,75 600,50 Q750,25 900,45 Q1050,65 1200,40 Q1350,55 1400,50 L1400,70 L0,70 Z"
        fill="rgba(139,69,19,0.06)"/>
    </svg>
  );
}

function WinterBG() {
  return (
    <svg className="absolute bottom-0 left-0 w-full h-full" viewBox="0 0 1400 70" preserveAspectRatio="xMidYMax slice">
      <defs>
        <linearGradient id="winterSky" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="rgba(100,150,220,0.12)"/>
          <stop offset="100%" stopColor="rgba(70,120,180,0.06)"/>
        </linearGradient>
      </defs>
      <rect width="1400" height="70" fill="url(#winterSky)"/>
      
      {/* Snowy mountains */}
      <path d="M-30,70 L60,10 L150,70" fill="rgba(70,130,180,0.15)"/>
      <path d="M45,25 L60,10 L75,25" fill="white" opacity="0.3"/>
      
      <path d="M200,70 L310,5 L420,70" fill="rgba(70,130,180,0.12)"/>
      <path d="M298,18 L310,5 L322,18" fill="white" opacity="0.25"/>
      
      {/* Red temple/shrine */}
      <g transform="translate(550,8)" opacity="0.2">
        <rect x="18" y="28" width="22" height="42" fill="#cc0000"/>
        <path d="M0,28 L29,5 L58,28" fill="#990000"/>
        <path d="M3,33 L29,12 L55,33" fill="#cc0000"/>
        <path d="M6,38 L29,18 L52,38" fill="#990000"/>
        <rect x="23" y="-2" width="12" height="9" fill="#cc0000"/>
        <circle cx="29" cy="-5" r="5" fill="gold"/>
        {/* Snow on roof */}
        <path d="M-2,28 Q29,0 60,28" fill="none" stroke="white" strokeWidth="2" opacity="0.4"/>
      </g>
      
      {/* Snowflakes - detailed */}
      {[[80,18],[200,28],[350,12],[500,22],[700,15],[850,25],[1000,12],[1150,22],[1300,18]].map(([x,y], i) => (
        <g key={i} transform={`translate(${x},${y})`} opacity={0.18 + (i % 3) * 0.06}>
          {[0,60,120].map((angle, j) => (
            <g key={j} transform={`rotate(${angle})`}>
              <line x1="0" y1="-10" x2="0" y2="10" stroke="white" strokeWidth="1.2"/>
              <line x1="-4" y1="-6" x2="0" y2="-10" stroke="white" strokeWidth="0.8"/>
              <line x1="4" y1="-6" x2="0" y2="-10" stroke="white" strokeWidth="0.8"/>
              <line x1="-4" y1="6" x2="0" y2="10" stroke="white" strokeWidth="0.8"/>
              <line x1="4" y1="6" x2="0" y2="10" stroke="white" strokeWidth="0.8"/>
              <circle cx="-3" cy="-8" r="1" fill="white" opacity="0.5"/>
              <circle cx="3" cy="-8" r="1" fill="white" opacity="0.5"/>
            </g>
          ))}
        </g>
      ))}
      
      {/* Pine tree with snow */}
      <g transform="translate(1050,10)" opacity="0.15">
        <polygon points="30,0 45,18 40,15 50,32 35,28 42,48 30,42 18,48 25,28 10,32 20,15 15,18" fill="#2d5016"/>
        <polygon points="30,0 45,18 40,15 50,32 35,28 42,48 30,42 18,48 25,28 10,32 20,15 15,18" fill="white" opacity="0.3"/>
        <rect x="27" y="42" width="6" height="28" fill="#8B4513"/>
      </g>
      
      {/* Snow ground */}
      <path d="M0,62 Q100,52 200,60 Q300,68 400,56 Q500,44 600,54 Q700,64 800,52 Q900,40 1000,50 Q1100,60 1200,48 Q1300,56 1400,46 L1400,70 L0,70 Z"
        fill="white" opacity="0.08"/>
    </svg>
  );
}

const SEASON_BG: Record<string, React.FC> = {
  spring: SpringBG,
  summer: SummerBG,
  autumn: AutumnBG,
  winter: WinterBG,
};

export default function NavbarBackground() {
  const { season } = useSeason();
  const BgComponent = SEASON_BG[season];

  return (
    <div className="absolute inset-0 pointer-events-none overflow-hidden">
      <BgComponent />
    </div>
  );
}
