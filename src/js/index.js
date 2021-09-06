// --------------------------- [[ Styles ]] ---------------------------

import '../styles/styles.css';

// --------------------------- [[ Scripts ]] --------------------------
import Handlebars from 'handlebars/dist/handlebars';
const Posts = require('../handlebars/posts.hbs');
const TopPost = require('../handlebars/top-post.hbs');

// Icons sprite
const svgModules = require.context('../assets/img/icons/sprite', false, /\.svg$/);
svgModules.keys().forEach(svgModules);

const func = {
  async getPosts() {
    const postsData = await fetch('https://jsonplaceholder.typicode.com/posts')
      .then((response) => {
        return response.json();
      })

    const postsContainer = document.querySelector('#posts');
    postsContainer.innerHTML = Posts({posts: postsData});
  },
  async getTopPost() {
    const topPostData = await fetch('https://jsonplaceholder.typicode.com/posts/1')
      .then((response) => {
        return response.json();
      })

    const topPostContainer = document.querySelector('#top-post');
    topPostContainer.innerHTML = TopPost({post: topPostData});
  }
};

const app = {
  init: () => {
    func.getPosts();
    func.getTopPost();
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