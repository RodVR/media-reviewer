from app import db

class Media(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(100), nullable=False)
    tags = db.Column(db.String(50), nullable=True)
    description = db.Column(db.Text, nullable=False)    
    type = db.Column(db.String(100), nullable=False)
    img_url = db.Column(db.String(200), nullable=True)
    
    def to_json(self):
        return {
            "id":self.id,
            "name":self.name,
            "tags":self.tags,
            "description":self.description,
            "type":self.type,
            "imgUrl":self.img_url
        }
        