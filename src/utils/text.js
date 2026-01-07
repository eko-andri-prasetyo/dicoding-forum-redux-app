export function truncate (text, max = 120) {
  if (!text) return ''
  const s = String(text).replace(/\s+/g, ' ').trim()
  if (s.length <= max) return s
  return `${s.slice(0, Math.max(0, max - 1))}…`
}

// Menghapus tag HTML (sederhana) agar snippet/list tidak menampilkan <div>, <br>, dll.
export function stripHtml (html) {
  if (!html) return ''
  return String(html)
    .replace(/<[^>]*>/g, ' ')
    .replace(/&nbsp;/g, ' ')
    .replace(/&amp;/g, '&')
    .replace(/&lt;/g, '<')
    .replace(/&gt;/g, '>')
    .replace(/&quot;/g, '"')
    .replace(/&#39;/g, "'")
    .replace(/\s+/g, ' ')
    .trim()
}

export function unique (arr) {
  return Array.from(new Set(arr))
}

export function toISODateTime (d) {
  try {
    return new Date(d).toISOString()
  } catch {
    return ''
  }
}
