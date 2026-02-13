"use client";

import { experiences } from "@/data";

export function ExperienceSection() {
  return (
    <div className="py-10 w-full min-h-[200px] h-[200px] bg-blue-500 grid grid-cols-3">
        {experiences.map((e) => (
          <div key={e.id} className="flex flex-col h-full">
            <div className="border-b h-1/2 rounded-b-full">hi</div>
            <div className="h-1/2">hi</div>
          </div>
        ))}
    </div>
  );
}
