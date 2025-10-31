import Layout from "@/src/components/Layout";
import PostForm from "@/src/components/admin/PostForm";

export default function PostInternshipPage() {
  const handleSubmit = (data: Record<string, string>) => {
    console.log("Internship Posted:", data);
    alert("Internship posted successfully (dummy)!");
  };

  return (
    <Layout>
      <div className="py-16 px-6 md:px-10">
        <PostForm type="Internship" onSubmit={handleSubmit} />
      </div>
    </Layout>
  );
}
