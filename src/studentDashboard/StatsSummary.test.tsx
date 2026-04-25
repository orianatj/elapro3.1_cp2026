import { render, screen } from '@testing-library/react'
import { StatsSummary } from './StatsSummary'
import { describe, test, expect } from 'vitest'

describe('StatsSummary', () => {

  // Verifies that all provided stats are rendered with correct labels and values
  test('renders all stat cards from props', () => {
    const mockStats = [
  { label: "Total Submissions", value: 15, icon:<span />},
  { label: "Highest Score", value: 33, icon: <span />},
  { label: "Lowest Score", value: 3, icon: <span />},
  { label: "Average Score", value: 24, icon: <span />}
];

    render(<StatsSummary stats={mockStats} />)

    // Check labels
    expect(screen.getByText('Total Submissions')).toBeInTheDocument()
    expect(screen.getByText('Highest Score')).toBeInTheDocument()
    expect(screen.getByText('Lowest Score')).toBeInTheDocument()
    expect(screen.getByText('Average Score')).toBeInTheDocument()

    // Check values
    expect(screen.getByText('15')).toBeInTheDocument()
    expect(screen.getByText('33')).toBeInTheDocument()
    expect(screen.getByText('3')).toBeInTheDocument()
    expect(screen.getByText('24')).toBeInTheDocument()
  })

})



