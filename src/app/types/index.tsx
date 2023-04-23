export interface MenuItemType {
    id: number;
    text: string;
    url: string;
    order: number;
}

export interface ImageType {
    id: number;
    title: string;
    image: string;
};

export interface BasePostType {
    id: number;
    title: string;
    seo_title: string;
    slug: string;
    description: string;
    featured_image: ImageType;
    content: string;
    created_at: string;
    updated_at: string;
}

export interface CategoryType extends BasePostType {}

export interface PostPreviewType {
    id: number;
    featured_image: ImageType;
    title: string;
    description: string;
    slug: string;
    category: {
        id: number;
        title: string;
        slug: string;
    }
}

export interface PostType extends BasePostType {
    category: {
        id: number;
        title: string;
        slug: string;
    }
}

export interface PaginatedCategoryType {
    count: number;
    next: number | null;
    previous: number | null;
    results: PostPreviewType[];
}

export interface PageType extends BasePostType {}

export interface SlideType {
    id: number;
    image: ImageType;
    title: string;
    description: string;
    button_url: string;
    button_label: string;
    order: number;
}