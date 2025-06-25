import { memo } from 'react'

function Controls ({
  gridSize,
  onGridSizeChange,
  onNewImage,
  onShuffle,
  disabled
}) {
  return (
    <div className='controls'>
      <div className='control-group'>
        <label htmlFor='gridSize'>Grid Size:</label>
        <select
          id='gridSize'
          value={gridSize}
          onChange={e => onGridSizeChange(parseInt(e.target.value))}
          disabled={disabled}
        >
          <option value='2'>2x2</option>
          <option value='3'>3x3</option>
          <option value='4'>4x4</option>
          <option value='5'>5x5</option>
        </select>
      </div>

      <button
        className='btn-primary'
        onClick={onNewImage}
        disabled={disabled}
        aria-label='Load new image'
      >
        <svg
          xmlns='http://www.w3.org/2000/svg'
          width='16'
          height='16'
          viewBox='0 0 24 24'
          fill='none'
          stroke='currentColor'
          strokeWidth='2'
          strokeLinecap='round'
          strokeLinejoin='round'
        >
          <rect x='3' y='3' width='18' height='18' rx='2' ry='2'></rect>
          <circle cx='8.5' cy='8.5' r='1.5'></circle>
          <polyline points='21 15 16 10 5 21'></polyline>
        </svg>
        New Image
      </button>

      <button
        className='btn-accent'
        onClick={onShuffle}
        disabled={disabled}
        aria-label='Shuffle tiles'
      >
        <svg
          xmlns='http://www.w3.org/2000/svg'
          width='16'
          height='16'
          viewBox='0 0 24 24'
          fill='none'
          stroke='currentColor'
          strokeWidth='2'
          strokeLinecap='round'
          strokeLinejoin='round'
        >
          <polyline points='16 3 21 3 21 8'></polyline>
          <line x1='4' y1='20' x2='21' y2='3'></line>
          <polyline points='21 16 21 21 16 21'></polyline>
          <line x1='15' y1='15' x2='21' y2='21'></line>
          <line x1='4' y1='4' x2='9' y2='9'></line>
        </svg>
        Shuffle
      </button>
    </div>
  )
}

export default memo(Controls)
