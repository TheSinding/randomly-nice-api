import { Schema } from 'mongoose';

const wordsSchema = new Schema({
    word: String,
    topic: Array,
});

export default wordsSchema;