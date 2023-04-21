import Image from "next/image";
import logo from "../assets/img/logo.svg";
import Link from "next/link";
import Menu from "./Menu";

export default function Header() {
    return (
        <header className="bg-wine">
            <div className="py-4 flex items-center justify-center">
                <Link href="/">
                    <Image src={logo} alt="Triple Alianza" />
                </Link>
            </div>
            <Menu />
        </header>
    );
}
