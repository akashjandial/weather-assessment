export const celsiusToFahrenheit = celsius => {
  return Math.round(celsius * (9 / 5) + 32);
};

export const mphToKph = kph => {
  return (kph / 1.609).toFixed(2);
};
