import React from 'react';
import { render } from '@testing-library/react';
import App from './App';

test('renders contact us h1', () => {
    const { getByText } = render(<App />);
    const linkElement = getByText(/Contact Us/i);
    expect(linkElement).toBeInTheDocument();
});