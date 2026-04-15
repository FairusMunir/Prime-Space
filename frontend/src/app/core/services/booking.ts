import { Injectable, signal } from '@angular/core';
import { Booking, BookingStatus } from '@prime-space/shared-models';

@Injectable({
  providedIn: 'root'
})
export class BookingService {
  private readonly _bookings = signal<Booking[]>([
    {
      id: 'b1',
      venueId: '1',
      guestName: 'John Doe',
      guestEmail: 'john@example.com',
      purpose: 'Corporate Seminar',
      startTime: '2026-05-10T09:00:00Z',
      endTime: '2026-05-10T17:00:00Z',
      status: BookingStatus.APPROVED,
      createdAt: '2026-04-10T10:00:00Z'
    },
    {
      id: 'b2',
      venueId: '1',
      guestName: 'Jane Smith',
      guestEmail: 'jane@example.com',
      purpose: 'Wedding Reception',
      startTime: '2026-06-15T18:00:00Z',
      endTime: '2026-06-15T23:00:00Z',
      status: BookingStatus.PENDING,
      createdAt: '2026-04-12T14:30:00Z'
    }
  ]);

  readonly bookings = this._bookings.asReadonly();

  constructor() { }

  getBookingsForVenue(venueId: string): Booking[] {
    return this._bookings().filter(b => b.venueId === venueId);
  }

  addBooking(booking: Omit<Booking, 'id' | 'createdAt' | 'status'>) {
    const newBooking: Booking = {
      ...booking,
      id: Math.random().toString(36).substring(2, 9),
      status: BookingStatus.PENDING,
      createdAt: new Date().toISOString()
    };
    this._bookings.update(bookings => [...bookings, newBooking]);
  }

  updateBookingStatus(bookingId: string, status: BookingStatus) {
    this._bookings.update(bookings =>
      bookings.map(b => (b.id === bookingId ? { ...b, status } : b))
    );
  }
}
