import pandas as pd
import folium
from folium.plugins import HeatMap
from flask import Flask, send_file
from flask_cors import CORS

app = Flask(__name__)
CORS(app) 

csv_file = "location_geocoding_results.csv" 
df = pd.read_csv(csv_file)


df = df[(df["Latitude"] != "") & (df["Longitude"] != "")]
df["Latitude"] = df["Latitude"].astype(float)
df["Longitude"] = df["Longitude"].astype(float)


df = df[(df["Longitude"] >= 68) & (df["Longitude"] <= 98) &
        (df["Latitude"] >= 6) & (df["Latitude"] <= 38)]

TILE_THEMES = {
    "CartoDB Positron": "CartoDB Positron (Light theme)",
    "CartoDB dark_matter": "CartoDB Dark Matter (Dark theme)",
    "OpenStreetMap": "Standard OpenStreetMap",
    "Stamen Terrain": "Stamen Terrain (Natural colors)",
    "Stamen Toner": "Stamen Toner (High contrast)",
    "Stamen Watercolor": "Stamen Watercolor (Artistic)",
}


m = folium.Map(
    location=[22.3511, 78.6677], 
    zoom_start=5, 
    tiles=list(TILE_THEMES.keys())[0]  
)


heat_data = df[["Latitude", "Longitude"]].values.tolist()

HeatMap(
    heat_data, 
    radius=25,           
    blur=15,             
    min_opacity=0.4,    
    max_zoom=1,          
    gradient={
        "0.0": 'green',  
        "0.5": 'yellow',  
        "1.0": 'red'    
    }
).add_to(m)

heatmap_path = "heatmap.html"
m.save(heatmap_path)

@app.route('/')
def serve_heatmap():
    """Serve the generated heatmap file."""
    return send_file(heatmap_path, mimetype='text/html')

def list_available_themes():
    """Print available Folium tile themes."""
    print("Available Folium Tile Themes:")
    for key, description in TILE_THEMES.items():
        print(f"- {key}: {description}")

if __name__ == "__main__":
    app.run(debug=True, port=5001)
