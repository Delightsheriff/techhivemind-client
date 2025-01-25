import { CategoryHeader } from "@/components/CategoryHeader";
import { Pagination } from "@/components/Pagination";
import { ProductsWrapper } from "@/components/ProductsWrapper";
import { getProducts } from "@/lib/actions/productActions";
import { audioProducts, categories } from "@/lib/links";

interface CategoryPageProps {
  params: Promise<{ category: string }>;
  searchParams: Promise<{ page?: string }>;
}

const getCategoryInfo = (slug: string) => {
  const allCategories = [
    ...categories,
    ...audioProducts.map((audio) => ({
      name: audio.name,
      href: audio.href,
    })),
  ];
  const category = allCategories.find(
    (cat) => cat.href.replace("/", "") === slug
  );
  return {
    title: category?.name || "Products",
    description: `Explore our collection of ${
      category?.name.toLowerCase() || "products"
    }`,
    showCategoryFilter: ["all", "onsale", "best_sellers"].includes(slug),
  };
};

export default async function CategoryPage({
  params,
  searchParams,
}: CategoryPageProps) {
  const { category } = await params;
  const resolvedSearchParams = await searchParams;
  const page = resolvedSearchParams.page
    ? parseInt(resolvedSearchParams.page)
    : 1;
  const { title, description, showCategoryFilter } = getCategoryInfo(category);

  const result = await getProducts(category, page, 12);

  if (!result.success) {
    return (
      <div className="container mx-auto px-4 py-8">
        <p className="text-center text-red-500">{result.message}</p>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <CategoryHeader title={title} description={description} />
      <ProductsWrapper
        initialProducts={result.products || []}
        showCategoryFilter={showCategoryFilter}
      />
      {result.totalPages && result.totalPages > 1 && (
        <Pagination
          totalPages={result.totalPages}
          currentPage={result.currentPage || 1}
        />
      )}
    </div>
  );
}
