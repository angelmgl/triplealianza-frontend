export default function populateMetatags(title: string, description: string, image: string) {
    return {
        title: title,
        description: description,
        alternates: {
            canonical: process.env.NEXT_PUBLIC_APP_URL,
        },
        openGraph: {
            title: title,
            description: description,
            url: process.env.NEXT_PUBLIC_APP_URL,
            siteName: "Triple Alianza",
            type: "website",
            images: {
                url: image,
                width: 800,
                height: 600,
            },
            robots: {
                index: true,
                follow: true,
                nocache: false,
            },
        },
        twitter: {
            card: "summary_large_image",
            title: title,
            description: description,
            siteId: process.env.NEXT_PUBLIC_TWITTER_ID,
            creator: process.env.NEXT_PUBLIC_TWITTER_USER,
            creatorId: process.env.NEXT_PUBLIC_TWITTER_USER_ID,
            images: [image],
        },
    };
}
