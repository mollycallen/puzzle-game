import { useState, useEffect, useRef, useCallback } from 'react'
import Controls from './components/Controls'
import Timer from './components/Timer'
import SuccessMessage from './components/SuccessMessage'
import GameBoard from './components/GameBoard'
import LoadingModal from './components/LoadingModal'
import './App.css'

function App () {
  // State management
  const [gridSize, setGridSize] = useState(3)
  const [currentImageId, setCurrentImageId] = useState(
    Math.floor(Math.random() * 1000)
  )
  const [tiles, setTiles] = useState([])
  const [isGameActive, setIsGameActive] = useState(false)
  const [time, setTime] = useState(0)
  const [showSuccess, setShowSuccess] = useState(false)
  const [isImageLoading, setIsImageLoading] = useState(true)

  // Refs for timer and drag state
  const timerInterval = useRef(null)
  const draggedTileId = useRef(null)
  const originalPositions = useRef([])

  // Timer logic
  useEffect(() => {
    if (isGameActive) {
      timerInterval.current = setInterval(() => {
        setTime(prevTime => prevTime + 1)
      }, 1000)
    } else {
      if (timerInterval.current) {
        clearInterval(timerInterval.current)
      }
    }

    return () => {
      if (timerInterval.current) {
        clearInterval(timerInterval.current)
      }
    }
  }, [isGameActive])

  // Initialize tiles when grid size or image changes
  useEffect(() => {
    initializeTiles()
  }, [gridSize, currentImageId])

  // Preload image when currentImageId changes
  useEffect(() => {
    setIsImageLoading(true)
    const imageUrl = `https://picsum.photos/id/${currentImageId}/600`
    const img = new Image()

    img.onload = () => {
      setIsImageLoading(false)
    }

    img.onerror = () => {
      // If image fails to load, try a different ID
      setCurrentImageId(Math.floor(Math.random() * 1000))
    }

    img.src = imageUrl
  }, [currentImageId])

  // Initialize tiles with background positions
  const initializeTiles = () => {
    const tileSize = 600 / gridSize
    const newTiles = []

    for (let row = 0; row < gridSize; row++) {
      for (let col = 0; col < gridSize; col++) {
        const xOffset = -col * tileSize
        const yOffset = -row * tileSize

        newTiles.push({
          id: `${row}-${col}`,
          position: `${xOffset}px ${yOffset}px`
        })
      }
    }

    setTiles(newTiles)
    originalPositions.current = newTiles.map(tile => tile.position)
    setIsGameActive(false)
    setTime(0)
  }

  // Memoize these functions to prevent unnecessary re-renders
  const getNewImage = useCallback(() => {
    setCurrentImageId(Math.floor(Math.random() * 1000))
    setIsGameActive(false)
    setTime(0)
    setShowSuccess(false)
  }, [])

  const shuffleTiles = useCallback(() => {
    // Don't shuffle if image is still loading
    if (isImageLoading) return

    const positions = [...originalPositions.current]
    let shuffledPositions

    // Make sure the shuffle actually changes positions
    do {
      shuffledPositions = [...positions].sort(() => Math.random() - 0.5)
    } while (shuffledPositions.every((pos, idx) => pos === positions[idx]))

    const newTiles = tiles.map((tile, index) => ({
      ...tile,
      position: shuffledPositions[index]
    }))

    setTiles(newTiles)
    setIsGameActive(true)
    setTime(0)
  }, [tiles, isImageLoading])

  const handleGridSizeChange = useCallback(newSize => {
    setGridSize(newSize)
    setShowSuccess(false)
  }, [])

  // Check if puzzle is solved - memoized since it's used in handleDragEnd
  const checkIfSolved = useCallback(() => {
    if (!isGameActive) return false

    return tiles.every(
      (tile, index) => tile.position === originalPositions.current[index]
    )
  }, [isGameActive, tiles])

  // Memoize drag handlers to prevent tile re-renders
  const handleDragStart = useCallback(
    tileId => {
      const tileIndex = tiles.findIndex(tile => tile.id === tileId)
      draggedTileId.current = tileIndex
    },
    [tiles]
  )

  const handleDragEnd = useCallback(() => {
    // Remove drag-over class from all tiles
    const allTiles = document.querySelectorAll('.tile')
    allTiles.forEach(tile => tile.classList.remove('drag-over'))

    if (checkIfSolved()) {
      setIsGameActive(false)
      setShowSuccess(true)
    }

    draggedTileId.current = null
  }, [checkIfSolved])

  const handleDrop = useCallback(
    targetTileId => {
      if (draggedTileId.current === null) return

      const newTiles = [...tiles]
      const targetIndex = tiles.findIndex(tile => tile.id === targetTileId)

      if (draggedTileId.current !== targetIndex) {
        // Swap positions
        const temp = newTiles[draggedTileId.current].position
        newTiles[draggedTileId.current].position =
          newTiles[targetIndex].position
        newTiles[targetIndex].position = temp

        setTiles(newTiles)
      }
    },
    [tiles]
  )

  const imageUrl = `https://picsum.photos/id/${currentImageId}/600`

  return (
    <div className='app-container'>
      <div className='app-header'>
        <h1 className='app-title'>Image Puzzle</h1>
        <p className='app-subtitle'>
          Drag and drop the tiles to solve the puzzle
        </p>
      </div>

      <LoadingModal isLoading={isImageLoading} />
      <div>
        <Controls
          gridSize={gridSize}
          onGridSizeChange={handleGridSizeChange}
          onNewImage={getNewImage}
          onShuffle={shuffleTiles}
          disabled={isImageLoading}
        />

        <Timer time={time} />
      </div>
      <GameBoard
        gridSize={gridSize}
        tiles={tiles}
        imageUrl={imageUrl}
        onDragStart={handleDragStart}
        onDragEnd={handleDragEnd}
        onDrop={handleDrop}
        disabled={isImageLoading}
      />

      <SuccessMessage
        show={showSuccess}
        time={time}
        onPlayAgain={getNewImage}
      />
    </div>
  )
}

export default App
