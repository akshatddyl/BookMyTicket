import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query"
import { axiosClient } from "./axiosClient"
import { type Event, type Seat, MOCK_EVENTS, getMockSeats, setMockSeats } from "./mockData"
import { toast } from "sonner"

const USE_MOCK = true // Toggle this to true to use mock data when backend is down

// Events
export const useEvents = () => {
  return useQuery({
    queryKey: ["events"],
    queryFn: async () => {
      if (USE_MOCK) {
        await new Promise((r) => setTimeout(r, 500))
        return MOCK_EVENTS
      }
      const res = await axiosClient.get("/events")
      return res.data.data as Event[]
    },
  })
}

export const useEventDetails = (id: string) => {
  return useQuery({
    queryKey: ["events", id],
    queryFn: async () => {
      if (USE_MOCK) {
        await new Promise((r) => setTimeout(r, 300))
        return MOCK_EVENTS.find((e) => e.id === id) || null
      }
      const res = await axiosClient.get(`/events/${id}`)
      return res.data.data as Event
    },
    enabled: !!id,
  })
}

// Seats
export const useSeats = (eventId: string) => {
  return useQuery({
    queryKey: ["seats", eventId],
    queryFn: async () => {
      if (USE_MOCK) {
        await new Promise((r) => setTimeout(r, 500))
        // Refresh mock seats on load if we wanted dynamic, but for now use the global array
        return getMockSeats()
      }
      const res = await axiosClient.get(`/inventory/seats?eventId=${eventId}`)
      return res.data.data as Seat[]
    },
    enabled: !!eventId,
  })
}

// Lock Seats Mutation
export const useLockSeats = () => {
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: async ({ eventId, seatIds }: { eventId: string; seatIds: string[] }) => {
      if (USE_MOCK) {
        await new Promise((r) => setTimeout(r, 800))
        // Check if any seat is already locked/booked
        const currentSeats = getMockSeats()
        const conflict = currentSeats.some(
          (s) => seatIds.includes(s.id) && s.status !== "AVAILABLE"
        )
        if (conflict) {
          throw new Error("Some seats are already taken")
        }
        // Update mock state
        setMockSeats(currentSeats.map((s) =>
          seatIds.includes(s.id) ? { ...s, status: "LOCKED" } : s
        ))
        return { bookingId: "mock-booking-" + Date.now() }
      }
      const res = await axiosClient.post("/bookings", { eventId, seatIds })
      return res.data.data // { id: bookingId }
    },
    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({ queryKey: ["seats", variables.eventId] })
      toast.success("Seats locked successfully! You have 5 minutes to complete payment.")
    },
    onError: (error) => {
      toast.error(error.message || "Failed to lock seats due to a concurrency conflict.")
    },
  })
}

// Pay Booking Mutation
export const usePayBooking = () => {
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: async ({ bookingId }: { bookingId: string; eventId: string }) => {
      if (USE_MOCK) {
        await new Promise((r) => setTimeout(r, 1000))
        const success = Math.random() < 0.9
        if (!success) {
          throw new Error("Payment failed due to insufficient funds.")
        }
        console.log(`Processing payment for ${bookingId}`);
        // Update mock state to BOOKED
        const currentSeats = getMockSeats()
        setMockSeats(currentSeats.map((s) =>
          s.status === "LOCKED" ? { ...s, status: "BOOKED" } : s
        ))
        return true
      }
      const res = await axiosClient.post(`/bookings/${bookingId}/pay`)
      return res.data.success
    },
    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({ queryKey: ["seats", variables.eventId] })
      toast.success("Payment successful! Your booking is confirmed.")
    },
    onError: (error) => {
      toast.error(error.message || "Payment failed.")
    },
  })
}
