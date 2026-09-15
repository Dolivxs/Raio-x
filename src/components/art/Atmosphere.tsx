type Props = { className?: string; haze?: boolean; vignette?: boolean; grid?: boolean }

/**
 * Camada atmosférica: névoa fria + vinheta + malha técnica discreta.
 * Tudo gradiente estático — nada de filter animado.
 */
export default function Atmosphere({ className = '', haze = true, vignette = true, grid = false }: Props) {
  return (
    <div aria-hidden className={`pointer-events-none absolute inset-0 overflow-hidden ${className}`}>
      {haze && <div className="rx-haze absolute inset-0" />}
      {grid && (
        <div
          className="absolute inset-0 opacity-[0.16]"
          style={{
            backgroundImage:
              'linear-gradient(to right, rgba(198,206,216,0.09) 1px, transparent 1px),' +
              'linear-gradient(to bottom, rgba(198,206,216,0.09) 1px, transparent 1px)',
            backgroundSize: '96px 96px',
            maskImage: 'radial-gradient(70% 60% at 50% 45%, #000 20%, transparent 78%)',
          }}
        />
      )}
      {vignette && (
        <div
          className="absolute inset-0"
          style={{
            background:
              'radial-gradient(125% 90% at 50% 45%, transparent 36%, rgba(5,13,24,0.78) 100%)',
          }}
        />
      )}
    </div>
  )
}
