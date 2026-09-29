import '../lib/animate/animate.min.css';
import '../css/bootstrap.min.css';
import '../css/style.css';

import $ from 'jquery';
window.jQuery = window.$ = $;

import * as bootstrap from 'bootstrap';
window.bootstrap = bootstrap;

import WOW from '../lib/wow/wow.min.js';
window.WOW = WOW;

import '../lib/easing/easing.min.js';
import '../js/glowny.js';

const yearEl = document.getElementById('year');
if (yearEl) {
  yearEl.textContent = String(new Date().getFullYear());
}
