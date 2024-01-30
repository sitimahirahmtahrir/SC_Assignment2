from .models import Equipment
from .serializers import EquipmentSerializer
from rest_framework.generics import GenericAPIView
from rest_framework.mixins import ListModelMixin, CreateModelMixin, UpdateModelMixin, DestroyModelMixin, RetrieveModelMixin

# Create your views here.

class EquipmentLC(GenericAPIView, ListModelMixin, CreateModelMixin):
    queryset = Equipment.objects.all()                   #Retrieved all instances from database
    serializer_class = EquipmentSerializer               #Serialize or deserialize the data

    def get(self, request, *args, **kwargs):             #Get all equipments
        return self.list(request, *args, **kwargs)
    def post(self,request,*args,  **kwargs):             #Create new equipment
        return self.create(request, *args, **kwargs)

class EquipmentRUD(GenericAPIView, RetrieveModelMixin, UpdateModelMixin, DestroyModelMixin):
    queryset = Equipment.objects.all()
    serializer_class = EquipmentSerializer

    def get(self, request, *args, **kwargs):             #Get one equipment
        return self.retrieve(request, *args, **kwargs)
    def put(self,request,*args,  **kwargs):              #Update one equipment
        return self.update(request, *args, **kwargs)
    def delete(self,request,*args,  **kwargs):           #Delete one equipment
        return self.destroy(request, *args, **kwargs)
