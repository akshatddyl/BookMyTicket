import { useEvents } from "@/api/queries"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Calendar, MapPin, Ticket } from "lucide-react"
import { Link } from "react-router-dom"
import { Input } from "@/components/ui/input"
import { useState } from "react"

export function EventDiscovery() {
  const { data: events, isLoading, error } = useEvents()
  const [search, setSearch] = useState("")

  if (isLoading) {
    return <div className="flex justify-center p-12">Loading events...</div>
  }

  if (error) {
    return <div className="text-red-500">Failed to load events.</div>
  }

  const filteredEvents = events?.filter((event) =>
    event.title.toLowerCase().includes(search.toLowerCase()) ||
    event.venue.city.toLowerCase().includes(search.toLowerCase())
  )

  return (
    <div className="space-y-8">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Discover Events</h1>
          <p className="text-muted-foreground">Find and book tickets for the best experiences.</p>
        </div>
        <div className="w-full md:w-72">
          <Input
            type="search"
            placeholder="Search by title or city..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>
      </div>

      {filteredEvents?.length === 0 ? (
        <div className="text-center py-12 text-muted-foreground border rounded-lg border-dashed">
          No events found matching "{search}"
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredEvents?.map((event) => (
            <Card key={event.id} className="flex flex-col transition-all hover:shadow-md">
              <CardHeader>
                <div className="flex justify-between items-start">
                  <CardTitle className="text-xl line-clamp-2">{event.title}</CardTitle>
                  <span className="inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-semibold">
                    {event.category}
                  </span>
                </div>
                <CardDescription className="line-clamp-2 mt-2">
                  {event.description}
                </CardDescription>
              </CardHeader>
              <CardContent className="flex-1 space-y-3">
                <div className="flex items-center text-sm text-muted-foreground">
                  <Calendar className="mr-2 h-4 w-4" />
                  {new Date(event.eventDate).toLocaleDateString(undefined, {
                    weekday: 'short', month: 'short', day: 'numeric', year: 'numeric', hour: '2-digit', minute: '2-digit'
                  })}
                </div>
                <div className="flex items-center text-sm text-muted-foreground">
                  <MapPin className="mr-2 h-4 w-4" />
                  {event.venue.name}, {event.venue.city}
                </div>
                <div className="flex items-center text-sm font-medium">
                  <Ticket className="mr-2 h-4 w-4 text-primary" />
                  ${event.ticketPrice.toFixed(2)}
                </div>
              </CardContent>
              <CardFooter>
                <Link to={`/events/${event.id}`} className="w-full">
                  <Button className="w-full">Book Tickets</Button>
                </Link>
              </CardFooter>
            </Card>
          ))}
        </div>
      )}
    </div>
  )
}
