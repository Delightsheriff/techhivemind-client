import { CategoryHeader } from "@/components/CategoryHeader";
import { Pagination } from "@/components/Pagination";
import { ProductFilters } from "@/components/ProductFilter";
import { ProductGrid } from "@/components/ProductGrid";
import { getProducts } from "@/lib/actions/productActions";
import { audioProducts, categories } from "@/lib/links";

interface CategoryPageProps {
  params: Promise<{ category: string }>;
  searchParams: Promise<{ page?: string; category?: string }>;
}

const getCategoryInfo = (slug: string) => {
  const allCategories = [
    ...categories,
    ...audioProducts.map((audio) => ({
      name: audio.name,
      href: audio.href.split("/")[2],
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
    showCategoryFilter: ["shop", "sale", "best_sellers"].includes(slug),
  };
};

export default async function CategoryPage({
  params,
  searchParams,
}: CategoryPageProps) {
  //   const page = searchParams.page ? parseInt(searchParams.page) : 1;
  const resolvedSearchParams = await searchParams;
  const page = resolvedSearchParams.page
    ? parseInt(resolvedSearchParams.page)
    : 1;
  const { category } = await params;

  const { title, description, showCategoryFilter } = getCategoryInfo(category);

  // If we're on a filtered page and have a category filter, use that instead
  const categoryToFetch =
    showCategoryFilter &&
    resolvedSearchParams.category &&
    resolvedSearchParams.category !== "all"
      ? resolvedSearchParams.category
      : category;

  const result = await getProducts(categoryToFetch, page, 12);

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
      {showCategoryFilter && <ProductFilters />}
      <ProductGrid products={result.products || []} />
      {result.totalPages && result.totalPages > 1 && (
        <Pagination
          totalPages={result.totalPages}
          currentPage={result.currentPage || 1}
        />
      )}
    </div>
  );
}
