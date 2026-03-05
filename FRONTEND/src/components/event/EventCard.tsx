import { CalendarDays, MapPin, Users, ArrowRight } from "lucide-react"
import { Link } from "react-router-dom"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Event } from "@/types/event.types"

interface Props {
  event: Event
}

export default function EventCard({ event }: Props) {
  const participants = event.participants?.length ?? 0
  const max = event.maxParticipants ?? 50

  const percent = Math.min((participants / max) * 100, 100)
  const spotsLeft = max - participants

  const formattedDate = new Date(event.date).toLocaleDateString(undefined, {
    weekday: "short",
    month: "short",
    day: "numeric",
  })

  return (
    <Card className="flex flex-col transition hover:shadow-md">
      <CardContent className="p-5 flex flex-col h-full">
        <div className="flex justify-between">
          <Badge
            variant={event.status === "closed" ? "error" : "success"}
          >
            {event.status}
          </Badge>
        </div>

        <h3 className="mt-3 text-lg font-semibold line-clamp-2">
          {event.title}
        </h3>

        <p className="text-sm text-muted-foreground mt-1 line-clamp-2">
          {event.description}
        </p>

        <div className="mt-4 flex flex-col gap-2 text-sm text-muted-foreground">
          <div className="flex items-center gap-2">
            <CalendarDays className="h-4 w-4" />
            {formattedDate}
          </div>

          <div className="flex items-center gap-2">
            <MapPin className="h-4 w-4" />
            {event.location?.city ?? "Location TBA"}
          </div>
        </div>

        <div className="mt-4 flex items-center justify-between text-sm text-muted-foreground">
          <div className="flex items-center gap-1">
            <Users className="h-4 w-4" />
            {participants}/{max}
          </div>

          {event.status === "open" && (
            <span className="text-primary font-medium">
              {spotsLeft} left
            </span>
          )}
        </div>

        <div className="mt-2 h-2 w-full rounded-full bg-muted overflow-hidden">
          <div
            className="h-full bg-primary"
            style={{ width: `${percent}%` }}
          />
        </div>

        <Link
          to={`/events/${event._id}`}
          className="mt-4 flex items-center justify-end text-sm text-primary font-medium"
        >
          View Details
          <ArrowRight className="ml-1 h-4 w-4" />
        </Link>
      </CardContent>
    </Card>
  )
}