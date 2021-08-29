// --------------------------- [[ Styles ]] ---------------------------

import '../styles/styles.css';

// --------------------------- [[ Scripts ]] --------------------------
import Handlebars from 'handlebars/dist/handlebars';
const Posts = require('../handlebars/partials/posts.hbs');

// Icons sprite
const svgModules = require.context('../assets/img/icons/sprite', false, /\.svg$/);
svgModules.keys().forEach(svgModules);

const func = {
  async getPosts() {
    const postsData = await fetch('https://jsonplaceholder.typicode.com/posts')
      .then((response) => {
        return response.json();
      })
    console.log(postsData);
    console.log(Posts);

    const postsContainer = document.querySelector('#posts');
    postsContainer.innerHTML = Posts({posts: postsData});
  }
};

const app = {
  init: () => {
    func.getPosts();
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