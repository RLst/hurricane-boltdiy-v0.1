import React, { useState, useEffect } from 'react';
import './MagicCommandBar.css';
import parseExercise from '../utils/parseExercise';

function MagicCommandBar({ onAddExercise, onUpdateExercise, lastUpdatedExercise, exercises }) { // Add exercises here
  const [commandText, setCommandText] = useState('');
  const [warningMessage, setWarningMessage] = useState('');

  useEffect(() => {
    let timer;
    if (warningMessage) {
      timer = setTimeout(() => {
        setWarningMessage('');
      }, 3000);
    }
    return () => clearTimeout(timer);
  }, [warningMessage]);

  const handleInputChange = (e) => {
    setCommandText(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (commandText.trim()) {
      parseCommand(commandText.trim());
      setCommandText('');
    }
  };

  const parseCommand = (command) => {
    const parsedData = parseExercise(command);

    if (!parsedData.name && !lastUpdatedExercise.current) {
      setWarningMessage('Please specify an exercise name first.');
      return;
    }

    if (parsedData.name) {
      // New exercise
      onAddExercise({ ...parsedData, id: Date.now().toString() });
    } else if (parsedData.sets.length > 0) {
      // Add sets to existing exercise
      const updatedExercise = exercises.find( // Use exercises here
        (exercise) => exercise.id === lastUpdatedExercise.current
      );

      if (updatedExercise) {
        const updatedSets = [...updatedExercise.sets, ...parsedData.sets];
        onUpdateExercise({ ...updatedExercise, sets: updatedSets });
      }
    } else {
      // Invalid command
      alert('Invalid command format.');
    }
  };

  return (
    <div className="magic-command-bar-container">
      {warningMessage && <div className="warning-message">{warningMessage}</div>}
      <form className="magic-command-bar" onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Enter command: e.g., 'Benchpress 60kg 10reps, notes here' or '40kg 20reps'"
          value={commandText}
          onChange={handleInputChange}
        />
        <button type="submit">Add</button>
      </form>
    </div>
  );
}

export default MagicCommandBar;
