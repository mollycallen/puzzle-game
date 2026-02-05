import { useState, useRef, useCallback, useEffect } from 'react'
import Controls from './components/Controls'
import Timer from './components/Timer'
import SuccessMessage from './components/SuccessMessage'
import GameBoard from './components/GameBoard'
import LoadingModal from './components/LoadingModal'
import HintButton from './components/HintButton'

import { useImageLoader } from './hooks/useImageLoader'
import { useGameTimer } from './hooks/useGameTimer'
import { useHint } from './hooks/useHint'
import {
  createTiles,
  shufflePositions,
  applyShuffledPositions,
  resetTilePositions,
  swapTilePositions,
  checkIsSolved
} from './utils/puzzleUtils'

import './App.css'

function App () {
  // Grid and tile state
  const [gridSize, setGridSize] = useState(3)
  const [tiles, setTiles] = useState([])
  const [isGameActive, setIsGameActive] = useState(false)
  const [moves, setMoves] = useState(0)
  const [showSuccess, setShowSuccess] = useState(false)
  const [isShuffled, setIsShuffled] = useState(false)

  // Refs
  const draggedTileId = useRef(null)
  const originalPositions = useRef([])

  // Custom hooks
  const { imageUrl, isLoading: isImageLoading, loadNewImage } = useImageLoader()
  const { time, resetTimer, restartTimer, stopTimer } = useGameTimer()
  const { hintSource, hintDestination, showHint, clearHints } = useHint()

  // Initialize tiles when grid size or image changes
  useEffect(() => {
    const newTiles = createTiles(gridSize)
    setTiles(newTiles)
    originalPositions.current = newTiles.map(tile => tile.position)
    setIsGameActive(false)
    setMoves(0)
    setIsShuffled(false)
    resetTimer()
    clearHints()
  }, [gridSize, imageUrl, resetTimer, clearHints])

  // Handle new image
  const handleNewImage = useCallback(() => {
    loadNewImage()
    setIsGameActive(false)
    setMoves(0)
    setShowSuccess(false)
    setIsShuffled(false)
    resetTimer()
    clearHints()
  }, [loadNewImage, resetTimer, clearHints])

  // Handle shuffle
  const handleShuffle = useCallback(() => {
    if (isImageLoading) return

    const shuffledPositions = shufflePositions(originalPositions.current)
    const newTiles = applyShuffledPositions(tiles, shuffledPositions)

    setTiles(newTiles)
    setIsGameActive(true)
    setMoves(0)
    setIsShuffled(true)
    restartTimer()
    clearHints()
  }, [tiles, isImageLoading, restartTimer, clearHints])

  // Handle reset
  const handleReset = useCallback(() => {
    const newTiles = resetTilePositions(tiles, originalPositions.current)

    setTiles(newTiles)
    setIsGameActive(false)
    setMoves(0)
    setIsShuffled(false)
    setShowSuccess(false)
    resetTimer()
    clearHints()
  }, [tiles, resetTimer, clearHints])

  // Handle grid size change
  const handleGridSizeChange = useCallback(
    newSize => {
      setGridSize(newSize)
      setShowSuccess(false)
      clearHints()
    },
    [clearHints]
  )

  // Handle hint
  const handleHint = useCallback(() => {
    if (!isGameActive) return
    showHint(tiles, originalPositions.current)
  }, [isGameActive, tiles, showHint])

  // Handle drag start
  const handleDragStart = useCallback(
    tileId => {
      const tileIndex = tiles.findIndex(tile => tile.id === tileId)
      draggedTileId.current = tileIndex
      clearHints()
    },
    [tiles, clearHints]
  )

  // Handle drag end
  const handleDragEnd = useCallback(() => {
    // Remove drag-over class from all tiles
    const allTiles = document.querySelectorAll('.tile')
    allTiles.forEach(tile => tile.classList.remove('drag-over'))

    if (isGameActive && checkIsSolved(tiles, originalPositions.current)) {
      setIsGameActive(false)
      setShowSuccess(true)
      stopTimer()
      clearHints()
    }

    draggedTileId.current = null
  }, [isGameActive, tiles, stopTimer, clearHints])

  // Handle drop
  const handleDrop = useCallback(
    targetTileId => {
      if (draggedTileId.current === null) return

      const targetIndex = tiles.findIndex(tile => tile.id === targetTileId)

      if (draggedTileId.current !== targetIndex) {
        const newTiles = swapTilePositions(
          tiles,
          draggedTileId.current,
          targetIndex
        )
        setTiles(newTiles)
        setMoves(prevMoves => prevMoves + 1)
      }
    },
    [tiles]
  )

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
          onNewImage={handleNewImage}
          onShuffle={handleShuffle}
          onReset={handleReset}
          disabled={isImageLoading}
          isShuffled={isShuffled}
        />

        <Timer time={time} moves={moves} />
      </div>

      <HintButton
        onHint={handleHint}
        disabled={!isGameActive || isImageLoading}
      />

      <GameBoard
        gridSize={gridSize}
        tiles={tiles}
        imageUrl={imageUrl}
        onDragStart={handleDragStart}
        onDragEnd={handleDragEnd}
        onDrop={handleDrop}
        disabled={isImageLoading}
        hintSource={hintSource}
        hintDestination={hintDestination}
      />

      <SuccessMessage
        show={showSuccess}
        time={time}
        moves={moves}
        onPlayAgain={handleNewImage}
      />
    </div>
  )
}

export default App
