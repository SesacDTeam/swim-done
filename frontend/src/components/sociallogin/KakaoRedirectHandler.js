// 📌 KakaoRedirectHandler.jsx (인가 코드 확인)
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

export default function KakaoRedirectHandler() {
  const navigate = useNavigate();

  useEffect(() => {
    const code = new URL(window.location.href).searchParams.get("code");
    console.log("인가 코드:", code); // 인가 코드 확인 (백엔드 없으므로 여기까지만!)

    // 🔹 백엔드가 준비되면 아래 axios 요청이 정상 동작할 예정
    if (code) {
      axios
        .post("http://localhost:8080/api/auth/kakao", { code })
        .then((res) => {
          console.log("백엔드 응답:", res.data);
          navigate("/");
        })
        .catch((err) => {
          console.error("백엔드 요청 실패:", err);
        });
    }
  }, [navigate]);

  return <div>로그인 중...</div>;
}
