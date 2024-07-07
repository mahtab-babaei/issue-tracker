import Link from "next/link";
import { AiFillBug } from "react-icons/ai";

const NavBar = () => {
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
          className="text-zinc-500 hover:text-zinc-800 transition-colors"
          href={link.href}
        >
          {link.label}
        </Link>
      ))}
    </nav>
  );
};

export default NavBar;
