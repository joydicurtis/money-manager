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

    async createIncoming(sum) {
        try {
            const request = new Request(this.url + '/incomings.json', {
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
                method: 'get',
                headers: {
                    'Accept': 'application/json, text/plain, */*',
                    'Content-Type': 'application/json'
                }
            })
            return useRequest(request);
        } catch(error) {
            console.error(error)
        }
    }

    async fetchIncomings() {
        try {
            const request = new Request(`${this.url}/incomings.json`, {
                method: 'get',
                headers: {
                    'Accept': 'application/json, text/plain, */*',
                    'Content-Type': 'application/json'
                }
            })
            return useRequest(request);
        } catch(error) {
            console.error(error)
        }
    }

    async updateExpenceById(id, sum) {
        try {
            const request = new Request(`${this.url}/expences/${id}.json`, {
                method: 'put',
                body: JSON.stringify(sum)
            })
            useRequest(request);
        }
        catch (error) {
            console.error(error);
        }
    }

    async updateIncomingById(id, sum) {
        try {
            const request = new Request(`${this.url}/incomings/${id}.json`, {
                method: 'put',
                body: JSON.stringify(sum)
            })
            useRequest(request);
        }
        catch (error) {
            console.error(error);
        }
    }

    async deleteExpenceById(id) {
        try {
            const request = new Request(`${this.url}/expences/${id}.json`, {
                method: 'delete'
            })
            useRequest(request);
        }
        catch (error) {
            console.error(error);
        }
    }

    async deleteIncomingById(id) {
        try {
            const request = new Request(`${this.url}/incomings/${id}.json`, {
                method: 'delete'
            })
            useRequest(request);
        }
        catch (error) {
            console.error(error);
        }
    }
}

async function useRequest(request) {
    const response = await fetch(request);
    return await response.json();
}

export const apiService = new ApiService('https://money-manager-4f463-default-rtdb.firebaseio.com'); 