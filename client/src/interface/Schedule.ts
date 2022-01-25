export interface Day {
  isAvailable: boolean;
  start?: number;
  end?: number;
}

export interface Days {
  monday?: Day;
  tuesday?: Day;
  wednesday?: Day;
  thursday?: Day;
  friday?: Day;
  saturday?: Day;
  sunday?: Day;
}

export interface Schedule {
  _id?: string;
  name: string;
  days: Days;
}
