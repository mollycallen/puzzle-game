# Image Puzzle Game v2

An interactive image puzzle game built with React and Vite. This enhanced version includes move tracking and reset functionality.

## Features

- **Dynamic Grid Sizes**: Choose from 2x2, 3x3, 4x4, or 5x5 puzzle grids
- **Random Images**: Fetches beautiful images from Picsum Photos API
- **Timer**: Tracks elapsed time while solving the puzzle
- **Move Counter**: Displays the number of moves made (NEW!)
- **Reset Function**: Reset the puzzle back to its original unshuffled state (NEW!)
- **Drag and Drop**: Intuitive tile swapping using drag and drop
- **Success Animation**: Celebration with confetti when puzzle is solved
- **Responsive Design**: Works on both desktop and mobile devices
- **Loading States**: Smooth loading experience with spinners

## New Features in v2

### Move Counter
- Tracks every tile swap during gameplay
- Displayed next to the timer
- Resets when the timer resets (new game, shuffle, or reset)
- Shows in success message with completion time

### Reset Button
- Restores the puzzle to its original, unshuffled state
- Stops the timer and resets move counter
- Only enabled when the puzzle has been shuffled
- Styled with a light theme to distinguish from other actions

## How to Play

1. **Start**: Click "New Image" to load a random image puzzle
2. **Shuffle**: Click "Shuffle" to scramble the tiles and start the timer
3. **Solve**: Drag and drop tiles to swap their positions
4. **Reset**: Use "Reset" to return to the original unshuffled state if needed
5. **Goal**: Arrange all tiles to recreate the original image

## Installation

```bash
# Install dependencies
npm install

# Start development server
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview
```

## Technical Details

- **Framework**: React 18 with Hooks
- **Build Tool**: Vite for fast development and building
- **Styling**: Custom CSS with CSS Variables for theming
- **Image Source**: Picsum Photos API for random high-quality images
- **Responsive**: Mobile-first responsive design

## Game Mechanics

- Move counter increases only when tiles are actually swapped
- Timer runs only during active gameplay (after shuffle, before completion)
- Reset functionality preserves the current image but restores original tile positions
- Success detection checks if all tiles are in their original positions
- Confetti animation celebrates successful completion

## Browser Support

Modern browsers with HTML5 Drag and Drop API support:
- Chrome 4+
- Firefox 3.5+
- Safari 3.1+
- Edge (all versions)

## License

MIT License - feel free to use this project for learning or personal use.
