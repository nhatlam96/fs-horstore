"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const getImagePath_1 = require("../helpers/getImagePath");
const extractUniqueValues_1 = require("../helpers/extractUniqueValues");
describe('getImagePath', () => {
    it('should return the correct image path for a given filename', () => {
        expect((0, getImagePath_1.getImagePath)('74152-4.jpeg')).toBe('http://localhost:9000/image/74152-4.jpeg');
    });
});
describe('extractUniqueValues', () => {
    it('should return an empty array when input list is empty', () => {
        expect((0, extractUniqueValues_1.extractUniqueValues)([])).toEqual([]);
    });
    it('should return unique values from the input list', () => {
        const inputList = [
            { result: ['Sattel', 'Zaumzeug', 'Sattel', 'Halfter'] },
            { result: ['Halfter', 'Sattel', 'Gerte'] },
        ];
        expect((0, extractUniqueValues_1.extractUniqueValues)(inputList)).toEqual(['Sattel', 'Zaumzeug', 'Halfter', 'Gerte']);
    });
});
