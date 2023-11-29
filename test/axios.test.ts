import axios from 'axios';
import { describe, beforeAll, it, expect } from '@jest/globals';

describe("API Integration test",  () => {
    let baseApiUrl: string;
    beforeAll(() => {
        baseApiUrl = "https://automationexercise.com/api/productsList";
    })
    
    describe("GET /productsList", () => {
        it("should return success code for http get", async () => {
            const response = await axios.get(`${baseApiUrl}`); 
            expect(response.status).toBe(200);
        })
    })
})

//tests exercise how the system's components work together