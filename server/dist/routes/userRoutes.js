import express from 'express';
import User from '../models/User.js';
import { seedUserHistory } from '../utils/seed.js';
const router = express.Router();
router.post('/register', async (req, res) => {
    try {
        const { name, email } = req.body;
        const user = await User.create({ name, email, xp: 0, level: 1, badges: [], isPremium: false });
        res.status(201).json(user);
    }
    catch (error) {
        res.status(500).json({ message: error.message });
    }
});
router.post('/:userId/seed', async (req, res) => {
    try {
        await seedUserHistory(req.params.userId);
        const user = await User.findByPk(req.params.userId);
        res.json(user);
    }
    catch (error) {
        res.status(500).json({ message: error.message });
    }
});
router.post('/:userId/upgrade', async (req, res) => {
    try {
        const user = await User.findByPk(req.params.userId);
        if (!user)
            return res.status(404).json({ message: 'User not found' });
        await user.update({ isPremium: true });
        res.json(user);
    }
    catch (error) {
        res.status(500).json({ message: error.message });
    }
});
router.get('/:userId', async (req, res) => {
    try {
        const user = await User.findByPk(req.params.userId);
        if (!user)
            return res.status(404).json({ message: 'User not found' });
        res.json(user);
    }
    catch (error) {
        res.status(500).json({ message: error.message });
    }
});
router.put('/:userId', async (req, res) => {
    try {
        const { name, email } = req.body;
        const user = await User.findByPk(req.params.userId);
        if (!user)
            return res.status(404).json({ message: 'User not found' });
        await user.update({ name, email });
        res.json(user);
    }
    catch (error) {
        res.status(500).json({ message: error.message });
    }
});
export default router;
//# sourceMappingURL=userRoutes.js.map