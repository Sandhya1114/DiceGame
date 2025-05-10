import React, { useState, useEffect } from "react";
import "./DiceRoller.css";

function DiceGame() {
  const [score, setScore] = useState(0);
  const [dice, setDice] = useState(1);
  const [isRolling, setIsRolling] = useState(false);
  const [gameOver, setGameOver] = useState(false);
  const [targetScore, setTargetScore] = useState(20);

  // Function to generate a random target score 
  const generateRandomTarget = () => Math.floor(Math.random() * 25) + 10;

  // Whenever the target score changes, reset the game
  useEffect(() => {
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
    setScore(0);
    setDice(1);
    setGameOver(false);
    setTargetScore(generateRandomTarget());
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
            {hasWon ? "You Win! I know U r Intelligent" : "Game Over! But I Know You Can Do Better Try again :}"}
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
