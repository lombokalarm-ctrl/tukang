"use client";

import { useState } from "react";
import { Search } from "lucide-react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { getAllLandingPages, locations, services } from "@/lib/data";

export function SearchPanel() {
  const router = useRouter();
  const [serviceQuery, setServiceQuery] = useState("");
  const [areaQuery, setAreaQuery] = useState("");

  function handleSearch() {
    const landing = getAllLandingPages().find((item) => {
      const serviceMatch = item.service.name.toLowerCase().includes(serviceQuery.toLowerCase());
      const areaMatch = item.location.name.toLowerCase().includes(areaQuery.toLowerCase());
      return serviceMatch && areaMatch;
    });

    if (landing) {
      router.push(landing.path);
      return;
    }

    const service = services.find((item) => item.name.toLowerCase().includes(serviceQuery.toLowerCase()));
    const area = locations.find((item) => item.name.toLowerCase().includes(areaQuery.toLowerCase()));

    if (service) {
      router.push(`/layanan/${service.slug}`);
      return;
    }

    if (area) {
      router.push(`/area-layanan/${area.slug}`);
      return;
    }

    router.push("/layanan");
  }

  return (
    <div className="rounded-[2rem] border border-white/60 bg-white p-5 shadow-2xl shadow-slate-900/10">
      <div className="grid gap-4 md:grid-cols-[1fr_1fr_auto]">
        <Input onChange={(event) => setServiceQuery(event.target.value)} placeholder="Cari layanan, misal Tukang AC" value={serviceQuery} />
        <Input onChange={(event) => setAreaQuery(event.target.value)} placeholder="Cari area, misal Mataram" value={areaQuery} />
        <Button className="h-12" onClick={handleSearch} type="button">
          <Search className="h-4 w-4" />
          Cari Sekarang
        </Button>
      </div>
      <div className="mt-4 flex flex-wrap gap-2 text-xs text-slate-500">
        <span className="font-semibold text-slate-700">Pencarian populer:</span>
        <button className="rounded-full bg-slate-100 px-3 py-1" onClick={() => { setServiceQuery("Tukang AC"); setAreaQuery("Mataram"); }} type="button">Tukang AC Mataram</button>
        <button className="rounded-full bg-slate-100 px-3 py-1" onClick={() => { setServiceQuery("Renovasi Rumah"); setAreaQuery("Praya"); }} type="button">Renovasi Rumah Praya</button>
        <button className="rounded-full bg-slate-100 px-3 py-1" onClick={() => { setServiceQuery("Tukang Listrik"); setAreaQuery("Lombok Barat"); }} type="button">Tukang Listrik Lombok Barat</button>
      </div>
    </div>
  );
}
