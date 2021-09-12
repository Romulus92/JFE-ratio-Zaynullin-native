// --------------------------- [[ Styles ]] ---------------------------

import '../styles/styles.css';
import '../styles/index.css';

// --------------------------- [[ Scripts ]] --------------------------
const Posts = require('../handlebars/index/posts.hbs');
const SinglePost = require('../handlebars/index/single-post.hbs');

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
  async getSinglePost() {
    const singlePostData = await fetch('https://jsonplaceholder.typicode.com/posts/1')
      .then((response) => {
        return response.json();
      })

    const singlePosts = document.querySelectorAll('.single-post');

    singlePosts.forEach((singlePostContainer) => {
      singlePostContainer.innerHTML = SinglePost({post: singlePostData});
    })
  }
};

const app = {
  init: () => {
    func.getPosts();
    func.getSinglePost();
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