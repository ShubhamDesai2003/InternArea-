/* eslint-disable @typescript-eslint/no-explicit-any */
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import Layout from "@/src/components/Layout";
import { axiosClient } from "@/src/lib/axiosClient";
import ApplyModal from "../../components/application/ApplyModal";
import { useSelector } from "react-redux";
import { RootState } from "../../store";

export default function InternshipDetailsPage() {
  const router = useRouter();
  const { id } = router.query;

  const user = useSelector((state: RootState) => state.user.user);
  const [modalOpen, setModalOpen] = useState(false);

  const [internship, setInternship] = useState<any | null>(null);

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const fetchIntership = async () => {
    try {
      const res = await axiosClient.get(`/internship/${id}`);
      setInternship(res.data);
    } catch (err) {
      console.error(err);
      setError("Failed to load internships");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (id) fetchIntership();
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

    if (!internship)
      return (
        <Layout>
          <p className="text-center text-gray-500 mt-10">Internship not found</p>
        </Layout>
      );
    

  return (
    <Layout>
      <div className="max-w-4xl mx-auto px-6 md:px-10 py-16 bg-white shadow-lg rounded-2xl border border-gray-100">
        <h1 className="text-3xl font-bold text-blue-700 mb-2">
          {internship.title}
        </h1>
        <p className="text-gray-700 text-lg mb-4">{internship.company}</p>

        <div className="flex flex-wrap gap-4 text-sm mb-6">
          <span className="bg-blue-100 text-blue-700 px-3 py-1 rounded-full">
            {internship.category}
          </span>
          <span className="text-gray-600">📍 {internship.location}</span>
          <span className="text-gray-600">
            ⏳ Duration: {internship.duration}
          </span>
          <span className="text-gray-600">
            💰 Stipend: {internship.stipend}
          </span>
        </div>

        <p className="text-gray-700 leading-relaxed mb-8">
          {internship.description}
        </p>

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
          type="Internship"
          id={internship._id}
          userId={user?.uid || ""}
        />
      </div>
    </Layout>
  );
}
