const categories = [
    { name: "IT & Software", icon: "💻", color: "bg-blue-100 text-blue-700" },
    { name: "Marketing", icon: "📣", color: "bg-pink-100 text-pink-700" },
    { name: "Design", icon: "🎨", color: "bg-purple-100 text-purple-700" },
    { name: "Finance", icon: "💰", color: "bg-green-100 text-green-700" },
    { name: "Education", icon: "📚", color: "bg-yellow-100 text-yellow-700" },
    { name: "HR & Management", icon: "🧑‍💼", color: "bg-orange-100 text-orange-700" },
  ];
  
  export default function CategoryGrid() {
    return (
      <section className="py-20 px-6 md:px-10 max-w-6xl mx-auto">
        <h2 className="text-3xl font-semibold text-gray-800 mb-12 text-center">
          Explore Categories
        </h2>
  
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 gap-6">
          {categories.map((cat) => (
            <div
              key={cat.name}
              className={`flex flex-col items-center justify-center rounded-2xl p-6 shadow-md hover:shadow-lg hover:scale-[1.03] transition-all duration-300 bg-white border border-gray-100`}
            >
              <div
                className={`text-4xl mb-3 flex items-center justify-center w-14 h-14 rounded-full ${cat.color}`}
              >
                {cat.icon}
              </div>
              <p className="text-sm font-medium text-gray-700 text-center">{cat.name}</p>
            </div>
          ))}
        </div>
      </section>
    );
  }
  