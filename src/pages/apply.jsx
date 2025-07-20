import { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";

export default function Apply() {
  const navigate = useNavigate();
  const iframeRef = useRef(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const handleMessage = (event) => {
      // iframe 로드 완료 신호
      if (event.data.type === "IFRAME_LOADED") {
        setIsLoading(false);
      }
      if (event.data.type === "EXIT_FROM_APPLY_ADMIN") {
        navigate("/session");
      }
    };

    window.addEventListener("message", handleMessage);
    return () => window.removeEventListener("message", handleMessage);
  }, []);

  const sendSessionInfo = () => {
    if (!iframeRef.current) return;

    const accessToken = sessionStorage.getItem("access_token");
    const email = sessionStorage.getItem("email");
    const username = sessionStorage.getItem("username");

    if (!accessToken || !email) {
      console.error("세션 정보가 없습니다.");
      return;
    }

    const sessionData = {
      type: "SESSION_DATA",
      data: { accessToken, email, username },
    };

    iframeRef.current.contentWindow.postMessage(
      sessionData,
      "https://develop.d2hnz1q3fz81jx.amplifyapp.com/"
    );
  };

  const handleIframeLoad = () => {
    setTimeout(() => {
      sendSessionInfo();
    }, 1000);
  };

  return (
    <div className="relative min-h-screen bg-gray-100">
      {/* 로딩 오버레이 */}
      {isLoading && (
        <div className="absolute inset-0 z-10 flex items-center justify-center bg-white bg-opacity-90">
          <div className="text-center">
            <div className="w-12 h-12 mx-auto mb-4 border-b-2 border-blue-500 rounded-full animate-spin"></div>
            <p className="text-gray-600">서비스를 불러오는 중...</p>
          </div>
        </div>
      )}

      {/* iframe */}
      <iframe
        ref={iframeRef}
        src="https://develop.d2hnz1q3fz81jx.amplifyapp.com/"

        className="w-full h-screen border-0"
        onLoad={handleIframeLoad}
        title="Apply Service"
        allow="camera; microphone; geolocation"
        sandbox="allow-same-origin allow-scripts allow-forms allow-popups allow-top-navigation"
      />
    </div>
  );
}
