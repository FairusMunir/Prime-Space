import { Component, inject } from '@angular/core';
import { CommonModule, DatePipe } from '@angular/common';
import { BookingService } from '../../../core/services/booking';
import { VenueService } from '../../../core/services/venue';
import { BookingStatus } from '@prime-space/shared-models';

@Component({
  selector: 'app-admin-bookings',
  standalone: true,
  imports: [CommonModule, DatePipe],
  template: `
    <div class="px-4 sm:px-6 lg:px-8">
      <div class="sm:flex sm:items-center">
        <div class="sm:flex-auto">
          <h1 class="text-2xl font-semibold text-gray-900">Bookings</h1>
          <p class="mt-2 text-sm text-gray-700">A list of all incoming booking requests across your venues.</p>
        </div>
      </div>
      <div class="mt-8 flex flex-col">
        <!-- Desktop Table View -->
        <div class="hidden md:block -my-2 -mx-4 overflow-x-auto sm:-mx-6 lg:-mx-8">
          <div class="inline-block min-w-full py-2 align-middle md:px-6 lg:px-8">
            <div class="overflow-hidden shadow ring-1 ring-black ring-opacity-5 md:rounded-lg">
              <table class="min-w-full divide-y divide-gray-300">
                <thead class="bg-gray-50">
                  <tr>
                    <th scope="col" class="py-3.5 pl-4 pr-3 text-left text-sm font-semibold text-gray-900 sm:pl-6">Guest</th>
                    <th scope="col" class="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">Venue</th>
                    <th scope="col" class="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">Date & Time</th>
                    <th scope="col" class="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">Purpose</th>
                    <th scope="col" class="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">Status</th>
                    <th scope="col" class="relative py-3.5 pl-3 pr-4 sm:pr-6">
                      <span class="sr-only">Actions</span>
                    </th>
                  </tr>
                </thead>
                <tbody class="divide-y divide-gray-200 bg-white">
                  @for (booking of bookingService.bookings(); track booking.id) {
                    <tr>
                      <td class="whitespace-nowrap py-4 pl-4 pr-3 text-sm sm:pl-6">
                        <div class="font-medium text-gray-900">{{ booking.guestName }}</div>
                        <div class="text-gray-500">{{ booking.guestEmail }}</div>
                      </td>
                      <td class="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                        {{ getVenueName(booking.venueId) }}
                      </td>
                      <td class="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                        <div class="text-gray-900">{{ booking.startTime | date:'mediumDate' }}</div>
                        <div class="text-gray-500">{{ booking.startTime | date:'shortTime' }} - {{ booking.endTime | date:'shortTime' }}</div>
                      </td>
                      <td class="px-3 py-4 text-sm text-gray-500 max-w-xs truncate" [title]="booking.purpose">
                        {{ booking.purpose }}
                      </td>
                      <td class="whitespace-nowrap px-3 py-4 text-sm">
                        <span class="inline-flex rounded-full px-2 text-xs font-semibold leading-5"
                          [ngClass]="{
                            'bg-green-100 text-green-800': booking.status === BookingStatus.APPROVED,
                            'bg-yellow-100 text-yellow-800': booking.status === BookingStatus.PENDING,
                            'bg-red-100 text-red-800': booking.status === BookingStatus.REJECTED
                          }">
                          {{ booking.status }}
                        </span>
                      </td>
                      <td class="relative whitespace-nowrap py-4 pl-3 pr-4 text-right text-sm font-medium sm:pr-6">
                        @if (booking.status === BookingStatus.PENDING) {
                          <div class="flex gap-2 justify-end">
                            <button (click)="updateStatus(booking.id, BookingStatus.REJECTED)" class="px-3 py-1.5 border border-red-300 shadow-sm text-xs font-medium rounded text-red-700 bg-white hover:bg-red-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500">Reject</button>
                            <button (click)="updateStatus(booking.id, BookingStatus.APPROVED)" class="px-3 py-1.5 border border-transparent shadow-sm text-xs font-medium rounded text-white bg-green-600 hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500">Approve</button>
                          </div>
                        }
                      </td>
                    </tr>
                  } @empty {
                    <tr>
                      <td colspan="6" class="px-3 py-8 text-center text-sm text-gray-500">
                        No bookings found.
                      </td>
                    </tr>
                  }
                </tbody>
              </table>
            </div>
          </div>
        </div>

        <!-- Mobile Stacked Card View -->
        <div class="md:hidden space-y-4">
          @for (booking of bookingService.bookings(); track booking.id) {
            <div class="bg-white shadow rounded-lg px-4 py-5 sm:p-6 flex flex-col gap-4 border border-gray-200">
              <div class="flex justify-between items-start">
                <div>
                  <h3 class="text-lg font-medium text-gray-900">{{ booking.guestName }}</h3>
                  <p class="text-sm text-gray-500">{{ booking.guestEmail }}</p>
                </div>
                <span class="inline-flex rounded-full px-2 text-xs font-semibold leading-5"
                  [ngClass]="{
                    'bg-green-100 text-green-800': booking.status === BookingStatus.APPROVED,
                    'bg-yellow-100 text-yellow-800': booking.status === BookingStatus.PENDING,
                    'bg-red-100 text-red-800': booking.status === BookingStatus.REJECTED
                  }">
                  {{ booking.status }}
                </span>
              </div>
              
              <div class="grid grid-cols-2 gap-4 text-sm">
                <div>
                  <span class="block font-medium text-gray-700">Venue</span>
                  <span class="text-gray-600">{{ getVenueName(booking.venueId) }}</span>
                </div>
                <div>
                  <span class="block font-medium text-gray-700">Date</span>
                  <span class="text-gray-600">{{ booking.startTime | date:'mediumDate' }}</span>
                </div>
                <div class="col-span-2">
                  <span class="block font-medium text-gray-700">Time</span>
                  <span class="text-gray-600">{{ booking.startTime | date:'shortTime' }} - {{ booking.endTime | date:'shortTime' }}</span>
                </div>
                <div class="col-span-2">
                  <span class="block font-medium text-gray-700">Purpose</span>
                  <span class="text-gray-600">{{ booking.purpose }}</span>
                </div>
              </div>

              @if (booking.status === BookingStatus.PENDING) {
                <div class="mt-4 pt-4 border-t border-gray-100 flex gap-3 justify-end">
                  <button (click)="updateStatus(booking.id, BookingStatus.REJECTED)" class="px-4 py-2 border border-red-300 shadow-sm text-sm font-medium rounded-md text-red-700 bg-white hover:bg-red-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500">
                    Reject
                  </button>
                  <button (click)="updateStatus(booking.id, BookingStatus.APPROVED)" class="px-4 py-2 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-green-600 hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500">
                    Approve
                  </button>
                </div>
              }
            </div>
          } @empty {
            <div class="bg-white shadow rounded-lg px-4 py-8 text-center text-sm text-gray-500">
              No bookings found.
            </div>
          }
        </div>
      </div>
    </div>
  `,
  styles: []
})
export class AdminBookingsComponent {
  bookingService = inject(BookingService);
  venueService = inject(VenueService);
  BookingStatus = BookingStatus;

  getVenueName(venueId: string): string {
    const venue = this.venueService.getVenueById(venueId);
    return venue ? venue.name : 'Unknown Venue';
  }

  updateStatus(bookingId: string, status: BookingStatus) {
    this.bookingService.updateBookingStatus(bookingId, status);
  }
}
