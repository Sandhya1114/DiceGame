import React, { useState, useEffect } from "react";
import "./DiceRoller.css";

function DiceGame() {
  const [score, setScore] = useState(0);
  const [dice, setDice] = useState(1);
  const [isRolling, setIsRolling] = useState(false);
  const [gameOver, setGameOver] = useState(false);
  const [targetScore, setTargetScore] = useState(20);
  const [showInstructions, setShowInstructions] = useState(true); // New state for instructions

  const generateRandomTarget = () => Math.floor(Math.random() * 25) + 10;

  useEffect(() => {
  resetGame();
}, []);

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

  if (!targetScore) {
    setTargetScore(generateRandomTarget());
  }
};

  const diceFaces = ["⚀", "⚁", "⚂", "⚃", "⚄", "⚅"];
  const hasWon = score >= targetScore;

  const handleCloseInstructions = () => {
    setShowInstructions(false); // Close instructions when game starts
  };

  return (
    <div className="game-container">
      {/* Instructions Modal */}
      {showInstructions && (
        <div className="instructions-modal">
          <h2>🎲 Game Instructions</h2>
          <p>Welcome to the Dice Game! Here's how it works:</p>
          <ul>
            <li>You start with a score of 0.</li>
            <li>Each time you roll the dice, the value will be added to your score.</li>
            <li>If you roll a 1, the game ends, and you lose!</li>
            <li>Your goal is to reach the target score first. The target score is randomly set.</li>
            <li>You will have unlimited rolls, but be careful: rolling a 1 will end the game!</li>
          </ul>
          <button onClick={handleCloseInstructions}>Start Game</button>
        </div>
      )}

      <h1 className="game-title">🎮 Dice Game</h1>
      <p className="game-target">Target Score: {targetScore}</p>
      <div
        className={`dice-face ${isRolling ? "rolling" : ""} ${diceFaces[dice - 1]}`}
      >
        {diceFaces[dice - 1]}
      </div>
      <p className="game-score">Current Score: {score}</p>

      {gameOver ? (
        <>
          <p className="game-result">
            {hasWon ? "You Win! I know U r Intelligent" : "Game Over! Try again :}"}
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
