export const cosineSimilarity = (a, b) => {
    if (!a.length || !b.length) return 0;
  
    let dot = 0;
    let magA = 0;
    let magB = 0;
  
    const len = Math.min(a.length, b.length);
  
    for (let i = 0; i < len; i++) {
      dot += a[i] * b[i];
      magA += a[i] * a[i];
      magB += b[i] * b[i];
    }
  
    magA = Math.sqrt(magA);
    magB = Math.sqrt(magB);
  
    if (magA === 0 || magB === 0) return 0;
  
    return Number(((dot / (magA * magB)) * 100).toFixed(2));
  };