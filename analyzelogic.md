function analyzeRGB(data: Uint8ClampedArray) {
  const [rTotal, gTotal, bTotal] = [0, 0, 0];
  const length = data.length / 4;
  for (let i = 0; i < data.length; i += 4) {
    rTotal += data[i];     // Red
    gTotal += data[i + 1]; // Green
    bTotal += data[i + 2]; // Blue
  }
  const rAvg = rTotal / length;
  const gAvg = gTotal / length;
  const bAvg = bTotal / length;
  const deviation = Math.max(
    Math.abs(rAvg - gAvg),
    Math.abs(rAvg - bAvg),
    Math.abs(gAvg - bAvg)
  );
  return {
    rAvg, gAvg, bAvg,
    deviation,
    status:
      deviation < 10 ? "OK" :
      deviation < 20 ? "Warning" : "Alert"
  };
}
