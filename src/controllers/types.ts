export interface ArticleQuery {
  sort_by: string;
  order: string;
  topic: string;
  limit: number;
  p: number;
}

export interface Article {
  author: string;
  body: string;
  title: string;
  article_id: number;
  topic: string;
  created_at: string;
  votes: number;
  article_img_url: string;
  comment_count: number;
}

export interface Comment {
  comment_id: number;
  body: string;
  votes: number;
  author: string;
  article_id: number;
  created_at: any;
}
