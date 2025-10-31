import { useEffect, useState } from "react";
import Layout from "@/src/components/Layout";
import FilterBar from "@/src/components/jobs/FilterBar";
import JobCard from "@/src/components/jobs/JobCard";
import { axiosClient } from "@/src/lib/axiosClient";

export default function JobPage() {
  const [filters, setFilters] = useState({ category: "", location: "" });
  const [jobs, setJobs] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const fetchJobs = async () => {
    try {
      const res = await axiosClient.get("/job");
      setJobs(res.data);
    } catch (err) {
      console.error(err);
      setError("Failed to load jobs");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchJobs();
  }, []);

  const filteredJobs = jobs.filter((job) => {
    return (
      (filters.category === "" || job.category === filters.category) &&
      (filters.location === "" || job.location === filters.location)
    );
  });

  return (
    <Layout>
      <div className="max-w-6xl mx-auto px-6 md:px-10 py-16">
        <h1 className="text-3xl font-bold text-gray-800 mb-10 text-center">
          Explore Jobs
        </h1>

        <FilterBar onFilterChange={setFilters} />

        {loading ? (
          <p className="text-center text-gray-500 animate-pulse">
            Loading jobs...
          </p>
        ) : error ? (
          <p className="text-center text-red-500">{error}</p>
        ) : filteredJobs.length === 0 ? (
          <p className="text-center text-gray-500">No jobs found.</p>
        ) : (
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredJobs.map((job) => (
              <JobCard key={job._id} job={job} />
            ))}
          </div>
        )}
      </div>
    </Layout>
  );
}
