// import MongoClient from 'mongodb';
import mongoose, { Schema } from 'mongoose';
import sentencesSchema from './schemas/sentences';
import wordsSchema from './schemas/words';

export default callback => {
	mongoose.connect("mongodb://localhost:27017/randomlyNice");
	mongoose.model('Words', wordsSchema);
	mongoose.model('Sentences', sentencesSchema);
	// connect to a database if needed, then pass it to `callback`:
	callback(mongoose);
}
