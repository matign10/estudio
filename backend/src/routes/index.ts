import express from 'express';
import teamRoutes from './teamRoutes';
import publicationRoutes from './publicationRoutes';
import areaRoutes from './areaRoutes';
import contactRoutes from './contactRoutes';

const router = express.Router();

// Mount all routes
router.use('/team', teamRoutes);
router.use('/publications', publicationRoutes);
router.use('/areas', areaRoutes);
router.use('/contact', contactRoutes);

export default router;