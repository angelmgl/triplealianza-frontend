import { Nunito_Sans } from "next/font/google";
import "./globals.css";
import Header from "./components/Header";
import Footer from "./components/Footer";
import { GTMnoscript, GTMscript } from "./components/GTM";

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
            <head />
            <body className={font.className}>
                <GTMnoscript />
                {/* @ts-expect-error Server Component */}
                <Header />
                {children}
                <Footer />
            </body>
            <GTMscript />
        </html>
    );
}
