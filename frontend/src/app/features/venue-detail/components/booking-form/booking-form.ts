import { Component, input, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { BookingService } from '../../../../core/services/booking';

@Component({
  selector: 'app-booking-form',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  template: `
    <div class="booking-form-container">
      @if (bookingSuccess()) {
        <div class="bg-green-50 border border-green-200 rounded-xl p-6 text-center">
          <div class="mx-auto flex items-center justify-center h-12 w-12 rounded-full bg-green-100 mb-4">
            <svg class="h-6 w-6 text-green-600" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7" />
            </svg>
          </div>
          <h3 class="text-lg font-medium text-gray-900 mb-2">Booking Request Sent!</h3>
          <p class="text-sm text-gray-500 mb-6">
            Your booking request has been submitted successfully. The admin will review it shortly.
          </p>
          <button type="button" (click)="resetForm()" class="w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-blue-600 text-base font-medium text-white hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 sm:text-sm">
            Book Another Slot
          </button>
        </div>
      } @else {
        <form [formGroup]="bookingForm" (ngSubmit)="onSubmit()" class="space-y-4">
          <!-- Calendar / Date Picker Placeholder -->
          <div class="grid grid-cols-2 gap-4">
            <div>
              <label for="date" class="block text-sm font-medium text-gray-700 mb-1">Date</label>
              <input type="date" id="date" formControlName="date" class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm p-2 border">
            </div>
            <div>
              <label for="time" class="block text-sm font-medium text-gray-700 mb-1">Start Time</label>
              <input type="time" id="time" formControlName="time" class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm p-2 border">
            </div>
          </div>
          
          <div>
            <label for="duration" class="block text-sm font-medium text-gray-700 mb-1">Duration (Hours)</label>
            <select id="duration" formControlName="duration" class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm p-2 border">
              <option value="1">1 Hour</option>
              <option value="2">2 Hours</option>
              <option value="3">3 Hours</option>
              <option value="4">4 Hours</option>
              <option value="8">Full Day (8 Hours)</option>
            </select>
          </div>

          <!-- Guest Details -->
          <div>
            <label for="guestName" class="block text-sm font-medium text-gray-700 mb-1">Full Name</label>
            <input type="text" id="guestName" formControlName="guestName" placeholder="Jane Doe" class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm p-2 border">
          </div>

          <div>
            <label for="guestEmail" class="block text-sm font-medium text-gray-700 mb-1">Email Address</label>
            <input type="email" id="guestEmail" formControlName="guestEmail" placeholder="jane@example.com" class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm p-2 border">
          </div>
          
          <div>
            <label for="purpose" class="block text-sm font-medium text-gray-700 mb-1">Purpose of Booking</label>
            <textarea id="purpose" formControlName="purpose" rows="2" placeholder="Briefly describe your event..." class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm p-2 border"></textarea>
          </div>

          <button type="submit" [disabled]="bookingForm.invalid || isSubmitting()" class="w-full flex justify-center py-3 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:opacity-50 disabled:cursor-not-allowed mt-6">
            {{ isSubmitting() ? 'Submitting...' : 'Request Booking' }}
          </button>
        </form>
      }
    </div>
  `,
  styles: []
})
export class BookingFormComponent {
  venueId = input.required<string>();

  private fb = inject(FormBuilder);
  private bookingService = inject(BookingService);

  bookingSuccess = signal(false);
  isSubmitting = signal(false);

  bookingForm = this.fb.group({
    date: ['', Validators.required],
    time: ['', Validators.required],
    duration: [1, [Validators.required, Validators.min(1)]],
    guestName: ['', Validators.required],
    guestEmail: ['', [Validators.required, Validators.email]],
    purpose: ['', Validators.required]
  });

  onSubmit() {
    if (this.bookingForm.invalid) return;

    this.isSubmitting.set(true);

    const formValue = this.bookingForm.value;

    // Construct fake ISO dates for start and end time based on input
    const startDateTime = new Date(formValue.date + 'T' + formValue.time);
    const endDateTime = new Date(startDateTime.getTime() + (Number(formValue.duration) * 60 * 60 * 1000));

    // Simulate API call delay
    setTimeout(() => {
      this.bookingService.addBooking({
        venueId: this.venueId(),
        guestName: formValue.guestName!,
        guestEmail: formValue.guestEmail!,
        purpose: formValue.purpose!,
        startTime: startDateTime.toISOString(),
        endTime: endDateTime.toISOString(),
      });

      this.isSubmitting.set(false);
      this.bookingSuccess.set(true);
    }, 800);
  }

  resetForm() {
    this.bookingForm.reset({ duration: 1 });
    this.bookingSuccess.set(false);
  }
}
