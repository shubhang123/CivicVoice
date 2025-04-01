import pandas as pd
import folium
from folium.plugins import HeatMap
from flask import Flask, send_file
from flask_cors import CORS

app = Flask(__name__)
CORS(app)  # Enable CORS for testing

# Load CSV data
csv_file = "location_geocoding_results.csv"  # Ensure this file exists
df = pd.read_csv(csv_file)

# Drop rows with empty coordinates and convert to float
df = df[(df["Latitude"] != "") & (df["Longitude"] != "")]
df["Latitude"] = df["Latitude"].astype(float)
df["Longitude"] = df["Longitude"].astype(float)

# Filter only valid coordinates within India (Bounding Box)
df = df[(df["Longitude"] >= 68) & (df["Longitude"] <= 98) &
        (df["Latitude"] >= 6) & (df["Latitude"] <= 38)]

# Available Folium tile themes (with descriptions):
TILE_THEMES = {
    "CartoDB Positron": "CartoDB Positron (Light theme)",
    "CartoDB dark_matter": "CartoDB Dark Matter (Dark theme)",
    "OpenStreetMap": "Standard OpenStreetMap",
    "Stamen Terrain": "Stamen Terrain (Natural colors)",
    "Stamen Toner": "Stamen Toner (High contrast)",
    "Stamen Watercolor": "Stamen Watercolor (Artistic)",
}

# Create a base map centered around India with a light theme
m = folium.Map(
    location=[22.3511, 78.6677], 
    zoom_start=5, 
    tiles=list(TILE_THEMES.keys())[0]  # Default to CartoDB Positron (light theme)
)

# Prepare data for the heatmap
heat_data = df[["Latitude", "Longitude"]].values.tolist()

# Improved heatmap layer with better gradient and wider coverage
HeatMap(
    heat_data, 
    radius=25,           # Increased radius for wider coverage
    blur=15,             # Adjusted blur for smoother gradient
    min_opacity=0.4,     # Slightly increased minimum opacity
    max_zoom=1,          # Allows heatmap to be visible at more zoom levels
    gradient={
        "0.0": 'blue',  # Light blue at the lowest intensity
        "0.5": 'cyan',  # Cyan in the middle
        "1.0": 'red'    # Red at the highest intensity
    }
).add_to(m)

# Save the map as an HTML file
heatmap_path = "heatmap.html"
m.save(heatmap_path)

@app.route('/')
def serve_heatmap():
    """Serve the generated heatmap file."""
    return send_file(heatmap_path, mimetype='text/html')

# Function to demonstrate theme options
def list_available_themes():
    """Print available Folium tile themes."""
    print("Available Folium Tile Themes:")
    for key, description in TILE_THEMES.items():
        print(f"- {key}: {description}")

if __name__ == "__main__":
    # Uncomment to see available themes
    # list_available_themes()
    app.run(debug=True, port=5001)
