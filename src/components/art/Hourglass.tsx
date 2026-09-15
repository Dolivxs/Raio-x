type Props = { className?: string } & React.SVGProps<SVGSVGElement>

/** Contornos do vidro — reaproveitados por preenchimento, clip e contorno. */
const BULB_TOP = 'M 92 116 H 348 C 348 208, 296 300, 232 344 H 208 C 144 300, 92 208, 92 116 Z'
const BULB_BOT = 'M 208 356 H 232 C 296 400, 348 492, 348 584 H 92 C 92 492, 144 400, 208 356 Z'

/**
 * Ampulheta. Inline porque a areia é animada por dentro.
 *
 * Hooks do GSAP: [data-sand-top] e [data-sand-bottom] escalam em Y.
 * A origem do scale vem do GSAP via `svgOrigin` (SAND_ORIGIN), em coordenadas
 * do viewBox — `transform-box: fill-box` aqui desloca a matriz que o GSAP
 * calcula e joga a areia para fora do clip.
 */
export const SAND_ORIGIN = { top: '220 352', bottom: '220 592' } as const
export default function Hourglass({ className = '', ...rest }: Props) {
  return (
    <svg viewBox="0 0 440 700" className={className} fill="none" aria-hidden focusable="false" {...rest}>
      <defs>
        {/* Luz vindo de cima-esquerda, igual em todos os objetos da landing */}
        <linearGradient id="hgPost" x1="0" y1="0" x2="1" y2="0">
          <stop offset="0%" stopColor="#070F1B" />
          <stop offset="22%" stopColor="#31465F" />
          <stop offset="45%" stopColor="#8598AE" />
          <stop offset="62%" stopColor="#3B5170" />
          <stop offset="100%" stopColor="#060D17" />
        </linearGradient>
        <linearGradient id="hgPlate" x1="0" y1="0" x2="0.25" y2="1">
          <stop offset="0%" stopColor="#41597A" />
          <stop offset="35%" stopColor="#1D3049" />
          <stop offset="72%" stopColor="#0B1727" />
          <stop offset="100%" stopColor="#24384F" />
        </linearGradient>
        <linearGradient id="hgGold" x1="0" y1="0" x2="0.8" y2="1">
          <stop offset="0%" stopColor="#FBF0C8" />
          <stop offset="24%" stopColor="#E0C264" />
          <stop offset="52%" stopColor="#B18719" />
          <stop offset="74%" stopColor="#7A5D10" />
          <stop offset="100%" stopColor="#E6CE86" />
        </linearGradient>
        <linearGradient id="hgSteel" x1="0" y1="0" x2="0.7" y2="1">
          <stop offset="0%" stopColor="#F2F7FC" />
          <stop offset="34%" stopColor="#AFBDCC" />
          <stop offset="66%" stopColor="#5C6E82" />
          <stop offset="100%" stopColor="#C4D0DC" />
        </linearGradient>
        {/* vidro: quase nada de cor, só o suficiente para existir */}
        <linearGradient id="hgGlass" x1="0.1" y1="0" x2="0.95" y2="1">
          <stop offset="0%" stopColor="#BFE9F8" stopOpacity="0.11" />
          <stop offset="40%" stopColor="#10C0E0" stopOpacity="0.035" />
          <stop offset="100%" stopColor="#F2FAFF" stopOpacity="0.07" />
        </linearGradient>
        <linearGradient id="hgSand" x1="0.15" y1="0" x2="0.7" y2="1">
          <stop offset="0%" stopColor="#F6FAFE" />
          <stop offset="26%" stopColor="#D5E1EC" />
          <stop offset="58%" stopColor="#9FB0C2" />
          <stop offset="82%" stopColor="#C9D6E3" />
          <stop offset="100%" stopColor="#77899C" />
        </linearGradient>
        {/* oclusão nas paredes internas: é o que dá volume ao bulbo */}
        <radialGradient id="hgAO" cx="0.5" cy="0.42" r="0.62">
          <stop offset="60%" stopColor="#050D18" stopOpacity="0" />
          <stop offset="100%" stopColor="#03080F" stopOpacity="0.75" />
        </radialGradient>

        <clipPath id="hgClipTop"><path d={BULB_TOP} /></clipPath>
        <clipPath id="hgClipBottom"><path d={BULB_BOT} /></clipPath>
      </defs>

      {/* ---------- vidro (fundo) ---------- */}
      <path d={BULB_TOP} fill="url(#hgGlass)" />
      <path d={BULB_BOT} fill="url(#hgGlass)" />

      {/* ---------- areia ---------- */}
      <g clipPath="url(#hgClipTop)">
        {/* superfície côncava, como areia escoando por um funil */}
        <path
          data-sand-top
          d="M 76 150 C 160 214, 284 214, 364 150 L 364 352 L 76 352 Z"
          fill="url(#hgSand)"
        />
        <path d={BULB_TOP} fill="url(#hgAO)" />
      </g>

      <g clipPath="url(#hgClipBottom)">
        {/* pilha cônica que cresce a partir da base */}
        <path
          data-sand-bottom
          d="M 76 592 L 364 592 L 364 520 C 296 470, 262 436, 220 436 C 178 436, 144 470, 76 520 Z"
          fill="url(#hgSand)"
          transform="matrix(1,0,0,0,0,592)"
        />
        <path d={BULB_BOT} fill="url(#hgAO)" />
      </g>

      {/* filete caindo */}
      <rect data-sand-stream x="216.5" y="336" width="7" height="52" fill="url(#hgSand)" opacity="0" />

      {/* ---------- vidro (frente): contorno, brilho de borda e reflexos ---------- */}
      <path d={BULB_TOP} fill="none" stroke="url(#hgSteel)" strokeWidth="3" opacity="0.5" />
      <path d={BULB_BOT} fill="none" stroke="url(#hgSteel)" strokeWidth="3" opacity="0.5" />
      <path
        d="M 126 130 C 130 208, 168 288, 212 330"
        stroke="#FFFFFF"
        strokeOpacity="0.20"
        strokeWidth="7"
        strokeLinecap="round"
        fill="none"
      />
      <path
        d="M 150 132 C 154 200, 182 268, 214 306"
        stroke="#FFFFFF"
        strokeOpacity="0.10"
        strokeWidth="3"
        strokeLinecap="round"
        fill="none"
      />
      <path
        d="M 228 372 C 268 414, 306 494, 312 570"
        stroke="#FFFFFF"
        strokeOpacity="0.14"
        strokeWidth="6"
        strokeLinecap="round"
        fill="none"
      />

      {/* ---------- estrutura ---------- */}
      {/* colunas com gradiente cilíndrico */}
      <rect x="62" y="86" width="22" height="528" rx="11" fill="url(#hgPost)" />
      <rect x="356" y="86" width="22" height="528" rx="11" fill="url(#hgPost)" />
      <rect x="62" y="86" width="22" height="528" rx="11" fill="none" stroke="#04101C" strokeOpacity="0.6" strokeWidth="1.5" />
      <rect x="356" y="86" width="22" height="528" rx="11" fill="none" stroke="#04101C" strokeOpacity="0.6" strokeWidth="1.5" />

      {/* placas: sombra + corpo + fio de luz na aresta superior */}
      <rect x="50" y="70" width="340" height="44" rx="10" fill="#03090F" fillOpacity="0.75" transform="translate(4 5)" />
      <rect x="50" y="70" width="340" height="44" rx="10" fill="url(#hgPlate)" />
      <rect x="52" y="72" width="336" height="3" rx="1.5" fill="#FFFFFF" fillOpacity="0.22" />
      <rect x="50" y="586" width="340" height="44" rx="10" fill="#03090F" fillOpacity="0.75" transform="translate(4 5)" />
      <rect x="50" y="586" width="340" height="44" rx="10" fill="url(#hgPlate)" />
      <rect x="52" y="588" width="336" height="3" rx="1.5" fill="#FFFFFF" fillOpacity="0.22" />

      {/* anéis dourados */}
      <rect x="40" y="52" width="360" height="22" rx="11" fill="url(#hgGold)" />
      <rect x="40" y="626" width="360" height="22" rx="11" fill="url(#hgGold)" />
      <rect x="40" y="54" width="360" height="5" rx="2.5" fill="#FFF8DC" fillOpacity="0.4" />
      <rect x="40" y="628" width="360" height="5" rx="2.5" fill="#FFF8DC" fillOpacity="0.35" />

      {/* colar do gargalo */}
      <rect x="196" y="336" width="48" height="30" rx="7" fill="#03090F" fillOpacity="0.7" transform="translate(3 3)" />
      <rect x="196" y="336" width="48" height="30" rx="7" fill="url(#hgGold)" />
      <rect x="198" y="338" width="44" height="4" rx="2" fill="#FFF8DC" fillOpacity="0.45" />

      {/* rebites das colunas */}
      <circle cx="73" cy="350" r="15" fill="url(#hgGold)" />
      <circle cx="367" cy="350" r="15" fill="url(#hgGold)" />
      <circle cx="69" cy="345" r="5" fill="#FFF8DC" fillOpacity="0.5" />
      <circle cx="363" cy="345" r="5" fill="#FFF8DC" fillOpacity="0.5" />
    </svg>
  )
}
