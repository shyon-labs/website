import { motion } from 'framer-motion'
import { projects } from '../../data/projects'

interface ProjectVisualProps {
  project: typeof projects[0]
}

export default function ProjectVisual({ project }: ProjectVisualProps) {
  const { number, color } = project

  return (
    <div
      className="w-full h-full flex items-center justify-center p-6 md:p-10 relative"
      style={{ background: `radial-gradient(ellipse at center, ${color}10 0%, transparent 70%)` }}
    >
      <svg viewBox="0 0 400 300" className="w-full max-w-sm" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
        {number === '01' && <HabitTrackerVisual color={color} />}
        {number === '02' && <AIVisual color={color} />}
        {number === '03' && <TourVisual color={color} />}
        {number === '04' && <CineVisual color={color} />}
      </svg>
    </div>
  )
}

function HabitTrackerVisual({ color }: { color: string }) {
  const days = ['M', 'T', 'W', 'T', 'F', 'S', 'S']
  const habits = [
    { name: 'Morning Focus', streak: '14 Days', completion: [true, true, true, true, true, true, false] },
    { name: 'AI Deep Work', streak: '8 Days', completion: [true, true, false, true, true, true, true] },
    { name: 'Evening Reflection', streak: '21 Days', completion: [true, true, true, true, true, true, true] },
  ]

  return (
    <g>
      {/* Phone container mockup */}
      <rect x="70" y="30" width="260" height="235" rx="16" fill="#141414" stroke={color} strokeWidth="1" strokeOpacity="0.3" />

      {/* Header bar */}
      <rect x="90" y="45" width="220" height="35" rx="8" fill={color} fillOpacity="0.08" />
      <text x="105" y="66" fontSize="10" fontWeight="bold" fill={color} fillOpacity="0.9">Habit Intelligence AI</text>
      <circle cx="290" cy="62" r="5" fill="#34d399" />

      {/* Days row */}
      {days.map((d, i) => (
        <g key={i}>
          <circle cx={110 + i * 28} cy={95} r="10" fill={color} fillOpacity={i === 6 ? 0.3 : 0.08} />
          <text x={110 + i * 28} y={98} textAnchor="middle" fontSize="7" fill={color} fillOpacity={i === 6 ? 1 : 0.6} fontWeight="bold">{d}</text>
        </g>
      ))}

      {/* Habit list cards */}
      {habits.map((h, idx) => (
        <g key={idx}>
          <rect x="90" y={115 + idx * 42} width="220" height="36" rx="8" fill="rgba(255,255,255,0.03)" stroke={color} strokeWidth="0.5" strokeOpacity="0.15" />
          <text x="102" y={131 + idx * 42} fontSize="8" fontWeight="600" fill="#F0F0F0">{h.name}</text>
          <text x="102" y={143 + idx * 42} fontSize="6.5" fill={color} fillOpacity="0.7">Streak: {h.streak}</text>
          
          {/* Daily checks */}
          {h.completion.map((checked, ci) => (
            <motion.circle
              key={ci}
              cx={195 + ci * 15}
              cy={133 + idx * 42}
              r="4.5"
              fill={checked ? color : 'none'}
              stroke={color}
              strokeWidth="0.8"
              strokeOpacity={checked ? 0.9 : 0.3}
              initial={{ scale: 0 }}
              whileInView={{ scale: 1 }}
              transition={{ delay: idx * 0.1 + ci * 0.03 }}
            />
          ))}
        </g>
      ))}

      {/* AI insight popup */}
      <rect x="90" y="240" width="220" height="20" rx="4" fill={color} fillOpacity="0.15" stroke={color} strokeWidth="0.6" />
      <text x="200" y="253" textAnchor="middle" fontSize="7" fill={color} fontWeight="500">✨ AI Suggestion: Optimal time for focus is 9:30 AM</text>
    </g>
  )
}

function AIVisual({ color }: { color: string }) {
  return (
    <g>
      <ellipse cx="200" cy="140" rx="70" ry="85" fill="none" stroke={color} strokeWidth="1" strokeOpacity="0.3" />
      {[...Array(8)].map((_, i) => (
        <line key={i} x1="130" y1={70 + i * 22} x2="270" y2={70 + i * 22} stroke={color} strokeWidth="0.5" strokeOpacity="0.12" />
      ))}
      {[...Array(6)].map((_, i) => (
        <line key={i} x1={130 + i * 28} y1="55" x2={130 + i * 28} y2="225" stroke={color} strokeWidth="0.5" strokeOpacity="0.12" />
      ))}
      <rect x="158" y="90" width="40" height="40" fill="none" stroke={color} strokeWidth="1.2" strokeOpacity="0.6" />
      <rect x="156" y="88" width="4" height="4" fill={color} fillOpacity="0.8" />
      <rect x="192" y="88" width="4" height="4" fill={color} fillOpacity="0.8" />
      <rect x="156" y="124" width="4" height="4" fill={color} fillOpacity="0.8" />
      <rect x="192" y="124" width="4" height="4" fill={color} fillOpacity="0.8" />
      <motion.line
        x1="130" y1="140" x2="270" y2="140"
        stroke={color} strokeWidth="1" strokeOpacity="0.5"
        animate={{ y1: [55, 225, 55], y2: [55, 225, 55] } as any}
        transition={{ duration: 3, repeat: Infinity, ease: 'linear' }}
      />
      <rect x="100" y="120" width="60" height="14" rx="3" fill={color} fillOpacity="0.15" />
      <text x="130" y="130" textAnchor="middle" fontSize="7" fill={color} fillOpacity="0.8">Skin Tone: W2</text>
      <rect x="252" y="150" width="52" height="14" rx="3" fill={color} fillOpacity="0.15" />
      <text x="278" y="160" textAnchor="middle" fontSize="7" fill={color} fillOpacity="0.8">Match: 94.7%</text>
      {[[170,108],[200,108],[215,115],[185,130],[200,125]].map(([cx,cy],i) => (
        <circle key={i} cx={cx} cy={cy} r="2" fill={color} fillOpacity="0.7" />
      ))}
      {['#F5E6D3','#E8C5A0','#C89060','#8B5E3C','#4A2C17'].map((c, i) => (
        <rect key={i} x={150 + i * 16} y="200" width="12" height="12" rx="2" fill={c} />
      ))}
      <text x="200" y="225" textAnchor="middle" fontSize="7" fill={color} fillOpacity="0.5">Recommended Shades</text>
    </g>
  )
}

function TourVisual({ color }: { color: string }) {
  return (
    <g>
      <rect x="60" y="40" width="280" height="200" rx="8" fill="none" stroke={color} strokeWidth="0.8" strokeOpacity="0.2" />
      {[60,80,105,130,160,190,225].map((y, i) => (
        <path key={i} d={`M 60 ${y} Q ${120+i*10} ${y - 15} ${200} ${y-5} Q ${280} ${y+8} 340 ${y}`} fill="none" stroke={color} strokeWidth="0.5" strokeOpacity="0.12" />
      ))}
      {[[120,100],[200,85],[160,150],[250,130],[190,170]].map(([cx,cy], i) => (
        <g key={i}>
          <circle cx={cx} cy={cy} r={i===0?6:4} fill={i===0?color:'none'} stroke={color} strokeWidth="1" strokeOpacity={i===0?0.8:0.4} />
          {i===0 && <circle cx={cx} cy={cy} r="2" fill="#0A0A0A" />}
        </g>
      ))}
      <path d="M 120 100 Q 155 90 200 85 Q 220 95 250 130" fill="none" stroke={color} strokeWidth="1.5" strokeOpacity="0.5" strokeDasharray="4 4" />
      <rect x="85" y="60" width="90" height="30" rx="4" fill={color} fillOpacity="0.15" stroke={color} strokeWidth="0.8" strokeOpacity="0.4" />
      <text x="130" y="72" textAnchor="middle" fontSize="7" fill={color} fillOpacity="0.9" fontWeight="bold">Hunza Valley</text>
      <text x="130" y="83" textAnchor="middle" fontSize="6" fill={color} fillOpacity="0.5">4 experiences nearby</text>
      <rect x="80" y="210" width="240" height="24" rx="5" fill={color} fillOpacity="0.08" stroke={color} strokeWidth="0.5" strokeOpacity="0.3" />
      <text x="200" y="226" textAnchor="middle" fontSize="7" fill={color} fillOpacity="0.6">Showing 12 destinations · Pakistan</text>
    </g>
  )
}

function CineVisual({ color }: { color: string }) {
  const films = [
    { title: 'Mulholland Drive', year: '2001', stars: 5 },
    { title: 'There Will Be Blood', year: '2007', stars: 5 },
    { title: 'The Master', year: '2012', stars: 4 },
    { title: 'Memoria', year: '2021', stars: 4 },
  ]
  return (
    <g>
      <rect x="60" y="30" width="280" height="160" rx="6" fill="none" stroke={color} strokeWidth="0.8" strokeOpacity="0.2" />
      {[...Array(7)].map((_, i) => (
        <g key={i}>
          <rect x={70+i*36} y="36" width="10" height="7" rx="2" fill={color} fillOpacity="0.15" />
          <rect x={70+i*36} y="177" width="10" height="7" rx="2" fill={color} fillOpacity="0.15" />
        </g>
      ))}
      <rect x="80" y="52" width="90" height="110" rx="4" fill={color} fillOpacity="0.08" stroke={color} strokeWidth="0.8" strokeOpacity="0.3" />
      {[...Array(5)].map((_, i) => (
        <text key={i} x={84+i*9} y="84" fontSize="8" fill={color} fillOpacity={i < 5 ? 0.9 : 0.2}>★</text>
      ))}
      <text x="125" y="100" textAnchor="middle" fontSize="7" fill={color} fillOpacity="0.9" fontWeight="bold">The Godfather</text>
      <text x="125" y="111" textAnchor="middle" fontSize="6" fill={color} fillOpacity="0.5">Coppola · 1972</text>
      <text x="125" y="128" textAnchor="middle" fontSize="6" fill={color} fillOpacity="0.4">Drama · Crime</text>
      {films.map((f, i) => (
        <g key={i}>
          <rect x="185" y={52+i*30} width="135" height="25" rx="3" fill={color} fillOpacity="0.05" stroke={color} strokeWidth="0.5" strokeOpacity="0.15" />
          <text x="192" y={64+i*30} fontSize="7" fill={color} fillOpacity="0.8" fontWeight="500">{f.title}</text>
          <text x="192" y={73+i*30} fontSize="6" fill={color} fillOpacity="0.4">{f.year}</text>
          <text x={310} y={64+i*30} textAnchor="end" fontSize="7" fill={color} fillOpacity="0.7">{'★'.repeat(f.stars)}</text>
        </g>
      ))}
      <rect x="60" y="200" width="280" height="32" rx="4" fill="rgba(0,0,0,0.3)" />
      <circle cx="78" cy="216" r="6" fill={color} fillOpacity="0.6" />
      <rect x="88" y="211" width="80" height="4" rx="2" fill={color} fillOpacity="0.15" />
      <rect x="88" y="219" width="50" height="3" rx="1.5" fill={color} fillOpacity="0.08" />
      <text x="320" y="219" textAnchor="end" fontSize="6" fill={color} fillOpacity="0.5">1,247 films logged</text>
    </g>
  )
}
