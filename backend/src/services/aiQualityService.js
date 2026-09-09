const analyzeCropImage = async (imagePath) => {
  if (process.env.USE_MOCK_AI === 'true') {
    // Generate realistic inspection mock results
    const moisturePct = Number((Math.random() * (18 - 8) + 8).toFixed(1));
    const drynessScore = Number((100 - moisturePct * 4).toFixed(1));
    const rottenPct = Number((Math.random() * 5).toFixed(1));
    let grade = 'A';
    if (moisturePct > 14 || rottenPct > 3) grade = 'B';
    if (moisturePct > 16 || rottenPct > 4) grade = 'C';

    return {
      moisturePct,
      drynessScore,
      rottenPct,
      grade,
      annotatedImagePath: imagePath
    };
  }
  
  // Production integration point for vision API (Gemini/Claude)
  throw new Error("Real AI vision API integration requires USE_MOCK_AI=false and API key setup.");
};

module.exports = { analyzeCropImage };