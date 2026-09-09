// Hackathon-safe mock service. Replace with OpenWeather/IMD provider in production.
exports.getWeatherForBooking = async (lat, lng, date) => {
  const day = new Date(`${date}T00:00:00`).getDate();
  const rainy = day % 3 === 0;
  return {
    date,
    location: { lat: Number(lat), lng: Number(lng) },
    condition: rainy ? 'Rain expected' : 'Mostly clear',
    rainProbability: rainy ? 70 : 15,
    advisory: rainy ? 'Carry waterproof protection. Procurement may be delayed.' : 'No major weather disruption expected.'
  };
};
