import React, { useState, useEffect } from 'react';
import { MEAL_TYPES } from '../../utils/constants';

const MealForm = ({ meal, onSubmit, onClose }) => {
  const [formData, setFormData] = useState({
    foodName: '',
    mealType: 'breakfast',
    calories: '',
    protein: '',
    carbohydrates: '',
    fat: '',
    fiber: '',
    sugar: '',
  });

  useEffect(() => {
    if (meal) {
      setFormData({
        foodName: meal.foodName || '',
        mealType: meal.mealType || 'breakfast',
        calories: meal.calories || '',
        protein: meal.protein || '',
        carbohydrates: meal.carbohydrates || '',
        fat: meal.fat || '',
        fiber: meal.fiber || '',
        sugar: meal.sugar || '',
      });
    }
  }, [meal]);

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
      {/* Food Name */}
      <div>
        <label className="form-label">Food Name *</label>
        <input
          type="text"
          name="foodName"
          value={formData.foodName}
          onChange={handleChange}
          placeholder="e.g., Grilled Chicken Salad"
          className="form-input"
          required
        />
      </div>

      {/* Meal Type */}
      <div>
        <label className="form-label">Meal Type *</label>
        <select
          name="mealType"
          value={formData.mealType}
          onChange={handleChange}
          className="form-select"
          required
        >
          {MEAL_TYPES.map((type) => (
            <option key={type.value} value={type.value}>
              {type.icon} {type.label}
            </option>
          ))}
        </select>
      </div>

      {/* Calories & Protein */}
      <div className="grid grid-cols-2 gap-4">
        <div>
          <label className="form-label">Calories (kcal) *</label>
          <input
            type="number"
            name="calories"
            value={formData.calories}
            onChange={handleChange}
            placeholder="350"
            className="form-input"
            min="1"
            required
          />
        </div>
        <div>
          <label className="form-label">Protein (g) *</label>
          <input
            type="number"
            name="protein"
            value={formData.protein}
            onChange={handleChange}
            placeholder="25"
            className="form-input"
            min="0"
            step="0.1"
            required
          />
        </div>
      </div>

      {/* Carbs & Fat */}
      <div className="grid grid-cols-2 gap-4">
        <div>
          <label className="form-label">Carbohydrates (g) *</label>
          <input
            type="number"
            name="carbohydrates"
            value={formData.carbohydrates}
            onChange={handleChange}
            placeholder="30"
            className="form-input"
            min="0"
            step="0.1"
            required
          />
        </div>
        <div>
          <label className="form-label">Fat (g) *</label>
          <input
            type="number"
            name="fat"
            value={formData.fat}
            onChange={handleChange}
            placeholder="15"
            className="form-input"
            min="0"
            step="0.1"
            required
          />
        </div>
      </div>

      {/* Fiber & Sugar (Optional) */}
      <div className="grid grid-cols-2 gap-4">
        <div>
          <label className="form-label">Fiber (g)</label>
          <input
            type="number"
            name="fiber"
            value={formData.fiber}
            onChange={handleChange}
            placeholder="5"
            className="form-input"
            min="0"
            step="0.1"
          />
        </div>
        <div>
          <label className="form-label">Sugar (g)</label>
          <input
            type="number"
            name="sugar"
            value={formData.sugar}
            onChange={handleChange}
            placeholder="8"
            className="form-input"
            min="0"
            step="0.1"
          />
        </div>
      </div>

      {/* Actions */}
      <div className="flex gap-3 pt-4">
        <button type="submit" className="btn btn-primary flex-1">
          {meal ? 'Update Meal' : 'Add Meal'}
        </button>
        <button type="button" onClick={onClose} className="btn btn-outline">
          Cancel
        </button>
      </div>
    </form>
  );
};

export default MealForm;