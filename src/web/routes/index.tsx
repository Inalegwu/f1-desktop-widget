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
      <Flex className="bg-zinc-100 dark:bg-dark-9 px-2 py-2 dark:text-white rounded-lg">
        content
      </Flex>{" "}
    </Flex>
  );
}
