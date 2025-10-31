import Link from "next/link";

interface Job {
  id: number;
  title: string;
  company: string;
  location: string;
  experience: string;
  ctc: string;
  category: string;
}

export default function JobCard({ job }: { job: Job }) {
  return (
    <Link href={`/jobs/${job._id}`}>
      <div className="bg-white rounded-2xl shadow-md hover:shadow-xl transition-all duration-300 p-6 border border-gray-100 flex flex-col justify-between">
        <div>
          <h3 className="text-lg font-semibold text-blue-700 mb-1">
            {job.title}
          </h3>
          <p className="text-gray-700">{job.company}</p>
          <p className="text-sm text-gray-500 mb-3">{job.location}</p>
        </div>

        <div className="flex justify-between items-center text-sm mt-2">
          <p className="text-gray-600">
            <span className="font-medium">Experience:</span> {job.experience}
          </p>
          <p className="text-gray-600">
            <span className="font-medium">CTC:</span> {job.ctc}
          </p>
        </div>

        <div className="flex justify-between items-center mt-4">
          <span className="text-xs font-medium bg-blue-100 text-blue-700 px-3 py-1 rounded-full">
            {job.category}
          </span>
          <button className="bg-blue-600 text-white px-4 py-2 rounded-lg text-sm hover:bg-blue-700 transition-all duration-300">
            Apply Now
          </button>
        </div>
      </div>
    </Link>
  );
}
