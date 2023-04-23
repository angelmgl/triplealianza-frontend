import Link from "next/link";

interface Props {
    url: string;
    label: string;
}

export default function Button({ url, label }: Props) {
    return (
        <Link
            href={url}
            className="px-12 py-3 text-light bg-wine hover:bg-wine-light rounded uppercase font-medium"
        >
            {label}
        </Link>
    );
}
