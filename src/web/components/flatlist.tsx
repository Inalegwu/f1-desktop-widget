import { ScrollArea } from "@radix-ui/themes";
import Renderer from "electron/renderer";

type Props<T> = {
  data: Array<T>;
  renderItem: (data: T, index: number) => React.ReactNode;
  listHeaderComponent?: () => React.ReactNode;
  listFooterComponent?: () => React.ReactNode;
  scrollbars?: "vertical" | "horizontal" | "both";
  className?: string;
};

export default function Flatlist<T extends Record<string, unknown>>({
  data,
  renderItem,
  scrollbars,
  className,
  listHeaderComponent: ListHeaderComponent,
  listFooterComponent: ListFooterComponent,
}: Props<T>) {
  return (
    <>
      {ListHeaderComponent && <ListHeaderComponent />}
      <ScrollArea
        scrollHideDelay={0.2}
        className={`overflow-y-scroll ${className}`}
        scrollbars={scrollbars || "vertical"}
      >
        {data.map((data, index) => renderItem(data, index))}
      </ScrollArea>

      {ListFooterComponent && <ListFooterComponent />}
    </>
  );
}
