import React from "react";
import miceButton from "../imgs/miceButton.png";
import stopButton from "../imgs/stopButton.png";
import { useNavigate } from "react-router-dom";

const PageB = () => {
  const navigate = useNavigate();

  return (
    <div className="flex min-h-screen justify-center bg-[#E7ECF2] font-Pretendard">
      <div className="relative flex w-[500px] justify-center bg-white lg:m-5 lg:w-screen lg:rounded-2xl">
        <div className="flex flex-col items-center">
          {/* 로고 */}
          <div className="mt-[40px] font-Pretendard text-[25px] font-[700]">
            APALogo
          </div>

          {/* 메인 영역 */}
          {/* 진행된 발음 테스트 개수 */}
          <div className="mt-[92px] font-Pretendard text-[25px] font-[300]">
            1/10
          </div>

          {/* 문장 제시 영역 */}
          <div className="mt-[23px] flex w-[408px] rounded-2xl bg-[#F2F2F2] shadow-lg lg:w-[888px] lg:justify-center">
            <p className="m-5 flex items-center justify-center text-wrap text-[20px] font-[500] text-black">
              나는 낙엽이 바람에 날리는 모습을 바라보며 낭만적인 감정에
              빠져들었다.
            </p>
          </div>

          {/* 발음 표시 영역 */}
          <div className="mt-[48px] grid w-[408px] grid-cols-1 gap-4 rounded-2xl bg-[#F2F2F2] shadow-lg lg:w-[888px] lg:justify-center">
            {/* 사용자 발음 표시 영역 */}
            <div className="flex items-center justify-center text-wrap text-[20px] font-[500] text-black">
              <p className="mx-5 mt-5 flex items-center justify-center text-wrap text-[20px] font-[500] text-black">
                나는 낙엽이 바람에 날리는 모습을 바라보며 낭만적인 감정에
                빠져들었다.
              </p>
            </div>
            {/* 구분선 */}
            <hr className="mx-3 border-t-2 border-gray-300" />
            {/* 발음 피드백 영역 */}
            <div className="flex items-center justify-center text-wrap text-[20px] font-[500] text-black">
              <p className="mx-5 mb-5 flex items-center justify-center text-wrap text-[20px] font-[500] text-black">
                나는 낙엽이 바람에 날리는 모습을 바라보며 낭만적인 감정에
                빠져들었다.
              </p>
            </div>
          </div>

          {/* 하단 영역 (버튼) */}
          <div className="absolute bottom-[87px] mx-14 grid grid-cols-2 gap-[97px]">
            <button>
              <img
                src={miceButton}
                alt="Mice Button"
                className="h-[60px] w-[60px]"
              />
              <p className="text-[20px] font-[500]">말하기</p>
            </button>
            <button>
              <img
                src={stopButton}
                alt="Mice Button"
                className="h-[60px] w-[60px]"
              />
              <p className="text-[20px] font-[500]">초기화</p>{" "}
            </button>
          </div>
        </div>
        {/* 나가기 버튼 */}
        <div className="absolute bottom-5 right-5">
          <button className="underline" onClick={() => navigate("/")}>
            나가기
          </button>
        </div>
      </div>
    </div>
  );
};

export default PageB;
