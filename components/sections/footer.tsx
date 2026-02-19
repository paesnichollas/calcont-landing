import { footerContent } from "@/content/landing";
import { Separator } from "@/components/ui/separator";

export function FooterSection() {
  return (
    <footer className="mx-auto w-full max-w-6xl px-4 pb-8 pt-2 md:px-6">
      <Separator />
      <div className="flex flex-col gap-1 py-5 text-sm text-muted-foreground md:flex-row md:items-center md:justify-between">
        <p>{footerContent.brand}</p>
        <p>{footerContent.legal}</p>
      </div>
    </footer>
  );
}
