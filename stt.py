import speech_recognition as sr
import os

def perform_stt():
    r = sr.Recognizer()
    
    # 모델 경로 설정
    model_path = os.path.join(os.path.dirname(__file__), 'model')
    
    with sr.Microphone() as source:
        print('listening...')
        audio = r.listen(source, timeout=10, phrase_time_limit=10)
        print("......")

    try:
        # Vosk 모델 경로 지정
        text = r.recognize_vosk(audio, language='ko', model_path=model_path)
        return text, None
    except sr.UnknownValueError:
        return None, "Recognizer Failed.."
    except sr.RequestError as e:
        return None, f"Request Failed... {str(e)}"
