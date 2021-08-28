// --------------------------- [[ Styles ]] ---------------------------

import '../styles/styles.css';

// --------------------------- [[ Scripts ]] --------------------------

// Icons sprite
const svgModules = require.context('../assets/img/icons/sprite', false, /\.svg$/);
svgModules.keys().forEach(svgModules);

const func = {};

const app = {
  init: () => {},
  scroll: () => {},
  load: () => {},
  resize: () => {},
};

app.init();
window.addEventListener('load', () => {
  app.load();
});
window.addEventListener('resize', () => {
  app.resize();
});
window.addEventListener('scroll', () => {
  app.scroll();
});