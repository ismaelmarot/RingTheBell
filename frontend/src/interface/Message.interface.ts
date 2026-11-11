export interface Message {
  id: string;
  visit_id: string;
  sender_id: string | null;
  sender_name: string;
  content: string | null;
  image_url: string | null;
  created_at: string;
}
