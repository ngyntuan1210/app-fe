import AdminLayout from "@/layouts/AdminLayout";

export default function Dashboard() {
  return(
    <h1>Admin Dashboard</h1>
  ) 
}

Dashboard.getLayout = function getLayout(page) {
  return <AdminLayout>{page}</AdminLayout>;
};
