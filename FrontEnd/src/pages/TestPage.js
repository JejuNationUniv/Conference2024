import React, { useState, useCallback } from "react";
import { useNavigate } from "react-router-dom";

const TestPage = () => {
  const navigate = useNavigate();

  const [stream, setStream] = useState();
  const [media, setMedia] = useState();
  const [onRec, setOnRec] = useState(true);
  const [source, setSource] = useState();
  const [analyser, setAnalyser] = useState();
  const [audioUrl, setAudioUrl] = useState();
  const [currentSentenceIndex, setCurrentSentenceIndex] = useState(0); // 현재 문장 인덱스
  const chunks = []; // 오디오 청크 데이터를 저장할 배열
  const sentences = [
    "가나다라",
    "마바사아",
    "자차카타파하",
    "모든 문장녹음을 완료하였습니다.",
  ]; // 테스트용 문장

  const buttonText =
    currentSentenceIndex >= 3 ? "결과 확인" : "저장 후 다음 문장";
  const progressText =
    currentSentenceIndex >= 3 ? "3" : `${currentSentenceIndex + 1}`;

  function handleClickNext() {
    setCurrentSentenceIndex((prevIndex) => {
      const newIndex = prevIndex + 1;
      if (newIndex >= 4) {
        return 0;
      }
      return newIndex;
    });
  }

  const onRecAudio = () => {
    // 음원정보를 담은 노드를 생성하거나 음원을 실행또는 디코딩 시키는 일을 한다
    const audioCtx = new (window.AudioContext || window.webkitAudioContext)();

    // 자바스크립트를 통해 음원의 진행상태에 직접접근에 사용된다.
    const analyser = audioCtx.createScriptProcessor(0, 1, 1);
    setAnalyser(analyser);

    function makeSound(stream) {
      // 내 컴퓨터의 마이크나 다른 소스를 통해 발생한 오디오 스트림의 정보를 보여준다.
      const source = audioCtx.createMediaStreamSource(stream);
      setSource(source);

      // AudioBufferSourceNode 연결
      source.connect(analyser);
      analyser.connect(audioCtx.destination);
    }

    // 마이크 사용 권한 획득 후 녹음 시작
    navigator.mediaDevices
      .getUserMedia({ audio: true })
      .then((stream) => {
        const mediaRecorder = new MediaRecorder(stream);

        // dataavailable 이벤트 핸들러 등록
        mediaRecorder.addEventListener("dataavailable", (e) => {
          chunks.push(e.data); // 청크 데이터를 배열에 추가
        });

        mediaRecorder.start();
        setStream(stream);
        setMedia(mediaRecorder);
        makeSound(stream);
        // 음성 녹음이 시작됐을 때 onRec state값을 false로 변경
        analyser.onaudioprocess = function (e) {
          setOnRec(false);
        };
      })
      .catch((error) => {
        // 마이크 사용 권한을 받지 못했을 때 처리
        alert("마이크 사용 권한을 허용해야 녹음을 진행할 수 있습니다.");
      });
  };

  const offRecAudio = () => {
    // dataavailable 이벤트로 Blob 데이터에 대한 응답을 받을 수 있음
    media.ondataavailable = function (e) {
      chunks.push(e.data);
      setAudioUrl(e.data);
      setOnRec(true);
    };

    // 모든 트랙에서 stop()을 호출해 오디오 스트림을 정지
    stream.getAudioTracks().forEach(function (track) {
      track.stop();
    });

    // 미디어 캡처 중지
    media.stop();

    // 메서드가 호출 된 노드 연결 해제
    analyser.disconnect();
    source.disconnect();
  };

  // 녹음 다시 듣기 기능
  // 다시 듣기 버튼을 누르면 호출되며 자신이 녹음한 소리를 들을 수 있음
  const onSubmitAudioFile = useCallback(() => {
    if (audioUrl) {
      const audio = new Audio(URL.createObjectURL(audioUrl));
      audio.play();
    }
  }, [audioUrl]);

  // 결과 확인 버튼 클릭 시 동작
  const handleResultCheck = () => {
    console.log("결과 확인 페이지로 이동");
    navigate("/result"); // 실제 결과 페이지 경로로 수정하세요
  };

  return (
    <div className="flex min-h-screen justify-center bg-[#E7ECF2] font-Pretendard">
      <div className="relative flex w-[500px] justify-center bg-white lg:m-5 lg:w-screen lg:rounded-2xl">
        <div className="flex flex-col items-center">
          {/* 로고 */}
          <div className="mt-[40px] font-Pretendard text-[25px] font-[700]">
            APALogo
          </div>

          {/* 메인 영역 */}
          <div className="mt-[100px] font-Pretendard text-[25px] font-[300]">
            {progressText + "/" + (sentences.length - 1)}
          </div>

          {/* 문장 제시 영역 */}
          <div className="mt-[23px] flex w-[408px] items-center justify-center rounded-2xl bg-[#F2F2F2] p-5 shadow-lg lg:w-[888px]">
            <p className="break-words text-center text-[20px] font-[500] text-black">
              {sentences[currentSentenceIndex]}
            </p>
          </div>

          {/* 발음 표시 영역 */}
          <div className="mt-[48px] grid w-[408px] grid-cols-1 gap-4 rounded-2xl bg-[#F2F2F2] shadow-lg lg:w-[888px] lg:justify-center">
            {/* 사용자 발음 표시 영역 */}
            <div className="flex items-center justify-center text-wrap text-[20px] font-[500] text-black">
              <p className="mx-5 mt-5 flex items-center justify-center text-wrap text-[20px] font-[500] text-black">
                여기에 사용자 발음이 표시됩니다.
              </p>
            </div>
            {/* 구분선 */}
            <hr className="mx-3 border-t-2 border-gray-300" />
            {/* 발음 피드백 영역 */}
            <div className="flex items-center justify-center text-wrap text-[20px] font-[500] text-black">
              <p className="mx-5 mb-5 flex items-center justify-center text-wrap text-[20px] font-[500] text-black">
                여기에 수정된 발음이 표시됩니다.
              </p>
            </div>
          </div>

          {/* 하단 영역 (버튼) */}
          <div className="absolute bottom-[87px] mx-14 flex space-x-24">
            <button onClick={onRec ? onRecAudio : offRecAudio}>
              <p className="text-[20px] font-[500]">
                {onRec ? "녹음 시작" : "녹음 중지"}
              </p>
            </button>
            <button onClick={onSubmitAudioFile}>
              <p className="text-[20px] font-[500]">내 발음 다시 듣기</p>
            </button>
            <button
              onClick={
                currentSentenceIndex >= 3 ? handleResultCheck : handleClickNext
              }
            >
              <p className="text-[20px] font-[500]">{buttonText}</p>
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

export default TestPage;
