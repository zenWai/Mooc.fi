const listHelper = require('../utils/list_helper');

test('dummy returns one', () => {
  const blogs = [];
  const result = listHelper.dummy(blogs);
  expect(result).toBe(1);
});

describe('total likes', () => {
  const listWithOneBlog = [
    {
      _id: '5a422aa71b54a676234d17f8',
      title: 'Very good post',
      author: 'John Doe',
      url: 'http://www.tha_best.edu/~posterino/stuff_test/Go_To_end.html',
      likes: 5,
      __v: 0
    }
  ];

  test('when list has only one blog, equals the likes of that', () => {
    const result = listHelper.totalLikes(listWithOneBlog);
    expect(result).toBe(5);
  });
});

describe('favorite blog', () => {

  test('when list has multiple blogs, it returns the one with most likes', () => {
    const blogs = [
      { title: 'First Blog', author: 'John Doe', likes: 5 },
      { title: 'Second Blog', author: 'Jane Doe', likes: 10 },
      { title: 'Third Blog', author: 'Jim Brown', likes: 7 }
    ];

    const result = listHelper.favoriteBlog(blogs);
    expect(result).toEqual({
      title: 'Second Blog',
      author: 'Jane Doe',
      likes: 10
    });
  });

  test('when list has one blog, it returns that blog', () => {
    const blogs = [
      { title: 'First Blog', author: 'John Doe', likes: 5 }
    ];

    const result = listHelper.favoriteBlog(blogs);
    expect(result).toEqual({
      title: 'First Blog',
      author: 'John Doe',
      likes: 5
    });
  });

  test('when list is empty, it returns null', () => {
    const blogs = [];

    const result = listHelper.favoriteBlog(blogs);
    expect(result).toBeNull();
  });
});

describe('most blogs', () => {

  test('author with most blogs', () => {
    const blogs = [
      { author: 'John Doe' },
      { author: 'Jane Doe' },
      { author: 'John Doe' },
      { author: 'Jim Brown' },
      { author: 'Jane Doe' },
      { author: 'John Doe' }
    ];

    const result = listHelper.mostBlogs(blogs);
    expect(result).toEqual({
      author: 'John Doe',
      blogs: 3
    });
  });
});

describe('most likes', () => {

  test('author with most likes', () => {
    const blogs = [
      { author: 'John Doe', likes: 14 },
      { author: 'Jane Doe', likes: 10 },
      { author: 'John Doee', likes: 7 },
      { author: 'Jim Brown', likes: 6 },
      { author: 'Jane Doe', likes: 5 },
      { author: 'John Doe', likes: 2 }
    ];

    const result = listHelper.mostLikes(blogs);
    expect(result).toEqual({
      author: 'John Doe',
      likes: 16
    });
  });
});