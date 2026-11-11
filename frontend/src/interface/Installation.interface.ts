export interface Installation {
  id: string;
  name: string;
  type: string;
  created_at: string;
}

export interface Unit {
  id: string;
  installation_id: string;
  code: string;
  floor: string | null;
}
