const OPENWEATHER_API_KEY = process.env.OPENWEATHER_API_KEY || '';

exports.getWeatherForBooking = async (lat, lng, date) => {
  const latitude = Number(lat) || 26.7271; // Siliguri / Darjeeling default
  const longitude = Number(lng) || 88.4286;

  try {
    const url = `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&units=metric&appid=${OPENWEATHER_API_KEY}`;
    const response = await fetch(url);
    if (!response.ok) throw new Error('OpenWeather response not ok');
    const data = await response.json();

    const temp = Math.round(data.main.temp);
    const humidity = data.main.humidity;
    const windSpeed = Math.round(data.wind.speed * 3.6); // m/s to km/h
    const condition = data.weather?.[0]?.main || 'Clear';
    const description = data.weather?.[0]?.description || 'Clear sky';
    const rainProb = data.clouds?.all || 15;

    let advisory = 'Optimal weather conditions for produce transport and Mandi weighing.';
    if (condition.toLowerCase().includes('rain') || rainProb > 50) {
      advisory = 'Rain forecast detected. Cover harvested produce with waterproof tarpaulins to prevent moisture dockage deductions.';
    }

    return {
      date: date || new Date().toISOString().slice(0, 10),
      locationName: data.name || 'Siliguri',
      location: { lat: latitude, lng: longitude },
      temperature: temp,
      humidity,
      windSpeed,
      condition,
      description,
      rainProbability: rainProb,
      advisory,
      isLive: true
    };
  } catch (err) {
    return {
      date: date || new Date().toISOString().slice(0, 10),
      locationName: 'Siliguri',
      location: { lat: latitude, lng: longitude },
      temperature: 24,
      humidity: 68,
      windSpeed: 12,
      condition: 'Partly cloudy',
      description: 'partly cloudy',
      rainProbability: 20,
      advisory: 'Optimal weather conditions for produce transport and Mandi weighing.',
      isLive: false
    };
  }
};
