# api/views.py

from django.http import JsonResponse
from rest_framework.decorators import api_view

@api_view(['GET'])
def main_view(request):
    return JsonResponse({"message": "Welcome to the AI Pronunciation Assistant!"})

@api_view(['GET'])
def get_sentence(request):
    # 여기에 문장 생성 로직을 구현합니다
    sentence = "나는 낙엽이 바람에 날리는 모습을 바라보며 낭만적인 감정에 빠져들었다."
    return JsonResponse({"sentence": sentence})

@api_view(['POST'])
def analyze_pronunciation(request):
    # 여기에 발음 분석 로직을 구현합니다
    user_pronunciation = request.data.get('pronunciation', '')
    feedback = "발음이 정확합니다."  # 예시 피드백
    return JsonResponse({"feedback": feedback})