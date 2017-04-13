import resource from 'resource-router-middleware';
import sentences from '../models/sentences';
import sentiment from 'sentiment';
import tokenizer from '../lib/tokenizer';

export default ({ config, db }) => resource({
	/** Property name to store preloaded entity on `request`. */
	id : 'sentence',

	/** For requests with an `id`, you can auto-load the entity.
	 *  Errors terminate the request, success sets `req[id] = data`.
	 */
	load(req, amount, callback) {
		let sentencesArray = sentences.sentences;
		let sentencesReturnArray = [];
		console.log(sentencesArray.length)
		for(let i = 0; i < amount; i++){
			let random = Math.floor(Math.random(sentencesArray.length - 1) * 100);
			sentencesReturnArray.push(sentencesArray[random]);
		}
		let err = sentencesReturnArray ? null : 'Not found';
		callback(err, sentencesReturnArray);
	},

	/** GET / - List all entities */
	index({ params }, res) {
		res.json(sentences);
	},

	/** POST / - Create a new entity */
	create({ body }, res) {
		let response = {};
		let { sentence } = body;
		if(sentence.constructor === Array ){
			sentence.forEach( (element) => {
				let wordCount = tokenizer(element).length;
				if(wordCount < config.maxWordCount) {	
					let score = sentiment(element);
					let accepted = false;
					if(score.score > 0) {
						accepted = true;
					}
					response[element] = { "Score": score, "accepted": accepted };
				} else {
					response[element] = { "Error": "Sentence was too long, maximum " + config.maxWordCount + " words or under!", "accepted": false };				
				}
			});
		}
		res.json(response);
	},

	/** GET /:id - Return a given entity */
	read({ sentence }, res) {
		res.json(sentence);
	},

	// /** PUT /:id - Update a given entity */
	// update({ facet, body }, res) {
	// 	for (let key in body) {
	// 		if (key!=='id') {
	// 			facet[key] = body[key];
	// 		}
	// 	}
	// 	res.sendStatus(204);
	// },

	// /** DELETE /:id - Delete a given entity */
	// delete({ facet }, res) {
	// 	sentences.splice(sentences.indexOf(facet), 1);
	// 	res.sendStatus(204);
	// }
});
