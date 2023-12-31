from flask_sqlalchemy import SQLAlchemy

db = SQLAlchemy()

class User(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    email = db.Column(db.String(120), unique=True, nullable=False)
    lastname= db.Column(db.String(80), unique=False, nullable=False)
    password = db.Column(db.String(180), unique=False, nullable=False)
    salt = db.Column(db.String(180), unique=False, nullable=False)
    avatar = db.Column(db.String(100), unique=False, nullable=False)
    public_id_avatar = db.Column(db.String(80), unique=False, nullable=False)



    def __repr__(self):
        return f'<User {self.email}>'

    def serialize(self):
        return {
            "id": self.id,
            "email": self.email,
            "lastname":self.lastname,
            "avatar":self.avatar
        }