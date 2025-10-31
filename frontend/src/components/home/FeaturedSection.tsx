interface FeatureItem {
    id: number;
    title: string;
    company: string;
    location: string;
    type: string;
    stipend?: string;
  }
  
  const featuredData: FeatureItem[] = [
    { id: 1, title: "Frontend Developer Intern", company: "TechNova", location: "Remote", type: "Internship", stipend: "₹8,000/month" },
    { id: 2, title: "Marketing Assistant", company: "GrowHub", location: "Pune", type: "Internship", stipend: "₹10,000/month" },
    { id: 3, title: "UI/UX Designer", company: "Designify", location: "Bangalore", type: "Job", stipend: "₹4 - 6 LPA" },
  ];
  
  export default function FeaturedSection() {
    return (
      <section className="py-20 px-6 md:px-10 bg-blue-50/50">
        <h2 className="text-3xl font-semibold text-gray-800 mb-12 text-center">
          Featured Opportunities
        </h2>
  
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {featuredData.map((item) => (
            <div
              key={item.id}
              className="bg-white rounded-2xl shadow-md hover:shadow-xl transition-all duration-300 p-6 border border-gray-100 flex flex-col justify-between"
            >
              <div>
                <h3 className="font-semibold text-lg text-blue-700 mb-1">
                  {item.title}
                </h3>
                <p className="text-gray-700">{item.company}</p>
                <p className="text-sm text-gray-500 mb-3">{item.location}</p>
              </div>
  
              <div className="flex items-center justify-between mt-4">
                <span className="bg-blue-100 text-blue-700 px-3 py-1 rounded-full text-xs font-medium">
                  {item.type}
                </span>
                <span className="text-gray-600 text-sm font-medium">
                  {item.stipend}
                </span>
              </div>
            </div>
          ))}
        </div>
      </section>
    );
  }
  