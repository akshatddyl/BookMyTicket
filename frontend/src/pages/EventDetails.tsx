import { useEffect, useState } from "react"
import { useParams } from "react-router-dom"
import { useEventDetails, useSeats, useLockSeats, usePayBooking } from "@/api/queries"
import { SeatGrid } from "@/components/seatmap/SeatGrid"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { MapPin, Calendar, Clock, CreditCard } from "lucide-react"

export function EventDetails() {
  const { id } = useParams()
  const { data: event, isLoading: isLoadingEvent, error: errorEvent } = useEventDetails(id!)
  const { data: seats, isLoading: isLoadingSeats } = useSeats(id!)

  const { mutate: lockSeats, isPending: isLocking } = useLockSeats()
  const { mutate: payBooking, isPending: isPaying } = usePayBooking()

  const [selectedSeatIds, setSelectedSeatIds] = useState<string[]>([])
  
  // Timer state
  const [timeLeft, setTimeLeft] = useState<number>(0)
  const [bookingId, setBookingId] = useState<string | null>(null)

  useEffect(() => {
    if (timeLeft > 0) {
      const timerId = setTimeout(() => setTimeLeft(timeLeft - 1), 1000)
      return () => clearTimeout(timerId)
    } else if (timeLeft === 0 && bookingId) {
      // Timer expired
      setBookingId(null)
      setSelectedSeatIds([])
    }
  }, [timeLeft, bookingId])

  if (isLoadingEvent || isLoadingSeats) return <div className="p-12 text-center">Loading event details...</div>
  if (errorEvent || !event) return <div className="p-12 text-center text-red-500">Event not found.</div>

  const handleToggleSeat = (seatId: string) => {
    if (bookingId) return // Cannot change seats while paying
    setSelectedSeatIds((prev) =>
      prev.includes(seatId) ? prev.filter((id) => id !== seatId) : [...prev, seatId]
    )
  }

  const handleLockSeats = () => {
    if (selectedSeatIds.length === 0) return
    lockSeats(
      { eventId: id!, seatIds: selectedSeatIds },
      {
        onSuccess: (data) => {
          setBookingId(data.bookingId)
          setTimeLeft(300) // 5 minutes (300 seconds)
        },
      }
    )
  }

  const handlePayment = () => {
    if (!bookingId) return
    payBooking(
      { bookingId, eventId: id! },
      {
        onSuccess: () => {
          setBookingId(null)
          setTimeLeft(0)
          setSelectedSeatIds([])
          // Optional: navigate to success page
        },
      }
    )
  }

  const totalAmount = selectedSeatIds.reduce((sum, seatId) => {
    const seat = seats?.find((s) => s.id === seatId)
    return sum + (seat?.price || 0)
  }, 0)

  const formatTime = (seconds: number) => {
    const m = Math.floor(seconds / 60)
    const s = seconds % 60
    return `${m}:${s.toString().padStart(2, "0")}`
  }

  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
      {/* Main Column: Event Info & Seat Map */}
      <div className="lg:col-span-2 space-y-8">
        <div>
          <h1 className="text-4xl font-bold mb-2">{event.title}</h1>
          <p className="text-muted-foreground text-lg">{event.description}</p>
        </div>
        
        <div className="flex flex-wrap gap-6 text-sm text-muted-foreground bg-muted/50 p-4 rounded-xl border">
          <div className="flex items-center">
            <Calendar className="mr-2 h-5 w-5" />
            {new Date(event.eventDate).toLocaleDateString(undefined, { weekday: 'long', month: 'long', day: 'numeric', year: 'numeric' })}
          </div>
          <div className="flex items-center">
            <Clock className="mr-2 h-5 w-5" />
            {new Date(event.eventDate).toLocaleTimeString(undefined, { hour: '2-digit', minute: '2-digit' })}
          </div>
          <div className="flex items-center">
            <MapPin className="mr-2 h-5 w-5" />
            {event.venue.name}, {event.venue.city}
          </div>
        </div>

        <div>
          <h3 className="text-2xl font-semibold mb-4">Select your seats</h3>
          <div className="flex gap-4 mb-4 text-sm">
            <div className="flex items-center"><div className="w-4 h-4 border-2 border-foreground mr-2 rounded-sm" /> Available</div>
            <div className="flex items-center"><div className="w-4 h-4 bg-foreground mr-2 rounded-sm" /> Selected</div>
            <div className="flex items-center"><div className="w-4 h-4 bg-yellow-500 border-2 border-yellow-600 mr-2 rounded-sm" /> Locked</div>
            <div className="flex items-center"><div className="w-4 h-4 bg-muted mr-2 rounded-sm" /> Booked</div>
          </div>
          {seats && (
            <SeatGrid
              seats={seats}
              selectedSeatIds={selectedSeatIds}
              onToggleSeat={handleToggleSeat}
            />
          )}
        </div>
      </div>

      {/* Sidebar: Checkout */}
      <div>
        <Card className="sticky top-20">
          <CardHeader>
            <CardTitle>Booking Summary</CardTitle>
            <CardDescription>
              {selectedSeatIds.length} seat(s) selected
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              {selectedSeatIds.map((seatId) => {
                const seat = seats?.find((s) => s.id === seatId)
                return (
                  <div key={seatId} className="flex justify-between text-sm">
                    <span>Seat {seat?.seatNumber} ({seat?.section})</span>
                    <span className="font-medium">${seat?.price.toFixed(2)}</span>
                  </div>
                )
              })}
            </div>
            <div className="border-t pt-4 flex justify-between font-bold text-lg">
              <span>Total</span>
              <span>${totalAmount.toFixed(2)}</span>
            </div>

            {bookingId && timeLeft > 0 && (
              <div className="bg-yellow-500/10 border-yellow-500/50 border text-yellow-700 dark:text-yellow-500 p-3 rounded-md text-center font-medium animate-pulse">
                Seats Locked. Complete payment in {formatTime(timeLeft)}
              </div>
            )}
          </CardContent>
          <div className="p-6 pt-0 space-y-3">
            {!bookingId ? (
              <Button
                className="w-full"
                onClick={handleLockSeats}
                disabled={selectedSeatIds.length === 0 || isLocking}
              >
                {isLocking ? "Locking..." : "Lock Seats"}
              </Button>
            ) : (
              <Button
                className="w-full"
                onClick={handlePayment}
                disabled={isPaying}
                variant="default"
              >
                <CreditCard className="mr-2 h-4 w-4" />
                {isPaying ? "Processing..." : `Pay $${totalAmount.toFixed(2)}`}
              </Button>
            )}
          </div>
        </Card>
      </div>
    </div>
  )
}
