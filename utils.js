// Haversine Formula -  calculates the distance between two points on a sphere 'as the crow flies'.
// Adapted from: https://www.geodatasource.com/developers/javascript
export const getDistance = ({ lat1, lon1, lat2, lon2 }) => {
  const radlat1 = deg2rad(lat1);
  const radlat2 = deg2rad(lat2);
  const theta = lon1 - lon2;
  const radtheta = (Math.PI * theta) / 180;

  let dist =
    Math.sin(radlat1) * Math.sin(radlat2) +
    Math.cos(radlat1) * Math.cos(radlat2) * Math.cos(radtheta);

  if (dist > 1) dist = 1;
  dist = Math.acos(dist);
  dist = (dist * 180) / Math.PI;
  dist = dist * 60 * 1.1515 * 1.609344;
  const distFormatted = dist.toFixed(1);
  
  // Handle the case of missing data resulting in a NaN
  if (isNaN(distFormatted)) {
    return "Missing data - could not calculate"
  }
  return distFormatted;
};

function deg2rad(deg) {
  return (Math.PI * deg) / 180;
}
