import { Component } from 'react';
import ServerError from '../pages/ServerError';

export default class RootErrorBoundary extends Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError() {
    return { hasError: true };
  }

  componentDidCatch(error, errorInfo) {
    console.error('RootErrorBoundary:', error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      return <ServerError />;
    }
    return this.props.children;
  }
}
