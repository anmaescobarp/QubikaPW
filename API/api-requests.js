const fetch = require("node-fetch");
const { expect } = require('@playwright/test');
//import fetch from 'node-fetch';
//const fetch = import("node-fetch").then(module => module.default);

exports.APIRequestsQuibika = class APIRequestsQuibika {

    async getAPIToken() { 
        const url = "https://api.club-administration.qa.qubika.com/api/auth/login";
        const bodyData = {
            "email": "test.qubika@qubika.com",
            "password": "12345678"
        }
        
        const options = {
            method: 'post',
            headers: {
            'Content-Type': 'application/json'
            },
            body: JSON.stringify(bodyData)
        };
        const response = await fetch(url, options);
        const status = response.status;
        expect(status).toBe(200);
        const apiTokenJson = await response.json();
        const apiToken = await apiTokenJson.token;
        return await apiToken;
    }

    async createNewUser(email, password){
        const url = "https://api.club-administration.qa.qubika.com/api/auth/register";
        const token = await this.getAPIToken();
        const bodyData = {
            "email": email,
            "password": password,
            "roles": [
                "ROLE_ADMIN"
            ]
        }
        
        const options = {
            method: 'post',
            headers: {
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + token
            },
            body: JSON.stringify(bodyData)
        };
        const response = await fetch(url, options);
        const status = response.status;
        expect(status).toBe(201);
    }
}