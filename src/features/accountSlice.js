import { createSlice } from "@reduxjs/toolkit";
import { fetchData, signOutAuth, sendAccountToAuth } from "../models/firebase";

const initialState = {
  user: null,
  isAuthenticated: false,
  isLoading: true,
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

const accountSlice = createSlice({
  name: "account",
  initialState,
  reducers: {
    login(state, action) {
      state.user = action.payload;
      state.isAuthenticated = true;
    },

    logout(state) {
      state.user = initialState.user;
      state.isAuthenticated = initialState.isAuthenticated;
      signOutAuth();
    },

    switchLoading(state, action) {
      state.isLoading = action.payload;
    },

    makeAccount(state, action) {
      sendAccountToAuth(action.payload.accObj, action.payload.pass);
    },

    updateNutriValue(state, action) {
      state.nutriInfo[action.payload.key] = action.payload.val;
    },

    updateMeals(state, action) {
      state.downloadedMeals[action.payload.key] = action.payload.val;
    },
  },
});

export function login(uid) {
  // redux will know that this function is the thunk (from store.js)
  return async function (dispatch /*, getState*/) {
    try {
      dispatch({ type: "account/switchLoading", payload: true });
      const acc = await fetchData("accounts", uid);

      if (!acc) {
        dispatch({ type: "account/switchLoading", payload: false });
        console.log("wrong");
        return;
      }

      dispatch({ type: "account/login", payload: acc });

      return acc;
    } catch (err) {
      console.log(err);
    } finally {
      dispatch({ type: "account/switchLoading", payload: false });
    }
  };
}

export const {
  logout,
  switchLoading,
  makeAccount,
  updateNutriValue,
  updateMeals,
} = accountSlice.actions;

// for the store.js:
export default accountSlice.reducer;
