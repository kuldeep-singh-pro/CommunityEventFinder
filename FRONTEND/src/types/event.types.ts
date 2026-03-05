export interface EventLocation {
  city?: string
  state?: string
  address?: string
}

export interface Event {
  _id: string
  title: string
  description: string
  date: string
  status: "open" | "closed"
  location?: EventLocation
  participants?: string[]
  maxParticipants?: number
}