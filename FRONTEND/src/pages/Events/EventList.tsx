import { useState } from "react"
import { useQuery } from "@tanstack/react-query"
import EventCard from "@/components/event/EventCard"
import Pagination from "@/components/event/Pagination"
import { getEvents } from "@/services/event.service"
import { Event } from "@/types/event.types"
import { Input } from "@/components/ui/input"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"

export default function EventList() {
  const [search, setSearch] = useState("")
  const [city, setCity] = useState("")
  const [type, setType] = useState("")
  const [sort, setSort] = useState("latest")
  const [page, setPage] = useState(1)

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
  })

  if (isLoading) return <div className="p-6 text-center">Loading...</div>

  const cities = [
    ...new Set(
      data?.events?.map((e: Event) => e.location?.city).filter(Boolean)
    ),
  ]

  return (
    <div className="w-full max-w-7xl mx-auto px-4 lg:px-6">
      <h1 className="text-3xl font-bold">Browse Events</h1>

      <p className="text-muted-foreground mt-2">
        Discover community events around you
      </p>

      <div className="mt-6 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <Input
          placeholder="Search events..."
          value={search}
          onChange={(e) => {
            setPage(1)
            setSearch(e.target.value)
          }}
        />

        <Select
          value={city}
          onValueChange={(v) => {
            setPage(1)
            setCity(v === "all" ? "" : v)
          }}
        >
          <SelectTrigger>
            <SelectValue placeholder="City" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Cities</SelectItem>
            {cities.map((c: string) => (
              <SelectItem key={c} value={c}>
                {c}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>

        <Select
          value={type}
          onValueChange={(v) => {
            setPage(1)
            setType(v === "all" ? "" : v)
          }}
        >
          <SelectTrigger>
            <SelectValue placeholder="Type" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Events</SelectItem>
            <SelectItem value="today">Today</SelectItem>
            <SelectItem value="upcoming">Upcoming</SelectItem>
          </SelectContent>
        </Select>

        <Select
          value={sort}
          onValueChange={(v) => {
            setPage(1)
            setSort(v)
          }}
        >
          <SelectTrigger>
            <SelectValue placeholder="Sort" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="latest">Latest</SelectItem>
            <SelectItem value="date">Date</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <div className="mt-8 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {data?.events?.map((event: Event) => (
          <EventCard key={event._id} event={event} />
        ))}
      </div>

      <Pagination
        currentPage={page}
        totalPages={data?.totalPages ?? 1}
        onPageChange={setPage}
      />
    </div>
  )
}