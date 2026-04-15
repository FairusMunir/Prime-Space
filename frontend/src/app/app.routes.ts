import { Route } from '@angular/router';

export const appRoutes: Route[] = [
    {
        path: '',
        loadComponent: () => import('./core/layouts/public-layout/public-layout').then(m => m.PublicLayoutComponent),
        children: [
            {
                path: '',
                loadComponent: () => import('./features/home/home').then(m => m.HomeComponent)
            },
            {
                path: 'venue/:id',
                loadComponent: () => import('./features/venue-detail/venue-detail').then(m => m.VenueDetailComponent)
            }
        ]
    },
    {
        path: 'admin',
        loadComponent: () => import('./core/layouts/admin-layout/admin-layout').then(m => m.AdminLayoutComponent),
        children: [
            {
                path: '',
                redirectTo: 'dashboard',
                pathMatch: 'full'
            },
            {
                path: 'dashboard',
                loadComponent: () => import('./features/admin/admin-dashboard/admin-dashboard').then(m => m.AdminDashboardComponent)
            },
            {
                path: 'venues',
                loadComponent: () => import('./features/admin/admin-venues/admin-venues').then(m => m.AdminVenuesComponent)
            },
            {
                path: 'bookings',
                loadComponent: () => import('./features/admin/admin-bookings/admin-bookings').then(m => m.AdminBookingsComponent)
            }
        ]
    },
    {
        path: '**',
        redirectTo: ''
    }
];
