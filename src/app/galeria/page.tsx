import Image from "next/image";
import { PageType, ImageType } from "../types";
import { splitArrayIntoChunks } from "../helpers/array";
import MasonryGallery from "../components/MasonryGallery";
import populateMetatags from "../helpers/metatags";

// function to fetch Galería content from pages/galeria endpoint
const fetchGalleryData = async (): Promise<PageType> => {
    let url = process.env.NEXT_PUBLIC_API_BASE + "/api/pages/galeria/";
    const response = await fetch(url);

    if (!response.ok) {
        // This will activate the closest `error.js` Error Boundary
        throw new Error("Failed to fetch data from Galería");
    }
    let data: PageType = await response.json();
    return data;
};

// function to fetch images from API
const fetchImages = async (): Promise<ImageType[][]> => {
    let url = process.env.NEXT_PUBLIC_API_BASE + "/api/images/";
    const response = await fetch(url);

    if (!response.ok) {
        // This will activate the closest `error.js` Error Boundary
        throw new Error("Failed to fetch images");
    }
    let data: ImageType[] = await response.json();
    let chunkedImages: ImageType[][] = splitArrayIntoChunks(data, 4);
    return chunkedImages;
};

// function to populate SEO metadata in <head> html tag
export async function generateMetadata() {
    let data: PageType = await fetchGalleryData();
    const metatags = populateMetatags(
        data.seo_title,
        data.description,
        data.featured_image.image
    );

    return metatags;
}

export default async function Gallery() {
    let data: PageType = await fetchGalleryData();
    let chunkedImages: ImageType[][] = await fetchImages();

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
            </header>
            <div className="container py-12 md:py-20">
                <MasonryGallery chunkedImages={chunkedImages} />
            </div>
        </main>
    );
}
