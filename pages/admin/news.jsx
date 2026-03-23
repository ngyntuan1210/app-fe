import AdminLayout from "@/layouts/AdminLayout";

export default function NewsPage() {
  return (
    <div>
      <h2>Quản lý News</h2>
      <p>Ở đây bạn có thể thêm / sửa / xóa tin tức.</p>
      {/* Thay thành component quản lý news của bạn */}
    </div>
  );
}

NewsPage.getLayout = function getLayout(page) {
  return <AdminLayout>{page}</AdminLayout>;
};
