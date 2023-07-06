import { Request, Response } from "express";

export const getHomepage = async (
    request: Request,
    response: Response
): Promise<void> => {
    response.writeHead(302, { Location: "http://localhost:4200/" });
    response.end();
};

export const fixFavIcon = async (
    request: Request,
    response: Response
): Promise<void> => {
    response.writeHead(302, { Location: "http://localhost:4200/favicon.ico" });
    response.end();
};