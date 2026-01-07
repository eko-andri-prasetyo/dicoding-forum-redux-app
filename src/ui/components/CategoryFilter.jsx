export default function CategoryFilter ({ categories, value, onChange }) {
  return (
    <div className='filterRow'>
      <label htmlFor='category' className='label'>Filter Kategori</label>
      <select
        id='category'
        className='select'
        value={value}
        onChange={(e) => onChange(e.target.value)}
      >
        {categories.map((c) => (
          <option key={c} value={c}>
            {c === 'ALL' ? 'Semua' : c}
          </option>
        ))}
      </select>
    </div>
  )
}
