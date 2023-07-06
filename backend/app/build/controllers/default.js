"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.fixFavIcon = exports.getHomepage = void 0;
const getHomepage = async (request, response) => {
    response.writeHead(302, { Location: "http://localhost:4200/" });
    response.end();
};
exports.getHomepage = getHomepage;
const fixFavIcon = async (request, response) => {
    response.writeHead(302, { Location: "http://localhost:4200/favicon.ico" });
    response.end();
};
exports.fixFavIcon = fixFavIcon;
