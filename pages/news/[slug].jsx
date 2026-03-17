import { useRouter } from "next/router";
import ClientLayout from "@/layouts/ClientLayout";
import { newsList } from "@/data/news";
import DetailNews from "@/components/news/DetailNews";

export default function NewsDetailPage() {
  const router = useRouter();
  const { slug } = router.query;

  if (!slug) return null;

  const article = newsList.find((item) => item.slug === slug);

  if (!article) {
    return (
      <ClientLayout>
        <div className="page" style={{ padding: "2rem 0 4rem" }}>
          <div className="container" style={{ maxWidth: "900px" }}>
            <h1>Không tìm thấy tin tức</h1>
            <p>Tin tức bạn tìm kiếm không tồn tại hoặc đã bị xóa.</p>
          </div>
        </div>
      </ClientLayout>
    );
  }

  return (
    <ClientLayout>
      <DetailNews article={article} />
    </ClientLayout>
  );
}
