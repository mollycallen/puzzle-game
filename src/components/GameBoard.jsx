import Tile from './Tile'

function GameBoard ({
  gridSize,
  tiles,
  imageUrl,
  onDragStart,
  onDragEnd,
  onDrop
}) {
  return (
    <div
      className='grid-container'
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
        />
      ))}
    </div>
  )
}

export default GameBoard
