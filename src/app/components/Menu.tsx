"use client";

import Link from "next/link";
import { useState } from "react";
import { MenuItemType } from "../types";

function classNames(
    condition: boolean,
    defaultClasses: string,
    newClasses: string
): string {
    let finalClasses = condition
        ? `${defaultClasses} ${newClasses}`
        : defaultClasses;
    return finalClasses;
}

interface Props {
    items: MenuItemType[];
}

const Menu: React.FC<Props> = ({ items }) => {
    const [isMenuOpen, setMenuOpen] = useState<boolean>(false);

    return (
        <>
            <nav
                id="menu"
                className={classNames(
                    isMenuOpen,
                    "fixed left-0 top-0 md:relative bg-wine md:border-t border-light h-screen md:h-auto w-full z-40",
                    "open"
                )}
            >
                <ul className="flex justify-center items-center">
                    {items.length > 0 &&
                        items.map((item: MenuItemType) => (
                            <li
                                key={item.id}
                                className="uppercase hover:bg-wine-dark lg:text-lg font-semibold"
                            >
                                <Link
                                    className="block py-3 px-4 lg:px-6"
                                    href={item.url}
                                >
                                    {item.text}
                                </Link>
                            </li>
                        ))}
                </ul>
            </nav>
            <button
                id="menu-btn"
                onClick={() => setMenuOpen(!isMenuOpen)}
                className={classNames(
                    isMenuOpen,
                    "fixed h-14 w-14 bottom-5 right-5 z-50 bg-wine hover:bg-wine-dark rounded-full flex md:hidden flex-col items-center justify-center gap-1 shadow-lg",
                    "open"
                )}
            >
                <div className="w-8 h-1 bg-light rounded transition-all"></div>
                <div className="w-8 h-1 bg-light rounded transition-all"></div>
                <div className="w-8 h-1 bg-light rounded transition-all"></div>
            </button>
        </>
    );
};

export default Menu;
