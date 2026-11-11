export interface Visit {
  id: string;
  installation_id: string;
  unit_id: string | null;
  visitor_name: string;
  visitor_photo: string | null;
  reason: string | null;
  company: string | null;
  status: 'PENDING' | 'ACCEPTED' | 'REJECTED' | 'EXPIRED' | 'FINALIZED';
  requested_at: string;
  responded_at: string | null;
  responded_by: string | null;
  decision_note: string | null;
  auto_responded: number;
}
