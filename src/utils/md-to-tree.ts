import { v4 as uuidv4 } from 'uuid';
import { CatalogNode } from '@/types/tree';
const isTitle = (str: string, level: 1 | 2 | 3) => {
  const reg = new RegExp(`^#{${level}}(?!#)`);
  return reg.test(str);
};

const findLastNode = (
  tree: CatalogNode[],
  level: number
): CatalogNode | null => {
  let target = null;
  for (let i = 0; i < level; i++) {
    if (!target) target = tree[tree.length - 1] || null;
    else target = target.children[target.children.length - 1] || null;
  }
  return target;
};

const textExtract = (str: string) => {
  return str.split(/\s/)[1];
};
class TreeNode {
  id: string;
  name: string;
  level: number;
  children: CatalogNode[];
  constructor(name: string, level?: number) {
    this.id = level ? uuidv4() : 'root';
    this.name = name;
    this.level = level || 0;
    this.children = [];
  }
}

export const mdToTree = (mdContent: string): CatalogNode => {
  const arr = mdContent
    .split(/\n+/)
    .filter(s => s !== '')
    .map(s => s.trim());
  const tree = arr.reduce((res: CatalogNode[], str: string) => {
    if (isTitle(str, 1)) {
      res.push(new TreeNode(textExtract(str)));
    } else if (isTitle(str, 2)) {
      findLastNode(res, 1)?.children.push(new TreeNode(textExtract(str), 1));
    } else if (isTitle(str, 3)) {
      findLastNode(res, 2)?.children.push(new TreeNode(textExtract(str), 2));
    }
    return res;
  }, []);
  return tree[0] || null;
};
