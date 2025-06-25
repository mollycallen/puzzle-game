import { memo } from 'react'

function Tile ({ id, position, imageUrl, onDragStart, onDragEnd, onDrop }) {
  const handleDragStart = e => {
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
    e.target.classList.add('drag-over')
  }

  const handleDragLeave = e => {
    e.target.classList.remove('drag-over')
  }

  const handleDrop = e => {
    e.preventDefault()
    e.target.classList.remove('drag-over')
    onDrop(id)
  }

  return (
    <div
      className='tile'
      style={{
        backgroundPosition: position,
        backgroundImage: `url(${imageUrl})`
      }}
      draggable
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
