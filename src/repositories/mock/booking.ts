import { mockBookings } from "@/mock-data";
import { BookingStatus } from "@/domain/enums";
import type { Booking, BookingQuery, PaginatedResult } from "@/domain/types";
import type { BookingRepository } from "../interfaces/order";

const delay = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

let bookings: Booking[] = [...mockBookings];

function paginate<T>(items: T[], page = 1, limit = 10): PaginatedResult<T> {
  const total = items.length;
  const totalPages = Math.ceil(total / limit);
  const start = (page - 1) * limit;
  const data = items.slice(start, start + limit);
  return { data, meta: { page, limit, total, totalPages } };
}

export class MockBookingRepository implements BookingRepository {
  async getBookings(query?: BookingQuery): Promise<PaginatedResult<Booking>> {
    await delay(250);
    let results = [...bookings];

    if (query?.customerId) {
      results = results.filter((b) => b.customerId === query.customerId);
    }
    if (query?.status) {
      results = results.filter((b) => b.status === query.status);
    }

    results.sort((a, b) => b.createdAt.localeCompare(a.createdAt));
    return paginate(results, query?.page, query?.limit);
  }

  async getBookingById(id: string): Promise<Booking | null> {
    await delay(200);
    return bookings.find((b) => b.id === id) ?? null;
  }

  async createBooking(
    bookingData: Omit<Booking, "id" | "createdAt">
  ): Promise<Booking> {
    await delay(400);
    const now = new Date().toISOString();
    const newBooking: Booking = {
      ...bookingData,
      id: `book-${Date.now()}`,
      createdAt: now,
    };
    bookings = [newBooking, ...bookings];
    return newBooking;
  }

  async cancelBooking(id: string): Promise<Booking> {
    await delay(300);
    const index = bookings.findIndex((b) => b.id === id);
    if (index === -1) throw new Error("Booking not found");

    const cancellable: BookingStatus[] = [BookingStatus.PENDING, BookingStatus.CONFIRMED];
    if (!cancellable.includes(bookings[index].status)) {
      throw new Error("This booking cannot be cancelled at this stage");
    }

    const updated: Booking = { ...bookings[index], status: BookingStatus.CANCELLED };
    bookings[index] = updated;
    return updated;
  }
}
