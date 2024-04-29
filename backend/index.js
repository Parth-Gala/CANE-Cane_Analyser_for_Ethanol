import express from 'express';
import cors from 'cors';
import mapsdownload from './routes/maps.js';


const app = express();
app.use(cors());

app.use("/api/maps", mapsdownload);

app.use((err, req, res, next) => {
    const errorStatus = err.status || 500;
    const errorMessage = err.message || "Something went wrong";
    return res.status(errorStatus).json({
        success: false,
        status: errorStatus,
        message: errorMessage,
        stack: err.stack,
    });
});

app.listen(5000, () => {
    console.log('Server is running on port 5000');
})