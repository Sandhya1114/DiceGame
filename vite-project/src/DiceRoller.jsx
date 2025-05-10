import React, { useState, useEffect } from "react";
import "./DiceRoller.css";

function DiceGame() {
  const [score, setScore] = useState(0);
  const [dice, setDice] = useState(1);
  const [isRolling, setIsRolling] = useState(false);
  const [gameOver, setGameOver] = useState(false);
  const [targetScore, setTargetScore] = useState(20); // initial target score state

  // Function to generate a random target score between 10 and 50
  const generateRandomTarget = () => {
    return Math.floor(Math.random() *25) + 10; // Random number between 10 and 50
  };

  // Whenever the target score changes, reset the game
  useEffect(() => {
    console.log(`Game started with Target Score: ${targetScore}`); // Log target score
    resetGame();
  }, [targetScore]);

  const rollDice = () => {
    setIsRolling(true);
    setTimeout(() => {
      const result = Math.floor(Math.random() * 6) + 1;
      setDice(result);

      if (result === 1) {
        setGameOver(true);
      } else {
        const newScore = score + result;
        setScore(newScore);
        if (newScore >= targetScore) {
          setGameOver(true);
        }
      }

      setIsRolling(false);
    }, 500);
  };

  const resetGame = () => {
    // Reset score, dice, and game over status
    setScore(0);
    setDice(1);
    setGameOver(false);

    // Set a new random target score when restarting the game
    setTargetScore(generateRandomTarget());
  };

  const handleTargetChange = (e) => {
    const newTarget = parseInt(e.target.value);
    if (!isNaN(newTarget) && newTarget > 1) {
      setTargetScore(newTarget);
    }
  };

  const diceFaces = ["⚀", "⚁", "⚂", "⚃", "⚄", "⚅"];
  const hasWon = score >= targetScore;

  return (
    <div className="game-container">
      <h1 className="game-title">🎮 Dice Game</h1>

      

      <p className="game-target">Target Score: {targetScore}</p>

      <div className={`dice-face ${isRolling ? "rolling" : ""}`}>
        {diceFaces[dice - 1]}
      </div>

      <p className="game-score">Current Score: {score}</p>

      {gameOver ? (
        <>
          <p className="game-result">
            {hasWon ? "You Win! I know U r Intelligent" : " Game Over! But I Know You Can Do Better Try again :}  "}
          </p>
          <button className="game-button" onClick={resetGame}>
            Restart
          </button>
        </>
      ) : (
        <button
          className="game-button"
          onClick={rollDice}
          disabled={isRolling}
        >
          {isRolling ? "Rolling..." : "Roll Dice"}
        </button>
      )}
    </div>
  );
}

export default DiceGame;
