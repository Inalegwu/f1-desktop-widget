import { DropdownMenu, Flex, Text } from "@radix-ui/themes";
import { createFileRoute } from "@tanstack/react-router";
import { memo } from "react";
import { Flatlist } from "../components";
import { CaretDown, DotsThreeVertical, Moon, Sun } from "@phosphor-icons/react";
import { globalState$ } from "../state";
import { useObserveEffect } from "@legendapp/state/react";
import { computed } from "@legendapp/state";

export const Route = createFileRoute("/")({
  component: Index,
});

function Index() {
  useObserveEffect(() => {
    if (globalState$.colorMode.get() === "dark") {
      document.body.classList.add("dark");
    } else {
      document.body.classList.remove("dark");
    }
  });

  const isDark = computed(() => globalState$.colorMode.get() === "dark").get();
  const canShowConstructors = globalState$.showConstructorStandings.get();
  const canShowDrivers = globalState$.showDriverStanding.get();
  const canShowCalender = globalState$.showCalender.get();

  return (
    <Flex
      grow="1"
      direction="column"
      className="w-full h-screen bg-transparent"
      gap="4"
      p="2"
    >
      <Flex
        direction="column"
        gap="1"
        grow="1"
        className="bg-zinc-100 overflow-hidden dark:bg-dark-9 px-2 py-2 dark:text-white rounded-lg"
      >
        <Flex align="center" justify="between">
          {/*<Text color="gray" weight="bold" size="1">
             F1 Desktop Widgets
           </Text>*/}
          <Flex grow="1" id="drag-region" className="p-2" />
          <DropdownMenu.Root>
            <DropdownMenu.Trigger className="hover:bg-zinc-200 dark:hover:bg-zinc-200/10 cursor-pointer dark:text-white rounded-sm px-1 py-1">
              <DotsThreeVertical size={20} />
            </DropdownMenu.Trigger>
            <DropdownMenu.Content size="1" variant="soft">
              <DropdownMenu.CheckboxItem
                checked={globalState$.showConstructorStandings.get()}
                className="cursor-pointer"
                onClick={() =>
                  globalState$.showConstructorStandings.set(
                    !globalState$.showConstructorStandings.get(),
                  )
                }
              >
                <Flex align="center" justify="between">
                  <Text>Show Constructors Standings</Text>
                </Flex>
              </DropdownMenu.CheckboxItem>
              <DropdownMenu.CheckboxItem
                onClick={() =>
                  globalState$.showDriverStanding.set(
                    !globalState$.showDriverStanding.get(),
                  )
                }
                checked={globalState$.showDriverStanding.get()}
                className="cursor-pointer"
              >
                <Flex align="center" justify="between">
                  <Text>Show Driver Standings</Text>
                </Flex>
              </DropdownMenu.CheckboxItem>
              <DropdownMenu.CheckboxItem
                onClick={() =>
                  globalState$.showCalender.set(
                    !globalState$.showCalender.get(),
                  )
                }
                checked={globalState$.showCalender.get()}
                className="cursor-pointer"
              >
                <Flex align="center" justify="between">
                  <Text>Show Calendar</Text>
                </Flex>
              </DropdownMenu.CheckboxItem>
              <DropdownMenu.CheckboxItem
                onClick={() =>
                  globalState$.colorMode.set(isDark ? "light" : "dark")
                }
                checked={globalState$.colorMode.get() === "dark"}
              >
                <Flex align="center" justify="start" gap="2">
                  Dark Mode
                </Flex>
              </DropdownMenu.CheckboxItem>
            </DropdownMenu.Content>
          </DropdownMenu.Root>
        </Flex>
        {canShowConstructors && <ConstructorStandings />}
        {canShowDrivers && <DriverStandings />}
        {canShowCalender && <Calender />}
      </Flex>
    </Flex>
  );
}

const ConstructorStandings = memo(() => (
  <Flatlist
    listHeaderComponent={() => (
      <Flex align="center" justify="between">
        <Text size="1" color="gray">
          Constructor Standings
        </Text>
        <button
          type="button"
          className="flex items-center justify-center text-zinc-500 dark:hover:bg-zinc-200/10 hover:bg-zinc-200 px-1 py-1 rounded-sm"
        >
          <CaretDown size={10} />
        </button>
      </Flex>
    )}
    data={new Array(10).fill(Math.random() * 10)}
    renderItem={(data, index) => (
      <Flex className="py-1" key={index}>
        <Text>{data}</Text>
      </Flex>
    )}
  />
));

const DriverStandings = memo(() => (
  <Flatlist
    listHeaderComponent={() => (
      <Flex align="center" justify="between">
        <Text size="1" color="gray">
          Driver Standings
        </Text>
        <button
          type="button"
          className="flex items-center justify-center text-zinc-500 dark:hover:bg-zinc-200/10 hover:bg-zinc-200 px-1 py-1 rounded-sm"
        >
          <CaretDown size={10} />
        </button>
      </Flex>
    )}
    data={new Array(10).fill(Math.random() * 10)}
    renderItem={(data, index) => (
      <Flex className="py-1" key={index}>
        <Text>{data}</Text>
      </Flex>
    )}
  />
));

const Calender = memo(() => (
  <Flex align="center">
    <Flex className="w-4/6">Race Day</Flex>
    <Flex className="w-2/6" direction="column" justify="center" align="end">
      Race Week Schedule
    </Flex>
  </Flex>
));
