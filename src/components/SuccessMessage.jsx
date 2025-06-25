function SuccessMessage ({ show }) {
  return (
    <div className={`success-message ${show ? 'show' : ''}`}>
      Puzzle Solved! 🎉
    </div>
  )
}

export default SuccessMessage
