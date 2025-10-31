import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import Layout from "../../components/Layout";
import { axiosClient } from "../../lib/axiosClient";
import ApplyModal from "@/src/components/application/ApplyModal";
import { useSelector } from "react-redux";
import { RootState } from "../../store";

export default function JobDetailPage() {
  const router = useRouter();
  const { id } = router.query;

  const user = useSelector((state: RootState) => state.user.user);
  const [modalOpen, setModalOpen] = useState(false);

  const [job, setJob] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const fetchJob = async () => {
    try {
      const res = await axiosClient.get(`/job/${id}`);
      setJob(res.data);
    } catch (err) {
      console.error(err);
      setError("Failed to load job details");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (id) fetchJob();
  }, [id]);

  if (loading)
    return (
      <Layout>
        <p className="text-center text-gray-500 mt-10">Loading details...</p>
      </Layout>
    );

  if (error)
    return (
      <Layout>
        <p className="text-center text-red-500 mt-10">{error}</p>
      </Layout>
    );

  if (!job)
    return (
      <Layout>
        <p className="text-center text-gray-500 mt-10">Job not found</p>
      </Layout>
    );

  return (
    <Layout>
      <div className="max-w-4xl mx-auto px-6 md:px-10 py-16 bg-white shadow-lg rounded-2xl border border-gray-100">
        <h1 className="text-3xl font-bold text-blue-700 mb-2">{job.title}</h1>
        <p className="text-gray-700 text-lg mb-4">{job.company}</p>

        <div className="flex flex-wrap gap-4 text-sm mb-6">
          <span className="bg-blue-100 text-blue-700 px-3 py-1 rounded-full">
            {job.category}
          </span>
          <span className="text-gray-600">📍 {job.location}</span>
          <span className="text-gray-600">💼 Experience: {job.experience}</span>
          <span className="text-gray-600">💰 CTC: {job.ctc}</span>
        </div>

        <p className="text-gray-700 leading-relaxed mb-8">{job.description}</p>

        <div className="text-center">
          <button
            onClick={() => setModalOpen(true)}
            className="bg-blue-600 text-white px-8 py-2 rounded-lg hover:bg-blue-700 transition-all duration-300"
          >
            Apply Now
          </button>
        </div>

        <ApplyModal
          isOpen={modalOpen}
          onClose={() => setModalOpen(false)}
          type="job"
          id={job._id}
          userId={user?.uid || ""}
        />
      </div>
    </Layout>
  );
}
