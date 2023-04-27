import Image from "next/image";
import { PostType } from "../../types";
import DateWidget from "../../components/DateWidget";
import populateMetatags from "@/app/helpers/metatags";

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
    let data: PostType = await fetchPostData(slugParams.params.post);
    const metatags = populateMetatags(
        data.seo_title,
        data.description,
        data.featured_image.image
    );

    return metatags;
}

export default async function Post(slugParams: SlugParamsType) {
    const data: PostType = await fetchPostData(slugParams.params.post);

    return (
        <main>
            <div className="container py-12 md:py-20">
                <header className="flex flex-col items-center">
                    <h1 className="text-6xl font-semibold relative z-10">
                        {data.title}
                    </h1>
                    <DateWidget date={data.updated_at} />
                    <figure>
                        <Image
                            className="mt-8"
                            alt={data.title}
                            src={data.featured_image.image}
                            height={data.featured_image.height}
                            width={data.featured_image.width}
                        />
                        <figcaption className="text-sm text-center py-2 italic">{data.featured_image.title}</figcaption>
                    </figure>
                </header>
                <div className="mt-14 flex gap-16 flex-col lg:flex-row">
                    <div
                        className="content w-full lg:w-2/3"
                        dangerouslySetInnerHTML={{ __html: data.content }}
                    />
                    <aside className="w-full lg:w-1/3">
                        <h2 className="text-xl md:text-2xl font-bold border-l-4 border-wine pl-5">
                            Artículos recomendados
                        </h2>
                    </aside>
                </div>
            </div>
        </main>
    );
}
