"use client";
import classnames from "classnames";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { AiFillBug } from "react-icons/ai";
import { useSession } from "next-auth/react";
import { Badge, Box, Container, Flex } from "@radix-ui/themes";

const NavBar = () => {
  const currentPath = usePathname();
  const { status, data: session } = useSession();

  const links = [
    { label: "Dashboard", href: "/" },
    { label: "Issues", href: "/issues/list" },
  ];
  return (
    <nav className="border-b space-x-6 p-5 mb-5 items-center">
      <Container>
        <Flex justify="between">
          <Flex gap="3" align="center">
            <Link href="/">
              <AiFillBug className="text-amber-600" />
            </Link>
            {links.map((link) => (
              <Link
                key={link.href}
                className={classnames({
                  "text-zinc-900": link.href === currentPath,
                  "text-zinc-500": link.href !== currentPath,
                  "hover:text-amber-600 transition-colors": true,
                })}
                href={link.href}
              >
                {link.label}
              </Link>
            ))}
          </Flex>
          <Box>
            {status === "unauthenticated" && (
              <Flex gap="3" align="center">
                <Link
                  href="/auth/signup"
                  className="ring-none ring-inset bg-amber-50 rounded-lg p-1 text-amber-600 hover:ring-1 ring-amber-600 transition-all"
                >
                  Sign up
                </Link>
                <Link
                  href="/api/auth/signin"
                  className="text-zinc-500 hover:text-amber-600 transition-colors"
                >
                  Login
                </Link>
              </Flex>
            )}
            {status === "authenticated" && (
              <Link
                href="/api/auth/signout"
                className="text-zinc-500 hover:text-amber-600 transition-colors"
              >
                Log out
              </Link>
            )}
          </Box>
        </Flex>
      </Container>
    </nav>
  );
};

export default NavBar;
