import { useQuery } from "@tanstack/react-query"
import { getPopularEvents, getEvents } from "@/services/event.service"
import { motion } from "framer-motion"

export default function StatsSection() {
  const { data: popularEvents } = useQuery({
    queryKey: ["popularEvents"],
    queryFn: () => getPopularEvents(10),
  })

  const { data: allEvents } = useQuery({
    queryKey: ["allEvents"],
    queryFn: () =>
      getEvents({
        page: 1,
        limit: 100,
      }),
  })

  const stats = [
    {
      label: "Total Events",
      value: allEvents?.total || 0,
    },
    {
      label: "Participants",
      value:
        popularEvents?.events?.reduce((sum: number, event: any) => {
          const participantsCount =
            event.participantsCount ||
            event.participants?.length ||
            0
          return sum + participantsCount
        }, 0) || 0,
    },
    {
      label: "Popular Events",
      value: popularEvents?.events?.length || 0,
    },
  ]

  return (
    <section className="bg-primary/5 py-20 lg:py-28">
      <div className="mx-auto max-w-7xl px-4 lg:px-8">
        <div className="mx-auto max-w-2xl text-center mb-16">
          <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">
            By The Numbers
          </h2>
          <p className="mt-4 text-lg text-muted-foreground">
            See how EventFinder is bringing communities together
          </p>
        </div>

        <div className="grid gap-8 md:grid-cols-3">
          {stats.map((stat, index) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: index * 0.2 }}
              className="rounded-xl border bg-background p-8 text-center shadow-sm hover:shadow-md transition-shadow"
            >
              <div className="text-4xl font-bold text-primary">
                {stat.value.toLocaleString()}
              </div>
              <div className="mt-2 text-lg text-muted-foreground font-medium">
                {stat.label}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
