import Link from "next/link";

export default function Sidebar() {
  return (
    <aside className="bg-white shadow-md rounded-xl p-6 h-fit md:h-full">
      <nav className="space-y-4">
        <Link
          href="/profile"
          className="block text-gray-700 hover:text-blue-600 font-medium"
        >
          My Profile
        </Link>
        <Link
          href="/profile#applications"
          className="block text-gray-700 hover:text-blue-600 font-medium"
        >
          My Applications
        </Link>
      </nav>
    </aside>
  );
}
