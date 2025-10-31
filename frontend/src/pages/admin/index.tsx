import { useState } from "react";
import { signInWithEmailAndPassword } from "firebase/auth";
import { useDispatch, UseDispatch } from "react-redux";
import { login } from "@/src/features/userSlice";
import { useRouter } from "next/router";
import Layout from "@/src/components/Layout";
import { auth } from "@/src/firebase/firebase";

export default function AdminLogin() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const dispatch = useDispatch();
  const router = useRouter();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    try {
      const userCredential = await signInWithEmailAndPassword(
        auth,
        email,
        password
      );
      const user = userCredential.user;

      // Simple role check: mark admin email
      const isAdmin = email === "admin@gmail.com";
      if (!isAdmin) {
        setError("Access denied — Admins only");
        return;
      }

      dispatch(login({ uid: user.uid, email: user.email!, isAdmin }));
      router.push("/admin/dashboard");
    } catch (err: unknown) {
      setError("Invalid email or password");
      console.error(err);
    }
  };

  return (
    <Layout>
      <div className="flex justify-center items-center min-h-[80vh]">
        <form
          onSubmit={handleLogin}
          className="bg-white shadow-lg rounded-2xl p-8 w-full max-w-md border border-gray-100"
        >
          <h2 className="text-2xl font-bold text-gray-800 mb-6 text-center">
            Admin Login
          </h2>

          {error && <p className="text-red-500 text-center mb-4">{error}</p>}

          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Email
            </label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full border border-gray-300 rounded-lg p-2 focus:ring-2 focus:ring-blue-400 outline-none"
              required
            />
          </div>

          <div className="mb-6">
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Password
            </label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full border border-gray-300 rounded-lg p-2 focus:ring-2 focus:ring-blue-400 outline-none"
              required
            />
          </div>

          <button
            type="submit"
            className="w-full bg-blue-600 text-white font-semibold py-2 rounded-lg hover:bg-blue-700 transition-all duration-300"
          >
            Login
          </button>
        </form>
      </div>
    </Layout>
  );
}
