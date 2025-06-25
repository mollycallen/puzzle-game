import Tile from './Tile'

function GameBoard ({
  gridSize,
  tiles,
  imageUrl,
  onDragStart,
  onDragEnd,
  onDrop,
  disabled
}) {
  return (
    <div
      className={`grid-container ${disabled ? 'disabled' : ''}`}
      style={{
        gridTemplateColumns: `repeat(${gridSize}, 1fr)`,
        gridTemplateRows: `repeat(${gridSize}, 1fr)`
      }}
    >
      {tiles.map(tile => (
        <Tile
          key={tile.id}
          id={tile.id}
          position={tile.position}
          imageUrl={imageUrl}
          onDragStart={onDragStart}
          onDragEnd={onDragEnd}
          onDrop={onDrop}
          disabled={disabled}
        />
      ))}
    </div>
  )
}

export default GameBoard
