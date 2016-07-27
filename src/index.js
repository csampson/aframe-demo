'use strict';

const d3 = require('d3');

require('aframe');
require('./index.css');

const SCALE_FACTOR = 20;

const bodies = [
  // {
  //   name: 'Sun',
  //   texture: '#texture-sun',
  //   diameter: 1392e3 / SCALE_FACTOR,
  //   distance: 0
  // },
  {
    name: 'Mercury',
    texture: '#texture-mercury',
    diameter: 4879 / 1e4,
    distance: 0.39 * SCALE_FACTOR
  },
  {
    name: 'Venus',
    texture: '#texture-venus',
    diameter: 12104 / 1e4,
    distance: 0.723 * SCALE_FACTOR
  },
  {
    name: 'Earth',
    texture: '#texture-earth',
    diameter: 12756 / 1e4,
    distance: 1 * SCALE_FACTOR
  },
  {
    name: 'Mars',
    texture: '#texture-mars',
    diameter: 6794 / 1e4,
    distance: 1.524 * SCALE_FACTOR
  }
];

document.addEventListener('DOMContentLoaded', event => {
  const spheres = d3.select('.space').selectAll('a-sphere');

  spheres.data(bodies)
    .enter()
    .append('a-sphere')
    .attr('id', body => body.name)
    .attr('material', body => `src: ${body.texture}`)
    .attr('position', body => `${body.distance} 0 -1`)
    .attr('scale', body => `${body.diameter} ${body.diameter} ${body.diameter}`);
});
