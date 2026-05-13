import * as AccordionPrimitive from "@radix-ui/react-accordion";
import { ChevronDown } from "lucide-react";
import { cn } from "@/lib/utils";

export const Accordion = AccordionPrimitive.Root;

export const AccordionItem = ({ className, ...props }: React.ComponentProps<typeof AccordionPrimitive.Item>) => (
  <AccordionPrimitive.Item className={cn("rounded-3xl border border-slate-200 bg-white px-5", className)} {...props} />
);

export const AccordionTrigger = ({ className, children, ...props }: React.ComponentProps<typeof AccordionPrimitive.Trigger>) => (
  <AccordionPrimitive.Header className="flex">
    <AccordionPrimitive.Trigger
      className={cn(
        "flex flex-1 items-center justify-between gap-4 py-5 text-left text-base font-semibold text-slate-900 transition hover:text-orange-600",
        className,
      )}
      {...props}
    >
      {children}
      <ChevronDown className="h-5 w-5 shrink-0 text-slate-500 transition data-[state=open]:rotate-180" />
    </AccordionPrimitive.Trigger>
  </AccordionPrimitive.Header>
);

export const AccordionContent = ({ className, children, ...props }: React.ComponentProps<typeof AccordionPrimitive.Content>) => (
  <AccordionPrimitive.Content className="overflow-hidden text-sm" {...props}>
    <div className={cn("pb-5 text-base leading-8 text-slate-600", className)}>{children}</div>
  </AccordionPrimitive.Content>
);
