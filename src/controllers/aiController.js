const aiService = require('../services/aiService');

const getAllAi = (req, res) => {
    const ais = aiService.findAll();
    res.json(ais);
};

const getAiById = (req, res) => {
    const id = parseInt(req.params.id);
    const ai = aiService.findOne(id);
    if (!ai) {
        return res.status(404).json({ error: 'Нейросеть не найдена' });
    }
    res.json(ai);
};

const createAi = (req, res) => {
    const { src, title, description, link } = req.body;
    if (!src || !title || !description) {
        return res.status(400).json({ error: 'Не все обязательные поля заполнены' });
    }
    const newAi = aiService.create({ src, title, description, link });
    res.status(201).json(newAi);
};

const updateAi = (req, res) => {
    const id = parseInt(req.params.id);
    const updatedAi = aiService.update(id, req.body);
    if (!updatedAi) {
        return res.status(404).json({ error: 'Нейросеть не найдена' });
    }
    res.json(updatedAi);
};

const deleteAi = (req, res) => {
    const id = parseInt(req.params.id);
    const success = aiService.remove(id);
    if (!success) {
        return res.status(404).json({ error: 'Нейросеть не найдена' });
    }
    res.status(204).send();
};

module.exports = {
    getAllAi,
    getAiById,
    createAi,
    updateAi,
    deleteAi
};