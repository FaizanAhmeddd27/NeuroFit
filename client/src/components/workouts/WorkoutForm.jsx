import React, { useState, useEffect } from 'react';
import { WORKOUT_TYPES, INTENSITY_LEVELS } from '../../utils/constants';
import { IoClose } from 'react-icons/io5';

const WorkoutForm = ({ workout, onSubmit, onClose }) => {
  const [formData, setFormData] = useState({
    workoutName: '',
    workoutType: 'cardio',
    sets: '',
    reps: '',
    duration: '',
    intensity: 'medium',
    caloriesBurned: '',
  });

  useEffect(() => {
    if (workout) {
      setFormData({
        workoutName: workout.workoutName || '',
        workoutType: workout.workoutType || 'cardio',
        sets: workout.sets || '',
        reps: workout.reps || '',
        duration: workout.duration || '',
        intensity: workout.intensity || 'medium',
        caloriesBurned: workout.caloriesBurned || '',
      });
    }
  }, [workout]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(formData);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-5">
      {/* Workout Name */}
      <div>
        <label className="form-label">Workout Name *</label>
        <input
          type="text"
          name="workoutName"
          value={formData.workoutName}
          onChange={handleChange}
          placeholder="e.g., Morning Run"
          className="form-input"
          required
        />
      </div>

      {/* Workout Type */}
      <div>
        <label className="form-label">Workout Type *</label>
        <select
          name="workoutType"
          value={formData.workoutType}
          onChange={handleChange}
          className="form-select"
          required
        >
          {WORKOUT_TYPES.map((type) => (
            <option key={type.value} value={type.value}>
              {type.icon} {type.label}
            </option>
          ))}
        </select>
      </div>

      {/* Duration & Intensity */}
      <div className="grid grid-cols-2 gap-4">
        <div>
          <label className="form-label">Duration (minutes) *</label>
          <input
            type="number"
            name="duration"
            value={formData.duration}
            onChange={handleChange}
            placeholder="30"
            className="form-input"
            min="1"
            required
          />
        </div>
        <div>
          <label className="form-label">Intensity *</label>
          <select
            name="intensity"
            value={formData.intensity}
            onChange={handleChange}
            className="form-select"
            required
          >
            {INTENSITY_LEVELS.map((level) => (
              <option key={level.value} value={level.value}>
                {level.label}
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* Sets & Reps (Optional) */}
      <div className="grid grid-cols-2 gap-4">
        <div>
          <label className="form-label">Sets (optional)</label>
          <input
            type="number"
            name="sets"
            value={formData.sets}
            onChange={handleChange}
            placeholder="3"
            className="form-input"
            min="1"
          />
        </div>
        <div>
          <label className="form-label">Reps (optional)</label>
          <input
            type="number"
            name="reps"
            value={formData.reps}
            onChange={handleChange}
            placeholder="12"
            className="form-input"
            min="1"
          />
        </div>
      </div>

      {/* Calories Burned */}
      <div>
        <label className="form-label">Calories Burned *</label>
        <input
          type="number"
          name="caloriesBurned"
          value={formData.caloriesBurned}
          onChange={handleChange}
          placeholder="250"
          className="form-input"
          min="1"
          required
        />
      </div>

      {/* Actions */}
      <div className="flex gap-3 pt-4">
        <button type="submit" className="btn btn-primary flex-1">
          {workout ? 'Update Workout' : 'Add Workout'}
        </button>
        <button type="button" onClick={onClose} className="btn btn-outline">
          Cancel
        </button>
      </div>
    </form>
  );
};

export default WorkoutForm;