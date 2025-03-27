import React, { Component } from 'react';
import RequestError from './RequestError';
import instance from '../api/axios';
import ERROR_CODE from './ERROR_CODE';
import ERROR_DISPLAY_MODE from './ERROR_DISPLAY_MODE';

class SideBarErrorBoundary extends Component {
  constructor(props) {
    super(props);
    this.state = {
      hasError: false,
      error: null,
    };
  }

  static getDerivedStateFromError(error) {
    return { hasError: true };
  }

  componentDidCatch(error) {
    this.setState({ error });
  }

  render() {
    if (this.state.hasError && this.state.error instanceof RequestError) {
      return (
        <div>
          <h1>{this.state.error.message}</h1>
          <h2>잠시후 시도해주세요</h2>
        </div>
      );
    }

    return this.props.children; // 정상적으로 동작할 때는 자식 컴포넌트를 그대로 렌더링
  }
}

export default SideBarErrorBoundary;
