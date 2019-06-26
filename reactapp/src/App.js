import React from 'react';
import { points, linkStations } from './variables.js';
import { printCoordinates, getBestLinkStation } from './helpers.js';


const NotFound = ({ point }) => (
  <div>
    No link station within reach for point {printCoordinates(point)}
  </div>
);

const Result = ({ point, linkStation, power }) => (
  <div>
    Best link station for point {printCoordinates(point)} is {printCoordinates(linkStation)} with power {power.toFixed(2)}
  </div>
);

const ResultLine = ({ point }) => {
  const [index, power] = getBestLinkStation(point);
  if (index > -1) {
    return (
      <Result
        linkStation={linkStations[index]}
        point={point}
        power={power}
      />
    );
  } else {
    return (
      <NotFound point={point} />
    );
  }
};

const Results = () => (
  points.map((point, index) =>
    <ResultLine key={index} point={point}/>
  )
);

const App = () => (
  <div>
    <h1>Link station power calulator</h1>
    <Results />
  </div>
);

export default App;
