const points = [
  [0,0],
  [100,100],
  [15,10],
  [18,18],
];

// Coordinates for linkStations.
const linkStations = [
  [0, 0, 10],
  [20, 20, 5],
  [10, 0, 12],
];

/**
 * Prints out a two-dimensional coordinate point to string.
 * 
 * Used in helping to print out the results of the main program.
 *
 * @param {Array} point                       Coordinates of a single device.
 *
 * @return {String} Printed out coordinates.
 */
const printCoordinates = (point) => {
  return `${point[0]},${point[1]}`;
};

/**
 * Calculates the distance between a device and link station.
 *
 * Uses the formula sqrt((x1-x2)^2+(y1-y2)^2).
 *
 * @param {Array} device                      Coordinates of a single device.
 * @param {Array} linkStation                 Coordinates of a single link station.
 *
 * @return {Number} Distance between device and link station.
 */
const calculateDistance = (device, linkStation) => {
  const distanceX = device[0] - linkStation[0];
  const distanceY = device[1] - linkStation[1];
  return Math.sqrt(Math.pow(distanceX, 2) + Math.pow(distanceY, 2));
};

/**
 * Calculates the power of a single link station.
 *
 * Uses the formula power = (reach - device's distance from link station)^2
 * 
 * @param {Number} reach                      Reach of a single link station.
 * @param {Number} distanceFromLinkStation    Distance between a device and link station.
 *
 * @return {Number} Power of a link station relative to a device.
 */
const calculatePower = (reach, distanceFromLinkStation) => { 
  let power = 0;
  const difference = reach - distanceFromLinkStation;
  if (difference > 0) {
    power = Math.pow(difference, 2);
  }
  return power;
};

/**
 * Calculates the link station with the most power in respect to the device's point.
 *
 * @param {Array} point                       Coordinates of a single device.
 *
 * @return {Array} Array index and power of the link station with the most power.
 */
const getBestLinkStation = (point) => {

  let maximumPowerIndex = -1;
  let maximumPower = 0;

  linkStations.forEach((linkStation, index) => {
    const distance = calculateDistance(point, linkStation);
    const power = calculatePower(linkStation[2], distance);
    if (power > maximumPower) {
      maximumPower = power;
      maximumPowerIndex = index;
    }
  });
  return [maximumPowerIndex, maximumPower];
};

/**
 * Main program.
 *
 * The purpose of the program is to find out the best link station with the most
 * power for each device that is given.
 * 
 * It runs as follows:
 *  1) Finds out the best link station for each given point, and
 *  2) Prints out:
 *    a) The coordinates and power of each result, or
 *    b) That no result was found.
 */

const main = () => {
  points.forEach((point) => {
    const [index, power] = getBestLinkStation(point);
    if (index > -1) {
      const linkStation = linkStations[index];
      console.log(`Best link station for point ${printCoordinates(point)} is ${printCoordinates(linkStation)} with power ${power.toFixed(2)}`);
    } else {
      console.log(`No link station within reach for point ${printCoordinates(point)}`);
    }
  });
};

main();