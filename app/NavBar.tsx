"use client";
import classnames from "classnames";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { AiFillBug } from "react-icons/ai";
import { useSession } from "next-auth/react";
import {
  Avatar,
  Box,
  Container,
  Flex,
  Text,
  DropdownMenu,
} from "@radix-ui/themes";

const NavBar = () => {
  const currentPath = usePathname();
  const { status, data: session } = useSession();

  const links = [
    { label: "Dashboard", href: "/" },
    { label: "Issues", href: "/issues/list" },
  ];
  return (
    <nav className="border-b space-x-6 py-3 px-5 mb-5 items-center">
      <Container>
        <Flex justify={{ initial: "center", xs: "between" }} gap="3">
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
                  href="/api/auth/signin"
                  className="text-zinc-500 hover:text-amber-600 transition-colors"
                >
                  Login
                </Link>
                <Link
                  href="/auth/signup"
                  className="ring-none ring-inset bg-amber-50 rounded-lg p-1 text-amber-600 hover:ring-1 ring-amber-600 transition-all truncate"
                >
                  Sign up
                </Link>
              </Flex>
            )}
            {status === "authenticated" && (
              <DropdownMenu.Root>
                <DropdownMenu.Trigger>
                  <Text size='8' className="cursor-pointer">
                    <Avatar
                      src={session.user!.image!}
                      fallback={session.user!.email!.slice(0, 1)}
                      radius="full"
                    />
                  </Text>
                </DropdownMenu.Trigger>

                <DropdownMenu.Content>
                  <DropdownMenu.Label>{session.user!.email}</DropdownMenu.Label>
                  <DropdownMenu.Item>
                    <Link href="/api/auth/signout">Log out</Link>
                  </DropdownMenu.Item>
                </DropdownMenu.Content>
              </DropdownMenu.Root>
            )}
          </Box>
        </Flex>
      </Container>
    </nav>
  );
};

export default NavBar;
