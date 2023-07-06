"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getImagePath = void 0;
const getImagePath = (filename) => {
    return `http://localhost:9000/image/${filename}`;
};
exports.getImagePath = getImagePath;
