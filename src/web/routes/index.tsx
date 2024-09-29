import { DropdownMenu, Flex, Text } from "@radix-ui/themes";
import { createFileRoute } from "@tanstack/react-router";
import { memo } from "react";
import { Flatlist } from "../components";
import {
  Calendar,
  CaretDown,
  DotsThreeVertical,
  Moon,
  Sun,
} from "@phosphor-icons/react";
import { globalState$ } from "../state";
import { Show, useObservable, useObserveEffect } from "@legendapp/state/react";
import { computed } from "@legendapp/state";
import t from "@shared/config";
import { motion } from "framer-motion";

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
        {/*TODO make this a dnd list to reorder elements*/}
        {canShowConstructors && <ConstructorStandings />}
        {canShowDrivers && <DriverStandings />}
        {canShowCalender && <Calender />}
      </Flex>
    </Flex>
  );
}

const ConstructorStandings = memo(() => {
  const expanded = useObservable(true);
  const isExpanded = expanded.get();

  return (
    <motion.div
      className="overflow-hidden"
      animate={{ height: isExpanded ? "190px" : "70px" }}
    >
      <Show if={!isExpanded}>
        <Flex align="center" justify="between">
          <Text size="1" color="gray">
            Constructor Standings
          </Text>
          <button
            type="button"
            onClick={() => expanded.set(!expanded.get())}
            className="flex items-center justify-center text-zinc-500 rounded-sm"
          >
            <motion.div
              className="px-1 py-1"
              animate={{ rotateZ: isExpanded ? "360deg" : "180deg" }}
            >
              <CaretDown size={10} />
            </motion.div>
          </button>
        </Flex>
      </Show>
      {isExpanded ? (
        <Flatlist
          listHeaderComponent={() => (
            <Flex align="center" justify="between">
              <Text size="1" color="gray">
                Constructor Standings
              </Text>
              <button
                type="button"
                onClick={() => expanded.set(!expanded.get())}
                className="flex items-center justify-center text-zinc-500 rounded-sm"
              >
                <motion.div
                  className="px-1 py-1"
                  animate={{ rotateZ: isExpanded ? "360deg" : "180deg" }}
                >
                  <CaretDown size={10} />
                </motion.div>
              </button>
            </Flex>
          )}
          data={[
            { team: "Mclaren Mercedes", position: 1 },
            { team: "Red Bull", position: 2 },
            { team: "Scuderia Ferrari", position: 3 },
            { team: "Mercedes AMG Petronas", position: 4 },
            { team: "Williams", position: 5 },
          ]}
          renderItem={(data, index) => (
            <Flex
              key={`${data.team}---${data.position}`}
              align="center"
              gap="2"
              justify="between"
              className={`py-1 px-2 ${index % 2 === 0 ? "bg-zinc-200/30 dark:bg-zinc-200/10" : ""}`}
            >
              <Text size="1" color="gray">
                {data.position}.
              </Text>
              <Flex align="center" justify="start" grow="1">
                <Text size="1">{data.team}</Text>
              </Flex>
              {/*TODO make this the team logo*/}
              <div className="px-1 py-1 rounded-full bg-indigo-500 dark:bg-indigo-500/60" />
            </Flex>
          )}
        />
      ) : (
        <Flex className="px-2 py-3" align="center" justify="center">
          <Text size="1">Condensed Constructors Standings</Text>
        </Flex>
      )}
    </motion.div>
  );
});

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
        <Text size="1">{data}</Text>
      </Flex>
    )}
  />
));

const Calender = memo(() => {
  const expanded = useObservable(true);
  const expandedVal = expanded.get();

  const showingOtherElements = computed(
    () =>
      globalState$.showCalender.get() && globalState$.showDriverStanding.get(),
  ).get();

  return (
    <Flex align="center" className="px-1 py-1" gap="2">
      <motion.div
        className="w-full h-full flex items-center justify-center space-x-2"
        animate={{ height: expandedVal ? "120px" : "30px" }}
      >
        <Flex
          align="start"
          className="w-4/6 h-full rounded-md bg-zinc-200/20 dark:bg-zinc-200/10 border-1 border-zinc-300/20 dark:border-zinc-300/10 border-solid"
        >
          <Flex position="absolute" align="center" justify="end">
            <button
              onClick={() => expanded.set(!expanded.get())}
              className="hover:bg-zinc-200 dark:hover:bg-zinc-200/10 rounded-br-md rounded-tl-md px-1 py-1 flex items-center justify-center"
              type="button"
            >
              <motion.div
                animate={{ rotateZ: expandedVal ? "360deg" : "180deg" }}
              >
                <CaretDown size={10} className="text-indigo-400" />
              </motion.div>
            </button>
          </Flex>
        </Flex>
        <motion.div
          className="w-2/6 text-end"
          animate={{
            height: expandedVal ? "120px" : "30px",
            overflow: expandedVal ? "" : "hidden",
          }}
        >
          <Flex gap="2" direction="column" justify="center">
            <Flex align="center" justify="start" gap="1">
              <Calendar size={12} className="text-neutral-400" />
              <Text size="1" color="gray">
                FP1
              </Text>
            </Flex>
            <Flex align="center" justify="start" gap="1">
              <Calendar size={12} className="text-neutral-400" />
              <Text size="1" color="gray">
                FP2
              </Text>
            </Flex>
            <Flex align="center" justify="start" gap="1">
              <Calendar size={12} className="text-neutral-400" />
              <Text size="1" color="gray">
                FP3
              </Text>
            </Flex>
            <Flex align="center" justify="start" gap="1">
              <Calendar size={12} className="text-neutral-400" />
              <Text size="1" color="gray">
                Qualifying
              </Text>
            </Flex>
            <Flex align="center" justify="start" gap="1">
              <Calendar size={12} className="text-neutral-400" />
              <Text size="1" color="gray">
                Race{" "}
              </Text>
            </Flex>
          </Flex>
        </motion.div>
      </motion.div>
    </Flex>
  );
});
