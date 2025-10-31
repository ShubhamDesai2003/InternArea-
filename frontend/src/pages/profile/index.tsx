/* eslint-disable @typescript-eslint/no-explicit-any */
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import type { RootState } from "../../store"; 
import { useRouter } from "next/router";
import Layout from "@/src/components/Layout";
import Sidebar from "@/src/components/profile/Sidebar";
import ProfileInfo from "@/src/components/profile/ProfileInfo";
import ApplicationCard from "@/src/components/profile/ApplicationCard";
import { axiosClient } from "@/src/lib/axiosClient";

export default function ProfilePage() {
  const user = useSelector((state: RootState) => state.user.user);
  const router = useRouter();

  useEffect(() => {
    if (!user) {
      router.push("/login");
    }
  }, [user]);

  const [applications, setApplications] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (user) {
      axiosClient
        .get(`/application/user/${user.uid}`)
        .then((res) => setApplications(res.data))
        .catch((err) => console.error(err))
        .finally(() => setLoading(false));
    }
  }, [user]);

  return (
    <Layout>
      <div className="max-w-6xl mx-auto px-6 md:px-10 py-16 grid md:grid-cols-[250px_1fr] gap-8">
        <Sidebar />

        <div>
          <ProfileInfo />

          <section id="applications">
            <h2 className="text-xl font-semibold text-gray-800 mb-6">
              My Applications
            </h2>

            {loading ? (
              <p className="text-gray-500">Loading applications...</p>
            ) : applications.length === 0 ? (
              <p className="text-gray-500">
                You haven’t applied for anything yet.
              </p>
            ) : (
              <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {applications.map((app) => (
                  <ApplicationCard
                    key={app._id}
                    app={{
                      id: app._id,
                      title: app.jobId?.title || app.internshipId?.title,
                      company: app.jobId?.company || app.internshipId?.company,
                      status: app.status,
                      type: app.jobId ? "Job" : "Internship",
                    }}
                  />
                ))}
              </div>
            )}
          </section>
        </div>
      </div>
    </Layout>
  );
}
