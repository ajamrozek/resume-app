import { render, screen } from '@testing-library/react';
import App from './App';

const renderResume = query => {
  window.history.pushState({}, '', `/?${query}`);
  render(<App />);
};

test.each([
  ['staff', 'Staff Software Engineer'],
  ['sr-mngr', 'Senior Manager, Back End Engineering'],
  ['sdet', 'Senior Software Engineer in Test | Backend & Automation'],
  ['resume=staff', 'Staff Software Engineer']
])('renders the %s resume', (query, title) => {
  renderResume(query);
  expect(screen.getByRole('heading', { level: 2, name: title })).toBeInTheDocument();
});

test('uses the senior manager resume for an unknown suffix', () => {
  renderResume('unknown');
  expect(screen.getByRole('heading', {
    level: 2,
    name: 'Senior Manager, Back End Engineering'
  })).toBeInTheDocument();
});
