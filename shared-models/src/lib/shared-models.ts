export interface Venue {
  id: string;
  name: string;
  description: string;
  capacity: number;
  amenities: string[];
  imageUrl: string;
  pricePerHour: number;
  isActive: boolean;
}

export enum BookingStatus {
  PENDING = 'PENDING',
  APPROVED = 'APPROVED',
  REJECTED = 'REJECTED'
}

export interface Booking {
  id: string;
  venueId: string;
  guestName: string;
  guestEmail: string;
  guestPhone?: string;
  purpose: string;
  startTime: string; // ISO DateTime string (UTC)
  endTime: string;   // ISO DateTime string (UTC)
  status: BookingStatus;
  createdAt: string; // ISO DateTime string
}
