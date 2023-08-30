import React from 'react';
import '@testing-library/jest-dom';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import Togglable from '../src/components/Togglable.jsx';

describe('<Togglable />', () => {
  let container;

  beforeEach(() => {
    container = render(
      <Togglable hideLabel={'hide'} showLabel={'show'}>
        <div className="testDiv">togglable content</div>
      </Togglable>
    ).container;
  });

  test('renders its children', async () => {
    await screen.findAllByText('togglable content');
  });

  test('at start the children are not displayed', () => {
    const div = container.querySelector('.togglableContent');
    expect(div).toHaveStyle('display: none');
  });

  test('after clicking the button, children are displayed', async () => {
    const user = userEvent.setup();
    const button = screen.getByText('show');
    await user.click(button);

    const div = container.querySelector('.togglableContent');
    expect(div).not.toHaveStyle('display: none');
  });

  test('toggled content can be closed', async () => {
    const user = userEvent.setup();
    const button = screen.getByText('show');
    await user.click(button);

    const closeButton = screen.getByText('hide');
    await user.click(closeButton);

    const div = container.querySelector('.togglableContent');
    expect(div).toHaveStyle('display: none');
  });
});
