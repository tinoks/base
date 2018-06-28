import iziToast from 'iziToast';
import '../node_modules/izitoast/dist/css/iziToast.min.css';
window.iziToast = iziToast;

import './style.css';
import './styles/nav.css';

import * as turf from '@turf/turf';
window.turf = turf;

import './map.js';
import './progress.js';
import './nav.js';
import './mapfunctions.js';

//import './demodata.js';

import './draglayer.js';


