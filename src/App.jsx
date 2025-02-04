import React, { useState, useEffect, useRef } from 'react';
import ExerciseCard from './components/ExerciseCard';
import MagicCommandBar from './components/MagicCommandBar';
import './App.css';

function App() {
  const [exercises, setExercises] = useState([]);
  const lastUpdatedExercise = useRef(null);

  useEffect(() => {
    const storedExercises = localStorage.getItem('exercises');
    if (storedExercises) {
      setExercises(JSON.parse(storedExercises));
    }
  }, []);

  useEffect(() => {
    localStorage.setItem('exercises', JSON.stringify(exercises));
  }, [exercises]);

  const addExercise = (newExercise) => {
    setExercises([...exercises, newExercise]);
    lastUpdatedExercise.current = newExercise.id; // Update the last added exercise
  };

  const updateExercise = (updatedExercise) => {
    setExercises(
      exercises.map((exercise) =>
        exercise.id === updatedExercise.id ? updatedExercise : exercise
      )
    );
    lastUpdatedExercise.current = updatedExercise.id; // Update the last updated exercise
  };

  const deleteExercise = (idToDelete) => {
    setExercises(exercises.filter((exercise) => exercise.id !== idToDelete));
  };

  return (
    <div className="app-container">
      <h1>Gym Tracker</h1>
      <div className="exercises-container">
        {exercises.map((exercise) => (
          <ExerciseCard
            key={exercise.id}
            exercise={exercise}
            onDelete={deleteExercise}
            onUpdate={updateExercise}
          />
        ))}
      </div>
      <MagicCommandBar onAddExercise={addExercise} onUpdateExercise={updateExercise} lastUpdatedExercise={lastUpdatedExercise} />
    </div>
  );
}

export default App;
