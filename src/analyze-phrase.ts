
type Props = {
  tree: string[],
  phrase: string
  depth: number
}

export function analyzePhrase({
  depth,
  tree,
  phrase
}: Props) {
  const startTime = performance.now();

  const words = phrase.split(' ').map(word => word.toLocaleLowerCase());
  const result = {} as any;

  function traverse(tree: string[], currentDepth: number) {

    if (currentDepth > depth) return;


    for (const key in tree) {
      const child = tree[key];

      if (Array.isArray(child)) {
        const matches = child.filter(query => words.includes(query.toLocaleLowerCase()));
        if (matches.length > 0) {
          result[key] = matches.length;
        }
      }

      if (typeof child !== 'string') {
        traverse(child, currentDepth + 1)
      }
    }
  }

  traverse(tree, 1);

  const endTime = performance.now();

  const analysisTime = endTime - startTime;

  return {
    result,
    analysisTime
  };
}