import request from 'supertest';
import { getHomepage, fixFavIcon } from '../controllers/default';

describe('Default Controller Test Suite', () => {
    const expectedRedirectLocation = 'http://localhost:4200/';

    it('should redirect to the homepage when accessing "/"', async () => {
        await request(getHomepage).get('/').expect(302).expect('location', expectedRedirectLocation);
    });

    it('should return a 204 status for the fixFavIcon route', async () => {
        await request(fixFavIcon).get('/favicon.ico').expect(302).expect('location', `${expectedRedirectLocation}favicon.ico`);
    });
});