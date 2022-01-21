class ApiService {
    constructor(baseUrl) {
        this.url = baseUrl;
    }
    async createExpence(sum) {
        try {
            const request = new Request(this.url + '/expences.json', {
                method: 'post',
                body: JSON.stringify(sum)
            });
            useRequest(request);
        } catch {
            console.error(error);
        }
    }

    async fetchExpences() {
        try {
            const request = new Request(`${this.url}/expences.json`, {
                method: 'get'
            })
            return useRequest(request);
        } catch(error) {
            console.error(error)
        }
    }
}

async function useRequest(request) {
    const response = await fetch(request);
    return await response.json();
}

export const apiService = new ApiService('https://money-manager-4f463-default-rtdb.firebaseio.com'); 