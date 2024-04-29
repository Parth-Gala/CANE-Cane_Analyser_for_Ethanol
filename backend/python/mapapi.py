import os
import base64
from io import BytesIO
from PIL import Image as PILImage
import requests
import time
from flask import Flask, request, Response, jsonify
import numpy as np
import cv2
# import jsonpickle
# from flask_ngrok import run_with_ngrok
from selenium import webdriver
import folium
# from geopy.geocoders import Nominatim
from traceback import print_exc
from IPython.display import display, Image
from flask_cors import CORS

# app = Flask(__name__)
# CORS(app)
# app.config['MAX_CONTENT_LENGTH'] = 16 * 1024 * 1024  # Set to your desired maximum size in bytes (e.g., 16MB)
# run_with_ngrok(app)

def generate_map_image(marker_positions, image_id, zoom=19):


# code 1 trieddddddd
    # output = {}
    # elevation_list = []

    # # Elevation Data Retrieval
    # for lat, lng in marker_positions:
    #     elevation_list.append(None)  # Dummy elevation data for now

    # # Map Generation with Folium
    # center_lat = sum(lat for lat, _ in marker_positions) / len(marker_positions)
    # center_lng = sum(lng for _, lng in marker_positions) / len(marker_positions)
    # tile_layer = "https://mt1.google.com/vt/lyrs=s&x={x}&y={y}&z={z}"
    # my_map = folium.Map(location=[center_lat, center_lng], zoom_start=zoom, tiles=tile_layer, attr='Google Maps')
    # folium.Polygon(locations=marker_positions, color='red').add_to(my_map)
    
    # # Save the map with polygon
    # map_with_polygon_path = os.path.join(os.getcwd(), f"{image_id}_MapWithPolygon.html")
    # my_map.save(map_with_polygon_path)
    
    # # Screenshot Capture using Selenium WebDriver
    # options = webdriver.ChromeOptions()
    # options.add_argument('--headless')
    # driver = webdriver.Chrome(options=options)
    # driver.get(map_with_polygon_path)
    # time.sleep(2)

    # # Save the screenshot
    # screenshot_path = os.path.join(os.getcwd(), f"{image_id}_MapWithPolygon.png")
    # driver.save_screenshot(screenshot_path)
    # driver.quit()

    # return screenshot_path


# ////////////////////////////////////////////////////////////////////////

# code 2 triedddd
    # center_lat = sum(lat for lat, _ in marker_positions) / len(marker_positions)
    # center_lng = sum(lng for _, lng in marker_positions) / len(marker_positions)
    # my_map = folium.Map(location=[center_lat, center_lng], zoom_start=zoom, tiles='Stamen Terrain', attr='Map tiles by Stamen Design, under CC BY 3.0. Data by OpenStreetMap, under ODbL.')

    # # Add markers to the map
    # for lat, lng in marker_positions:
    #     folium.Marker([lat, lng]).add_to(my_map)

    # # Save the map as an image
    # img_data = my_map._to_png()
    # img = PILImage.open(BytesIO(img_data))

    # # Save the image to a file
    # image_path = os.path.join(os.getcwd(), f"{image_id}_MapWithMarkers.png")
    # img.save(image_path)

    # return image_path

# def generate_map_image(marker_positions, image_id, zoom=10):
    center_lat = sum(lat for lat, _ in marker_positions) / len(marker_positions)
    center_lng = sum(lng for _, lng in marker_positions) / len(marker_positions)
    my_map = folium.Map(location=[center_lat, center_lng], zoom_start=zoom, tiles='https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}', attr='Esri Satellite')

    for lat, lng in marker_positions:
        folium.Marker([lat, lng]).add_to(my_map)

    img_data = my_map._to_png()
    img = PILImage.open(BytesIO(img_data)) 
    image_path = os.path.join(os.getcwd(), f"{image_id}_MapWithMarkers.png")
    img.save(image_path)

    return image_path

# /////////////////////////////////////////////////////////////////////////////////////////////
# Create a Folium map with minimal settings
#     my_map = folium.Map(location=[marker_positions[0][0], marker_positions[0][1]], zoom_start=zoom, tiles=None)

#     # Add the polygon to the map with only a boundary
#     folium.PolyLine(locations=marker_positions, color='red').add_to(my_map)

#     # Fit the map to the bounds of the polygon
#     bounds = [[min(lat for lat, _ in marker_positions), min(lng for _, lng in marker_positions)],
#               [max(lat for lat, _ in marker_positions), max(lng for _, lng in marker_positions)]]
#     my_map.fit_bounds(bounds)

#     # Save the map as an HTML file
#     html_path = os.path.join(os.getcwd(), f"{image_id}_MapWithPolygon.html")
#     my_map.save(html_path)

#     # Use Selenium to capture screenshot
#     options = webdriver.ChromeOptions()
#     options.add_argument('--headless')
#     driver = webdriver.Chrome(executable_path ='C:/Users/parth/Downloads/chromedriver.exe',options=options)
#     driver.get(html_path)
#     time.sleep(2)

#     # Save the screenshot
#     screenshot_path = os.path.join(os.getcwd(), f"{image_id}_MapWithPolygon.png")
#     driver.save_screenshot(screenshot_path)
#     driver.quit()

#     return screenshot_path

# @app.route("/")
# def home():
#     return "Hello, localhost is working!"

# @app.route("/markedpoints", methods=['POST'])
# def markers():
#   try:
#         coordinates = request.json['coordinates']
#         coordinates_list = coordinates.split(',')
#         marker_positions = [(float(coordinates_list[i]), float(coordinates_list[i+1])) for i in range(0, len(coordinates_list), 2)]
        
#         for lat, lng in marker_positions:
#             print(f"Latitude: {lat}, Longitude: {lng}")

#         image_id = 'map_1'  # You can customize the image ID
#         image_path = generate_map_image(marker_positions, image_id)
        
#         response = {'message': 'Coordinates received', 'coordinates': coordinates, 'image_path': image_path}
#         return jsonify(response), 200
#   except Exception as e:
#         print_exc()
#         return jsonify({'error': str(e)}), 400


# @app.route("/imgdown", methods=['GET'])
# def satellite_image():
#     lat_lng = request.args.get('LatLong').split(",")
#     image_id = request.args.get('ProjectID')
#     zoom = float(request.args.get('zoomlevel', 15))  # Default zoom level is 15

#     output = {}
#     polygon_coords = []
#     elevation_list = []

#     # Elevation Data Retrieval
#     for i in range(0, len(lat_lng), 2):
#         url = "https://maps.googleapis.com/maps/api/elevation/json?locations=" + str(lat_lng[i]) + "," + str(
#             lat_lng[i + 1]) + "&key=YOUR_GOOGLE_MAPS_API_KEY"
#         x = requests.get(url)
#         elevation_list.append(x.json()["results"][0]["elevation"])
#         polygon_coords.append((float(lat_lng[i]), float(lat_lng[i + 1])))

#     # Map Generation with Folium
#     center_lat = sum(lat for lat, _ in polygon_coords) / len(polygon_coords)
#     center_lng = sum(lng for _, lng in polygon_coords) / len(polygon_coords)
#     tile_layer = "https://mt1.google.com/vt/lyrs=s&x={x}&y={y}&z={z}"
#     my_map = folium.Map(location=[center_lat, center_lng], zoom_start=zoom, tiles=tile_layer, attr='Google Maps')
#     my_map2 = my_map
#     my_map2.fit_bounds([(min_lat, min_lng), (max_lat, max_lng)])
#     my_map2.save(os.getcwd() + "\\assets\\satelliteMapNoPolygon.html")
#     folium.Polygon(locations=polygon_coords, color='red').add_to(my_map)
#     my_map.fit_bounds(polygon_coords)
#     my_map.save(os.getcwd() + "\\assets\\satelliteMap.html")

#     # Screenshot Capture using Selenium WebDriver
#     options = webdriver.ChromeOptions()
#     options.add_argument('--headless')
#     driver = webdriver.Chrome(options=options)
#     driver.get(os.getcwd() + "\\assets\\satelliteMap.html")
#     time.sleep(2)

#     # Save screenshots
#     screenshot_path = os.getcwd() + "\\assets\\" + image_id + "_ConstructionPolygonSatelliteImageUnmasked.png"
#     driver.save_screenshot(screenshot_path)

#     driver.get(os.getcwd() + "\\assets\\satelliteMapNoPolygon.html")
#     time.sleep(2)
#     screenshot_path2 = os.getcwd() + "\\assets\\" + image_id + "_ConstructionSatelliteImageNoPolygon.png"
#     driver.save_screenshot(screenshot_path2)
#     driver.quit()

#     # Return response
#     output['result'] = "The map has successfully been created"
#     output['satelliteImageUnmasked'] = screenshot_path
#     output['satelliteImageNoPolygon'] = screenshot_path2
#     output['elevationList'] = elevation_list
#     return jsonify(output)

if __name__ == '__main__':
    generate_map_image([(37.7749, -122.4194), (37.7749, -122.4194)], 'map_2', 19)
