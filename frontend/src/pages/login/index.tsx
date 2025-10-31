/* eslint-disable @typescript-eslint/no-explicit-any */
import { useState } from "react";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
} from "firebase/auth";
import { useDispatch, UseDispatch } from "react-redux";
import { login, logout } from "@/src/features/userSlice";
import { useRouter } from "next/router";
import { auth } from "@/src/firebase/firebase";

export default function LoginPage() {
  const [isSignup, setIsSignup] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const dispatch = useDispatch();
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    try {
      const userCred = isSignup
        ? await createUserWithEmailAndPassword(auth, email, password)
        : await signInWithEmailAndPassword(auth, email, password);

      const user = userCred.user;
      dispatch(login({ uid: user.uid, email: user.email ?? "" }));
      router.push("/profile");
    } catch (err: any) {
      setError(err.message);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-blue-50">
      <form
        onSubmit={handleSubmit}
        className="bg-white shadow-xl rounded-xl p-8 w-full max-w-md"
      >
        <h1 className="text-2xl font-semibold text-center mb-6 text-gray-800">
          {isSignup ? "Create Account" : "Login"}
        </h1>

        {error && (
          <p className="text-red-500 text-sm mb-4 text-center">{error}</p>
        )}

        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
          className="w-full border border-gray-300 rounded-lg px-3 py-2 mb-4 focus:ring-2 focus:ring-blue-400 outline-none"
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
          className="w-full border border-gray-300 rounded-lg px-3 py-2 mb-6 focus:ring-2 focus:ring-blue-400 outline-none"
        />

        <button
          type="submit"
          className="w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 transition-all"
        >
          {isSignup ? "Sign Up" : "Login"}
        </button>

        <p className="text-sm text-center text-gray-600 mt-4">
          {isSignup ? "Already have an account?" : "Don't have an account?"}{" "}
          <button
            type="button"
            onClick={() => setIsSignup(!isSignup)}
            className="text-blue-600 hover:underline"
          >
            {isSignup ? "Login" : "Sign Up"}
          </button>
        </p>
      </form>
    </div>
  );
}
