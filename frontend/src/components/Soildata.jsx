import React, { useState, useEffect } from "react";
import axios from "axios";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
  RadialLinearScale,
  PointElement,
  LineElement,
  Filler,
} from "chart.js";
import { Bar, Radar, Line } from "react-chartjs-2";

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  RadialLinearScale,
  PointElement,
  LineElement,
  Filler,
  Title,
  Tooltip,
  Legend
);

const Soildata = ({ lon, lat }) => {
  const [soilData, setSoilData] = useState(null);
  const apiUrl = `https://rest.isric.org/soilgrids/v2.0/properties/query`;

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(apiUrl, {
          params: {
            lon: lon,
            lat: lat,
            property: [
              "sand",
              "clay",
              "silt",
              "nitrogen",
              "phh2o",
              "cfvo",
              "ocd",
              "ocs",
            ],
          },
        });
        console.log(response.data);
        setSoilData(response.data);
      } catch (error) {
        console.error("Error fetching soil data:", error);
      }
    };

    fetchData();
  }, [apiUrl, lon, lat]);

  const prepareChartData = () => {
    if (!soilData){
      return <p>Wrong place selected. Please choose another loacation.</p>;
    } 

    const datasets = soilData.properties.layers
      .filter((layer) => ["sand", "clay", "silt"].includes(layer.name))
      .map((layer) => ({
        label: layer.name.toUpperCase(),
        data: layer.depths.map((depth) => depth.values.mean),
        backgroundColor:
          layer.name === "sand"
            ? "rgba(255, 206, 86, 0.5)"
            : layer.name === "clay"
            ? "rgba(139, 69, 19, 0.8)"
            : "rgba(169, 169, 169, 0.5)",
      }));

    console.log(datasets);
    return {
      labels: soilData.properties.layers[0].depths.map((depth) => depth.label),
      datasets: datasets,
    };
  };

  // const getPhh2oValue = () => {
  //   if (!soilData) return null;
  //   const phh2oLayer = soilData.properties.layers.find(
  //     (layer) => layer.name === "phh2o"
  //   );
  //   if (!phh2oLayer) return null;
  //   const phh2oValue = phh2oLayer.depths[0].values.mean; // Assuming only one depth value
  //   return phh2oValue;
  // };

  // const phScaleGradient = () => {
  //   // Define the pH scale range and corresponding colors
  //   const pHScale = Array.from({ length: 15 }, (_, i) => i);
  //   const colors = [
  //     "rgba(255,0,0,0.5)", // Red for acidic
  //     "rgba(255,255,0,0.5)", // Yellow for neutral
  //     "rgba(0,255,0,0.5)", // Green for alkaline
  //   ];

  //   // Create datasets for the pH scale
  //   const datasets = [
  //     {
  //       label: "pH Scale",
  //       data: pHScale,
  //       backgroundColor: colors,
  //     },
  //   ];

  //   return {
  //     labels: pHScale,
  //     datasets: datasets,
  //   };
  // };

  // const phh2oValue = getPhh2oValue();

  const linedata = () => {
    if (!soilData) return null;

    const datasets = soilData.properties.layers
      .filter((layer) => ["nitrogen", "cfvo", "ocd"].includes(layer.name))
      .map((layer) => {
        let label, backgroundColor, borderColor;

        switch (layer.name) {
          case "nitrogen":
            label = "Nitrogen";
            backgroundColor = "rgba(255, 0, 0, 0.5)";
            borderColor = "rgba(255, 0, 0, 1)";
            break;
          case "cfvo":
            label = "Potassium";
            backgroundColor = "rgba(0, 0, 255, 0.5)";
            borderColor = "rgba(0, 0, 255, 1)";
            break;
          case "ocd":
            label = "Organic Carbon";
            backgroundColor = "rgba(0, 0, 0, 0.5)";
            borderColor = "rgba(0, 0, 0, 1)";
            break;
          default:
            label = layer.name.toUpperCase();
            backgroundColor = "rgba(0,0,0, 0.5)";
            borderColor = "rgba(0,0,0, 1)";
        }

        return {
          label: label,
          data: layer.depths.map((depth) => depth.values.mean),
          backgroundColor: backgroundColor,
          borderColor: borderColor,
          borderWidth: 1,
        };
      });

    return {
      labels: soilData.properties.layers[0].depths.map((depth) => depth.label),
      datasets: datasets,
    };
  };

  const preparePHChartData = () => {
    if (!soilData) return null;
  
    // Extract the phh2o layer
    const phh2oLayer = soilData.properties.layers.find(layer => layer.name === 'phh2o');
    if (!phh2oLayer) return null;
  
    // Initialize depth ranges and pH data
    const depthRanges = ['0-5', '5-15', '15-30', '30-60', '60-100', '100-200']; // Update with your desired depth ranges
    const phData = depthRanges.map(_ => []);
  
    // Iterate through the depths in the phh2o layer and populate the pH data for each depth range
    phh2oLayer.depths.forEach(depth => {
      const depthLabel = depth.label.split('-');
      const depthStart = parseInt(depthLabel[0]);
      const depthEnd = parseInt(depthLabel[1].replace('cm', ''));
      const depthIndex = depthRanges.findIndex(range => {
        const [start, end] = range.split('-').map(parseFloat);
        return depthStart >= start && depthEnd <= end;
      });
      if (depthIndex !== -1) {
        const scaledPH = depth.values.mean * (14 / 100); // Scale the pH value down to the range of 0 to 14
        phData[depthIndex].push(scaledPH);
      }
    });
  
    // Calculate average pH value for each depth range
    const avgPHData = phData.map(data => {
      const sum = data.reduce((acc, curr) => acc + curr, 0);
      return sum / data.length || 0; // Handle division by zero
    });
  
    // Define bar chart data
    const barChartData = {
      labels: depthRanges,
      datasets: [{
        label: 'pH',
        data: avgPHData,
        backgroundColor: 'rgba(54, 162, 235, 0.5)', // Adjust color as needed
        borderColor: 'rgba(54, 162, 235, 1)', // Adjust border color as needed
        borderWidth: 1,
      }],
    };
  
    return barChartData;
  };
  

  
  return (
    <div>
      {soilData ? (
        <div>
          <h2 className="flex justify-center font-bold text-2xl">
            Soil Analysis
          </h2>
          <div className=" flex justify-center items-center p-40 mx-10">
            <Bar
              data={prepareChartData()}
              options={{
                responsive: true,
                plugins: {
                  legend: {
                    position: "top",
                  },
                  title: {
                    display: true,
                    text: "Soil Particles vs Depth",
                  },
                },
                scales: {
                  x: {
                    title: {
                      display: true,
                      text: "Depth (cm)",
                    },
                  },
                  y: {
                    title: {
                      display: true,
                      text: "Soil Particles (g/Kg)",
                    },
                  },
                },
              }}
            />
          </div>
          <div className=" flex justify-center items-center p-40 mx-10">
            <Line
              data={linedata()}
              options={{
                responsive: true,
                plugins: {
                  legend: {
                    position: "top",
                  },
                  title: {
                    display: true,
                    text: "Elemental Trends with Depth",
                  },
                },
                scales: {
                  x: {
                    title: {
                      display: true,
                      text: "Depth (cm)",
                      font: "large",
                    },
                  },
                  y: {
                    title: {
                      display: true,
                      font: "bold",
                      text: " (cm³/dm³)",
                    },
                  },
                },
              }}
            />
          </div>

          <div className="flex justify-center items-center p-40 mx-10">
  <Bar
    data={preparePHChartData()}
    options={{
      responsive: true,
      scales: {
        x: {
          title: {
            display: true,
            text: 'Depth Range (cm)',
          },
        },
        y: {
          title: {
            display: true,
            text: 'pH Value',
          },
          suggestedMin: 0, // Set minimum y-axis value
          suggestedMax: 14, // Set maximum y-axis value
        },
      },
    }}
  />
</div>


        </div>
      ) : (
        <>
        <div className=" relative flex justify-center">
          <p className=" absolute top-52 font-semibold text-xl">Please Wait...Gathering soil data</p>
        </div>
        
        <div className=" flex justify-center items-center align-middle w-screen h-screen">
          <div className=" flex justify-center items-center ">
            <div
              id="loader"
              className="w-20 h-20 relative rounded-lg animate-spin hover:bg-gray-700"
              >
              <div className="w-14 h-14 absolute rounded-lg bg-green-600 -top-5 -left-5"></div>
              <div className="w-14 h-14 absolute rounded-lg bg-blue-600 -bottom-5 -right-5"></div>
            </div>
          </div>
        </div>
              </>
      )}
    </div>
  );
};

export default Soildata;
