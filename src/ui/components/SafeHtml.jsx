import { useMemo } from 'react'
import DOMPurify from 'dompurify'

/**
 * Render HTML dari API dengan aman.
 * Dicoding Forum API mengirim body/comment dalam format HTML.
 */
export default function SafeHtml ({ html, className = '' }) {
  const clean = useMemo(() => DOMPurify.sanitize(html || ''), [html])
  return (
    <div
      className={className}
      // eslint-disable-next-line react/no-danger
      dangerouslySetInnerHTML={{ __html: clean }}
    />
  )
}
