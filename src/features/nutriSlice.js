import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  nutriInfo: {
    calories: 0,
    neededCalories: 0,
    protein: 0,
    carbs: 0,
    fat: 0,
  },
  downloadedMeals: {
    breakfast: [],
    lunch: [],
    drink: [],
    dinner: [],
    dessert: [],
  },
};

const nutriSlice = createSlice({
  name: "nutri",
  initialState,
  reducers: {
    updateNutriValue(state, action) {
      state.nutriInfo[action.payload.key] = action.payload.val;
    },

    updateMeals(state, action) {
      state.downloadedMeals[action.payload.key] = action.payload.val;
    },
  },
});

export const { updateNutriValue, updateMeals } = nutriSlice.actions;

// for the store.js:
export default nutriSlice.reducer;
