import React, { Component } from 'react';
import RequestError from './RequestError';
import { Link } from 'react-router';

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

  resetError = () => {
    this.setState({ hasError: false });
  };

  render() {
    if (this.state.hasError && this.state.error instanceof RequestError) {
      return (
        <div className="h-full flex flex-col items-center justify-center gap-5 font-pretendard text-title">
          <h1 className=" font-bold text-3xl mx-10 whitespace-pre-line text-center text-title w-full">
            찾을 수 없는 페이지
          </h1>
          <p className="text-title text-center">
            요청하신 페이지에 접근할 수 없습니다.<br></br>입력하신 주소를 다시 한 번 확인해 주세요.
          </p>
          <div className="font-pretendard text-center text-title mt-10 flex flex-col items-start gap-5">
            <button className='cursor-pointer' onClick={this.resetError}>📯 다시시도</button>
            <span>
              <Link to="/">🏠 홈으로 가기</Link>
            </span>
          </div>
        </div>
      );
    }

    return this.props.children; // 정상적으로 동작할 때는 자식 컴포넌트를 그대로 렌더링
  }
}

export default ErrorBoundary;
