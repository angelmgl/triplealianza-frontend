import Image from "next/image";
import { CategoryType, PaginatedCategoryType, PostPreviewType } from "../types";
import DateWidget from "../components/DateWidget";
import Link from "next/link";
import PostCard from "../components/PostCard";

interface SlugParamsType {
    params: {
        category: string;
    };
}

// function to fetch category data from Categories endpoint
const fetchCategoryData = async (slug: string): Promise<CategoryType> => {
    let url = process.env.NEXT_PUBLIC_API_BASE + "/api/categories/" + slug;
    const response = await fetch(url);

    if (!response.ok) {
        // This will activate the closest `error.js` Error Boundary
        throw new Error(`Failed to fetch category ${slug}!`);
    }
    let data: CategoryType = await response.json();
    return data;
};

// function to fetch category posts from Posts endpoint
const fetchCategoryPosts = async (
    slug: string
): Promise<PaginatedCategoryType> => {
    let url = process.env.NEXT_PUBLIC_API_BASE + "/api/posts/category/" + slug;
    const response = await fetch(url);

    if (!response.ok) {
        // This will activate the closest `error.js` Error Boundary
        throw new Error(`Failed to fetch posts from category ${slug}!`);
    }
    let data: PaginatedCategoryType = await response.json();
    return data;
};

// function to populate SEO metadata in <head> html tag
export async function generateMetadata(slugParams: SlugParamsType) {
    let data: CategoryType = await fetchCategoryData(
        slugParams.params.category
    );

    return {
        title: data.seo_title,
        description: data.description,
    };
}

export default async function Category(slugParams: SlugParamsType) {
    const data: CategoryType = await fetchCategoryData(
        slugParams.params.category
    );
    let paginatedPosts: PaginatedCategoryType = await fetchCategoryPosts(
        slugParams.params.category
    );

    return (
        <main>
            <header className="h-[250px] relative bg-wine-light flex flex-col items-center justify-center cover-overlay">
                <Image
                    alt={data.title}
                    src={data.featured_image}
                    fill={true}
                    style={{ objectFit: "cover" }}
                />
                <h1 className="text-6xl font-semibold relative z-10">
                    {data.title}
                </h1>
                <DateWidget date={data.updated_at} />
            </header>
            <div className="container py-12 md:py-20">
                <div
                    className="content"
                    dangerouslySetInnerHTML={{ __html: data.content }}
                />
                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {paginatedPosts.results.length > 0 ? (
                        paginatedPosts.results.map((post) => (
                            <PostCard
                                key={post.id}
                                image={post.featured_image}
                                title={post.title}
                                description={post.description}
                                url={`/${slugParams.params.category}/${post.slug}`}
                            />
                        ))
                    ) : (
                        <p>No hay resultados aún...</p>
                    )}
                </div>
            </div>
        </main>
    );
}
