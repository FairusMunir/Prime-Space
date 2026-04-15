import { Component, inject } from '@angular/core';
import { RouterLink } from '@angular/router';
import { CommonModule } from '@angular/common';
import { VenueService } from '../../core/services/venue';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule, RouterLink],
  template: `
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div class="text-center mb-12">
        <h1 class="text-4xl font-extrabold text-gray-900 sm:text-5xl md:text-6xl tracking-tight">
          Find your perfect space
        </h1>
        <p class="mt-4 text-xl text-gray-500 max-w-2xl mx-auto">
          Book unique venues for your next meeting, event, or photoshoot.
        </p>
      </div>

      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        @for (venue of venueService.venues(); track venue.id) {
          <div class="bg-white rounded-xl shadow-md overflow-hidden hover:shadow-xl transition-shadow duration-300 flex flex-col cursor-pointer group" [routerLink]="['/venue', venue.id]">
            <div class="h-48 overflow-hidden relative">
              <img [src]="venue.imageUrl" [alt]="venue.name" class="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500">
              <div class="absolute top-4 right-4 bg-white/90 backdrop-blur-sm px-3 py-1 rounded-full text-sm font-semibold text-gray-900">
                $ {{venue.pricePerHour}}/hr
              </div>
            </div>
            <div class="p-6 flex-1 flex flex-col">
              <div class="flex justify-between items-start mb-2">
                <h3 class="text-xl font-bold text-gray-900 group-hover:text-blue-600 transition-colors">{{venue.name}}</h3>
              </div>
              <p class="text-gray-500 text-sm mb-4 line-clamp-2 flex-1">{{venue.description}}</p>
              
              <div class="flex items-center text-sm text-gray-500 gap-4 mt-auto">
                <div class="flex items-center gap-1">
                  <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                  </svg>
                  Up to {{venue.capacity}}
                </div>
              </div>
            </div>
          </div>
        } @empty {
          <div class="col-span-full text-center py-12 text-gray-500">
            No venues found.
          </div>
        }
      </div>
    </div>
  `,
  styles: []
})
export class HomeComponent {
  venueService = inject(VenueService);
}
