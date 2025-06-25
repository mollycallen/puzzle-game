import { memo } from 'react'

function Controls ({ gridSize, onGridSizeChange, onNewImage, onShuffle, disabled }) {
  return (
    <div className='controls'>
      <label htmlFor='gridSize'>Grid Size: </label>
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
      <button onClick={onNewImage} disabled={disabled}>New Image</button>
      <button onClick={onShuffle} disabled={disabled}>Shuffle Tiles</button>
    </div>
  )
}

export default memo(Controls)
