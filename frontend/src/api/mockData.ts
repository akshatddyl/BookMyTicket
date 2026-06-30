export type Event = {
  id: string
  title: string
  description: string
  eventDate: string
  category: string
  status: string
  totalSeats: number
  ticketPrice: number
  venue: {
    id: string
    name: string
    city: string
  }
}

export type SeatStatus = "AVAILABLE" | "LOCKED" | "BOOKED"

export type Seat = {
  id: string
  eventId: string
  seatNumber: string
  section: string
  price: number
  status: SeatStatus
}

export const MOCK_EVENTS: Event[] = [
  {
    id: "evt-1",
    title: "Symphony of the Night",
    description: "A classical evening with the philharmonic orchestra.",
    eventDate: new Date(Date.now() + 86400000 * 7).toISOString(),
    category: "CONCERT",
    status: "PUBLISHED",
    totalSeats: 120,
    ticketPrice: 75.0,
    venue: { id: "ven-1", name: "Grand Opera House", city: "New York" },
  },
  {
    id: "evt-2",
    title: "Tech Innovators Conference 2026",
    description: "The biggest gathering of tech enthusiasts and founders.",
    eventDate: new Date(Date.now() + 86400000 * 14).toISOString(),
    category: "CONFERENCE",
    status: "PUBLISHED",
    totalSeats: 500,
    ticketPrice: 299.0,
    venue: { id: "ven-2", name: "Moscone Center", city: "San Francisco" },
  },
]

// Generate some mock seats for evt-1
const generateMockSeats = (eventId: string, count: number): Seat[] => {
  const seats: Seat[] = []
  for (let i = 1; i <= count; i++) {
    const statusRand = Math.random()
    let status: SeatStatus = "AVAILABLE"
    if (statusRand > 0.8) status = "BOOKED"
    else if (statusRand > 0.7) status = "LOCKED"

    seats.push({
      id: `seat-${eventId}-${i}`,
      eventId,
      seatNumber: `A${i}`,
      section: "VIP",
      price: 75.0,
      status,
    })
  }
  return seats
}

let mockSeatsStore: Seat[] = generateMockSeats("evt-1", 40)

export const getMockSeats = () => mockSeatsStore
export const setMockSeats = (seats: Seat[]) => {
  mockSeatsStore = seats
}
