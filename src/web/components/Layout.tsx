import { Flex } from "@radix-ui/themes";
import type React from "react";

type LayoutProps = {
  children?: React.ReactNode;
};

export default function Layout({ children }: LayoutProps) {
  return (
    <Flex width="100%" direction="column" grow="1" className="transition">
      {children}
    </Flex>
  );
}
