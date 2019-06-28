import React from 'react';
import PropTypes from 'prop-types';
import { points, linkStations } from './variables.js';
import { printCoordinates, getBestLinkStation } from './helpers.js';
import './App.css';

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

const Header = () => (
  <div>
    <svg width="20" height="38" xmlns="http://www.w3.org/2000/svg">
      <path d="M19.76 10.001a.92.92 0 0 1 .155 1.006L7.858 37.429a1.061 1.061 0 0 1-.937.571c-.09 0-.202-.023-.313-.045-.492-.16-.782-.64-.67-1.12l4.398-18.452L1.27 20.69c-.09.023-.178.023-.267.023-.246 0-.513-.092-.692-.251a.909.909 0 0 1-.29-.89L4.51.73C4.621.297 5.023 0 5.493 0h7.324c.559 0 1.005.434 1.005.959a.943.943 0 0 1-.112.41L9.892 11.942l8.843-2.237c.09-.024.179-.046.267-.046.29 0 .559.138.759.342h-.001z" fill="#000" fillRule="nonzero"/>
    </svg>
    <h1>Link station power calulator</h1>
  </div>
)

const App = () => (
  <div className="content">
    <Header />
    <Results />
  </div>
);

NotFound.propTypes = {
  point: PropTypes.array,
};

Result.propTypes = {
  point: PropTypes.array,
  linkStation: PropTypes.array,
  power: PropTypes.number,
};

ResultLine.propTypes = {
  point: PropTypes.array,
};

export default App;
