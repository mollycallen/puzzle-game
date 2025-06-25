import { useState, useEffect, useRef, useCallback } from 'react'
import Controls from './components/Controls'
import Timer from './components/Timer'
import SuccessMessage from './components/SuccessMessage'
import GameBoard from './components/GameBoard'
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

  // Memoize these functions to prevent unnecessary re-renders of Controls
  const getNewImage = useCallback(() => {
    setCurrentImageId(Math.floor(Math.random() * 1000))
    setIsGameActive(false)
    setTime(0)
  }, [])

  const shuffleTiles = useCallback(() => {
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
  }, [tiles])

  const handleGridSizeChange = useCallback(newSize => {
    setGridSize(newSize)
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
      setTimeout(() => setShowSuccess(false), 3000)
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
      <Controls
        gridSize={gridSize}
        onGridSizeChange={handleGridSizeChange}
        onNewImage={getNewImage}
        onShuffle={shuffleTiles}
      />

      <Timer time={time} />

      <GameBoard
        gridSize={gridSize}
        tiles={tiles}
        imageUrl={imageUrl}
        onDragStart={handleDragStart}
        onDragEnd={handleDragEnd}
        onDrop={handleDrop}
      />

      <SuccessMessage show={showSuccess} />
    </div>
  )
}

export default App
