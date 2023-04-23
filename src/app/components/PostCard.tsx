import Image from "next/image";
import Link from "next/link";

interface Props {
    image: string;
    title: string;
    description: string;
    url: string;
}

export default function PostCard({ image, title, description, url }: Props) {
    return (
        <div className="shadow-xl">
            <div className="h-[220px] relative">
                <Image
                    src={image}
                    alt={title}
                    fill={true}
                    style={{ objectFit: "cover" }}
                />
            </div>
            <h3 className="text-2xl font-semibold text-center my-2">
                {title}
            </h3>
            <p className="px-4 my-3">{description}</p>
            <Link
                className="block text-light bg-wine hover:bg-wine-light text-center py-3 uppercase font-medium"
                href={url}
            >
                Ver más
            </Link>
        </div>
    );
}
