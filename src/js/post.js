// --------------------------- [[ Styles ]] ---------------------------

import '../styles/styles.css';
import '../styles/post.css';

// --------------------------- [[ Scripts ]] --------------------------
const Body = require('../handlebars/post/body.hbs');

// Icons sprite
const svgModules = require.context('../assets/img/icons/sprite', false, /\.svg$/);
svgModules.keys().forEach(svgModules);

const func = {
  async getBody() {
    const bodyData = await fetch('https://jsonplaceholder.typicode.com/posts/1')
      .then((response) => {
        return response.json();
      })

    const bodyDataContainer = document.querySelector('#body');
    bodyDataContainer.innerHTML = Body({post: bodyData});
  }
};

const app = {
  init: () => {
    func.getBody();
  },
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