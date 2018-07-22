import iziToast from 'iziToast';
import '../node_modules/izitoast/dist/css/iziToast.min.css';
window.iziToast = iziToast;

import './style.css';

import * as turf from '@turf/turf';
window.turf = turf;

import * as riot from 'riot';
window.riot = riot;

//tinyColor
import * as tinycolor from 'tinycolor2';
window.tinycolor = tinycolor;


import './KORTxyzDiv.js'
import './map.js';
import './nav/nav.js';

import './progress.js';
import './functions/mapfunctions.js';
import './functions/layerListfunctions.js';

import './demodata.js';

import './draglayer.js';

