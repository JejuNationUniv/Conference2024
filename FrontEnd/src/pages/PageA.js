import React from "react";
import { useNavigate } from "react-router-dom";

const PageA = () => {
  const navigate = useNavigate();

  return (
    <div className="flex min-h-screen justify-center bg-[#E7ECF2]">
      <div className="relative flex w-[500px] justify-center bg-white lg:m-5 lg:w-screen lg:rounded-2xl">
        <div className="flex flex-col items-center">
          {/* 로고 */}
          <div className="mt-[40px] font-Pretendard text-[25px] font-[700]">
            APALogo
          </div>

          {/* 메인 영역 */}
          <div className="mt-[226px] font-Pretendard text-[30px] font-[300]">
            AI 발음 교정기
          </div>
          <div className="mt-[10px] font-Pretendard text-[40px] font-[700] lg:hidden">
            AI Pronunciation
          </div>
          <div className="font-Pretendard text-[40px] font-[700] lg:hidden">
            Assistant
          </div>
          <div className="hidden lg:mt-[10px] lg:block lg:font-Pretendard lg:text-[40px] lg:font-[700]">
            AI Pronunciation Assistant
          </div>

          {/* 하단 영역 (버튼) */}
          <div className="absolute bottom-[87px] mx-14">
            <button
              className="h-[56px] w-[392px] rounded-2xl bg-black font-Pretendard text-[20px] font-[700] text-white"
              onClick={() => navigate("/pageB")}
            >
              발음 테스트 시작하기
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PageA;
