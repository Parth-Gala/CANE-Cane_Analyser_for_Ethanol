import os
import base64
from flask import Flask, send_file, request, jsonify
from io import BytesIO
from PIL import Image as PILImage
import folium
from flask_cors import CORS

app = Flask(__name__)
CORS(app)

def generate_map_image(marker_positions, image_id, zoom=19):
    center_lat = sum(lat for lat, _ in marker_positions) / len(marker_positions)
    center_lng = sum(lng for _, lng in marker_positions) / len(marker_positions)
    my_map = folium.Map(location=[center_lat, center_lng], zoom_start=zoom, tiles='https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}', attr='Esri Satellite')

    img_data = my_map._to_png()
    img = PILImage.open(BytesIO(img_data)) 
    image_path = os.path.join(os.getcwd(), f"{image_id}_MapWithMarkers.png")
    img.save(image_path)

    return image_path

@app.route('/markedpoints', methods=['POST'])
def marked_points():
    data = request.json
    marker_positions = data.get('coordinates')
    image_id = data.get('image_id', 'map8')
    zoom = data.get('zoom', 22)

    marker_positions = [(float(coord['lat']), float(coord['lng'])) for coord in marker_positions]

    image_path = generate_map_image(marker_positions, image_id, zoom)
    return send_file(image_path, as_attachment=True), 200, {'Cache-Control': 'no-cache'}

if __name__ == '__main__':
    # generate_map_image([(25.501226105987104, 91.57914586365223), 
    #                     (25.501531441318313, 91.57832644879818), 
    #                     (25.5009952126494, 91.577979773283), 
    #                     (25.50061573560994, 91.57906338572502)], 'map_4', 23)
    app.run(debug=True)
