const fetchData = async () => {
    let url = process.env.NEXT_PUBLIC_API_BASE + "/api/welcome/";
    const res = await fetch(url);

    if (!res.ok) {
        // This will activate the closest `error.js` Error Boundary
        throw new Error("Failed to fetch data");
    }
    return res.json();
};

export default async function Home() {
    const data = await fetchData();

    return (
        <main className="min-h-screen flex flex-col justify-center items-center">
            <div className="container">
                <p className="text-center text-8xl mb-4">🌱</p>
                <h1 className="text-center text-4xl font-semibold mb-4">
                    {data.title}
                </h1>
                <p className="text-center">{data.description}</p>
            </div>
        </main>
    );
}
