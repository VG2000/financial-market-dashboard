from django.shortcuts import render
from django.http import JsonResponse
from django.views.decorators.http import require_POST
from marketdata.utils.utils import refresh_bond_data

def react_home(request):
    return render(request, "marketdata/index.html")

@require_POST
def refresh_bond_data_view(request):
    try:
        refresh_bond_data()
        return JsonResponse({"status": "success"})
    except Exception as e:
        return JsonResponse({"status": "error", "message": str(e)}, status=500)
