/* eslint-disable @next/next/no-html-link-for-pages */
import { UseSelector, useDispatch, useSelector } from "react-redux";
import type { RootState } from "../../store"; 
import { logout } from "@/src/features/userSlice";
import { useRouter } from "next/router";
import Layout from "@/src/components/Layout";

export default function Dashboard() {
  const user = useSelector((state: RootState) => state.user.user);
  const dispatch = useDispatch();
  const router = useRouter();

  // redirect if not admin
  if (!user || !user.isAdmin) {
    if (typeof window !== "undefined") router.replace("/admin");
    return null;
  }

  const handleLogout = () => {
    dispatch(logout());
    router.push("/admin");
  };

  return (
    <Layout>
      <div className="max-w-6xl mx-auto px-6 md:px-10 py-16">
        <div className="flex justify-between items-center mb-10">
          <h1 className="text-3xl font-bold text-gray-800">Admin Dashboard</h1>
          <button
            onClick={handleLogout}
            className="bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-600"
          >
            Logout
          </button>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {[
            { title: "Total Internships", count: 24 },
            { title: "Total Jobs", count: 18 },
            { title: "Applications", count: 52 },
          ].map((stat) => (
            <div
              key={stat.title}
              className="bg-white shadow-md rounded-xl p-8 text-center border border-gray-100 hover:shadow-lg transition-all duration-300"
            >
              <h2 className="text-4xl font-bold text-blue-600 mb-2">
                {stat.count}
              </h2>
              <p className="text-gray-600 font-medium">{stat.title}</p>
            </div>
          ))}
        </div>

        <div className="text-center mt-10 space-x-4">
          <a
            href="/admin/post-internship"
            className="inline-block bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition"
          >
            Post Internship
          </a>
          <a
            href="/admin/post-job"
            className="inline-block bg-green-600 text-white px-6 py-2 rounded-lg hover:bg-green-700 transition"
          >
            Post Job
          </a>
        </div>
      </div>
    </Layout>
  );
}
