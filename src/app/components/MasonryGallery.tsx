import { ImageType } from "../types";

interface Props {
    chunkedImages: ImageType[][];
}

export default function MasonryGallery({ chunkedImages }: Props) {
    return (
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {chunkedImages.map((chunk, index) => (
                <div key={index} className="grid gap-4">
                    {chunk.map((image) => (
                        <a key={image.id} href={image.image} target="_BLANK">
                            <figure>
                                <picture>
                                    <img
                                        className="h-auto max-w-full rounded-lg"
                                        src={image.image}
                                        alt={image.title}
                                    />
                                </picture>
                                <figcaption className="text-sm text-center py-1">
                                    {image.title}
                                </figcaption>
                            </figure>
                        </a>
                    ))}
                </div>
            ))}
        </div>
    );
}
