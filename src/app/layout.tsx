import { Nunito_Sans } from "next/font/google";
import "./globals.css";
import Header from "./components/Header";

export const metadata = {
    title: "Triple Alianza",
    description: "Under development",
};

const font = Nunito_Sans({
    weight: ["400", "600", "700"],
    subsets: ["latin"], // señala el alfabeto latino
});

export default function RootLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <html lang="es-py">
            <body className={font.className}>
                {/* @ts-expect-error Server Component */}
                <Header />
                {children}
            </body>
        </html>
    );
}
