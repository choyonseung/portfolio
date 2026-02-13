export type Career = {
  id: string;
  companyName: string;
  startDate: string; // YYYY-MM-DD
  endDate?: string;  // 재직중이면 undefined or ""
  isCurrent: boolean;
};

export type Profile = {
  name: string;
  location: string;
  careers: Career[];
};
