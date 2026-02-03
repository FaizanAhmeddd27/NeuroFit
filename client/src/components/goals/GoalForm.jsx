import React, { useState, useEffect } from 'react';
import { GOAL_TYPES } from '../../utils/constants';

const GoalForm = ({ goal, onSubmit, onClose }) => {
  const [formData, setFormData] = useState({
    name: '',
    targetType: 'weight_loss',
    currentWeight: '',
    targetWeight: '',
    age: '',
    height: '',
    duration: '',
  });

  useEffect(() => {
    if (goal) {
      setFormData({
        name: goal.name || '',
        targetType: goal.targetType || 'weight_loss',
        currentWeight: goal.currentWeight || '',
        targetWeight: goal.targetWeight || '',
        age: goal.age || '',
        height: goal.height || '',
        duration: goal.duration ? new Date(goal.duration).toISOString().split('T')[0] : '',
      });
    }
  }, [goal]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    // Convert target date to duration in days
    const targetDate = new Date(formData.duration);
    const today = new Date();
    today.setHours(0, 0, 0, 0);

    const diffTime = Math.abs(targetDate - today);
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

    const submitData = {
      ...formData,
      duration: diffDays,
    };

    onSubmit(submitData);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-5">
      {/* Goal Name */}
      <div>
        <label className="form-label">Goal Name *</label>
        <input
          type="text"
          name="name"
          value={formData.name}
          onChange={handleChange}
          placeholder="e.g., Summer Body Goal"
          className="form-input"
          required
        />
      </div>

      {/* Goal Type */}
      <div>
        <label className="form-label">Goal Type *</label>
        <select
          name="targetType"
          value={formData.targetType}
          onChange={handleChange}
          className="form-select"
          required
        >
          {GOAL_TYPES.map((type) => (
            <option key={type.value} value={type.value}>
              {type.icon} {type.label}
            </option>
          ))}
        </select>
      </div>

      {/* Weights */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div>
          <label className="form-label">Current Weight (kg) *</label>
          <input
            type="number"
            name="currentWeight"
            value={formData.currentWeight}
            onChange={handleChange}
            placeholder="70"
            className="form-input"
            step="0.1"
            min="1"
            required
          />
        </div>
        <div>
          <label className="form-label">Target Weight (kg) *</label>
          <input
            type="number"
            name="targetWeight"
            value={formData.targetWeight}
            onChange={handleChange}
            placeholder="65"
            className="form-input"
            step="0.1"
            min="1"
            required
          />
        </div>
      </div>

      {/* Age & Height */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div>
          <label className="form-label">Age *</label>
          <input
            type="number"
            name="age"
            value={formData.age}
            onChange={handleChange}
            placeholder="25"
            className="form-input"
            min="10"
            required
          />
        </div>
        <div>
          <label className="form-label">Height (cm) *</label>
          <input
            type="number"
            name="height"
            value={formData.height}
            onChange={handleChange}
            placeholder="175"
            className="form-input"
            min="50"
            required
          />
        </div>
      </div>

      {/* Duration */}
      <div>
        <label className="form-label">Target Date *</label>
        <input
          type="date"
          name="duration"
          value={formData.duration}
          onChange={handleChange}
          className="form-input"
          min={new Date().toISOString().split('T')[0]}
          required
        />
      </div>

      {/* Actions */}
      <div className="flex gap-3 pt-4">
        <button type="submit" className="btn btn-primary flex-1">
          {goal ? 'Update Goal' : 'Create Goal'}
        </button>
        <button type="button" onClick={onClose} className="btn btn-outline">
          Cancel
        </button>
      </div>
    </form>
  );
};

export default GoalForm;