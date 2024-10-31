import React from "react";
import { useNavigate } from "react-router-dom";

const PageResult = () => {
  const navigate = useNavigate();

  return (
    <div className="flex min-h-screen justify-center bg-[#E7ECF2]">
      <div className="relative flex w-[500px] justify-center bg-white lg:m-5 lg:w-screen lg:rounded-2xl">
        <div className="flex flex-col items-center">
          {/* 로고 */}
          <div className="mt-[40px] font-Pretendard text-[25px] font-[700]">
            결과 페이지
          </div>
        </div>
      </div>
    </div>
  );
};

export default PageResult;
