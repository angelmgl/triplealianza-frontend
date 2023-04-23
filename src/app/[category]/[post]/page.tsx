import Image from "next/image";
import { PostType } from "../../types";
import DateWidget from "../../components/DateWidget";

interface SlugParamsType {
    params: {
        post: string;
    };
}

// function to fetch this post from Posts endpoint
const fetchPostData = async (slug: string): Promise<PostType> => {
    let url = process.env.NEXT_PUBLIC_API_BASE + "/api/posts/" + slug;
    const response = await fetch(url);

    if (!response.ok) {
        // This will activate the closest `error.js` Error Boundary
        throw new Error(`Failed to fetch post ${slug}!`);
    }
    let data: PostType = await response.json();
    return data;
};

// function to populate SEO metadata in <head> html tag
export async function generateMetadata(slugParams: SlugParamsType) {
    let data: PostType = await fetchPostData(
        slugParams.params.post
    );

    return {
        title: data.seo_title,
        description: data.description,
    };
}

export default async function Post(slugParams: SlugParamsType) {
    const data: PostType = await fetchPostData(
        slugParams.params.post
    );

    return (
        <main>
            <header className="h-[250px] relative bg-wine-light flex flex-col items-center justify-center cover-overlay">
                <Image
                    alt={data.title}
                    src={data.featured_image.image}
                    fill={true}
                    style={{ objectFit: "cover" }}
                />
                <h1 className="text-6xl font-semibold relative z-10 text-light">
                    {data.title}
                </h1>
                <DateWidget date={data.updated_at} />
            </header>
            <div className="container py-12 md:py-20">
                <div
                    className="content"
                    dangerouslySetInnerHTML={{ __html: data.content }}
                />
            </div>
        </main>
    );
}
