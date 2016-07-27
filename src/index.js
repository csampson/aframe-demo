'use strict';

const d3 = require('d3');

require('aframe');
require('./index.css');

const planets = [
  {
    label: 'Mercury',
    texture: '#texture-mercury'
  },
  {
    label: 'Venus',
    texture: '#texture-mercury'
  }
];

document.addEventListener('DOMContentLoaded', event => {
  const spheres = d3.select('.space').selectAll('a-sphere');

  spheres.data(planets)
    .enter()
    .append('a-sphere')
    .attr('material', data => `src: ${data.texture}`);
});
