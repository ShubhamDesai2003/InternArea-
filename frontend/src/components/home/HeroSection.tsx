import Link from "next/link";

export default function HeroSection() {
  return (
    <section className="border border-2 bg-gradient-to-r from-blue-50 via-blue-100 to-blue-50 py-24 px-6 text-center relative overflow-hidden">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-4xl md:text-5xl font-bold text-gray-800 leading-snug mb-6">
          Kickstart Your Career with{" "}
          <span className="text-blue-600">Internships</span> and{" "}
          <span className="text-blue-600">Jobs</span>
        </h1>
        <p className="text-gray-600 text-lg md:text-xl mb-10">
          Discover thousands of opportunities that match your skills and passion.
        </p>
        <div className="flex justify-center flex-wrap gap-4">
          <Link
            href="/internships"
            className="bg-blue-600 text-white font-medium px-8 py-3 rounded-xl hover:bg-blue-700 transition-all duration-300 shadow-sm hover:shadow-md"
          >
            Browse Internships
          </Link>
          <Link
            href="/jobs"
            className="bg-white text-blue-600 border border-blue-600 font-medium px-8 py-3 rounded-xl hover:bg-blue-50 transition-all duration-300 shadow-sm hover:shadow-md"
          >
            Browse Jobs
          </Link>
        </div>
      </div>

      {/* Decorative gradient blobs */}
      <div className="absolute top-0 left-0 w-32 h-32 bg-blue-200 blur-3xl opacity-40 rounded-full -translate-x-10 -translate-y-10" />
      <div className="absolute bottom-0 right-0 w-40 h-40 bg-blue-200 blur-3xl opacity-40 rounded-full translate-x-10 translate-y-10" />
    </section>
  );
}
