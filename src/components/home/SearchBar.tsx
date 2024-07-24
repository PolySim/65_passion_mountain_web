"use client";

import { HikingSearch } from "@/types/Hiking.type";
import { Search } from "lucide-react";
import { useCallback, useEffect, useState } from "react";
import { findHikes } from "@/utils/hikes/hikes";
import { useRouter } from "next/navigation";
import { cn } from "@/lib/utils";

const SearchBar = ({ hikes }: { hikes: HikingSearch[] }) => {
  const router = useRouter();
  const [hikesSearch, setHikesSearch] = useState<HikingSearch[]>([]);
  const [indexFocus, setIndexFocus] = useState<number>(-1);

  const onChange = (value: string) => {
    setHikesSearch(findHikes(hikes, value));
  };

  const handlerEnter = useCallback(() => {
    const hiking = hikesSearch.find((_hiking, index) => index === indexFocus);
    if (indexFocus === -1 || !hiking) return;
    router.push(`/${hiking.categoriesId}/${hiking.state_id}/${hiking.id}`);
  }, [hikesSearch, indexFocus, router]);

  const handlerKeyDown = useCallback(
    (e: KeyboardEvent) => {
      if (hikesSearch.length === 0) {
        setIndexFocus(-1);
        return;
      }
      if (e.key === "ArrowDown") {
        setIndexFocus((curr) =>
          curr < hikesSearch.length - 1 ? curr + 1 : curr,
        );
      } else if (e.key === "ArrowUp") {
        setIndexFocus((curr) => (curr > 0 ? curr - 1 : curr));
      } else if (e.key === "Enter") {
        handlerEnter();
      }
    },
    [hikesSearch, handlerEnter],
  );

  useEffect(() => {
    window.addEventListener("keydown", handlerKeyDown);

    return () => window.removeEventListener("keydown", handlerKeyDown);
  }, [indexFocus, hikes, handlerKeyDown]);

  return (
    <div className="flex flex-col relative">
      <div className="flex items-center gap-4 rounded-full border border-gray-300 p-4 w-[40rem] max-w-[95vw] bg-white z-20">
        <Search />
        <input
          type="text"
          onChange={(e) => onChange(e.target.value)}
          placeholder="Recherche des randos, escalades, refuges ..."
          className="text-sm text-gray-900 placeholder:text-gray-400 focus:outline-none w-full"
        />
      </div>
      {hikesSearch.length > 0 && (
        <div className="absolute top-[1.8125rem] left-0 w-full max-h-72 overflow-y-auto z-10 pt-[1.8125rem] bg-white rounded-b-3xl">
          {hikesSearch.map((hiking, index) => (
            <div
              key={hiking.id}
              className={cn(
                "w-full py-3 px-[3.625rem] hover:bg-yellow-light cursor-pointer",
                {
                  "bg-yellow-light": indexFocus === index,
                },
              )}
            >
              <p className="text-base">{hiking.title}</p>
              <p className="text-gray-500 text-sm">
                <span>{hiking.state}</span> - <span>{hiking.difficulty}</span>
              </p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default SearchBar;
