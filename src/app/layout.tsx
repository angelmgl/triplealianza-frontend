import "./globals.css";

export const metadata = {
    title: "Triple Alianza",
    description: "Under development",
};

export default function RootLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <html lang="en">
            <body>{children}</body>
        </html>
    );
}
