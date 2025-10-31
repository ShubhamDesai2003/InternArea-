import Link from "next/link";
import { useSelector, useDispatch } from "react-redux";
import type { RootState } from "../store"; 
import { logout } from "../features/userSlice";
import { signOut } from "firebase/auth";
import { auth } from "../firebase/firebase";

export default function Navbar() {
  const user = useSelector((state: RootState) => state.user.user);
  const dispatch = useDispatch();

  const handleLogout = async () => {
    await signOut(auth);
    dispatch(logout());
  };

  return (
    <nav className="bg-white shadow-md px-6 py-4 flex justify-between items-center">
      <Link href="/" className="text-xl font-semibold text-blue-600">
        InternArea
      </Link>
      <div className="space-x-6 text-gray-600">
        <Link href="/internships">Internships</Link>
        <Link href="/jobs">Jobs</Link>
        {user ? (
          <>
            <Link href="/profile" className="font-medium text-blue-600">
              Profile
            </Link>
            <button onClick={handleLogout} className="text-red-500">
              Logout
            </button>
          </>
        ) : (
          <Link href="/login" className="font-medium text-blue-600">
            Login
          </Link>
        )}
      </div>
    </nav>
  );
}
