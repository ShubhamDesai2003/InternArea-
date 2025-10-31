/* eslint-disable @typescript-eslint/no-explicit-any */
import { useEffect, useState } from "react";
import Layout from "@/src/components/Layout";
import FilterBar from "@/src/components/internships/FilterBar";
import InternshipCard from "@/src/components/internships/InternshipCard";
import { axiosClient } from "@/src/lib/axiosClient";

export default function InternshipPage() {
  const [filters, setFilters] = useState({ category: "", location: "" });
  const [internships, setInterships] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const fetchInternships = async () => {
    try {
      const res = await axiosClient.get("/internship");
      console.log("Internship");
      setInterships(res.data);
    } catch (err) {
      console.error(err);
      setError("Failed to load internships");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchInternships();
  }, []);

  const filteredInternships = internships.filter((item) => {
    return (
      (filters.category === "" || item.category === filters.category) &&
      (filters.location === "" || item.location === filters.location)
    );
  });

  return (
    <Layout>
      <div className="max-w-6xl mx-auto px-6 md:px-10 py-16">
        <h1 className="text-3xl font-bold text-gray-800 mb-10 text-center">
          Explore Internships
        </h1>

        <FilterBar onFilterChange={setFilters} />

        {loading ? (
          <p className="text-center text-gray-500 animate-pulse">
            Loading internships...
          </p>
        ) : error ? (
          <p className="text-center text-red-500">{error}</p>
        ) : filteredInternships.length === 0 ? (
          <p className="text-center text-gray-500">No internships found.</p>
        ) : (
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredInternships.map((internship) => (
              <InternshipCard key={internship._id} internship={internship} />
            ))}
          </div>
        )}
      </div>
    </Layout>
  );
}
