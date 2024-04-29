import { spawn } from "child_process";

function generateMapImage(coordinates) {
    return new Promise((resolve, reject) => {
        // Spawn a new Python process
        const pythonProcess = spawn('python', ['path/to/your/python/script.py']);

        // Send coordinates as input to the Python script
        pythonProcess.stdin.write(JSON.stringify(coordinates));
        pythonProcess.stdin.end();

        // Capture output from the Python script
        let imageData = '';
        pythonProcess.stdout.on('data', (data) => {
            imageData += data.toString();
        });

        // Handle error output
        pythonProcess.stderr.on('data', (data) => {
            reject(data.toString());
        });

        // Handle process exit
        pythonProcess.on('close', (code) => {
            if (code === 0) {
                // Resolve with the image data received from Python
                resolve(imageData.trim());
            } else {
                reject(`Child process exited with code ${code}`);
            }
        });
    });
}

// Define an endpoint to receive coordinates from the frontend
export const generateMap = async (req, res) => {
    try {
        // Extract coordinates from the request body
        const { coordinates } = req.body;

        // Call the function to generate the map image
        const imagePath = await generateMapImage(coordinates);

        // Send the image path back as the response
        res.json({ image_path: imagePath });
    } catch (error) {
        // Handle errors
        console.error('Error generating map image:', error);
        res.status(500).json({ error: 'Failed to generate map image' });
    }
};