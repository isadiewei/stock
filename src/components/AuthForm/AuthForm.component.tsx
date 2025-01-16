import {
  getAuth,
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  updateProfile,
} from "firebase/auth";
import { FormEvent, MouseEvent, useState } from "react";
import { useNavigate } from "react-router-dom";
import FireBaseApp from "../../firebase";
import { FirebaseError } from "firebase/app";
import { collection, doc, getFirestore, setDoc } from "firebase/firestore";
import { StyledInput } from "../Styled";
import './AuthForm.css';
import { Button } from "@mui/material";

export const AuthForm = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [displayName, setDisplayName] = useState("");
  const [signUp, setSignUp] = useState(true);
  const [error, setError] = useState<string | undefined>();
  const auth = getAuth(FireBaseApp);
  const navigate = useNavigate();

  const handleSubmit = async (event: FormEvent) => {
    event.preventDefault();
    if (signUp) {
      try {
        await createUserWithEmailAndPassword(auth, email, password);
        const user = auth.currentUser;
        if (user) {
          updateProfile(user, {
            displayName,
          })
            .then(async function () {
              var uid = user.uid;
              const db = getFirestore(FireBaseApp)
              const ref = collection(db, "users");

              await setDoc(doc(ref, uid), {
                name: displayName,
                email: email,
                password: password,
                roles: ['user']
              });
            });
        }

        navigate("/dashboard");
      } catch (error) {
        console.log(error);
      }
    }

    try {
      await signInWithEmailAndPassword(auth, email, password);
      navigate("/dashboard");
    } catch (error: unknown) {
      if (error instanceof FirebaseError) {
        setError(error.code);
      } else {
        setError("An error occurred");
      }
    }
  };

  const toggleSignUp = (event: MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
    setSignUp(!signUp);
  };

  // const resetPassword = async () => {
  //   try {
  //     sendPasswordResetEmail(auth, email);
  //   } catch (error) {
  //     console.log(error);
  //   }
  // };

  return (
    <form
      onSubmit={(event) => handleSubmit(event)}
    >
      <h1 className="text-center">{signUp ? "Sign Up" : "Sign In"}</h1>
      {signUp && (
        <div className="input-field">
          {/* <label htmlFor="username">Username</label> */}
          {/* <input
            type="username"
            name="username"
            value={displayName}
            onChange={(event) => setDisplayName(event.target.value)}
            className="w-full p-3 border border-gray-400 rounded-lg outline-teal-500"
            id="username"
            required
          /> */}
          <StyledInput 
            type="username" 
            name="username"
            label="Username"
            placeholder="Username"
            value={displayName}
            onChange={(event) => setDisplayName(event.target.value)}
            id="username"
            required
          />
        </div>
      )}
      <div className="input-field">
        {/* <label htmlFor="email">Email</label> */}
        <StyledInput
          type="email"
          name="email"
          label="Email"
          value={email}
          onChange={(event) => setEmail(event.target.value)}
          className="w-full p-3 border border-gray-400 rounded-lg outline-teal-500"
          id="email"
          required
        />
      </div>
      <div className="input-field">
        {/* <label htmlFor="password">Password</label> */}
        <StyledInput
          type="password"
          name="password"
          label="Password"
          value={password}
          onChange={(event) => setPassword(event.target.value)}
          className="w-full p-3 border border-gray-400 rounded-lg outline-teal-500"
          id="password"
          required
        />
      </div>
      <p className="text-red-400">{error && error}</p>
      <Button type="submit">
        {signUp ? "Register" : "Login"}
      </Button>
      <div className="flex">
        <div className="flex-start">
          <Button onClick={(event) => toggleSignUp(event)}>
            {signUp ? "Sign In" : "Sign Up"}
          </Button>
          {/* <button
            className="transition duration-500 hover:underline"
            onClick={() => resetPassword()}
          >
            Forgot Password
          </button> */}
        </div>
      </div>
    </form>
  );
};