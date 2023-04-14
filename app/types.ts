export interface WPschema {
  id: number;
  date: number;
  title: {
    rendered: string;
  };
  source_url: string;
  mime_type: string;
  description: {
    rendered: string;
  };
}
