/* eslint-disable @typescript-eslint/no-explicit-any */
import { useState } from "react";
import { axiosClient } from "@/src/lib/axiosClient";

interface ApplyModalProps {
  isOpen: boolean;
  onClose: () => void;
  type: "Internship" | "job";
  id: string;
  userId: string;
}

export default function ApplyModal({
  isOpen,
  onClose,
  type,
  id,
  userId,
}: ApplyModalProps) {
  const [coverLetter, setCoverLetter] = useState("");
  const [loading, setLoading] = useState(false);

  if (!isOpen) return null;

  const handleApply = async () => {
    if (!userId) {
      alert("Please login first");
      return;
    }

    setLoading(true);

    try {
      const payload =
        type == "Internship"
          ? { userId, internshipId: id, coverLetter }
          : { userId, jobId: id, coverLetter };

      const res = await axiosClient.post("/application", payload);      ;
      if (res.status == 201) {
        alert(`${type} applied succesfully`);
        onClose();
      }
    } catch (err: any) {
      if (err.response?.status === 409) alert("you've already applied!");
      else alert("Something went wrong. Try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    // <div className="fixed inset-0 flex items-center justify-center z-50 bg-black bg-opacity-40 backdrop-blur-sm">
    <div className="fixed inset-0 z-[9999] flex items-center justify-center bg-black bg-opacity-40 backdrop-blur-sm">
      <div className="bg-white rounded-xl shadow-2xl p-6 w-full max-w-md">
        <h2 className="text-xl font-semibold text-gray-800 mb-3">
          Apply for {type}
        </h2>
        <textarea
          value={coverLetter}
          onChange={(e) => setCoverLetter(e.target.value)}
          rows={5}
          placeholder="Write a short cover letter..."
          className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-400 outline-none mb-4"
        />
        <div className="flex justify-end space-x-3">
          <button
            onClick={onClose}
            className="px-5 py-2 rounded-lg bg-gray-200 hover:bg-gray-300"
          >
            Cancel
          </button>
          <button
            onClick={handleApply}
            disabled={loading}
            className={`px-5 py-2 rounded-lg text-white ${
              loading ? "bg-gray-400" : "bg-blue-600 hover:bg-blue-700"
            }`}
          >
            {loading ? "Applying..." : "Apply"}
          </button>
        </div>
      </div>
    </div>
  );
}
