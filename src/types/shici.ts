export interface Shici {
  id: string;
  content: string;
  popularity: number;
  origin: {
    title: string;
    dynasty: string;
    author: string;
    content: string[];
    translate: string[];
  };
  matchTags: string[];
  recommendedReason: string;
  cacheAt: string;
}
