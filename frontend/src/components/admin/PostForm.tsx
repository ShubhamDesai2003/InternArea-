import { useState } from "react";
import { axiosClient } from "../../lib/axiosClient";
import { toast } from "react-toastify";

interface PostFormProps {
  type: "Internship" | "Job";
  onSubmit?: (data: Record<string, string>) => void;
}

export default function PostForm({ type, onSubmit }: PostFormProps) {
  const [formData, setFormData] = useState({
    title: "",
    company: "",
    location: "",
    duration: "",
    stipend: "",
    ctc: "",
    category: "",
    description: "",
  });

  // ✅ You need this function
  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (onSubmit) {
      onSubmit(formData);
      return;
    }

    try {
      const endpoint = type === "Internship" ? "/internship" : "/job";
      const payload =
        type === "Job"
          ? {
              title: formData.title,
              company: formData.company,
              location: formData.location,
              category: formData.category,
              experience: formData.duration, // 👈 job field mapping
              ctc: formData.ctc,
              description: formData.description,
            }
          : {
              title: formData.title,
              company: formData.company,
              location: formData.location,
              category: formData.category,
              duration: formData.duration,
              stipend: formData.stipend,
              description: formData.description,
            };

      const res = await axiosClient.post(endpoint, payload);
      if (res.status === 201) {
        toast.success(`${type} posted successfully!`);
        setFormData({
          title: "",
          company: "",
          location: "",
          duration: "",
          stipend: "",
          ctc: "",
          category: "",
          description: "",
        });
      }
    } catch (error: any) {
      console.error(error);
      toast.error("Something went wrong. Try again.");
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="bg-white shadow-xl rounded-xl p-8 w-full max-w-3xl mx-auto"
    >
      <h2 className="text-2xl font-semibold text-gray-800 mb-8 text-center">
        Post New {type}
      </h2>

      {/* TITLE & COMPANY */}
      <div className="grid md:grid-cols-2 gap-6">
        <div>
          <label className="block text-gray-600 mb-1">Title</label>
          <input
            type="text"
            name="title"
            value={formData.title}
            onChange={handleChange}
            required
            className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-400 outline-none"
          />
        </div>
        <div>
          <label className="block text-gray-600 mb-1">Company</label>
          <input
            type="text"
            name="company"
            value={formData.company}
            onChange={handleChange}
            required
            className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-400 outline-none"
          />
        </div>
      </div>

      {/* LOCATION / CATEGORY */}
      <div className="grid md:grid-cols-2 gap-6 mt-6">
        <div>
          <label className="block text-gray-600 mb-1">Location</label>
          <input
            type="text"
            name="location"
            value={formData.location}
            onChange={handleChange}
            placeholder="e.g. Pune, Remote"
            required
            className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-400 outline-none"
          />
        </div>
        <div>
          <label className="block text-gray-600 mb-1">Category</label>
          <select
            name="category"
            value={formData.category}
            onChange={handleChange}
            required
            className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-400 outline-none"
          >
            <option value="">Select Category</option>
            <option value="IT">IT</option>
            <option value="Marketing">Marketing</option>
            <option value="Design">Design</option>
            <option value="Finance">Finance</option>
          </select>
        </div>
      </div>

      {/* CONDITIONAL FIELDS */}
      <div className="grid md:grid-cols-2 gap-6 mt-6">
        {type === "Internship" ? (
          <>
            <div>
              <label className="block text-gray-600 mb-1">Duration</label>
              <input
                type="text"
                name="duration"
                value={formData.duration}
                onChange={handleChange}
                placeholder="e.g. 3 months"
                className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-400 outline-none"
              />
            </div>
            <div>
              <label className="block text-gray-600 mb-1">Stipend</label>
              <input
                type="text"
                name="stipend"
                value={formData.stipend}
                onChange={handleChange}
                placeholder="e.g. ₹10,000/month"
                className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-400 outline-none"
              />
            </div>
          </>
        ) : (
          <>
            <div>
              <label className="block text-gray-600 mb-1">Experience</label>
              <input
                type="text"
                name="duration"
                value={formData.duration}
                onChange={handleChange}
                placeholder="e.g. 1-2 years"
                className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-400 outline-none"
              />
            </div>
            <div>
              <label className="block text-gray-600 mb-1">CTC</label>
              <input
                type="text"
                name="ctc"
                value={formData.ctc}
                onChange={handleChange}
                placeholder="e.g. ₹4–6 LPA"
                className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-400 outline-none"
              />
            </div>
          </>
        )}
      </div>

      {/* DESCRIPTION */}
      <div className="mt-6">
        <label className="block text-gray-600 mb-1">Description</label>
        <textarea
          name="description"
          value={formData.description}
          onChange={handleChange}
          rows={5}
          placeholder={`Describe the ${type.toLowerCase()} role...`}
          required
          className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-400 outline-none"
        />
      </div>

      <div className="text-center mt-8">
        <button
          type="submit"
          className="bg-blue-600 text-white px-8 py-2 rounded-lg hover:bg-blue-700 transition-all duration-300"
        >
          Post {type}
        </button>
      </div>
    </form>
  );
}
