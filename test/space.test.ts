const request = require('supertest');
const app = require('../app'); 

describe('Space test suite', () => {

    expect.extend( 
        {
            toBeActive(received) { 
                received === true;
                const pass = received;
                if(pass){
                    return {
                        message: () =>
                        `expected ${received} is accepted flight status`,
                        pass: true,
                    }
                }else{
                    return {
                        message: () =>
                        `expected ${received} to be an acceptable flight status of flight - only true is acceptable`,
                        pass: false,
                    }
                }
            }
        }
    )


    it('testEndpoint: /destinations ', async() => { 
        const response = await request(app).get("/space/destinations");

        const expectedResponse: string[] = ["Mars", "Moon", "Earth", "Mercury", "Venus", "Jupiter"];
        const expectedLength: number = 6;
        const expectedStatusCode: number = 200;
        const expectedItemIncluded: string = expect.arrayContaining(["Earth"]);
 

        //assertions
        expect(response.body).toEqual(expectedResponse);
        expect(response.body).toHaveLength(expectedLength);
        expect(response.statusCode).toBe(expectedStatusCode);
        expect(response.body).toEqual(expectedItemIncluded);
        
    })

    it('testEndpoint: /space/flights/seats', async() =>{
        const response = await request(app).get("/space/flights/seats");

        const isObjectPresent = expect.any(Object);
        const expectStarshipToHaveObjects = expect.arrayContaining([isObjectPresent])

        expect(response.body.starship).toEqual(expectStarshipToHaveObjects);

        const expectFirstClass = expect.arrayContaining([expect.objectContaining( { firstClass: isObjectPresent})]);
        expect(response.body.starship).toEqual(expectFirstClass);

        const expectBusinessClass = expect.arrayContaining([expect.objectContaining({ businessClass: isObjectPresent})])
        expect(response.body.starship).toEqual(expectBusinessClass);

        expect(response.body.starship)
            .toEqual(expect.arrayContaining([expect.objectContaining(
                    { businessClass: expect.objectContaining(
                        { drinksServed: expect.any(Array)})
                    })]));  

        expect(response.body.starship)
            .toEqual(expect.arrayContaining([expect.objectContaining({
                firstClass: expect.objectContaining({ seatHover: expect.objectContaining({
                    cryoMode : expect.arrayContaining(['ludacris'])}) })
            })]));

        expect(response.body.starship)
        .toEqual(expect.arrayContaining([expect.objectContaining({
            firstClass: expect.objectContaining({ seatHover: expect.objectContaining({
                staticMode : expect.arrayContaining(['plaid'])}) })
        })]));
    }); 



    it('tests /space/flights endpoint - positive test', async () => {
        const response = await request(app).get("/space/flights");
        expect(response.body[0].active).toEqual(true);
    }); 


    it('object assignment', () => {
        const data = {one: 1};
        data['two'] = 2;
        expect(data).toEqual({one: 1, two: 2});
    });



    /*
        Matchers:

 Common:

        .toBe
        .toEqual
        
Truthiness:

        .toBeNull
        .toBeDefined
        .toBeFalsy
        .toBeUndefined
    .not.toBeUndefined

Numbers equivalents:

        .toBeGreaterThan(3)
        .toBeGreaterThanOrEqual
        .toBeLessThan
        .toBeLessThanOrEqual
        .toBe
        .toEqual

For floating:

        .tobeClosedto()

Strings:

        .toMatch(regExp)


Array:

        .toContain(' ')


Excpetions:

        .toThrow


    */


// Assertion types: matchers, snapshots, finegrained
// API testing
//     ---array length
//     ---array
//     ---status code
//     ---items included
//     ---object value


/*
REPORTS:
    collectCoverage: true,
    coverageDirectory: "./output/code-coverage"

    npm install --save-dev jest-html-reporter
    reporters: ["./node_modules/jest-html-reporter"]

    gives: test suite pass/fail rate
            each test
*/ 
}) 