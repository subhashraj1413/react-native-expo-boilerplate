import { Surface } from "../ui/Surface";
import { AppText } from "../ui/Text";

type ErrorViewProps = {
  message: string;
};

export const ErrorView = ({ message }: ErrorViewProps) => {
  return (
    <Surface className="rounded-2xl px-4 py-3" tone="danger">
      <AppText tone="danger" variant="body">
        {message}
      </AppText>
    </Surface>
  );
};
