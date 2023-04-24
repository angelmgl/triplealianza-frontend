import Image from "next/image";
import logo from "../assets/img/logo.svg";
import Link from "next/link";
import Menu from "./Menu";
import { MenuItemType } from "../types";

// function to fetch Menu links from API
const fetchMenuItems = async (): Promise<MenuItemType[]> => {
    let url = process.env.NEXT_PUBLIC_API_BASE + "/api/menu/";
    const response = await fetch(url);

    if (!response.ok) {
        // This will activate the closest `error.js` Error Boundary
        throw new Error("Failed to fetch menu items!");
    }
    let data: MenuItemType[] = await response.json();
    return data;
};

export default async function Header() {
    const menuItems: MenuItemType[] = await fetchMenuItems();

    return (
        <header className="bg-wine">
            <div className="py-4 flex items-center justify-center">
                <Link href="/">
                    <Image src={logo} alt="Triple Alianza" />
                </Link>
            </div>
            <Menu items={menuItems} />
        </header>
    );
}
