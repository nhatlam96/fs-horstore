"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.readProductFromRequest = void 0;
async function readProductFromRequest(request) {
    const { params, body, query } = request;
    try {
        const id = parseInt(params.id, 10);
        const title = body.title;
        const price = parseFloat(body.price);
        const category = params.category;
        const description = body.description;
        const isFavorite = query.isFavorite === 'true';
        const image = body.image;
        const sort = query.sort;
        const limit = parseInt(query.limit, 10);
        const jsonObject = {
            id,
            title,
            price,
            category,
            description,
            isFavorite,
            image,
            sort,
            limit,
        };
        return jsonObject;
    }
    catch (error) {
        throw new Error('Error parsing request data: ' + error);
    }
}
exports.readProductFromRequest = readProductFromRequest;
