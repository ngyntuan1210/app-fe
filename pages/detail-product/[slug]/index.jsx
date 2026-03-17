import DetailProduct from "@/components/product/DetailProduct";
import ClientLayout from "@/layouts/ClientLayout";
import { useRouter } from "next/router";

export default function DetailProductPage() {
  const router = useRouter();
  const { slug } = router.query;

  return (
    <ClientLayout>
      <DetailProduct slug={slug} />
    </ClientLayout>
  );
}
