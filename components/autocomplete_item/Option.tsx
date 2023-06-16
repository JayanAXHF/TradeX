import { forwardRef } from "react";
import {
  Group,
  Avatar,
  Text,
  MantineColor,
  SelectItemProps,
  Autocomplete,
} from "@mantine/core";

interface ItemProps extends SelectItemProps {
  color: MantineColor;
  description: string;
  country: string;
}

export const AutoCompleteItem = forwardRef<HTMLDivElement, ItemProps>(
  ({ description, value, country, ...others }: ItemProps, ref) => (
    <div ref={ref} {...others}>
      <Group noWrap>
        <div>
          <Text>{value}</Text>
          <Text size="xs" color="dimmed">
            {description} | {country}
          </Text>
        </div>
      </Group>
    </div>
  )
);
