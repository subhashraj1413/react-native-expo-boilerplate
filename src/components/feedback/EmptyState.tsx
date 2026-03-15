import { Surface } from "@/components/ui/Surface";
import { AppText } from "@/components/ui/Text";

type EmptyStateProps = {
  message: string;
  title: string;
};

export const EmptyState = ({ message, title }: EmptyStateProps) => {
  return (
    <Surface className="rounded-[28px] p-6">
      <AppText variant="subtitle">{title}</AppText>
      <AppText className="mt-3" tone="muted" variant="body">
        {message}
      </AppText>
    </Surface>
  );
};
