"use client";

import * as DialogPrimitive from "@radix-ui/react-dialog";
import { X } from "lucide-react";
import { cn } from "@/lib/utils";

export const Sheet = DialogPrimitive.Root;
export const SheetTrigger = DialogPrimitive.Trigger;
export const SheetClose = DialogPrimitive.Close;
export const SheetTitle = DialogPrimitive.Title;
export const SheetDescription = DialogPrimitive.Description;

export function SheetContent({ className, children, ...props }: React.ComponentProps<typeof DialogPrimitive.Content>) {
  return (
    <DialogPrimitive.Portal>
      <DialogPrimitive.Overlay className="fixed inset-0 z-40 bg-slate-950/50 backdrop-blur-sm" />
      <DialogPrimitive.Content
        className={cn(
          "fixed right-0 top-0 z-50 h-full w-full max-w-xs border-l border-slate-200 bg-white p-6 shadow-2xl",
          className,
        )}
        {...props}
      >
        <DialogPrimitive.Close className="absolute right-4 top-4 rounded-full p-2 text-slate-500 transition hover:bg-slate-100 hover:text-slate-900">
          <X className="h-5 w-5" />
        </DialogPrimitive.Close>
        {children}
      </DialogPrimitive.Content>
    </DialogPrimitive.Portal>
  );
}
