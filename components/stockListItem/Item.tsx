import { useAppContext } from "@/context/context";
import {
  UnstyledButton,
  Checkbox,
  Text,
  createStyles,
  rem,
  Button,
} from "@mantine/core";
import { useUncontrolled } from "@mantine/hooks";

const useStyles = createStyles((theme) => ({
  button: {
    display: "flex",
    width: "100%",
    border: `${rem(1)} solid ${
      theme.colorScheme === "dark" ? theme.colors.dark[8] : theme.colors.gray[3]
    }`,
    borderRadius: theme.radius.sm,
    padding: theme.spacing.lg,
    backgroundColor:
      theme.colorScheme === "dark" ? theme.colors.dark[8] : theme.white,

    "&:hover": {
      backgroundColor:
        theme.colorScheme === "dark"
          ? theme.colors.dark[9]
          : theme.colors.gray[0],
    },
  },
}));
interface Stock {
  country: string;
  currency: string;
  exchange: string;
  exchange_timezone: string;
  instrument_name: string;
  instrument_type: string;
  mic_code: string;
  symbol: string;
}
interface CheckboxCardProps {
  checked?: boolean;
  defaultChecked?: boolean;
  onChange?(checked: boolean): void;
  title: string;
  description: string;
  stock: Stock;
  country: string;
}

export function Item({
  checked,
  defaultChecked,
  onChange,
  title,
  description,
  className,
  country,
  stock,
  ...others
}: CheckboxCardProps &
  Omit<React.ComponentPropsWithoutRef<"button">, keyof CheckboxCardProps>) {
  const { classes, cx } = useStyles();

  const [value, handleChange] = useUncontrolled({
    value: checked,
    defaultValue: defaultChecked,
    finalValue: false,
    onChange,
  });

  const { addStock } = useAppContext();

  return (
    <UnstyledButton
      {...others}
      onClick={() => handleChange(!value)}
      className={cx(classes.button, className)}
    >
      <div className="grid grid-flow-col justify-between justify-items-stretch w-full">
        <div>
          <Text fw={500} mb={7} sx={{ lineHeight: 1 }}>
            {title}
          </Text>
          <Text fz="sm" c="dimmed">
            {description} | {country}
          </Text>
        </div>
        <div>
          {" "}
          <Button
            variant="filled"
            color="blue"
            size="md"
            radius="md"
            onClick={() => {
              console.debug(stock);
              addStock(stock);
            }}
          >
            Add
          </Button>
        </div>
      </div>
    </UnstyledButton>
  );
}
