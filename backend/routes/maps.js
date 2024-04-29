import express from 'express';
import { generateMap } from '../controllers/map.js';

const router = express.Router();

router.post('/markedpoints', generateMap);

export default router;