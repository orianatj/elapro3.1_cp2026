import { render, screen } from '@testing-library/react'
import { GreetingBanner } from './GreetingBanner'

// Verifies that the GreetingBanner correctly renders the provided student name
test('renders greeting with student name', () => {
  render(<GreetingBanner name="Oriana" />)

  expect(screen.getByText(/Hi, Oriana/i)).toBeInTheDocument()
})

// Ensures the component applies the correct CSS class for styling purposes
test('applies greeting banner class', () => {
  render(<GreetingBanner name="Oriana" />)

  const element = screen.getByText(/Hi, Oriana/i)
  expect(element).toHaveClass('greeting-banner')
})