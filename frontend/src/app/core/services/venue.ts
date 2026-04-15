import { Injectable, signal } from '@angular/core';
import { Venue } from '@prime-space/shared-models';

@Injectable({
  providedIn: 'root'
})
export class VenueService {
  private readonly _venues = signal<Venue[]>([
    {
      id: '1',
      name: 'Grand Horizon Hall',
      description: 'A spacious and elegant hall perfect for weddings and corporate events. Features panoramic views and a modern lighting system.',
      capacity: 500,
      amenities: ['Projector', 'Sound System', 'Catering Area', 'WiFi'],
      imageUrl: 'https://images.unsplash.com/photo-1519167758481-83f550bb49b3?auto=format&fit=crop&q=80&w=1000',
      pricePerHour: 250,
      isActive: true
    },
    {
      id: '2',
      name: 'Cozy Meeting Room A',
      description: 'An intimate space designed for productive team meetings and workshops.',
      capacity: 15,
      amenities: ['Whiteboard', 'TV Screen', 'Coffee Machine', 'WiFi'],
      imageUrl: 'https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&q=80&w=1000',
      pricePerHour: 50,
      isActive: true
    },
    {
      id: '3',
      name: 'The Loft Studio',
      description: 'Industrial-chic studio perfect for photoshoots, art exhibitions, or creative workshops.',
      capacity: 50,
      amenities: ['Natural Light', 'Exposed Brick', 'Kitchenette'],
      imageUrl: 'https://images.unsplash.com/photo-1598488035139-bdbb2231ce04?auto=format&fit=crop&q=80&w=1000',
      pricePerHour: 100,
      isActive: true
    }
  ]);

  readonly venues = this._venues.asReadonly();

  constructor() { }

  getVenueById(id: string): Venue | undefined {
    return this._venues().find(v => v.id === id);
  }

  addVenue(venue: Omit<Venue, 'id'>) {
    const newVenue: Venue = {
      ...venue,
      id: Math.random().toString(36).substring(2, 9)
    };
    this._venues.update(venues => [...venues, newVenue]);
  }

  toggleVenueStatus(id: string, isActive: boolean) {
    this._venues.update(venues =>
      venues.map(v => v.id === id ? { ...v, isActive } : v)
    );
  }
}
