import { useState } from 'react'
import { useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { createThread } from '../../states/threads/thunks.js'

export default function AddThreadPage () {
  const dispatch = useDispatch()
  const navigate = useNavigate()

  const [title, setTitle] = useState('')
  const [category, setCategory] = useState('')
  const [body, setBody] = useState('')

  const onSubmit = async (e) => {
    e.preventDefault()
    const t = title.trim()
    const b = body.trim()
    if (!t || !b) return

    const result = await dispatch(createThread({ title: t, body: b, category: category.trim() || 'General' }))
    const created = result.payload
    if (created?.id) navigate(`/threads/${created.id}`)
    else navigate('/')
  }

  return (
    <section className='card'>
      <div className='card__header'>
        <h1 className='card__title'>Buat Thread</h1>
        <p className='muted'>Thread baru akan muncul di halaman daftar.</p>
      </div>

      <form className='form' onSubmit={onSubmit}>
        <label htmlFor='title' className='label'>Judul</label>
        <input
          id='title'
          className='input'
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder='Judul thread…'
          required
        />

        <label htmlFor='category' className='label'>Kategori (opsional)</label>
        <input
          id='category'
          className='input'
          value={category}
          onChange={(e) => setCategory(e.target.value)}
          placeholder='Misal: React, Redux, API…'
        />

        <label htmlFor='body' className='label'>Body</label>
        <textarea
          id='body'
          className='textarea'
          rows='6'
          value={body}
          onChange={(e) => setBody(e.target.value)}
          placeholder='Tulis isi thread…'
          required
        />

        <div className='form__actions'>
          <button type='submit' className='btn'>Publish</button>
        </div>
      </form>
    </section>
  )
}
