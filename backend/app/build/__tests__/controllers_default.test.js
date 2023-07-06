"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const supertest_1 = __importDefault(require("supertest"));
const default_1 = require("../controllers/default");
describe('Default Controller Test Suite', () => {
    const expectedRedirectLocation = 'http://localhost:4200/';
    it('should redirect to the homepage when accessing "/"', async () => {
        await (0, supertest_1.default)(default_1.getHomepage).get('/').expect(302).expect('location', expectedRedirectLocation);
    });
    it('should return a 204 status for the fixFavIcon route', async () => {
        await (0, supertest_1.default)(default_1.fixFavIcon).get('/favicon.ico').expect(302).expect('location', `${expectedRedirectLocation}favicon.ico`);
    });
});
