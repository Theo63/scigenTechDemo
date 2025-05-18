const Speaker = require('../db/speakerModel');


// Controller functions for handling 
//  requests from the api endpoint
const createSpeaker = async (req, res, next) => {
    try {
        const name = Speaker.create(req.body);
        res.status(201).json(name);
    } catch (error) {
        next(error);
    }
};

const getAllSpeakers = async (req, res, next) => {
    try {
        const speakers = await Speaker.findAll();
        res.json(speakers);
    } catch (error) {
        next(error);
    }
};



const searchSpeakers = async (req, res, next) => {
    try {
        const { name } = req.query;
        // console.log('Search term:', name);
        if (!name) {
            return res.status(400).json({ 
                message: 'Search term is required' 
            });
        }

        const speaker = await Speaker.search(name);
        // console.log('Search results:', speakers);
        res.json(speaker);
    } catch (error) {
        next(error);
    }
};




const deleteSpeaker = async (req, res, next) => {
    try {
        const result = await Speaker.delete(req.params.id);
        if (!result) {
            return res.status(404).json({ message: 'Speaker not found' });
        }
        res.status(204).send();
    } catch (error) {
        next(error);
    }
};

module.exports = {
    createSpeaker,
    getAllSpeakers,
    searchSpeakers,
    deleteSpeaker
};