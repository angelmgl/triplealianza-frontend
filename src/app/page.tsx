import PostCard from "./components/PostCard";
import Slider from "./components/Slider";
import populateMetatags from "./helpers/metatags";
import { PageType, PostPreviewType, SlideType } from "./types";

// function to fetch home content from pages/home endpoint
const fetchHomeData = async (): Promise<PageType> => {
    let url = process.env.NEXT_PUBLIC_API_BASE + "/api/pages/home/";
    const response = await fetch(url);

    if (!response.ok) {
        // This will activate the closest `error.js` Error Boundary
        throw new Error("Failed to fetch data from Home");
    }
    let data: PageType = await response.json();
    return data;
};

// function to fetch slides from API
const fetchSlides = async (): Promise<SlideType[]> => {
    let url = process.env.NEXT_PUBLIC_API_BASE + "/api/slides/";
    const response = await fetch(url);

    if (!response.ok) {
        // This will activate the closest `error.js` Error Boundary
        throw new Error("Failed to fetch slides");
    }
    let data: SlideType[] = await response.json();
    return data;
};

// function to fetch latest posts
const fetchLatestPosts = async (): Promise<PostPreviewType[]> => {
    let url = process.env.NEXT_PUBLIC_API_BASE + "/api/posts/";
    const response = await fetch(url);

    if (!response.ok) {
        // This will activate the closest `error.js` Error Boundary
        throw new Error("Failed to fetch posts from API");
    }
    let data: PostPreviewType[] = await response.json();
    return data;
};

// function to populate SEO metadata in <head> html tag
export async function generateMetadata() {
    let data: PageType = await fetchHomeData();
    const metatags = populateMetatags(
        data.seo_title,
        data.description,
        data.featured_image.image
    );

    return metatags;
}

export default async function Home() {
    const data = await fetchHomeData();
    const slides = await fetchSlides();
    const latestPosts = await fetchLatestPosts();

    return (
        <>
            <Slider items={slides} />
            <main className="container py-12 md:py-20">
                <div
                    className="content"
                    dangerouslySetInnerHTML={{ __html: data.content }}
                />
                <hr className="my-16" />
                <h2 className="text-3xl md:text-4xl font-bold border-l-4 border-wine pl-5">Últimos artículos...</h2>
                <div className="mt-8 grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {latestPosts.length > 0 ? (
                        latestPosts.map((post) => (
                            <PostCard
                                key={post.id}
                                image={post.featured_image.image}
                                title={post.title}
                                description={post.description}
                                url={`/${post.category.slug}/${post.slug}`}
                            />
                        ))
                    ) : (
                        <p>No hay resultados aún...</p>
                    )}
                </div>
            </main>
        </>
    );
}
