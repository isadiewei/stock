import { collection, doc, getFirestore, setDoc } from "firebase/firestore";
import FireBaseApp from "../../firebase";
import { AppUser } from "./AuthForm.model";

export const setUser = async (user: AppUser) => {
  const db = getFirestore(FireBaseApp)
  const ref = collection(db, "users");

  await setDoc(doc(ref, user.uid), {
    name: user.displayName,
    email: user.email,
    password: user.password,
    roles: ['user']
  });
}