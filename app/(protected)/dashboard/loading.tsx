import { Icon } from "@/components/global/icon";

export default function Loading() {
  return (
    <div className="flex flex-1 items-center justify-center h-screen">
      <div className="text-center text-foreground/90">
        <Icon name="LoaderCircle" className="animate-spin w-14 h-14" />
      </div>
    </div>
  );
}
