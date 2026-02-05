import Tile from './Tile'

function GameBoard ({
  gridSize,
  tiles,
  imageUrl,
  onDragStart,
  onDragEnd,
  onDrop,
  disabled,
  hintSource,
  hintDestination
}) {
  // Determine hint type for each tile
  const getHintType = index => {
    if (index === hintSource) return 'source'
    if (index === hintDestination) return 'destination'
    return null
  }

  return (
    <div
      className={`grid-container ${disabled ? 'disabled' : ''}`}
      style={{
        gridTemplateColumns: `repeat(${gridSize}, 1fr)`,
        gridTemplateRows: `repeat(${gridSize}, 1fr)`
      }}
    >
      {tiles.map((tile, index) => (
        <Tile
          key={tile.id}
          id={tile.id}
          position={tile.position}
          imageUrl={imageUrl}
          onDragStart={onDragStart}
          onDragEnd={onDragEnd}
          onDrop={onDrop}
          disabled={disabled}
          hintType={getHintType(index)}
        />
      ))}
    </div>
  )
}

export default GameBoard
