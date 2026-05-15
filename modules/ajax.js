class Ajax {
    async get(url) {
        const response = await fetch(url);
        const data = await response.json();
        return { data, status: response.status };
    }

    async post(url, data) {
        const response = await fetch(url, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(data)
        });
        const result = await response.json();
        return { data: result, status: response.status };
    }

    async patch(url, data) {
        const response = await fetch(url, {
            method: 'PATCH',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(data)
        });
        const result = await response.json();
        return { data: result, status: response.status };
    }

    async delete(url) {
        const response = await fetch(url, { method: 'DELETE' });
        return { data: null, status: response.status };
    }
}

export const ajax = new Ajax();