import React, { Component } from 'react';
import RequestError from './RequestError';
import instance from '../api/axios';
import ERROR_CODE from './ERROR_CODE';
import ERROR_DISPLAY_MODE from './ERROR_DISPLAY_MODE';
import { logo } from '../utils/staticImagePath';

class ErrorBoundary extends Component {
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
        <div className="h-full flex flex-col items-center justify-center bg-blue01 text-white gap-5">
          <img src={logo} alt="" />
          <h1 className="pretendard-bold text-2xl mb-50 mx-10 whitespace-pre-line text-center">
            {this.state.error.message}
          </h1>
          <button className='text-black'>문의하기</button>
        </div>
      );
    }

    return this.props.children; // 정상적으로 동작할 때는 자식 컴포넌트를 그대로 렌더링
  }
}

export default ErrorBoundary;
