const posts = [
  {
    // Id post
    id: 1,
    // ID nguoi dang bai viet
    idAuther: 1,
    title: 'Hot Girl',
    img: 'https://i.pinimg.com/564x/fa/c8/f6/fac8f6868cf0e53c42028d8c600dc6b2.jpg',
    description: '',
    detail: '',
    comments: [
      { idUser: 1, content: 'So beautyfull', time: Date.now() },
      { idUser: 2, content: 'too bad', time: Date.now() }
    ]
  },
  {
    // Id post
    id: 2,
    // ID nguoi dang bai viet
    idAuther: 2,
    title: 'FoodBall',
    img: 'https://st3.depositphotos.com/3384541/18813/i/1600/depositphotos_188138092-stock-photo-beautiful-sports-girl-posing-with.jpg',
    description: '',
    detail: '',
    comments: [
      { idUser: 2, content: '', time: Date.now() }
    ]
  }
];

const getIDPost = () => {
  const lastIndID = posts[posts.length - 1].id;
  return lastIndID + 1;
}

export { posts, getIDPost };