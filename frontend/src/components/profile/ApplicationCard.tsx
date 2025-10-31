interface Application {
  id: number;
  title: string;
  comapany: string;
  status: string;
  type: string;
}

export default function ApplicationCard({ app }: { app: Application }) {
  const statusColors: Record<string, string> = {
    Accepted: "bg-green-100 text-green-700",
    Pending: "bg-yellow-100 text-yellow-700",
    Rejected: "bg-red-100 text-red-700",
  };

  return (
    <div className="bg-white rounded-xl shadow-md hover:shadow-lg transition-all p-6 border border-gray-100 flex flex-col justify-between">
      <div>
        <h3 className="text-lg font-semibold text-blue-700">{app.title}</h3>
        <p className="text-gray-700">{app.company}</p>
        <p className="text-sm text-gray-500">{app.type}</p>
      </div>
      <div className="mt-4">
        <span
          className={`px-3 py-1 text-sm font-medium rounded-full ${statusColors[app.status]}`}
        >
          {app.status}
        </span>
      </div>
    </div>
  );
}
