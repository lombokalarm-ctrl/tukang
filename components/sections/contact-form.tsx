"use client";

import { useState } from "react";
import { MessageCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { createWhatsAppLink } from "@/lib/site";

export function ContactForm() {
  const [name, setName] = useState("");
  const [location, setLocation] = useState("");
  const [service, setService] = useState("");
  const [message, setMessage] = useState("");

  function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const composed = `Halo TukangDiLombok.com, saya ${name || "-"}. Lokasi saya di ${location || "-"}. Saya membutuhkan layanan ${service || "-"}. Detail kebutuhan: ${message || "-"}`;
    window.open(createWhatsAppLink(composed), "_blank", "noopener,noreferrer");
  }

  return (
    <form className="space-y-4 rounded-[2rem] border border-slate-200 bg-white p-6 shadow-sm" onSubmit={handleSubmit}>
      <div className="grid gap-4 sm:grid-cols-2">
        <Input onChange={(event) => setName(event.target.value)} placeholder="Nama Anda" required value={name} />
        <Input onChange={(event) => setLocation(event.target.value)} placeholder="Lokasi / area" required value={location} />
      </div>
      <Input onChange={(event) => setService(event.target.value)} placeholder="Layanan yang dibutuhkan" required value={service} />
      <Textarea onChange={(event) => setMessage(event.target.value)} placeholder="Ceritakan kebutuhan Anda, misal renovasi kamar mandi, pasang AC, tambah titik listrik, dll." value={message} />
      <Button className="w-full" type="submit">
        <MessageCircle className="h-4 w-4" />
        Kirim ke WhatsApp
      </Button>
    </form>
  );
}
