from rest_framework import serializers
from .models import MyModel

class MyModelSerializer(serializers.ModelSerializer):
    class Meta:
        model = MyModel
        fields = '__all__'

    def create(self, validated_data):
        mymodel = MyModel.objects.create(**validated_data)
        return mymodel