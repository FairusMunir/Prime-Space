import { Component, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { VenueService } from '../../../core/services/venue';

@Component({
  selector: 'app-admin-venues',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  template: `
    <div class="px-4 sm:px-6 lg:px-8">
      <div class="sm:flex sm:items-center justify-between mb-8">
        <div>
          <h1 class="text-2xl font-semibold text-gray-900">Manage Venues</h1>
          <p class="mt-2 text-sm text-gray-700">Add new venues or view existing ones.</p>
        </div>
        <button (click)="showForm.set(!showForm())" class="mt-4 sm:mt-0 inline-flex items-center justify-center rounded-md border border-transparent bg-blue-600 px-4 py-2 text-sm font-medium text-white shadow-sm hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 sm:w-auto">
          {{ showForm() ? 'Cancel' : 'Add New Venue' }}
        </button>
      </div>

      <!-- Add Venue Form -->
      @if (showForm()) {
        <div class="bg-white shadow rounded-lg mb-8">
          <div class="px-4 py-5 sm:p-6">
            <h3 class="text-lg leading-6 font-medium text-gray-900 mb-4">Register New Venue</h3>
            
            <form [formGroup]="venueForm" (ngSubmit)="onSubmit()" class="space-y-6">
              <div class="grid grid-cols-1 gap-y-6 gap-x-4 sm:grid-cols-6">
                <div class="sm:col-span-3">
                  <label for="name" class="block text-sm font-medium text-gray-700">Venue Name</label>
                  <div class="mt-1">
                    <input type="text" id="name" formControlName="name" class="shadow-sm focus:ring-blue-500 focus:border-blue-500 block w-full sm:text-sm border-gray-300 rounded-md p-2 border">
                  </div>
                </div>

                <div class="sm:col-span-3">
                  <label for="pricePerHour" class="block text-sm font-medium text-gray-700">Price Per Hour ($)</label>
                  <div class="mt-1">
                    <input type="number" id="pricePerHour" formControlName="pricePerHour" class="shadow-sm focus:ring-blue-500 focus:border-blue-500 block w-full sm:text-sm border-gray-300 rounded-md p-2 border">
                  </div>
                </div>

                <div class="sm:col-span-6">
                  <label for="description" class="block text-sm font-medium text-gray-700">Description</label>
                  <div class="mt-1">
                    <textarea id="description" formControlName="description" rows="3" class="shadow-sm focus:ring-blue-500 focus:border-blue-500 block w-full sm:text-sm border-gray-300 rounded-md p-2 border"></textarea>
                  </div>
                </div>

                <div class="sm:col-span-3">
                  <label for="capacity" class="block text-sm font-medium text-gray-700">Capacity (People)</label>
                  <div class="mt-1">
                    <input type="number" id="capacity" formControlName="capacity" class="shadow-sm focus:ring-blue-500 focus:border-blue-500 block w-full sm:text-sm border-gray-300 rounded-md p-2 border">
                  </div>
                </div>

                <div class="sm:col-span-3">
                  <label for="imageUpload" class="block text-sm font-medium text-gray-700">Venue Image</label>
                  <div class="mt-1 flex items-center gap-4">
                    <span class="h-12 w-12 rounded-md overflow-hidden bg-gray-100 border border-gray-300">
                      @if (venueForm.get('imageUrl')?.value) {
                        <img [src]="venueForm.get('imageUrl')?.value" alt="Preview" class="h-full w-full object-cover">
                      } @else {
                        <svg class="h-full w-full text-gray-300" fill="currentColor" viewBox="0 0 24 24">
                          <path d="M24 20.993V24H0v-2.996A14.977 14.977 0 0112.004 15c4.904 0 9.26 2.354 11.996 5.993zM16.002 8.999a4 4 0 11-8 0 4 4 0 018 0z" />
                        </svg>
                      }
                    </span>
                    <button type="button" (click)="fileInput.click()" class="rounded-md bg-white px-2.5 py-1.5 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50">
                      Upload
                    </button>
                    <input type="file" id="imageUpload" #fileInput accept="image/*" (change)="onFileSelected($event)" class="hidden">
                  </div>
                  <p class="mt-2 text-xs text-gray-500">JPG, PNG, GIF up to 5MB.</p>
                </div>

                <div class="sm:col-span-6">
                  <label for="amenities" class="block text-sm font-medium text-gray-700">Amenities (Comma separated)</label>
                  <div class="mt-1">
                    <input type="text" id="amenities" formControlName="amenities" placeholder="WiFi, Projector, Whiteboard" class="shadow-sm focus:ring-blue-500 focus:border-blue-500 block w-full sm:text-sm border-gray-300 rounded-md p-2 border">
                  </div>
                </div>
                
                <div class="sm:col-span-6 flex items-center">
                  <input id="isActive" type="checkbox" formControlName="isActive" class="focus:ring-blue-500 h-4 w-4 text-blue-600 border-gray-300 rounded">
                  <label for="isActive" class="ml-2 block text-sm text-gray-900">
                    Active (Available for booking)
                  </label>
                </div>
              </div>

              <div class="flex justify-end mt-4">
                <button type="submit" [disabled]="venueForm.invalid" class="ml-3 inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:opacity-50">
                  Save Venue
                </button>
              </div>
            </form>
          </div>
        </div>
      }

      <!-- Venue List -->
      <div class="bg-white shadow overflow-hidden sm:rounded-md">
        <ul role="list" class="divide-y divide-gray-200">
          @for (venue of venueService.venues(); track venue.id) {
            <li>
              <div class="px-4 py-4 flex items-center sm:px-6">
                <div class="min-w-0 flex-1 sm:flex sm:items-center sm:justify-between">
                  <div class="truncate">
                    <div class="flex text-sm">
                      <p class="font-medium text-blue-600 truncate">{{ venue.name }}</p>
                      <p class="ml-1 flex-shrink-0 font-normal text-gray-500">
                        ($ {{ venue.pricePerHour }}/hr)
                      </p>
                    </div>
                    <div class="mt-2 flex">
                      <div class="flex items-center text-sm text-gray-500">
                        <svg class="flex-shrink-0 mr-1.5 h-5 w-5 text-gray-400" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                        </svg>
                        <p>Capacity: {{ venue.capacity }}</p>
                      </div>
                    </div>
                  </div>
                  <div class="mt-4 flex-shrink-0 sm:mt-0 sm:ml-5 flex items-center gap-3">
                    <span class="text-sm text-gray-500">{{ venue.isActive ? 'Active' : 'Inactive' }}</span>
                    <!-- Toggle Switch -->
                    <button type="button" 
                            (click)="confirmToggleStatus(venue.id, venue.name, venue.isActive)"
                            class="relative inline-flex h-6 w-11 flex-shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
                            [ngClass]="venue.isActive ? 'bg-blue-600' : 'bg-gray-200'"
                            role="switch" [attr.aria-checked]="venue.isActive">
                      <span class="pointer-events-none relative inline-block h-5 w-5 transform rounded-full bg-white shadow ring-0 transition duration-200 ease-in-out"
                            [ngClass]="venue.isActive ? 'translate-x-5' : 'translate-x-0'">
                        <!-- Active icon -->
                        <span class="absolute inset-0 flex h-full w-full items-center justify-center transition-opacity duration-200 ease-in-out"
                              [ngClass]="venue.isActive ? 'opacity-100 ease-in duration-200' : 'opacity-0 ease-out duration-100'"
                              aria-hidden="true">
                          <svg class="h-3 w-3 text-blue-600" fill="currentColor" viewBox="0 0 12 12">
                            <path d="M3.707 5.293a1 1 0 00-1.414 1.414l1.414-1.414zM5 8l-.707.707a1 1 0 001.414 0L5 8zm4.707-3.293a1 1 0 00-1.414-1.414l1.414 1.414zm-7.414 2l2 2 1.414-1.414-2-2-1.414 1.414zm3.414 2l4-4-1.414-1.414-4 4 1.414 1.414z" />
                          </svg>
                        </span>
                        <!-- Inactive icon -->
                        <span class="absolute inset-0 flex h-full w-full items-center justify-center transition-opacity duration-200 ease-in-out"
                              [ngClass]="venue.isActive ? 'opacity-0 ease-out duration-100' : 'opacity-100 ease-in duration-200'"
                              aria-hidden="true">
                          <svg class="h-3 w-3 text-gray-400" fill="none" viewBox="0 0 12 12">
                            <path d="M4 8l2-2m0 0l2-2M6 6L4 4m2 2l2 2" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
                          </svg>
                        </span>
                      </span>
                    </button>
                  </div>
                </div>
              </div>
            </li>
          } @empty {
            <li class="px-4 py-8 text-center text-gray-500">
              No venues found.
            </li>
          }
        </ul>
      </div>
    </div>
  `,
  styles: []
})
export class AdminVenuesComponent {
  venueService = inject(VenueService);
  private fb = inject(FormBuilder);

  showForm = signal(false);

  venueForm = this.fb.group({
    name: ['', Validators.required],
    description: ['', Validators.required],
    capacity: [10, [Validators.required, Validators.min(1)]],
    amenities: ['', Validators.required],
    imageUrl: ['', Validators.required],
    pricePerHour: [50, [Validators.required, Validators.min(0)]],
    isActive: [true]
  });

  onFileSelected(event: Event) {
    const file = (event.target as HTMLInputElement).files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        this.venueForm.patchValue({
          imageUrl: reader.result as string
        });
      };
      reader.readAsDataURL(file);
    }
  }

  onSubmit() {
    if (this.venueForm.invalid) return;

    const formVal = this.venueForm.value;
    const amenitiesArray = formVal.amenities ? formVal.amenities.split(',').map(s => s.trim()) : [];

    this.venueService.addVenue({
      name: formVal.name!,
      description: formVal.description!,
      capacity: Number(formVal.capacity),
      amenities: amenitiesArray,
      imageUrl: formVal.imageUrl!,
      pricePerHour: Number(formVal.pricePerHour),
      isActive: formVal.isActive ?? true
    });

    this.venueForm.reset({ capacity: 10, pricePerHour: 50, isActive: true });
    this.showForm.set(false);
  }

  confirmToggleStatus(id: string, name: string, currentStatus: boolean) {
    const actionText = currentStatus ? 'DEACTIVATE' : 'ACTIVATE';
    const message = `Are you sure you want to ${actionText} "${name}"?\n\n${currentStatus ? 'Users will no longer be able to book this venue.' : 'Users will be able to book this venue.'}`;

    if (window.confirm(message)) {
      this.venueService.toggleVenueStatus(id, !currentStatus);
    }
  }
}
