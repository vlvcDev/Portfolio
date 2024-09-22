import React, { useState, useRef, useEffect } from 'react';
import '../styles/Game.css';
import raccoonImage from '../assets/raccoon.png';
import bugImage from '../assets/bug.png';

const Game = () => {
  const [gameStarted, setGameStarted] = useState(false);
  const [gameOver, setGameOver] = useState(false);
  const [bugs, setBugs] = useState([]);
  const [score, setScore] = useState(0);
  const [lives, setLives] = useState(2);
  const [raccoonLane, setRaccoonLane] = useState(1); // Starting at middle lane (0-2)
  const [lanes, setLanes] = useState([]);
  const [lanesInitialized, setLanesInitialized] = useState(false);
  const gameAreaRef = useRef(null);
  const raccoonRef = useRef(null);

  const LANE_COUNT = 3;
  const RACCOON_X = 20; // Fixed left position of the raccoon
  const RACCOON_WIDTH = 100;
  const RACCOON_HEIGHT = 100; // Height of the raccoon image
  const BUG_WIDTH = 50;
  const BUG_HEIGHT = 50; // Height of the bug image

  const speedRef = useRef(5); // Initial speed
  const spawnIntervalRef = useRef(1000); // Initial spawn interval
  const bugTimeoutRef = useRef(null);

  // Start the game
  const startGame = () => {
    setGameStarted(true);
    setGameOver(false);
    setScore(0);
    setLives(3);
    setBugs([]);
    setRaccoonLane(1); // Start in middle lane
    speedRef.current = 5; // Reset speed
    spawnIntervalRef.current = 1000; // Reset spawn interval
    setLanesInitialized(false); // Reset lanes initialization
  };

  // Initialize lanes after game area renders
  useEffect(() => {
    if (gameStarted) {
      const initializeLanes = () => {
        if (gameAreaRef.current) {
          const gameHeight = gameAreaRef.current.offsetHeight;
          if (gameHeight > 0) {
            const laneHeight = gameHeight / LANE_COUNT;
            const newLanes = [];
            for (let i = 0; i < LANE_COUNT; i++) {
              newLanes[i] = i * laneHeight + laneHeight / 2; // Center of the lane
            }
            setLanes(newLanes);
            setLanesInitialized(true); // Indicate lanes are initialized
            moveRaccoon(raccoonLane); // Move raccoon to current lane
          } else {
            // If gameHeight is 0, wait a bit and try again
            setTimeout(initializeLanes, 50);
          }
        } else {
          // If ref is not ready, wait and try again
          setTimeout(initializeLanes, 50);
        }
      };
      initializeLanes();
    }
  }, [gameStarted]);

  // Start spawning bugs after lanes are initialized
  useEffect(() => {
    if (gameStarted && lanesInitialized) {
      spawnBug();
    }
  }, [gameStarted, lanesInitialized]);

  const spawnBug = () => {
    if (!gameStarted) return;

    createBug();

    // Increase speed over time
    speedRef.current = Math.min(30, speedRef.current + 0.2);

    // Decrease spawn interval over time
    spawnIntervalRef.current = Math.max(300, spawnIntervalRef.current - 30);

    // Schedule next bug spawn
    bugTimeoutRef.current = setTimeout(spawnBug, spawnIntervalRef.current);
  };

  // Handle key presses for raccoon movement
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (!gameStarted) return;
      if (e.key === 'ArrowUp') {
        e.preventDefault(); // Prevent window scrolling
        moveRaccoon('up');
      } else if (e.key === 'ArrowDown') {
        e.preventDefault(); // Prevent window scrolling
        moveRaccoon('down');
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [gameStarted]);

  // Move the raccoon between lanes
  const moveRaccoon = (direction) => {
    setRaccoonLane((prevLane) => {
      let newLane = prevLane;
      if (typeof direction === 'number') {
        newLane = direction;
      } else if (direction === 'up') {
        newLane = Math.max(0, prevLane - 1);
      } else if (direction === 'down') {
        newLane = Math.min(LANE_COUNT - 1, prevLane + 1);
      }
      return newLane;
    });
  };

  // Update raccoon's position when lane changes
  useEffect(() => {
    if (raccoonRef.current && lanes.length > 0) {
      raccoonRef.current.style.top = `${lanes[raccoonLane]}px`;
    }
  }, [raccoonLane, lanes]);

  // Create a new bug
  const createBug = () => {
    if (!gameAreaRef.current || lanes.length === 0) return;
    const gameWidth = gameAreaRef.current.offsetWidth;
    setBugs((prevBugs) => [
      ...prevBugs,
      {
        id: Date.now(),
        left: gameWidth - BUG_WIDTH, // Spawn at right edge
        lane: Math.floor(Math.random() * LANE_COUNT),
      },
    ]);
  };

  // Move bugs
  useEffect(() => {
    if (!gameStarted) return;
    const moveInterval = setInterval(() => {
      setBugs((prevBugs) =>
        prevBugs
          .map((bug) => ({
            ...bug,
            left: bug.left - speedRef.current, // Move left
          }))
          .filter((bug) => {
            // Check if bug reached raccoon side
            if (bug.left < 0) {
              setLives((lives) => lives - 1);
              return false; // Remove the bug
            }
            return true;
          })
      );
    }, 50);

    return () => clearInterval(moveInterval);
  }, [gameStarted]);

  // Collision detection
  useEffect(() => {
    if (!gameStarted) return;
    const collisionInterval = setInterval(() => {
      setBugs((prevBugs) =>
        prevBugs.filter((bug) => {
          if (isColliding(bug)) {
            setScore((score) => score + 10);
            return false; // Remove bug
          }
          return true;
        })
      );
    }, 20);

    return () => clearInterval(collisionInterval);
  }, [gameStarted, raccoonLane, bugs]);

  // Collision detection function
  const isColliding = (bug) => {
    if (lanes.length === 0) return false;

    // Get positions and sizes
    const raccoonX = RACCOON_X;
    const raccoonY = lanes[raccoonLane] - RACCOON_HEIGHT / 2;
    const raccoonWidth = RACCOON_WIDTH;
    const raccoonHeight = RACCOON_HEIGHT;
    const bugX = bug.left;
    const bugY = lanes[bug.lane] - BUG_HEIGHT / 2;
    const bugWidth = BUG_WIDTH;
    const bugHeight = BUG_HEIGHT;

    // Check for overlap
    if (
      raccoonX < bugX + bugWidth &&
      raccoonX + raccoonWidth > bugX &&
      raccoonY < bugY + bugHeight &&
      raccoonY + raccoonHeight > bugY
    ) {
      // Collision detected
      return true;
    }

    return false;
  };

  // Check for game over
  useEffect(() => {
    if (lives <= 0) {
      endGame();
    }
  }, [lives]);

  const endGame = () => {
    setGameOver(true);
    setGameStarted(false);
    clearTimeout(bugTimeoutRef.current);
  };

  return (
    <div className="game-container">
      {!gameStarted && !gameOver && (
        <div className="start-screen">
          <button onClick={startGame}>Bored?</button>
        </div>
      )}
      {gameStarted && (
        <div className="game-area" ref={gameAreaRef}>
          <div className="scoreboard">
            <span>Score: {score}</span>
          </div>
          <img
            src={raccoonImage}
            alt="Raccoon"
            className="raccoon"
            ref={raccoonRef}
            style={{ left: `${RACCOON_X}px` }} // Fixed position on the left
          />
          {bugs.map((bug) => (
            <img
              key={bug.id}
              id={`bug-${bug.id}`}
              src={bugImage}
              alt="Bug"
              className="bug"
              style={{
                left: `${bug.left}px`,
                top: `${lanes[bug.lane]}px`,
              }}
            />
          ))}
        </div>
      )}
      {gameOver && (
        <div className="game-over-screen">
          <h2>Game Over</h2>
          <p>Your score: {score}</p>
          <button onClick={startGame}>Play Again</button>
        </div>
      )}
    </div>
  );
};

export default Game;
