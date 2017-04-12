import { Schema } from 'mongoose';

const sentencesSchema = new Schema({
    sentence: String,
    topic: Array,
});

export default sentencesSchema;