import { app } from "./firebase";

import { signInWithEmailAndPassword, getAuth } from "firebase/auth";

const auth = getAuth(app);

type loginWithEmailAndPasswordProps = {
  email: string;
  password: string;
};

export const loginWithEmailAndPassword = async ({
  email,
  password,
}: loginWithEmailAndPasswordProps) => {
  try {
    await signInWithEmailAndPassword(auth, email, password);
  } catch (error) {
    console.error(error);
  }
};

export { auth };
