const express = require('express');
const router = express.Router();
const aiController = require('../controllers/aiController');

router.get('/', aiController.getAllAi);
router.get('/:id', aiController.getAiById);
router.post('/', aiController.createAi);
router.patch('/:id', aiController.updateAi);
router.delete('/:id', aiController.deleteAi);

module.exports = router;