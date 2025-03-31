import traceback
from django.shortcuts import render
from django.http import JsonResponse
from django.views.decorators.http import require_POST
from django.views.decorators.csrf import csrf_exempt
from rest_framework.decorators import api_view
from rest_framework.response import Response
from marketdata.utils.utils import refresh_bond_data
from .models import Bond
from .serializers import BondSerializer


def react_home(request):
    return render(request, "marketdata/index.html")

@csrf_exempt
@require_POST
def refresh_bond_data_view(request):
    try:
        refresh_bond_data()
        return JsonResponse({"status": "success"})
    except Exception as e:
        print("Error refreshing bond data:")
        traceback.print_exc()  # ✅ Full traceback in the console
        return JsonResponse({"status": "error", "message": str(e)}, status=500)

@api_view(["GET"])
def get_bonds(request):
    bonds = Bond.objects.all().order_by("country", "maturity")
    serializer = BondSerializer(bonds, many=True)
    return Response(serializer.data)