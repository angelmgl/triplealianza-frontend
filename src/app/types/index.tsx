export interface MenuItemType {
    id: number;
    text: string;
    url: string;
    order: number;
}

export interface CategoryType {
    id: number;
    title: string;
    seo_title: string;
    slug: string;
    description: string;
    featured_image: string;
    content: string;
    created_at: string;
    updated_at: string;
}