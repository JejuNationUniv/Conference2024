from rest_framework.views import APIView
from rest_framework.response import Response

class HelloWorldView(APIView):
    def get(self, request):
        return Response({"message": "아래의 버튼을 눌러주세요!"})