import { MessageCircle } from "lucide-react";
import { createWhatsAppLink } from "@/lib/site";

export function StickyMobileCta() {
  return (
    <div className="fixed inset-x-0 bottom-0 z-30 border-t border-slate-200 bg-white/95 p-3 backdrop-blur sm:hidden">
      <a
        className="inline-flex w-full items-center justify-center gap-2 rounded-full bg-orange-500 px-5 py-3 text-sm font-semibold text-white shadow-lg shadow-orange-500/25"
        href={createWhatsAppLink()}
        rel="noreferrer"
        target="_blank"
      >
        <MessageCircle className="h-4 w-4" />
        Chat WhatsApp Sekarang
      </a>
    </div>
  );
}
