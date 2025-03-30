// src/utils/toastUtils.js
import { toast, Slide } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

// ✅ 공통 옵션
const defaultOptions = {
  position: 'top-center',
  autoClose: 3000,
  hideProgressBar: true,
  pauseOnHover: true,
  closeOnClick: true,
  draggable: false,
  theme: 'colored',
  transition: Slide,
  className: 'custom-toast', // 커스텀 클래스 추가
  style: { backgroundColor: 'blue' },
};

// ✅ 커스텀 스타일
// const customToastStyles = {
//   backgroundColor: '#0085ff', // 기본 배경 색상
//   color: '#fff', // 글자 색상
//   borderRadius: '8px', // 둥근 모서리
//   padding: '10px 15px', // 패딩
//   boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)', // 그림자 효과
//   fontFamily: 'Pretendard, sans-serif', // 글꼴
// };

// ✅ 커스텀 아이콘 (예시로 예쁜 아이콘 추가)
const customIconStyle = {
  marginRight: '10px', // 아이콘과 메시지 간격
  fontSize: '18px', // 아이콘 크기
};

// ✅ 성공 메시지
export const toastSuccess = (message) => {
  toast.success(
    <div>
      <i className="fas fa-check-circle" style={{ color: '#fee500' }}></i>
      {message}
    </div>,
    defaultOptions,
  );
};

// ✅ 실패 메시지
export const toastError = (message) => {
  toast.error(
    <div style={customToastStyles}>
      <i className="fas fa-times-circle" style={{ ...customIconStyle, color: 'red' }}></i>
      {message}
    </div>,
    defaultOptions,
  );
};

// ✅ 정보 메시지
export const toastInfo = (message) => {
  toast.info(
    <div style={customToastStyles}>
      <i className="fas fa-info-circle" style={{ ...customIconStyle, color: 'blue' }}></i>
      {message}
    </div>,
    defaultOptions,
  );
};

// ✅ 경고 메시지
export const toastWarn = (message) => {
  toast.warn(
    <div style={customToastStyles}>
      <i className="fas fa-exclamation-circle" style={{ ...customIconStyle, color: 'orange' }}></i>
      {message}
    </div>,
    defaultOptions,
  );
};

// ✅ 로딩 (진행중)
export const toastLoading = (message) => {
  return toast.loading(
    <div style={customToastStyles}>
      <i className="fas fa-spinner fa-spin" style={{ ...customIconStyle, color: 'yellow' }}></i>
      {message}
    </div>,
    {
      ...defaultOptions,
      autoClose: false,
    },
  );
};

// ✅ 로딩 → 성공 처리
export const toastUpdateSuccess = (id, message) => {
  toast.update(id, {
    render: (
      <div style={customToastStyles}>
        <i className="fas fa-check-circle" style={{ ...customIconStyle, color: 'green' }}></i>
        {message}
      </div>
    ),
    type: 'success',
    isLoading: false,
    autoClose: 2000,
  });
};

// ✅ 로딩 → 실패 처리
export const toastUpdateError = (id, message) => {
  toast.update(id, {
    render: (
      <div style={customToastStyles}>
        <i className="fas fa-times-circle" style={{ ...customIconStyle, color: 'red' }}></i>
        {message}
      </div>
    ),
    type: 'error',
    isLoading: false,
    autoClose: 2000,
  });
};
