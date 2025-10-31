import { useSelector } from "react-redux";
import type { RootState } from "../../store"; 


export default function ProfileInfo() {
  const user = useSelector((state: RootState) => state.user.user);

  return (
    <div className="bg-white shadow-md rounded-xl p-6 mb-8">
      <h2 className="text-xl font-semibold text-gray-800 mb-4">My Profile</h2>
      {user ? (
        <>
          <p className="text-gray-700 mb-2">
            <span className="font-medium">Email:</span> {user.email}
          </p>
          <p className="text-gray-700">
            <span className="font-medium">UID:</span> {user.uid}
          </p>
        </>
      ) : (
        <p className="text-gray-500">No user data available.</p>
      )}
    </div>
  );
}
