import { Button } from "@mui/material";
import { FirebaseError } from "firebase/app";
import {
  createUserWithEmailAndPassword,
  getAuth,
  signInWithEmailAndPassword,
  updateProfile,
} from "firebase/auth";
import { FormEvent, MouseEvent, useState } from "react";
import { useNavigate } from "react-router-dom";
import FireBaseApp from "../../firebase";
import { StyledInput } from "../Styled";
import './AuthForm.css';
import { AppUser } from "./AuthForm.model";
import { setUser } from "./AuthForm.service";

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
          updateProfile(user, { displayName })
            .then(async function () {
              setUser({
                displayName,
                email,
                password,
                uid: user.uid
              } as AppUser)
            })
        }

        navigate("/dashboard");
      } catch (error) {
        console.error(error);
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

  return (
    <form onSubmit={(event) => handleSubmit(event)}>
      <h3 className="text-center">{signUp ? "Sign Up" : "Sign In"}</h3>
      {signUp && (
        <div className="input-field">
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
        <StyledInput
          type="email"
          name="email"
          label="Email"
          value={email}
          onChange={(event) => setEmail(event.target.value)}
          id="email"
          required
        />
      </div>
      <div className="input-field">
        <StyledInput
          type="password"
          name="password"
          label="Password"
          value={password}
          onChange={(event) => setPassword(event.target.value)}
          id="password"
          required
        />
      </div>
      <p>{error && error}</p>
      <Button type="submit">
        {signUp ? "Register" : "Login"}
      </Button>
      <Button onClick={(event) => toggleSignUp(event)}>
        {signUp ? "Sign In" : "Sign Up"}
      </Button>
    </form>
  );
};