export default function Avatar ({ src, alt, size = 32 }) {
  const safeAlt = alt || 'Avatar'
  const style = { width: size, height: size }

  return (
    <div className='avatar' style={style} aria-label={safeAlt}>
      {src
        ? <img src={src} alt={safeAlt} />
        : <span className='avatar__placeholder'>{safeAlt.slice(0, 1).toUpperCase()}</span>}
    </div>
  )
}
