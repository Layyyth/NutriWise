import { createSlice } from "@reduxjs/toolkit";
import { fetchData, signOutAuth, sendAccountToAuth } from "../models/firebase";

const initialState = {
  user: null,
  isAuthenticated: false,
  isLoading: true,
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
        // toast.error("Something went wrong!");
        console.log("wrong");
        return;
      }

      // if (acc.isDeleted) {
      //   dispatch({ type: "account/switchLoading", payload: false });
      //   toast.error(`${acc.displayName} is deleted`);
      //   return;
      // }

      dispatch({ type: "account/login", payload: acc });
      // await setStatus(acc.uid, "online");

      // window.addEventListener(
      //   "beforeunload",
      //   async () => await setStatus(acc.uid, "offline")
      // );
      return acc;
    } catch (err) {
      // toast.error(err.message);
      console.log(err);
    } finally {
      dispatch({ type: "account/switchLoading", payload: false });
    }
  };
}

export const { logout, switchLoading, makeAccount } = accountSlice.actions;

// for the store.js:
export default accountSlice.reducer;
