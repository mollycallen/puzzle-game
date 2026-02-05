import { memo } from 'react'

function HintButton ({ onHint, disabled }) {
  return (
    <div className='hint-container'>
      {/* Legend */}
      <div className='hint-legend'>
        <span className='hint-legend-item'>
          <span className='hint-legend-color hint-legend-source'></span>
          Move
        </span>
        <span className='hint-legend-item'>
          <span className='hint-legend-color hint-legend-destination'></span>
          To here
        </span>
      </div>

      {/* Button */}
      <button
        className='btn-hint'
        onClick={onHint}
        disabled={disabled}
        aria-label='Show hint for misplaced tile'
      >
        <svg
          xmlns='http://www.w3.org/2000/svg'
          width='14'
          height='14'
          viewBox='0 0 24 24'
          fill='none'
          stroke='currentColor'
          strokeWidth='2'
          strokeLinecap='round'
          strokeLinejoin='round'
        >
          <path d='M9 18h6' />
          <path d='M10 22h4' />
          <path d='M12 2a7 7 0 0 0-4 12.9V17a1 1 0 0 0 1 1h6a1 1 0 0 0 1-1v-2.1A7 7 0 0 0 12 2z' />
        </svg>
        Hint
      </button>
    </div>
  )
}

export default memo(HintButton)
