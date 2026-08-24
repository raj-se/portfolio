export type FuzzyResult = { score: number; indices: number[] } | null;

// Subsequence fuzzy matcher — rewards consecutive character matches
export function fuzzyMatch(query: string, target: string): FuzzyResult {
  if (!query) return { score: 0, indices: [] };
  const q = query.toLowerCase();
  const t = target.toLowerCase();
  let qi = 0;
  let lastIndex = -1;
  let score = 0;
  const indices: number[] = [];

  for (let ti = 0; ti < t.length && qi < q.length; ti++) {
    if (t[ti] === q[qi]) {
      indices.push(ti);
      score += lastIndex === ti - 1 ? 3 : 1;
      lastIndex = ti;
      qi++;
    }
  }

  if (qi < q.length) return null;
  return { score, indices };
}