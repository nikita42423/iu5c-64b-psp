const fileService = require('./fileService');

let dataFilePath;

const init = (filePath) => {
    dataFilePath = filePath;
};

const findAll = () => {
    return fileService.readData(dataFilePath);
};

const findOne = (id) => {
    const ais = fileService.readData(dataFilePath);
    return ais.find(ai => ai.id === id);
};

const create = (aiData) => {
    const ais = fileService.readData(dataFilePath);
    const newId = ais.length > 0 
        ? Math.max(...ais.map(a => a.id)) + 1 
        : 1;
    const newAi = { id: newId, ...aiData };
    ais.push(newAi);
    fileService.writeData(dataFilePath, ais);
    return newAi;
};

const update = (id, aiData) => {
    const ais = fileService.readData(dataFilePath);
    const index = ais.findIndex(a => a.id === id);
    if (index === -1) return null;
    ais[index] = { ...ais[index], ...aiData };
    fileService.writeData(dataFilePath, ais);
    return ais[index];
};

const remove = (id) => {
    const ais = fileService.readData(dataFilePath);
    const filteredAis = ais.filter(a => a.id !== id);
    if (filteredAis.length === ais.length) {
        return false;
    }
    fileService.writeData(dataFilePath, filteredAis);
    return true;
};

module.exports = { init, findAll, findOne, create, update, remove };