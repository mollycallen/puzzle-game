import { memo } from 'react'

function Timer ({ time }) {
  // Format time as mm:ss
  const formatTime = () => {
    const minutes = Math.floor(time / 60)
    const seconds = time % 60
    return `${minutes.toString().padStart(2, '0')}:${seconds
      .toString()
      .padStart(2, '0')}`
  }

  return (
    <div className='timer-container'>
      <div className='timer-label'>Elapsed Time</div>
      <div className='timer'>{formatTime()}</div>
    </div>
  )
}

export default memo(Timer)
