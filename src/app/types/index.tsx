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

export interface PostPreviewType {
    id: number;
    featured_image: string;
    title: string;
    description: string;
    slug: string;
}

export interface PostType {
    id: number;
    featured_image: string;
    title: string;
    seo_title: string;
    description: string;
    slug: string;
    content: string;
    created_at: string;
    updated_at: string;
}

export interface PaginatedCategoryType {
    count: number;
    next: number | null;
    previous: number | null;
    results: PostPreviewType[];
}