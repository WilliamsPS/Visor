from flask import Blueprint, jsonify, request

#entity
from models.Entities.Aire import Aire

#models
from models.AireModels import AireModel

main=Blueprint("aire_blueprint", __name__)

@main.route('/thing001')
def get_aire():
    try:
        aires=AireModel.get_aire()
        return jsonify(aires)
    except Exception as ex:
        return jsonify({"message":str(ex)}),500
 

@main.route('/thing001/<filtro>')
def get_aire_filtro(filtro):
    try:
        aires = AireModel.get_aire_filtro_thin001(filtro)
        return jsonify(aires)
    except Exception as ex:
        return jsonify({"message": str(ex)}), 500

