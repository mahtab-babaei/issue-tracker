"use client";
import { Avatar, Container, DropdownMenu, Flex, Text } from "@radix-ui/themes";
import classnames from "classnames";
import { useSession } from "next-auth/react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { AiFillBug } from "react-icons/ai";

const NavBar = () => {
  return (
    <nav className="border-b space-x-6 py-3 px-5 mb-5 items-center">
      <Container>
        <Flex justify='between' gap={{initial: '2', xs: '3'}}>
          <NavLinks />
          <AuthStatus />
        </Flex>
      </Container>
    </nav>
  );
};

const NavLinks = () => {
  const currentPath = usePathname();

  const links = [
    { label: "Dashboard", href: "/" },
    { label: "Issues", href: "/issues/list" },
  ];

  return (
    <Flex gap={{initial: '2', xs: '3'}} align="center">
      <Link href="/">
        <AiFillBug className="text-amber-600" />
      </Link>
      {links.map((link) => (
        <Link
          key={link.href}
          className={classnames({
            "nav-link": true,
            "!text-zinc-900": link.href === currentPath,
          })}
          href={link.href}
        >
          {link.label}
        </Link>
      ))}
    </Flex>
  );
};

const AuthStatus = () => {
  const { status, data: session } = useSession();
  if (status === "loading") return null;

  if (status === "unauthenticated")
    return (
      <Flex gap={{initial: '2', xs: '3'}} align="center">
        <Link
          href="/api/auth/signin"
          className="nav-link"
        >
          Login
        </Link>
        <Link
          href="/auth/signup"
          className="ring-none ring-inset bg-amber-50 rounded-lg p-1 text-amber-600 truncate hover:ring-1 ring-amber-600 transition-all"
        >
          Sign up
        </Link>
      </Flex>
    );
  return (
    <DropdownMenu.Root>
      <DropdownMenu.Trigger>
        <Text className="cursor-pointer">
          <Avatar
            src={session!.user!.image!}
            fallback={session!.user!.email!.slice(0, 1)}
            radius="full"
            size='2'
          />
        </Text>
      </DropdownMenu.Trigger>

      <DropdownMenu.Content>
        <DropdownMenu.Label>{session!.user!.email}</DropdownMenu.Label>
        <DropdownMenu.Item>
          <Link href="/api/auth/signout">Log out</Link>
        </DropdownMenu.Item>
      </DropdownMenu.Content>
    </DropdownMenu.Root>
  );
};

export default NavBar;
