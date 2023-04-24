import { MenuItemType, PostPreviewType } from "../types";

const URL = process.env.NEXT_PUBLIC_APP_URL;

// function to fetch posts from API
const fetchPosts = async (): Promise<PostPreviewType[]> => {
    let url = process.env.NEXT_PUBLIC_API_BASE + "/api/posts/";
    const response = await fetch(url);

    if (!response.ok) {
        // This will activate the closest `error.js` Error Boundary
        throw new Error("Failed to fetch posts from API");
    }
    let data: PostPreviewType[] = await response.json();
    return data;
};

// function to fetch pages links from menu endpoint
const fetchPages = async (): Promise<MenuItemType[]> => {
    let url = process.env.NEXT_PUBLIC_API_BASE + "/api/menu/";
    const response = await fetch(url);

    if (!response.ok) {
        // This will activate the closest `error.js` Error Boundary
        throw new Error("Failed to fetch menu items!");
    }
    let data: MenuItemType[] = await response.json();
    return data;
};

function generateSiteMap(posts: PostPreviewType[], pages: MenuItemType[]) {
    return `<?xml version="1.0" encoding="UTF-8"?>
   <urlset xmlns="https://www.sitemaps.org/schemas/sitemap/0.9">
     ${pages
         .map(({ url }) => {
             return `
        <url>
            <loc>${`${URL}${url}`}</loc>
        </url>
      `;
         })
         .join("")}
     ${posts
         .map(({ category, slug }) => {
             return `
           <url>
               <loc>${`${URL}/${category.slug}/${slug}`}</loc>
           </url>
         `;
         })
         .join("")}
   </urlset>
 `;
}

export async function GET() {
    const posts: PostPreviewType[] = await fetchPosts();
    const pages: MenuItemType[] = await fetchPages();
    const body = generateSiteMap(posts, pages);

    return new Response(body, {
        status: 200,
        headers: {
            "Cache-control": "public, s-maxage=86400, stale-while-revalidate",
            "content-type": "application/xml",
        },
    });
}
