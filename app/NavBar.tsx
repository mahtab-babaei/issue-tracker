"use client";
import classnames from "classnames";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { AiFillBug } from "react-icons/ai";

const NavBar = () => {
  const currentPath = usePathname();

  const links = [
    { label: "Dashboard", href: "/" },
    { label: "Issues", href: "/issues" },
  ];
  return (
    <nav className="flex border-b space-x-6 p-5 mb-5 items-center">
      <Link href="/">
        <AiFillBug />
      </Link>
      {links.map((link) => (
        <Link
          className={classnames({
            "text-zinc-900": link.href === currentPath,
            "text-zinc-500": link.href !== currentPath,
            "hover:text-zinc-800 transition-colors": true,
          })}
          href={link.href}
        >
          {link.label}
        </Link>
      ))}
    </nav>
  );
};

export default NavBar;
