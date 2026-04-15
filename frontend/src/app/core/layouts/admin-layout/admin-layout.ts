import { Component } from '@angular/core';
import { RouterOutlet, RouterLink, RouterLinkActive } from '@angular/router';

@Component({
  selector: 'app-admin-layout',
  standalone: true,
  imports: [RouterOutlet, RouterLink, RouterLinkActive],
  template: `
    <div class="min-h-screen bg-gray-100 flex flex-col md:flex-row">
      <!-- Sidebar / Mobile Header -->
      <header class="bg-slate-900 text-white w-full md:w-64 md:min-h-screen flex-shrink-0 flex flex-col sticky top-0 z-50 md:static md:z-auto">
        <div class="h-16 flex items-center justify-between px-6 border-b border-slate-800">
          <a routerLink="/admin" class="text-xl font-bold tracking-tight flex items-center gap-2">
            <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 text-blue-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
            </svg>
            Admin Panel
          </a>
          <a routerLink="/" class="text-sm text-slate-400 hover:text-white transition-colors flex items-center md:hidden" aria-label="Back to site">
            &larr; <span class="sr-only sm:not-sr-only sm:ml-1">Site</span>
          </a>
        </div>
        <nav class="flex-1 px-4 py-6 space-y-2 overflow-y-auto hidden md:block">
          <a routerLink="/admin/dashboard" routerLinkActive="bg-slate-800 text-white" class="text-slate-300 hover:bg-slate-800 hover:text-white group flex items-center px-2 py-2 text-sm font-medium rounded-md transition-colors">
            Dashboard
          </a>
          <a routerLink="/admin/venues" routerLinkActive="bg-slate-800 text-white" class="text-slate-300 hover:bg-slate-800 hover:text-white group flex items-center px-2 py-2 text-sm font-medium rounded-md transition-colors">
            Venues
          </a>
          <a routerLink="/admin/bookings" routerLinkActive="bg-slate-800 text-white" class="text-slate-300 hover:bg-slate-800 hover:text-white group flex items-center px-2 py-2 text-sm font-medium rounded-md transition-colors">
            Bookings
          </a>
        </nav>
        <!-- Mobile nav quick links -->
        <div class="md:hidden flex justify-around p-3 border-t border-slate-800 bg-slate-900 text-xs overflow-x-auto">
           <a routerLink="/admin/dashboard" routerLinkActive="text-blue-400 font-bold" class="text-slate-300 px-3 py-1 whitespace-nowrap">Dashboard</a>
           <a routerLink="/admin/venues" routerLinkActive="text-blue-400 font-bold" class="text-slate-300 px-3 py-1 whitespace-nowrap">Venues</a>
           <a routerLink="/admin/bookings" routerLinkActive="text-blue-400 font-bold" class="text-slate-300 px-3 py-1 whitespace-nowrap">Bookings</a>
        </div>
        <div class="p-4 border-t border-slate-800 hidden md:block">
          <a routerLink="/" class="text-sm text-slate-400 hover:text-white transition-colors flex items-center gap-2">
            &larr; Back to Site
          </a>
        </div>
      </header>

      <!-- Main Content Area -->
      <main class="flex-1 flex flex-col min-w-0 overflow-hidden">
        <div class="flex-1 overflow-y-auto p-4 sm:p-6 lg:p-8">
          <router-outlet></router-outlet>
        </div>
      </main>
    </div>
  `,
  styles: []
})
export class AdminLayoutComponent { }
