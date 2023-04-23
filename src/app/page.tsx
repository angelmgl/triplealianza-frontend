import Slider from "./components/Slider";
import { PageType, SlideType } from "./types";

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

// function to populate SEO metadata in <head> html tag
export async function generateMetadata() {
    let data: PageType = await fetchHomeData();

    return {
        title: data.seo_title,
        description: data.description,
    };
}

export default async function Home() {
    const data = await fetchHomeData();
    const slides = await fetchSlides();

    return (
        <>
            <Slider items={slides} />
            <main className="container py-12 md:py-20">
                <div
                    className="content"
                    dangerouslySetInnerHTML={{ __html: data.content }}
                />
            </main>
        </>
    );
}
