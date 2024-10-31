// FrontEnd/src/components/VoiceRecorder.js
import React, { useState, useEffect, useRef } from "react";
import axios from "axios";

const VoiceRecorder = ({ onAnalysisComplete }) => {
  const [isRecording, setIsRecording] = useState(false);
  const [mediaRecorder, setMediaRecorder] = useState(null);
  const [audioChunks, setAudioChunks] = useState([]);
  const audioRef = useRef(null);

  useEffect(() => {
    if (navigator.mediaDevices && navigator.mediaDevices.getUserMedia) {
      navigator.mediaDevices
        .getUserMedia({ audio: true })
        .then((stream) => {
          const recorder = new MediaRecorder(stream);
          setMediaRecorder(recorder);

          recorder.ondataavailable = (event) => {
            setAudioChunks((prev) => [...prev, event.data]);
          };

          recorder.onstop = () => {
            const audioBlob = new Blob(audioChunks, { type: "audio/wav" });
            setAudioChunks([]);
            uploadAudio(audioBlob);
          };
        })
        .catch((err) => {
          console.error("Microphone access denied:", err);
          alert("마이크 접근이 거부되었습니다. 설정을 확인해주세요.");
        });
    } else {
      alert("이 브라우저는 음성 녹음을 지원하지 않습니다.");
    }
  }, [audioChunks]);

  const startRecording = () => {
    if (mediaRecorder) {
      mediaRecorder.start();
      setIsRecording(true);
    }
  };

  const stopRecording = () => {
    if (mediaRecorder) {
      mediaRecorder.stop();
      setIsRecording(false);
    }
  };

  const uploadAudio = async (audioBlob) => {
    const formData = new FormData();
    formData.append("audio", audioBlob, "recording.wav");

    try {
      const response = await axios.post(
        "/api/evaluate-pronunciation/",
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        },
      );
      onAnalysisComplete(response.data);
    } catch (error) {
      console.error("발음 평가 실패:", error);
      alert("발음 평가 중 오류가 발생했습니다.");
    }
  };

  return (
    <div className="voice-recorder">
      <button
        onClick={isRecording ? stopRecording : startRecording}
        className={`record-button ${isRecording ? "recording" : ""}`}
      >
        {isRecording ? "녹음 중지" : "녹음 시작"}
      </button>
    </div>
  );
};

export default VoiceRecorder;
