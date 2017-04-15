import { version } from '../../package.json';
import { Router } from 'express';
import facets from './facets';
import sentences from './sentences';

export default ({ config, db }) => {
	let api = Router();
	let { Words: WordsModel, Sentences: SentencesModel } = db.models;
	// mount the facets resource

	api.use('/sentences', sentences({ config, db, SentencesModel }));

	api.use('/sentences', sentences({ config, db, SentencesModel }));
	
	// perhaps expose some API metadata at the root
	api.get('/', (req, res) => {
		res.json({ version });
	});

	return api;
}
