import { memo } from 'react'

function Tile ({
  id,
  position,
  imageUrl,
  onDragStart,
  onDragEnd,
  onDrop,
  disabled,
  hintType
}) {
  const handleDragStart = e => {
    if (disabled) {
      e.preventDefault()
      return
    }
    e.dataTransfer.setData('text/plain', '') // Required for Firefox
    e.target.classList.add('dragging')
    onDragStart(id)
  }

  const handleDragEnd = e => {
    e.target.classList.remove('dragging')
    onDragEnd()
  }

  const handleDragOver = e => {
    e.preventDefault()
  }

  const handleDragEnter = e => {
    if (!disabled) {
      e.target.classList.add('drag-over')
    }
  }

  const handleDragLeave = e => {
    e.target.classList.remove('drag-over')
  }

  const handleDrop = e => {
    e.preventDefault()
    e.target.classList.remove('drag-over')
    if (!disabled) {
      onDrop(id)
    }
  }

  // Build class name based on hint type
  const getClassName = () => {
    let className = 'tile'
    if (hintType === 'source') className += ' tile-hint-source'
    if (hintType === 'destination') className += ' tile-hint-destination'
    return className
  }

  return (
    <div
      className={getClassName()}
      style={{
        backgroundPosition: position,
        backgroundImage: `url(${imageUrl})`
      }}
      draggable={!disabled}
      onDragStart={handleDragStart}
      onDragEnd={handleDragEnd}
      onDragOver={handleDragOver}
      onDragEnter={handleDragEnter}
      onDragLeave={handleDragLeave}
      onDrop={handleDrop}
    />
  )
}

export default memo(Tile)
