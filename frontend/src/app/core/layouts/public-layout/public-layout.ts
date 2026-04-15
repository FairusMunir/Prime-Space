import { Component, inject, signal } from '@angular/core';
import { RouterOutlet, RouterLink, Router } from '@angular/router';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';

@Component({
  selector: 'app-public-layout',
  standalone: true,
  imports: [RouterOutlet, RouterLink, ReactiveFormsModule],
  template: `
    <div class="min-h-screen flex flex-col bg-gray-50 text-gray-900 font-sans">
      <header class="bg-white shadow-sm border-b border-gray-200 sticky top-0 z-50">
        <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div class="flex justify-between h-16">
            <div class="flex">
              <div class="flex-shrink-0 flex items-center">
                <a routerLink="/" class="text-xl font-bold text-blue-600 tracking-tight flex items-center gap-2">
                  <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                  </svg>
                  PrimeSpace
                </a>
              </div>
            </div>
            <div class="flex items-center">
              <button (click)="showLogin.set(true)" class="text-sm font-medium text-gray-500 hover:text-gray-900 transition-colors">Admin Login</button>
            </div>
          </div>
        </div>
      </header>

      <main class="flex-grow">
        <router-outlet></router-outlet>
      </main>

      <footer class="bg-white border-t border-gray-200 mt-auto">
        <div class="max-w-7xl mx-auto py-6 px-4 sm:px-6 lg:px-8">
          <p class="text-center text-sm text-gray-500">&copy; 2026 PrimeSpace Booking MVP. All rights reserved.</p>
        </div>
      </footer>

      <!-- Login Modal -->
      @if (showLogin()) {
        <div class="fixed inset-0 z-50 overflow-y-auto" aria-labelledby="modal-title" role="dialog" aria-modal="true">
          <div class="flex items-end justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
            <!-- Background overlay -->
            <div class="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" aria-hidden="true" (click)="showLogin.set(false)"></div>

            <!-- Modal panel -->
            <div class="inline-block align-bottom bg-white rounded-lg px-4 pt-5 pb-4 text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-sm sm:w-full sm:p-6">
              <div>
                <div class="mx-auto flex items-center justify-center h-12 w-12 rounded-full bg-blue-100">
                  <svg class="h-6 w-6 text-blue-600" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                  </svg>
                </div>
                <div class="mt-3 text-center sm:mt-5">
                  <h3 class="text-lg leading-6 font-medium text-gray-900" id="modal-title">
                    Admin Login
                  </h3>
                  <div class="mt-2">
                    <p class="text-sm text-gray-500">
                      Please enter your credentials to access the admin panel.
                      <br><span class="text-xs italic">(Hint: admin / password)</span>
                    </p>
                  </div>
                </div>
              </div>
              <form [formGroup]="loginForm" (ngSubmit)="onLogin()" class="mt-5 sm:mt-6 space-y-4">
                <div>
                  <label for="username" class="sr-only">Username</label>
                  <input type="text" id="username" formControlName="username" class="appearance-none rounded-md relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-blue-500 focus:border-blue-500 focus:z-10 sm:text-sm" placeholder="Username">
                </div>
                <div>
                  <label for="password" class="sr-only">Password</label>
                  <input type="password" id="password" formControlName="password" class="appearance-none rounded-md relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-blue-500 focus:border-blue-500 focus:z-10 sm:text-sm" placeholder="Password">
                </div>
                @if (loginError()) {
                  <p class="text-sm text-red-600 text-center">{{ loginError() }}</p>
                }
                <div class="mt-5 sm:mt-6 sm:flex sm:flex-row-reverse">
                  <button type="submit" [disabled]="loginForm.invalid" class="w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-blue-600 text-base font-medium text-white hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 sm:ml-3 sm:w-auto sm:text-sm disabled:opacity-50">
                    Sign in
                  </button>
                  <button type="button" (click)="closeLogin()" class="mt-3 w-full inline-flex justify-center rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-base font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 sm:mt-0 sm:w-auto sm:text-sm">
                    Cancel
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      }
    </div>
  `,
  styles: []
})
export class PublicLayoutComponent {
  showLogin = signal(false);
  loginError = signal('');

  private fb = inject(FormBuilder);
  private router = inject(Router);

  loginForm = this.fb.group({
    username: ['', Validators.required],
    password: ['', Validators.required]
  });

  onLogin() {
    if (this.loginForm.invalid) return;

    const { username, password } = this.loginForm.value;
    if (username === 'admin' && password === 'password') {
      this.closeLogin();
      this.router.navigate(['/admin']);
    } else {
      this.loginError.set('Invalid credentials. Please try again.');
    }
  }

  closeLogin() {
    this.showLogin.set(false);
    this.loginError.set('');
    this.loginForm.reset();
  }
}
