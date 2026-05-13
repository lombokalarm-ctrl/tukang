import { MessageCircleMore } from "lucide-react";
import { createWhatsAppLink } from "@/lib/site";

export function WhatsAppButton() {
  return (
    <a
      aria-label="Chat WhatsApp"
      className="fixed bottom-24 right-4 z-40 inline-flex h-14 w-14 items-center justify-center rounded-full bg-green-500 text-white shadow-2xl shadow-green-500/30 transition hover:scale-105 hover:bg-green-600 sm:bottom-6 sm:right-6"
      href={createWhatsAppLink()}
      rel="noreferrer"
      target="_blank"
    >
      <MessageCircleMore className="h-7 w-7" />
    </a>
  );
}
