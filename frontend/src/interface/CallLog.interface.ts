export interface CallLog {
  id: string;
  visit_id: string;
  type: 'audio' | 'video';
  initiator_id: string | null;
  initiator_name: string;
  started_at: string | null;
  ended_at: string | null;
  duration_seconds: number | null;
  result: 'accepted' | 'rejected' | 'missed' | 'ended';
  created_at: string;
}
