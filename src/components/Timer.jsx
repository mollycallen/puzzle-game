import { memo } from 'react'

function Timer ({ time, moves }) {
  // Format time as mm:ss
  const formatTime = () => {
    const minutes = Math.floor(time / 60)
    const seconds = time % 60
    return `${minutes.toString().padStart(2, '0')}:${seconds
      .toString()
      .padStart(2, '0')}`
  }

  return (
    <div className='timer-and-moves'>
      <div className='timer-container'>
        <div className='timer-label'>Elapsed Time</div>
        <div className='timer'>{formatTime()}</div>
      </div>
      <div className='moves-container'>
        <div className='moves-label'>Moves</div>
        <div className='moves'>{moves || 0}</div>
      </div>
    </div>
  )
}

export default memo(Timer)
