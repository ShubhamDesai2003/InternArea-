import Layout from "@/src/components/Layout";
import PostForm from "@/src/components/admin/PostForm";

export default function PostJobPage() {
  const handleSubmit = (data: Record<string, string>) => {
    console.log("Job Posted:", data);
    alert("Job posted successfully (dummy)!");
  };

  return (
    <Layout>
      <div className="py-16 px-6 md:px-10">
        <PostForm type="Job" onSubmit={handleSubmit} />
      </div>
    </Layout>
  );
}
