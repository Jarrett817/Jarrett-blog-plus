export interface MindMapNode {
  name: string;
  topic?: string;
  id: string;
  routeName?: string;
  root?: boolean;
  expanded?: boolean;
  direction?: 0 | 1;
  style?: { fontSize: string; color: string; background: string };
  tags?: string[];
  icons?: string[];
  hyperLink?: string;
  children?: MindMapNode[];
}
