class StockUrls {
    constructor() {
        this.baseUrl = 'http://localhost:5000/api';
    }

    getStocks() {
        return `${this.baseUrl}/ai`;
    }

    getStockById(id) {
        return `${this.baseUrl}/ai/${id}`;
    }

    createStock() {
        return `${this.baseUrl}/ai`;
    }

    removeStockById(id) {
        return `${this.baseUrl}/ai/${id}`;
    }

    updateStockById(id) {
        return `${this.baseUrl}/ai/${id}`;
    }
}

export const stockUrls = new StockUrls();