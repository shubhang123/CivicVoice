import React from "react";

const HeatmapComponent: React.FC = () => {
  return (
    <div className="flex justify-center pt-10" style={{ width: "100%", height: "100vh" }}>
      <iframe
        src="http://localhost:5001/"
        style={{ width: "90%", height: "100%", border: "none" , borderRadius: "20px"}}
        title="Heatmap"
      />
    </div>
  );
};

export default HeatmapComponent;
