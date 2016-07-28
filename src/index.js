'use strict';

const d3 = require('d3');

require('aframe');
require('./index.css');

const SUN_DIAMETER = 20;
const SCALE_FACTOR = 1;
const TIME_FACTOR  = 250;

const bodies = [
  {
    name: 'Sun',
    texture: '#texture-sun',
    diameter: SUN_DIAMETER,
    distance: 0,
    rotation: 587.28 * TIME_FACTOR,
    revolution: 0
  },
  {
    name: 'Mercury',
    texture: '#texture-mercury',
    diameter: 0.382,
    distance: 0.387 * SCALE_FACTOR + SUN_DIAMETER,
    rotation: 1392 * TIME_FACTOR,
    revolution: 88 * TIME_FACTOR
  },
  {
    name: 'Venus',
    texture: '#texture-venus',
    diameter: 0.95,
    distance: 0.723 * SCALE_FACTOR + SUN_DIAMETER + 20,
    rotation: 2784 * TIME_FACTOR,
    revolution: 225 * TIME_FACTOR
  },
  {
    name: 'Earth',
    texture: '#texture-earth',
    diameter: 1,
    distance: 1 * SCALE_FACTOR + SUN_DIAMETER + 20,
    rotation: 24 * TIME_FACTOR,
    revolution: 365 * TIME_FACTOR
  },
  {
    name: 'Mars',
    texture: '#texture-mars',
    diameter: 0.53,
    distance: 1.524 * SCALE_FACTOR + SUN_DIAMETER + 20,
    rotation: 24 * TIME_FACTOR,
    revolution: 687 * TIME_FACTOR
  }
];

const orbits = d3.select('.bodies').selectAll('a-entity');

// Apply orbital periods
orbits.data(bodies)
  .enter()
  .append('a-entity')
    .append('a-animation')
      .attr('attribute', 'rotation')
      .attr('dur', body => body.revolution)
      .attr('fill', 'forwards')
      .attr('to', '0 360 0')
      .attr('easing', 'linear')
      .attr('repeat', 'indefinite');

// Apply textures, distances from sun, rotational periods
orbits.data(bodies)
  .enter()
  .selectAll('a-entity')
  .append('a-sphere')
  .attr('id', body => body.name)
  .attr('material', body => `src: ${body.texture}`)
  .attr('position', body => `${body.distance} 0 -1`)
  .attr('scale', body => `${body.diameter} ${body.diameter} ${body.diameter}`)
    .append('a-animation')
      .attr('attribute', 'rotation')
      .attr('dur', body => body.rotation)
      .attr('fill', 'forwards')
      .attr('to', '0 360 0')
      .attr('easing', 'linear')
      .attr('repeat', 'indefinite');
