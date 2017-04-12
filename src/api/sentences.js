import resource from 'resource-router-middleware';
import sentences from '../models/sentences';

export default () => resource({
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

	// /** POST / - Create a new entity */
	// create({ body }, res) {
	// 	body.id = sentences.length.toString(36);
	// 	sentences.push(body);
	// 	res.json(body);
	// },

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
