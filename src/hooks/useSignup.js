import { useState, useEffect } from "react";
import {
  projectAuth,
  projectStorage,
  projectFirestore,
} from "../firebase/config";
import { useAuthContext } from "./useAuthContext";

export const useSignup = () => {
  const [isCancelled, setIsCancelled] = useState(false);
  const [error, setError] = useState(null);
  const [isPending, setIsPending] = useState(false);
  const { dispatch } = useAuthContext();

  const signup = async (email, password, displayName, thumbnail) => {
    setError(null);
    setIsPending(true);
    // console.log("line 15");

    try {
      // signup
      // console.log("line 17");
      const res = await projectAuth.createUserWithEmailAndPassword(
        email,
        password
      );
      // console.log("line 23");

      if (!res) {
        // console.log("Could not complete signup");
        throw new Error("Could not complete signup");
      }

      // upload user thumbnail
      const uploadPath = `thumbnails/${res.user.uid}/${thumbnail.name}`;
      console.log(uploadPath);
      const image = await projectStorage.ref(uploadPath).put(thumbnail);
      // console.log("line 33");
      const imgUrl = await image.ref.getDownloadURL();

      // add display name to user
      await res.user.updateProfile({ displayName, photoURL: imgUrl });

      // create a user document
      await projectFirestore.collection("users").doc(res.user.uid).set({
        online: true,
        displayName,
        photoURL: imgUrl,
      });

      // dispatch login action
      dispatch({ type: "LOGIN", payload: res.user });

      if (!isCancelled) {
        setIsPending(false);
        setError(null);
      }
      console.log(isPending);
    } catch (err) {
      if (!isCancelled) {
        setError(err.message);
        setIsPending(false);
      }
    }
  };

  useEffect(() => {
    return () => setIsCancelled(true);
  }, []);

  return { signup, error, isPending };
};
