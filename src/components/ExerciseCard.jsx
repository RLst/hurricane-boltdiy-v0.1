import React, { useState } from 'react';
import './ExerciseCard.css';
import { AiFillDelete, AiFillEdit, AiOutlineSave, AiOutlineClose } from 'react-icons/ai';
import { FiMoreVertical } from 'react-icons/fi';

const units = ['kg', 'lbs', 'minutes', 'seconds'];

function ExerciseCard({ exercise, onDelete, onUpdate }) {
  const [isEditing, setIsEditing] = useState(false);
  const [exerciseData, setExerciseData] = useState({ ...exercise });
  const [setsData, setSetsData] = useState(exercise.sets || [{ weightDuration: '', reps: '' }]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setExerciseData({ ...exerciseData, [name]: value });
  };

  const handleSetInputChange = (index, field, value) => {
    const updatedSets = setsData.map((set, idx) => {
      if (idx === index) {
        return { ...set, [field]: value };
      }
      return set;
    });
    setSetsData(updatedSets);
  };

  const addSet = () => {
    setSetsData([...setsData, { weightDuration: '', reps: '' }]);
  };

  const deleteSet = (index) => {
    const updatedSets = setsData.filter((_, idx) => idx !== index);
    setSetsData(updatedSets);
  };


  const handleEditClick = () => {
    setIsEditing(true);
  };

  const handleSaveClick = () => {
    onUpdate({ ...exerciseData, sets: setsData });
    setIsEditing(false);
  };

  const handleDeleteClick = () => {
    onDelete(exercise.id);
  };

  if (!isEditing) {
    return (
      <div className="exercise-card">
        <div className="card-header">
          <h3>{exercise.name}</h3>
          <button className="edit-button" onClick={handleEditClick}>
            <FiMoreVertical />
          </button>
        </div>
        {exercise.notes && <p className="notes">{exercise.notes}</p>}
        <div className="sets-table">
          <table>
            <thead>
              <tr>
                <th>Weight/Duration</th>
                <th>Reps</th>
              </tr>
            </thead>
            <tbody>
              {setsData.map((set, index) => (
                <tr key={index}>
                  <td>{set.weightDuration}</td>
                  <td>{set.reps}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <button className="delete-button" onClick={handleDeleteClick}>
          <AiFillDelete /> Delete Exercise
        </button>
      </div>
    );
  } else {
    return (
      <div className="exercise-card edit-mode">
        <div className="card-header">
          <input
            type="text"
            name="name"
            placeholder="Exercise Name"
            value={exerciseData.name}
            onChange={handleInputChange}
          />
          <div className="edit-actions">
            <button className="save-button" onClick={handleSaveClick}>
              <AiOutlineSave />
            </button>
            <button className="cancel-button" onClick={() => setIsEditing(false)}>
              <AiOutlineClose />
            </button>
          </div>
        </div>
        <textarea
          name="notes"
          placeholder="Notes"
          value={exerciseData.notes}
          onChange={handleInputChange}
        />
        <div className="sets-edit-table">
          <table>
            <thead>
              <tr>
                <th>Weight/Duration</th>
                <th>Reps</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {setsData.map((set, index) => (
                <tr key={index}>
                  <td>
                    <input
                      type="text"
                      value={set.weightDuration}
                      onChange={(e) => handleSetInputChange(index, 'weightDuration', e.target.value)}
                    />
                  </td>
                  <td>
                    <input
                      type="text"
                      value={set.reps}
                      onChange={(e) => handleSetInputChange(index, 'reps', e.target.value)}
                    />
                  </td>
                  <td className="set-actions">
                    <button onClick={() => deleteSet(index)}><AiFillDelete /></button>
                  </td>
                </tr>
              ))}
            </tbody>
            <tfoot>
              <tr>
                <td colSpan="3">
                  <button className="add-set-button" onClick={addSet}>Add Set</button>
                </td>
              </tr>
            </tfoot>
          </table>
        </div>
        <button className="delete-button" onClick={handleDeleteClick}>
          <AiFillDelete /> Delete Exercise
        </button>
      </div>
    );
  }
}

export default ExerciseCard;
