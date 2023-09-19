export interface Entry {
  id: number;
  weather: string;
  visibility: string;
  date: string;
  comment: string;
}

export interface Notification {
  class: string;
  message: string;
}

export type NewEntry = Omit<Entry, "id">;
