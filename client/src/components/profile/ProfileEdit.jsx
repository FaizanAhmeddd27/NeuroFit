import React, { useState, useEffect } from 'react';
import { ACTIVITY_LEVELS, GENDER_OPTIONS } from '../../utils/constants';

const ProfileEdit = ({ user, onSubmit, onClose }) => {
  const [formData, setFormData] = useState({
    name: '',
    age: '',
    height: '',
    weight: '',
    gender: 'male',
    activityLevel: 'moderate',
    dailyCalorieGoal: '',
  });

  useEffect(() => {
    if (user) {
      setFormData({
        name: user.name || '',
        age: user.age || '',
        height: user.height || '',
        weight: user.weight || '',
        gender: user.gender || 'male',
        activityLevel: user.activityLevel || 'moderate',
        dailyCalorieGoal: user.dailyCalorieGoal || 2000,
      });
    }
  }, [user]);

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
      {/* Name */}
      <div>
        <label className="form-label">Full Name *</label>
        <input
          type="text"
          name="name"
          value={formData.name}
          onChange={handleChange}
          placeholder="John Doe"
          className="form-input"
          required
        />
      </div>

      {/* Age & Gender */}
      <div className="grid grid-cols-2 gap-4">
        <div>
          <label className="form-label">Age *</label>
          <input
            type="number"
            name="age"
            value={formData.age}
            onChange={handleChange}
            placeholder="25"
            className="form-input"
            min="1"
            max="120"
            required
          />
        </div>
        <div>
          <label className="form-label">Gender *</label>
          <select
            name="gender"
            value={formData.gender}
            onChange={handleChange}
            className="form-select"
            required
          >
            {GENDER_OPTIONS.map((option) => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* Height & Weight */}
      <div className="grid grid-cols-2 gap-4">
        <div>
          <label className="form-label">Height (cm) *</label>
          <input
            type="number"
            name="height"
            value={formData.height}
            onChange={handleChange}
            placeholder="175"
            className="form-input"
            min="1"
            required
          />
        </div>
        <div>
          <label className="form-label">Weight (kg) *</label>
          <input
            type="number"
            name="weight"
            value={formData.weight}
            onChange={handleChange}
            placeholder="70"
            className="form-input"
            min="1"
            step="0.1"
            required
          />
        </div>
      </div>

      {/* Activity Level */}
      <div>
        <label className="form-label">Activity Level *</label>
        <select
          name="activityLevel"
          value={formData.activityLevel}
          onChange={handleChange}
          className="form-select"
          required
        >
          {ACTIVITY_LEVELS.map((level) => (
            <option key={level.value} value={level.value}>
              {level.label}
            </option>
          ))}
        </select>
      </div>

      {/* Daily Calorie Goal */}
      <div>
        <label className="form-label">Daily Calorie Goal *</label>
        <input
          type="number"
          name="dailyCalorieGoal"
          value={formData.dailyCalorieGoal}
          onChange={handleChange}
          placeholder="2000"
          className="form-input"
          min="500"
          required
        />
      </div>

      {/* Actions */}
      <div className="flex gap-3 pt-4">
        <button type="submit" className="btn btn-primary flex-1">
          Save Changes
        </button>
        <button type="button" onClick={onClose} className="btn btn-outline">
          Cancel
        </button>
      </div>
    </form>
  );
};

export default ProfileEdit;