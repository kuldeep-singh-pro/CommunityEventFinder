import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { motion } from "framer-motion";

import EventCard from "@/components/event/EventCard";
import EventFilters from "@/components/event/EventFilters";
import PagePagination from "@/components/ui/page-pagination";

import { getEvents } from "@/services/event.service";
import { Event } from "@/types/event.types";

export default function EventList() {
  const [search, setSearch] = useState("");
  const [city, setCity] = useState("");
  const [type, setType] = useState("");
  const [sort, setSort] = useState("latest");
  const [page, setPage] = useState(1);

  const { data, isLoading } = useQuery({
    queryKey: ["events", search, city, type, sort, page],
    queryFn: () =>
      getEvents({
        search,
        city,
        type,
        sort,
        page,
        limit: 6,
      }),
  });

  if (isLoading) {
    return <div className="p-6 text-center">Loading events...</div>;
  }

  const cities = [
    ...new Set(
      data?.events?.map((e: Event) => e.location?.city).filter(Boolean),
    ),
  ] as string[];

  return (
    <div className="w-full max-w-7xl mx-auto px-4 lg:px-6">
      <h1 className="text-3xl font-bold">Browse Events</h1>

      <p className="text-muted-foreground mt-2">
        Discover community events around you
      </p>

      <EventFilters
        search={search}
        city={city}
        type={type}
        sort={sort}
        cities={cities}
        onSearchChange={(v) => {
          setPage(1);
          setSearch(v);
        }}
        onCityChange={(v) => {
          setPage(1);
          setCity(v);
        }}
        onTypeChange={(v) => {
          setPage(1);
          setType(v);
        }}
        onSortChange={(v) => {
          setPage(1);
          setSort(v);
        }}
      />

      <div className="mt-8 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {data?.events?.length === 0 && (
          <div className="col-span-full text-center text-muted-foreground">
            No events found
          </div>
        )}

        {data?.events?.map((event: Event, idx: number) => (
          <motion.div
            key={event._id}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: idx * 0.08 }}
          >
            <EventCard event={event} />
          </motion.div>
        ))}
      </div>

      <div className="mt-10 flex justify-center">
        <PagePagination
          currentPage={page}
          totalPages={data?.totalPages ?? 1}
          onPageChange={setPage}
        />
      </div>
    </div>
  );
}
