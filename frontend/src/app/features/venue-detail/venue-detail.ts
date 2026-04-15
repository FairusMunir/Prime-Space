import { Component, inject, computed } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { VenueService } from '../../core/services/venue';
import { BookingFormComponent } from './components/booking-form/booking-form';

@Component({
  selector: 'app-venue-detail',
  standalone: true,
  imports: [CommonModule, RouterLink, BookingFormComponent],
  template: `
    @if (venue(); as v) {
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <!-- Breadcrumb -->
        <nav class="flex mb-8 text-sm" aria-label="Breadcrumb">
          <ol class="inline-flex items-center space-x-1 md:space-x-3">
            <li class="inline-flex items-center">
              <a routerLink="/" class="inline-flex items-center text-gray-700 hover:text-blue-600">
                Home
              </a>
            </li>
            <li>
              <div class="flex items-center">
                <svg class="w-3 h-3 text-gray-400 mx-1" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 6 10">
                  <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="m1 9 4-4-4-4"/>
                </svg>
                <span class="text-gray-500 ml-1 md:ml-2">{{v.name}}</span>
              </div>
            </li>
          </ol>
        </nav>

        <div class="lg:grid lg:grid-cols-3 lg:gap-8">
          <!-- Image & Details (Left col) -->
          <div class="lg:col-span-2">
            <div class="rounded-2xl overflow-hidden shadow-lg h-96 mb-8">
              <img [src]="v.imageUrl" [alt]="v.name" class="w-full h-full object-cover">
            </div>
            
            <div class="bg-white rounded-2xl shadow-sm border border-gray-100 p-8 mb-8">
              <div class="flex justify-between items-start mb-6">
                <div>
                  <h1 class="text-3xl font-extrabold text-gray-900 mb-2">{{v.name}}</h1>
                  <div class="flex items-center text-gray-500 gap-4">
                    <div class="flex items-center gap-1">
                      <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                      </svg>
                      Capacity: {{v.capacity}} people
                    </div>
                  </div>
                </div>
                <div class="text-right">
                  <span class="block text-3xl font-bold text-gray-900">$ {{v.pricePerHour}}</span>
                  <span class="text-sm text-gray-500">per hour</span>
                </div>
              </div>

              <h2 class="text-xl font-bold text-gray-900 mb-4">About this space</h2>
              <p class="text-gray-600 leading-relaxed mb-8">
                {{v.description}}
              </p>

              <h2 class="text-xl font-bold text-gray-900 mb-4">Amenities</h2>
              <div class="grid grid-cols-2 md:grid-cols-3 gap-4">
                @for (amenity of v.amenities; track amenity) {
                  <div class="flex items-center text-gray-700 bg-gray-50 rounded-lg px-4 py-3 border border-gray-100">
                    <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 text-blue-500 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7" />
                    </svg>
                    {{amenity}}
                  </div>
                }
              </div>
            </div>
          </div>

          <!-- Booking Sidebar Placeholder (Right col) -->
          <div class="lg:col-span-1 mt-8 lg:mt-0">
            <div class="bg-white rounded-2xl shadow-xl border border-gray-100 p-6 sticky top-24">
              <h2 class="text-xl font-bold text-gray-900 mb-6 border-b pb-4">Book this space</h2>
              
              <!-- Booking Form Component -->
              <app-booking-form [venueId]="v.id"></app-booking-form>
              
            </div>
          </div>
        </div>
      </div>
    } @else {
      <div class="min-h-[50vh] flex items-center justify-center">
        <div class="text-center">
          <h2 class="text-2xl font-bold text-gray-900 mb-2">Venue not found</h2>
          <p class="text-gray-500 mb-6">The venue you are looking for does not exist or has been removed.</p>
          <a routerLink="/" class="text-blue-600 font-medium hover:underline">Return to home</a>
        </div>
      </div>
    }
  `,
  styles: []
})
export class VenueDetailComponent {
  private route = inject(ActivatedRoute);
  private venueService = inject(VenueService);

  // Using signals for derived state based on route params
  venueId = computed(() => this.route.snapshot.paramMap.get('id'));
  venue = computed(() => {
    const id = this.venueId();
    return id ? this.venueService.getVenueById(id) : undefined;
  });
}
