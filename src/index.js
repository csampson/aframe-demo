'use strict';

const d3 = require('d3');

require('aframe');
require('./index.css');

const SUN_DIAMETER = 50;
const SCALE_FACTOR = 30;
const TIME_FACTOR  = 250;
const REVOLUTION_DIVISOR = 5;

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
    distance: SUN_DIAMETER + 0.191 + 0.387  + SCALE_FACTOR,
    rotation: 1392 * TIME_FACTOR,
    revolution: 88 * TIME_FACTOR / REVOLUTION_DIVISOR
  },
  {
    name: 'Venus',
    texture: '#texture-venus',
    diameter: 0.95,
    distance: SUN_DIAMETER + 0.475 + 0.723 + SCALE_FACTOR,
    rotation: 2784 * TIME_FACTOR,
    revolution: 225 * TIME_FACTOR / REVOLUTION_DIVISOR
  },
  {
    name: 'Earth',
    texture: '#texture-earth',
    diameter: 1,
    distance: SUN_DIAMETER + 0.5 + 1 * SCALE_FACTOR,
    rotation: 24 * TIME_FACTOR,
    revolution: 365 * TIME_FACTOR / REVOLUTION_DIVISOR
  },
  {
    name: 'Mars',
    texture: '#texture-mars',
    diameter: 0.53,
    distance: SUN_DIAMETER + 1.524 + 0.265 * SCALE_FACTOR,
    rotation: 24 * TIME_FACTOR,
    revolution: 687 * TIME_FACTOR / REVOLUTION_DIVISOR
  },
  {
    name: 'Jupiter',
    texture: '#texture-jupiter',
    diameter: 11.19,
    distance: SUN_DIAMETER + 5.595 + 4.86 * SCALE_FACTOR,
    rotation: 9 * TIME_FACTOR,
    revolution: 4380 * TIME_FACTOR / REVOLUTION_DIVISOR
  },
  {
    name: 'Saturn',
    texture: '#texture-saturn',
    diameter: 9.40,
    distance: SUN_DIAMETER + 4.7 + 9.6 * SCALE_FACTOR,
    rotation: 10 * TIME_FACTOR,
    revolution: 10585 * TIME_FACTOR / REVOLUTION_DIVISOR
  },
  {
    name: 'Uranus',
    texture: '#texture-uranus',
    diameter: 4.04,
    distance: SUN_DIAMETER + 2.02 + 19.2 * SCALE_FACTOR,
    rotation: 10 * TIME_FACTOR,
    revolution: 30576 * TIME_FACTOR / REVOLUTION_DIVISOR
  },
  {
    name: 'Neptune',
    texture: '#texture-neptune',
    diameter: 3.88,
    distance: SUN_DIAMETER + 1.94 + 30.1 * SCALE_FACTOR,
    rotation: 10 * TIME_FACTOR,
    revolution: 60225 * TIME_FACTOR / REVOLUTION_DIVISOR
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
