import React from 'react';
import {render, screen} from '@testing-library/react';
import '@testing-library/jest-dom';
import CreatePostForm from '../src/components/CreatePostForm';
import userEvent from '@testing-library/user-event';
import blogService from '../src/services/blogs';


jest.mock('../src/services/blogs');
blogService.create = jest.fn();

test('<CreatePostForm /> updates parent state and calls service to create blog', async () => {
  const setTitle = jest.fn();
  const setAuthor = jest.fn();
  const setUrl = jest.fn();
  const setBlogs = jest.fn();
  const notificationRef = { current: { toggleVisibility: jest.fn() } };
  const createNewFormRef = { current: { toggleVisibility: jest.fn() } };

  render(
    <CreatePostForm
      title=""
      setTitle={setTitle}
      author=""
      setAuthor={setAuthor}
      url=""
      setUrl={setUrl}
      blogs={[]}
      setBlogs={setBlogs}
      notificationRef={notificationRef}
      createNewFormRef={createNewFormRef}
    />
  );
// Click on the "Create Post" button to show the form
  const showFormButton = screen.getByText('Create New');
  await userEvent.click(showFormButton);

  const textboxes = screen.getAllByRole('textbox');


  await userEvent.type(textboxes[0], 'Test Blog');
  await userEvent.type(textboxes[1], 'Test Author');
  await userEvent.type(textboxes[2], 'http://test.com');

  const callsAsStringTitle = setTitle.mock.calls.flat().join('');
  const callsAsStringAuthor = setAuthor.mock.calls.flat().join('');
  const callsAsStringUrl = setUrl.mock.calls.flat().join('');

  expect(callsAsStringTitle).toContain('Test Blog');
  expect(callsAsStringAuthor).toContain('Test Author');
  expect(callsAsStringUrl).toContain('http://test.com');

  blogService.create.mockResolvedValue({
    title: 'Test Blog',
    author: 'Test Author',
    url: 'http://test.com'
  });
  const createButton = screen.getByText('Create Post');
  await userEvent.click(createButton);
  expect(blogService.create.mock.calls).toHaveLength(1);


  expect(setBlogs).toHaveBeenCalledWith(expect.arrayContaining([
    expect.objectContaining({
      title: 'Test Blog',
      author: 'Test Author',
      url: 'http://test.com'
    })
  ]));

  expect(setTitle).toHaveBeenLastCalledWith('');
  expect(setAuthor).toHaveBeenLastCalledWith('');
  expect(setUrl).toHaveBeenLastCalledWith('');
  jest.clearAllMocks();

  // Mock failed blog creation
  blogService.create.mockRejectedValue(new Error('Creation failed'));
  await userEvent.click(createButton);

  expect(notificationRef.current.toggleVisibility).toHaveBeenCalledWith('Error creating blog', 'error');
});