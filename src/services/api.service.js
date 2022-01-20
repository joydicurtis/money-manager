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
            const response = await fetch(request);
            return await response.json();
        } catch {
            console.error(error);
        }
    }
}

export const apiService = new ApiService('https://money-manager-4f463-default-rtdb.firebaseio.com'); 