import resource from 'resource-router-middleware';
import sentiment from 'sentiment';
import tokenizer from '../lib/tokenizer';

export default ({ config, db, SentencesModel }) => resource({
	/** Property name to store preloaded entity on `request`. */
	id : 'sentence',

	/** For requests with an `id`, you can auto-load the entity.
	 *  Errors terminate the request, success sets `req[id] = data`.
	 */
	load(req, amount, callback) {
		let sentencesArray = [];
		let sentencesReturnArray = [];
		// Find all sentences in database
		SentencesModel.find({}, (err, sentences) => {
			if(err) throw err;
			// Put them into an array
			sentences.forEach((element) => {
				sentencesArray.push(element.sentence);
			});
			// Pick out the amount, at random.
			// TODO: There is a flaw here, potentioally 2 or more same sentences can be picked out. Fix it.
			for(let i = 0; i < amount; i++){
				let random = Math.floor(Math.random(sentencesArray.length - 1) * 100);
				console.log(sentencesArray[random]);
				sentencesReturnArray.push(sentencesArray[random]);
			}
			let error = sentencesReturnArray ? null : 'Not found';
			callback(err, sentencesReturnArray);
		});
	},

	/** GET / - List all entities */
	index({ params }, res) {
		SentencesModel.find({}, (err, sentences) => {
			if(err) throw err;
			res.json(sentences);
		});
	},

	/** POST / - Create a new entity */
	create({ body }, res) {
		let response = {};
		let { sentence } = body;
		let count = 0;
		if(sentence.constructor === Array ){
			sentence.forEach( (element) => {
				count++;
				let wordCount = tokenizer(element).length;
				if(wordCount < config.maxWordCount) {	
					let score = sentiment(element);
					let accepted = false;
					if(score.score > 0) {
						let sObj = new SentencesModel({
							sentence: element
							, topic: [null]
						});
						sObj.save((err)=>{
							if(err) throw err;
						});
						accepted = true;
					}
					response[count] = { 
						"Sentence": element
						, "Score": score
						, "accepted": accepted 
					};
				} else {
					response[count] = {
						 "Sentence": element
						, "Error": "Sentence was too long, maximum " + config.maxWordCount + " words or under!"
						, "accepted": false
					};				
				}
			});
		}

		res.json(response);
	},

	/** GET /:id - Return a given entity */
	read({ sentence, params }, res) {
		if(params.sentence === "random"){
			let sentencesArray = [];
			let sentencesReturnArray = [];
			SentencesModel.find({}, (err, sentences) => {
				if(err) throw err;
				// Put them into an array
				sentences.forEach((element) => {
					sentencesArray.push(element);
				});
				// Pick out the amount, at random.
				// TODO: There is a flaw here, potentioally 2 or more same sentences can be picked out. Fix it.
				let random = Math.floor(Math.random(sentencesArray.length - 1) * 100);
				sentencesReturnArray.push(sentencesArray[random]);
				let error = sentencesReturnArray ? null : 'Not found';
				res.json(sentencesReturnArray);
			});
		} else {
			res.json(sentence);
		}
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
