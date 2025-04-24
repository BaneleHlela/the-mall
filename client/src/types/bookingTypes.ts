export interface Booking {
  id: string;
  user: string,
  store: string;
  service: string;
  customerName: string;
  date: string;
  time: string;
  status: 'confirmed' | 'pending' | 'canceled';
  notes: string;
}

export interface BookingState {
  bookingList: Booking[];
  selectedBooking: Booking | null;
  loading: boolean;
  error: string | null;
}
