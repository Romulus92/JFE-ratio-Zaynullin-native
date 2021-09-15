// --------------------------- [[ Styles ]] ---------------------------

import '../styles/styles.css';
import '../styles/index.css';

// --------------------------- [[ Scripts ]] --------------------------
const Posts = require('../handlebars/index/posts.hbs');
const TopPost = require('../handlebars/index/top-post.hbs');
const FocusPost = require('../handlebars/index/focus-post.hbs');

const func = {
  async getPosts() {
    const postsFetch = await fetch('https://jsonplaceholder.typicode.com/posts')
      .then((response) => {
        return response.json();
      })

    const postsData = postsFetch.slice(0, 3);

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
  },
  async getFocusPost() {
    const topFocusData = await fetch('https://jsonplaceholder.typicode.com/posts/15')
      .then((response) => {
        return response.json();
      })

    const focusPostContainer = document.querySelector('#focus-post');
    focusPostContainer.innerHTML = FocusPost({post: topFocusData});
  }
};

const app = {
  init: () => {
    func.getPosts();
    func.getTopPost();
    func.getFocusPost();
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