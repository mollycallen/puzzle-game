import { memo } from 'react'

function LoadingModal({ isLoading }) {
  if (!isLoading) return null

  return (
    <div className='loading-modal-overlay'>
      <div className='loading-modal'>
        <div className='loading-spinner'></div>
        <p>Preparing your puzzle...</p>
      </div>
    </div>
  )
}

export default memo(LoadingModal)
