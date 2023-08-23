import React from 'react';
import '@testing-library/jest-dom';
import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import Blog from '../src/components/Blog';
import blogService from '../src/services/blogs.js'
jest.mock('../src/services/blogs.js');

describe('<Blog />', () => {
  const blogMock = {
    title: 'Test Blog',
    author: 'Test Author',
    url: 'http://testblog.com',
    likes: 5,
    id: '1',
    user: { id: '1', name: 'Test User' }
  };

  const mockSetBlogs = jest.fn();
  const mockBlogs = [blogMock];

  let container;
  beforeEach(() => {
    window.localStorage.setItem('loggedInUser', JSON.stringify({ id: '1', token: 'test-token' }));
    const renderResult = render(<Blog blog={blogMock} setBlogs={mockSetBlogs} blogs={mockBlogs} />);
    container = renderResult.container;
  });
  test('renders blog title and author', () => {
    expect(container.querySelector('.blog-title-author')).toBeInTheDocument();
  });

  test('renders blog title and author but url or likes Not Visible by default', () => {
    // Check for title and author
    expect(container.querySelector('.blog-title-author')).toBeInTheDocument();

    // Check that url and likes are not displayed by default
    expect(container.querySelector('.blog-url')).not.toBeVisible();
    expect(container.querySelector('.blog-likes')).not.toBeVisible();
  });

  test('Visible url and likes when "View" button is clicked', async () => {
    const user = userEvent.setup()
    const button = screen.getByText('View')
    await user.click(button)

    // Check that url and likes are now Visible
    expect(container.querySelector('.blog-url')).toBeVisible();
    expect(container.querySelector('.blog-likes')).toBeVisible();
  });

  test('Not visible url and likes when "Hide" button is clicked', async () => {
    const user = userEvent.setup()
    const buttonView = screen.getByText('View')
    await user.click(buttonView)
    const buttonHide = screen.getByText('Hide')
    await user.click(buttonHide)
    // Check that url and likes are not Visible
    expect(container.querySelector('.blog-url')).not.toBeVisible();
    expect(container.querySelector('.blog-likes')).not.toBeVisible();

  });
  test('clicking the like button twice results in two API calls', async () => {

    blogService.updateLike.mockResolvedValue({
      blogMock
    });

    const buttonLike = screen.getByText('Like');
    await userEvent.click(buttonLike);
    const buttonHasLike = screen.getByText('Liked');
    await userEvent.click(buttonHasLike);

    await waitFor(() => expect(blogService.updateLike).toHaveBeenCalledTimes(2));
  });

  test('clicking the like button twice updates the like count back to the original', async () => {

    let initialLikes = blogMock.likes;

    const buttonLike = screen.getByText('Like');
    userEvent.click(buttonLike);

    // Wait for the "Like" button to change to "Liked" and for the like count to increase
    await screen.findByText('Liked');
    expect(screen.getByText(`Likes: ${initialLikes+1}`)).toBeInTheDocument();

    const buttonLiked = screen.getByText('Liked');
    userEvent.click(buttonLiked);

    // Wait for the like count to decrease and for the "Liked" button to change back to "Like"
    await screen.findByText('Like');
    expect(screen.getByText(`Likes: ${initialLikes}`)).toBeInTheDocument();
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

});