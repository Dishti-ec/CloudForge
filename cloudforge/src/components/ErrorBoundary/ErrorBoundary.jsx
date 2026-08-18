import { Component } from 'react'
import { Link } from 'react-router-dom'

export default class ErrorBoundary extends Component {
  constructor(props) {
    super(props)
    this.state = { hasError: false }
  }

  static getDerivedStateFromError() {
    return { hasError: true }
  }

  render() {
    if (this.state.hasError) {
      return (
        <div style={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          minHeight: '60vh',
          padding: '24px',
          textAlign: 'center',
          gap: '16px',
        }}>
          <h1 style={{ color: 'var(--error)', fontSize: '1.5rem' }}>
            Something went wrong
          </h1>
          <p style={{ color: 'var(--text-secondary)' }}>
            An error occurred while rendering this page.
          </p>
          <Link to="/" style={{ color: 'var(--accent-cool)', fontWeight: 600 }}>
            Back to Home
          </Link>
        </div>
      )
    }

    return this.props.children
  }
}
