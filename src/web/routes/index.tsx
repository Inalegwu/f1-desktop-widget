import { Flex } from "@radix-ui/themes";
import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/")({
  component: Index,
});

function Index() {
  return (
    <Flex
      grow="1"
      direction="column"
      className="w-full h-screen bg-transparent"
      gap="4"
      p="2"
    >
      content
    </Flex>
  );
}
