import Image from "next/image";
import Link from "next/link";

export default function DetailNews({ article }) {
  if (!article) return null;

  return (
    <div className="page">
      <div className="news-detail-container">
        <Link href="/news" className="news-detail-back btn btn-outline">
          ← Quay lại tin tức
        </Link>

        <article>
          {article.image && (
            <div className="news-detail-image">
              <Image
                src={article.image}
                alt={article.title}
                width={900}
                height={450}
                style={{ width: "100%", height: "auto", objectFit: "cover" }}
              />
            </div>
          )}

          <h1 className="news-detail-title">{article.title}</h1>

          <div className="news-detail-meta">
            <span>{article.category}</span>
            <span>{article.date}</span>
            <span>{article.readTime}</span>
          </div>

          <p className="news-detail-text">{article.excerpt}</p>

          <div className="news-detail-text">
            <p>
              Nội dung chi tiết demo chưa có sẵn trong dữ liệu mẫu. Bạn có thể mở rộng thêm trường <code>article.content</code> trong <code>newsList</code> để render nội dung đầy đủ.
            </p>

            <p>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Cras interdum, metus in bibendum scelerisque, libero lectus sodales nisl, in feugiat nisi nisl vitae purus. Fusce ullamcorper varius ipsum, vitae feugiat nunc finibus a.
            </p>

            <p>
              Aenean dapibus orci nec nisl efficitur, et lobortis arcu faucibus. Duis eu commodo orci, ac viverra ex. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia curae.
            </p>
          </div>
        </article>
      </div>
    </div>
  );
}
