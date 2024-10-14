// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";

import {
  GoogleAuthProvider,
  createUserWithEmailAndPassword,
  getAuth,
  onAuthStateChanged,
  sendEmailVerification,
  sendPasswordResetEmail,
  signInWithEmailAndPassword,
  signInWithPopup,
  signOut,
  updateProfile,
} from "firebase/auth";

import {
  getFirestore,
  setDoc,
  doc,
  collection,
  getDoc,
  where,
  query,
  getDocs,
  updateDoc,
} from "firebase/firestore";
import { firebaseConfig } from "../helpers/config";

// Your web app's Firebase configuration

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
const auth = getAuth();
const accountsRef = collection(db, "accounts");

async function signOutAuth() {
  await signOut(auth);
}

async function isAccExistByMail(email) {
  try {
    let answer = false;
    const q = query(accountsRef, where("email", "==", email));
    const querySnapshot = await getDocs(q);
    querySnapshot.forEach((/*doc*/) => {
      // + there's doc.data()
      answer = true;
    });
    return answer;
  } catch (err) {
    console.log(err);
  }
}

async function sendEmailVerify() {
  try {
    await sendEmailVerification(auth.currentUser);
  } catch (err) {
    console.log(err.message);
    return err.message;
  }
}

async function sendAccountToAuth(accObj, pass) {
  try {
    const mailUsed = await isAccExistByMail(accObj.email);

    if (!accObj.isGoogle) {
      if (mailUsed) {
        return false; // accNotSent
      }

      const res = await createUserWithEmailAndPassword(
        auth,
        accObj.email,
        pass
      );

      await sendEmailVerify();

      await updateProfile(res.user, {
        displayName: accObj.displayName,
        photoURL: accObj.photoURL,
      });

      accObj.uid = res.user.uid;
      accObj.createdAt = res.user.metadata.createdAt;
      accObj.searchable = [];
      accObj.searchable.push(res.user.uid.toLowerCase());
      accObj.searchable.push(accObj.displayName.toLowerCase().trim());

      await setDoc(doc(accountsRef, res.user.uid), {
        ...accObj,
        // emailVerified: res.user.emailVerified,
      });

      // await setDoc(doc(userChatsRef, res.user.uid), {});

      location.reload();
      return true; // accSent
    }

    if (!mailUsed) {
      await setDoc(doc(accountsRef, accObj.uid), {
        ...accObj,
        // emailVerified: true,
      });

      // await setDoc(doc(userChatsRef, accObj.uid), {});
    }

    location.reload();
    return true; // accSent
  } catch (err) {
    console.log(err);
    return false;
  }
}

async function signInWithPassword(email, password) {
  try {
    const userCredential = await signInWithEmailAndPassword(
      auth,
      email,
      password
    );
    // Signed in
    // const user = userCredential.user;
    if (userCredential) location.reload();
    else return false;
  } catch (err) {
    console.log(err);
  }
}

async function signInWithGoogle() {
  try {
    const response = await signInWithPopup(auth, new GoogleAuthProvider());
    if (!response) return;

    const user = response.user;

    let searchable = user.displayName.trim().toLowerCase().split(" "); // Create an array of terms
    searchable.push(user.uid.toLowerCase());
    searchable.push(user.displayName.trim());

    const accObj = {
      displayName: user.displayName,
      searchable,
      email: user.email,
      photoURL: user.photoURL,
      createdAt: user.metadata.createdAt,
      isGoogle: true,
      uid: user.uid,
    };

    await sendAccountToAuth(accObj);
    // location.reload();
  } catch (err) {
    alert(err.message);
  }
}

async function resetPassword(email) {
  try {
    await sendPasswordResetEmail(auth, email);
  } catch (err) {
    console.log(err);
    throw new Error("error");
  }
}

async function fetchData(path1, path2) {
  try {
    // console.log("fetching: ", path2, " from: ", path1);
    const dataRef = doc(db, path1, path2);
    const dataSnap = await getDoc(dataRef);
    if (dataSnap.exists()) return dataSnap.data();
  } catch (err) {
    throw new Error(err);
  }
}

async function updateData(path, id, info) {
  try {
    await updateDoc(doc(db, path, id), info);
  } catch (error) {
    console.error(error);
  }
}

export {
  signOutAuth,
  signInWithGoogle,
  onAuthStateChanged,
  auth,
  fetchData,
  updateData,
  sendAccountToAuth,
  signInWithPassword,
  resetPassword,
};
