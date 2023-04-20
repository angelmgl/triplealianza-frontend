import { Nunito_Sans } from "next/font/google";
import "./globals.css";

export const metadata = {
    title: "Triple Alianza",
    description: "Under development",
};

const font = Nunito_Sans({
    weight: ["400", "700"],
    subsets: ["latin"], // señala el alfabeto latino
});

export default function RootLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <html lang="es-py">
            <body className={font.className}>{children}</body>
        </html>
    );
}
