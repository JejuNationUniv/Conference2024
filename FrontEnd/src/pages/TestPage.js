// FrontEnd/src/pages/TestPage.js
import React, { useState, useEffect, useCallback, useRef } from "react";
import { useNavigate } from "react-router-dom";
// 이미지 파일이 없을 경우, 아래 대체 버튼을 사용하세요
// import miceButton from "../imgs/miceButton.png"; // 말하기 버튼 이미지
// import stopButton from "../imgs/stopButton.png"; // 중지 버튼 이미지

const TestPage = () => {
  const navigate = useNavigate();
  const [sentence] = useState("낭만적인 감정에 빠져들었다."); // 더미 문장
  const [userPronunciation, setUserPronunciation] = useState("");
  const [highlightedPronunciation, setHighlightedPronunciation] = useState([]);
  const [isRecording, setIsRecording] = useState(false);
  const [error, setError] = useState(null);
  const [isManuallyStopped, setIsManuallyStopped] = useState(false); // 수동 중지 상태

  const recognitionRef = useRef(null);

  useEffect(() => {
    // Web Speech API 설정
    if ("SpeechRecognition" in window || "webkitSpeechRecognition" in window) {
      const SpeechRecognition =
        window.SpeechRecognition || window.webkitSpeechRecognition;
      const recognition = new SpeechRecognition();

      recognition.continuous = true; // 계속 인식하도록 설정
      recognition.interimResults = false; // 실시간 결과 비활성화
      recognition.lang = "ko-KR";

      recognition.onstart = () => {
        console.log("Speech recognition started");
        setIsRecording(true);
        setError(null);
      };

      recognition.onend = () => {
        console.log("Speech recognition ended");
        setIsRecording(false);
        if (isManuallyStopped && userPronunciation.trim() !== "") {
          console.log("Manually stopped. Comparing sentences.");
          compareSentences(sentence, userPronunciation);
        }
        setIsManuallyStopped(false); // 상태 초기화
      };

      recognition.onresult = (event) => {
        let final = "";

        for (let i = event.resultIndex; i < event.results.length; i++) {
          const transcript = event.results[i][0].transcript;
          if (event.results[i].isFinal) {
            final += transcript;
          }
        }

        if (final) {
          console.log("Final transcript:", final.trim());
          setUserPronunciation(final.trim());
        }
      };

      recognition.onerror = (event) => {
        console.error("Speech recognition error:", event.error);
        setError("음성 인식 중 오류가 발생했습니다.");
        setIsRecording(false);
      };

      recognitionRef.current = recognition;
    } else {
      console.log("Speech recognition not supported");
      setError("이 브라우저는 음성 인식을 지원하지 않습니다.");
    }

    // 의존성 배열을 빈 배열로 설정하여 컴포넌트 마운트 시 한 번만 실행
  }, []); // 빈 배열

  const toggleRecording = useCallback(() => {
    if (recognitionRef.current) {
      if (isRecording) {
        // 수동 중지 상태 설정
        console.log("Stopping speech recognition manually");
        setIsManuallyStopped(true);
        recognitionRef.current.stop();
      } else {
        console.log("Starting speech recognition");
        setUserPronunciation("");
        setHighlightedPronunciation([]);
        setError(null);
        setIsManuallyStopped(false);
        recognitionRef.current.start();
      }
    } else {
      console.error("Speech recognition is not initialized");
      setError("음성 인식이 초기화되지 않았습니다.");
    }
  }, [isRecording]);

  const resetPronunciation = () => {
    console.log("Resetting pronunciation");
    setUserPronunciation("");
    setHighlightedPronunciation([]);
    setError(null);
  };

  const compareSentences = (original, user) => {
    console.log(
      `Comparing sentences:\nOriginal: "${original}"\nUser: "${user}"`,
    );
    const originalWords = original.split(" ");
    const userWords = user.split(" ");
    const maxLength = Math.max(originalWords.length, userWords.length);
    const highlighted = [];

    for (let i = 0; i < maxLength; i++) {
      const originalWord = originalWords[i] || "";
      const userWord = userWords[i] || "";
      const isMatch = originalWord.toLowerCase() === userWord.toLowerCase();
      highlighted.push({ word: userWord, correct: isMatch });
      console.log(
        `Word ${i + 1}: Original="${originalWord}", User="${userWord}", Correct=${isMatch}`,
      );
    }

    setHighlightedPronunciation(highlighted);
  };

  // 모든 단어가 일치하는지 확인
  const allMatch =
    highlightedPronunciation.length > 0 &&
    highlightedPronunciation.every((item) => item.correct);

  useEffect(() => {
    if (highlightedPronunciation.length > 0) {
      console.log("Highlighted Pronunciation:", highlightedPronunciation);
      console.log("All words match:", allMatch);
    }
  }, [highlightedPronunciation, allMatch]);

  return (
    <div className="flex min-h-screen justify-center bg-[#E7ECF2] font-Pretendard">
      <div className="relative flex w-[500px] justify-center bg-white lg:m-5 lg:w-screen lg:rounded-2xl">
        <div className="flex flex-col items-center">
          {/* 로고 */}
          <div className="mt-[40px] font-Pretendard text-[25px] font-[700]">
            APALogo
          </div>

          {/* 메인 영역 */}
          <div className="mt-[48px] grid w-[408px] grid-cols-1 gap-4 rounded-2xl bg-[#F2F2F2] shadow-lg lg:w-[888px] lg:justify-center">
            1/10
          </div>

          {/* 문장 제시 영역 */}
          <div className="mt-[23px] flex w-[408px] rounded-2xl bg-[#F2F2F2] shadow-lg lg:w-[888px] lg:justify-center">
            <p className="m-5 flex items-center justify-center text-wrap text-[20px] font-[500] text-black">
              {sentence}
            </p>
          </div>

          {/* 발음 표시 영역 */}
          <div className="mt-[48px] grid w-[408px] grid-cols-1 gap-4 rounded-2xl bg-[#F2F2F2] shadow-lg lg:w-[888px] lg:justify-center">
            {/* 사용자 발음 표시 영역 */}
            <div className="flex flex-col items-center justify-center text-wrap text-[20px] font-[500] text-black">
              {/* 최종 발화 내용 */}
              <p className="mx-5 mt-5 flex items-center justify-center text-wrap text-[20px] font-[500] text-black">
                {userPronunciation || "여기에 사용자 발음이 표시됩니다."}
              </p>
            </div>
            {/* 구분선 */}
            <hr className="mx-3 border-t-2 border-gray-300" />
            {/* 발음 피드백 영역 */}
            <div className="flex items-center justify-center text-wrap text-[20px] font-[500] text-black">
              <p className="mx-5 mb-5 flex items-center justify-center text-wrap text-[20px] font-[500] text-black">
                {highlightedPronunciation.length > 0 ? (
                  allMatch ? (
                    <span style={{ color: "green" }}>{userPronunciation}</span>
                  ) : (
                    highlightedPronunciation.map((item, index) => (
                      <span
                        key={index}
                        style={{
                          color: item.correct ? "green" : "red",
                          marginRight: "4px",
                        }}
                      >
                        {item.word}
                      </span>
                    ))
                  )
                ) : (
                  "여기에 수정된 발음이 표시됩니다."
                )}
              </p>
            </div>
          </div>

          {/* 하단 영역 (버튼) */}
          <div className="absolute bottom-[87px] mx-14 grid grid-cols-2 gap-[97px]">
            <button
              onClick={toggleRecording}
              className="flex flex-col items-center"
            >
              {/* 이미지가 없을 경우 아래 대체 버튼 사용 */}
              {/* <img
                src={isRecording ? stopButton : miceButton}
                alt={isRecording ? "Stop Button" : "Mice Button"}
                className="h-[60px] w-[60px]"
              /> */}
              <div
                className="mb-2 flex h-[60px] w-[60px] items-center justify-center rounded-full bg-gray-300"
                // 이미지 대신 텍스트나 아이콘 사용
              >
                {isRecording ? "■" : "🎤"}
              </div>
              <p className="text-[20px] font-[500]">
                {isRecording ? "중지" : "말하기"}
              </p>
            </button>
            <button
              onClick={resetPronunciation}
              className="flex flex-col items-center"
            >
              {/* 이미지가 없을 경우 아래 대체 버튼 사용 */}
              {/* <img
                src={stopButton}
                alt="Reset Button"
                className="h-[60px] w-[60px]"
              /> */}
              <div
                className="mb-2 flex h-[60px] w-[60px] items-center justify-center rounded-full bg-gray-300"
                // 이미지 대신 텍스트나 아이콘 사용
              >
                🔄
              </div>
              <p className="text-[20px] font-[500]">초기화</p>
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
      {/* 에러 메시지 표시 영역 */}
      {error && (
        <div className="absolute top-5 rounded-lg bg-red-200 p-3 text-red-800">
          {error}
        </div>
      )}
    </div>
  );
};

export default TestPage;
