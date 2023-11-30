"""
This module takes care of starting the API Server, Loading the DB and Adding the endpoints
"""
from flask import Flask, request, jsonify, url_for, Blueprint
from api.models import db, User
from api.utils import generate_sitemap, APIException
from flask_cors import CORS
import cloudinary.uploader as uploader
import os
from werkzeug.security import generate_password_hash, check_password_hash
from base64 import b64encode


api = Blueprint('api', __name__)


# Allow CORS requests to this API
CORS(api)

def set_password(password, salt):
    return generate_password_hash(f"{password}{salt}")


def check_password(hash_password, password, salt):
    return check_password_hash(hash_password, f"{password}{salt}")



@api.route('/hello', methods=['POST', 'GET'])
def handle_hello():

    response_body = {
        "message": "Hello! I'm a message that came from the backend, check the network tab on the google inspector and you will see the GET request"
    }

    return jsonify(response_body), 200


@api.route("/register", methods=["POST"])
def register_user():
    data_file = request.files
    data_form = request.form

    # print(data_file)
    # print(data_form)
    data = {
        "lastname":data_form.get("lastname"),
        "email": data_form.get("email"),
        "password": data_form.get("password"),
        "avatar":data_file.get("avatar")
    }

    user = User.query.filter_by(email=data.get("email")).one_or_none()
    if user is not None:
        return jsonify({"message":"the user exists"}), 400

    else:
        salt = b64encode(os.urandom(32)).decode("utf-8")
        data.update({"salt":salt})
        data.update({"password": set_password(data.get("password"), salt)})
   
    result_avatar = uploader.upload(data.get("avatar"))

    data.update({"avatar":result_avatar.get("secure_url")})
    data.update({"public_id_avatar":result_avatar.get("public_id")})

    user = User(
        email=data.get("email"), 
        lastname=data.get("lastname"),
        password=data.get("password"),
        avatar=data.get("avatar"),
        salt=data.get("salt"),
        public_id_avatar=data.get("public_id_avatar")
        )
    db.session.add(user)

    try:
        db.session.commit()
        return jsonify({"message":"user register success"}),201
    except Exception as error:
        print(error)
        return jsonify({"message":"error al registrar el usuario"}), 500


@api.route("/user", methods=["GET"])
def get_all_users():
    user = User.query.all()
    
    result = list(map(lambda item: item.serialize(), user))

    return jsonify(result), 200