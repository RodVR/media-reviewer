from app import app, db
from flask import request, jsonify
from models import Media


@app.route("/api/media", methods=["GET"])
def get_media():
    media = Media.query.all()
    result = [m.to_json() for m in media]
    return jsonify(result)

@app.route("/api/media", methods=["POST"])
def create_media():
    try:
        data = request.json
        
        required_field = ["name", "description", "type"]
        for field in required_field:
            if field not in data or not data.get(field):
                return jsonify({"error":f"Missing required field: {field}"}), 400
        
        name = data.get("name")
        tags = data.get("tags")
        description = data.get("description")
        type = data.get("type")
        
        if type == "game":
            img_url = f"https://www.freepnglogos.com/uploads/games-png/download-games-png-transparent-for-designing-work-5.png"
        elif type == "movie":
            img_url = f"https://4.bp.blogspot.com/-sD42_bp7c_w/U2wI0RarXYI/AAAAAAAAJ1g/S1RMC3z5ubY/s1600/FilmReelrutzui.png"
        elif type == "book":
            img_url = f"https://th.bing.com/th/id/R.4ee9220808b93bbab6a1ce93cb0fc6ee?rik=h8yyOZ1Iy%2bPl4A&pid=ImgRaw&r=0"
        elif type == "other":
            img_url = f"https://cdn-icons-png.flaticon.com/512/8467/8467890.png"
        else:
            img_url = None
            
        new_media = Media(name = name, tags = tags, description = description,type = type, img_url = img_url)
        db.session.add(new_media)
        
        db.session.commit()
        
        return jsonify(new_media.to_json()), 201
    
    except Exception as e:
        db.session.rollback()
        return jsonify({"error":str(e)}), 500
    
    
@app.route("/api/media/<int:id>", methods=["DELETE"])
def delete_media(id):
    try:
        media = Media.query.get(id)
        if media is None:
            return jsonify({"error":"Media not found"}), 404
        
        db.session.delete(media)
        db.session.commit()
        
        return jsonify({"msg":"Media deleted"}), 200
    
    except Exception as e:
        db.session.rollback()
        return jsonify({"error":str(e)}), 500
    

@app.route("/api/media/<int:id>", methods=["PATCH"])
def update_media(id):
    try:
        media = Media.query.get(id)
        if media is None:
            return jsonify({"error":"Media not found"}), 404
        
        data = request.json
        
        media.name = data.get("name", media.name)
        media.tags = data.get("tags", media.tags)
        media.description = data.get("description", media.description)
        media.type = data.get("type", media.type)
        
        db.session.commit()
        return jsonify(media.to_json()), 200

    except Exception as e:
        db.session.rollback()
        return jsonify({"error":str(e)}), 500