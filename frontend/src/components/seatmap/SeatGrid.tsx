import { type Seat } from "@/api/mockData"
import { cn } from "@/lib/utils"

interface SeatGridProps {
  seats: Seat[]
  selectedSeatIds: string[]
  onToggleSeat: (seatId: string) => void
}

export function SeatGrid({ seats, selectedSeatIds, onToggleSeat }: SeatGridProps) {
  return (
    <div className="grid grid-cols-5 sm:grid-cols-8 md:grid-cols-10 gap-2 p-4 border rounded-xl bg-card">
      {seats.map((seat) => {
        const isSelected = selectedSeatIds.includes(seat.id)
        const isAvailable = seat.status === "AVAILABLE"
        const isLocked = seat.status === "LOCKED"
        const isBooked = seat.status === "BOOKED"

        return (
          <button
            key={seat.id}
            disabled={!isAvailable && !isSelected}
            onClick={() => {
              if (isAvailable || isSelected) {
                onToggleSeat(seat.id)
              }
            }}
            className={cn(
              "h-10 w-10 md:h-12 md:w-12 rounded flex items-center justify-center text-xs font-medium transition-all",
              isAvailable && !isSelected && "border-2 border-foreground bg-transparent hover:bg-muted",
              isSelected && "bg-foreground text-background shadow-md transform scale-105",
              isLocked && "bg-yellow-500 border-2 border-yellow-600 text-yellow-950 cursor-not-allowed",
              isBooked && "bg-muted text-muted-foreground opacity-50 cursor-not-allowed"
            )}
            title={`Seat ${seat.seatNumber} - $${seat.price}`}
          >
            {seat.seatNumber}
          </button>
        )
      })}
    </div>
  )
}
