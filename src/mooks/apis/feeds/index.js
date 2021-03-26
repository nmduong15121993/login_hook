import { posts, getIDPost} from './init';
import { fakePromise } from '../helper';

class Feeds {
  constructor() {
    this.posts = posts;
  }

  getFeed(id) {
    const ind = this.posts.findIndex((item) => item.id === id);
    if (ind < 0) return undefined;
    return fakePromise(this.posts[ind]);
  }

  getFeeds() {
    const allPosts = this.posts.map((post) => {
      // const { detail, comments, ...postItem } = post;
      const postItem = post;
      return postItem;
    })
    return fakePromise(allPosts);
  }

  addFeed({ idAuther, title, img, description, detail }) {
    const newFeed = {
      id: getIDPost(),
      idAuther,
      title,
      img,
      description,
      detail,
      comments: [], // Default la ko co ai comments
    }
    this.posts.push(newFeed);
    return fakePromise(newFeed);
  }

  editFeed(data) {
    const { id } = data;
    const indPosts = !id ? -1 : this.posts.findIndex((post) => post.id === id);
    
    if (indPosts < 0) return fakePromise(undefined, 'ID not found!');
    // Object.assign
    this.posts[indPosts] = { ...this.posts[indPosts], ...data };
    return fakePromise(data);
  }

  removeFeed(id) {
    console.log(id);
    console.log(this.posts);
    const indPosts = !id ? -1 : this.posts.findIndex((post) => post.id === id);

    console.log(indPosts);
    if (indPosts < 0) return fakePromise(undefined, 'ID not found!');
    this.posts.splice(indPosts, 1);
    // console.log(this.posts);
    return fakePromise(this.posts);
  }
}

export { Feeds };
