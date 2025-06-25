import { useEffect } from 'react'

function SuccessMessage ({ show, time, onPlayAgain }) {
  // Format time as mm:ss
  const formatTime = () => {
    const minutes = Math.floor(time / 60)
    const seconds = time % 60
    return `${minutes.toString().padStart(2, '0')}:${seconds
      .toString()
      .padStart(2, '0')}`
  }

  // Create confetti effect when showing success
  useEffect(() => {
    if (show) {
      createConfetti()
    }
  }, [show])

  const createConfetti = () => {
    const confettiContainer = document.querySelector('body')
    const colors = ['#3a86ff', '#ff006e', '#ffbe0b', '#fb5607', '#38b000']

    for (let i = 0; i < 100; i++) {
      const confetti = document.createElement('div')
      confetti.className = 'confetti'
      confetti.style.backgroundColor =
        colors[Math.floor(Math.random() * colors.length)]
      confetti.style.left = `${Math.random() * 100}%`
      confetti.style.width = `${Math.random() * 10 + 5}px`
      confetti.style.height = `${Math.random() * 10 + 5}px`
      confetti.style.opacity = Math.random() + 0.5
      confetti.style.animationDuration = `${Math.random() * 3 + 2}s`

      confettiContainer.appendChild(confetti)

      setTimeout(() => {
        confetti.remove()
      }, 5000)
    }
  }

  return (
    <div className={`success-message ${show ? 'show' : ''}`}>
      <h2 className='success-message-header'>Puzzle Solved!</h2>
      <p className='success-message-subtext'>
        Great job! You completed the puzzle.
      </p>

      <div className='success-message-stats'>
        <div className='success-stat'>
          <div className='success-stat-value'>{formatTime()}</div>
          <div className='success-stat-label'>Time</div>
        </div>
      </div>

      <div className='success-actions'>
        <button className='btn-primary' onClick={onPlayAgain}>
          Play Again
        </button>
      </div>
    </div>
  )
}

export default SuccessMessage
