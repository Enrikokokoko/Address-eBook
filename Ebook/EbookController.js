const EbookService = require('./EbookService');
const { validationResult } = require('express-validator'); 

const EbookController = {
    async create(req, res) {
        const userId = req.user.id;
        const ebookBody = req.body;
        try{
            const errors = validationResult(req);
            if(!errors.isEmpty()){
                return res.status(400).json({message: 'Registration error ', errors});
            } 
            const ebook = await EbookService.create(ebookBody, userId);
            res.status(201).json(ebook);
        }catch(e){
            res.status(500).json(e.message);
        };
    },

    async getAll(req,res) {
        const userId = req.user.id;
        try{
            const ebook = await EbookService.getAll(userId);
            return res.json(ebook);
        }catch(e){
            res.status(500).json(e.message);
        };
    },

    async getOne(req,res) {
        const userId = req.user.id;
        const { email, firstName, lastName } = req.params;
        try{
            const ebook = await EbookService.getOne(email, firstName, lastName, userId);
            return res.json(ebook);
        }catch(e){
            res.status(500).json(e.message);
        };
    },

    async getById(req,res) {
        const userId = req.user.id;
        try{
            const ebook = await EbookService.getById(req.params.id, userId);
            return res.json(ebook);
        } catch (e) {
            res.status(500).json(e.message);
        };
    },
    
    async sortedByName(req, res) {
        const userId = req.user.id;
        try{
            const ebook = await EbookService.sortedByName(userId);
            return res.json(ebook);
        }catch(e){
            res.status(500).json(e.message);
        };
    },

    async sortedByDate(req, res) {
        const userId = req.user.id;
        try{
            const ebook = await EbookService.sortedByDate(userId);
            return res.json(ebook);
        }catch(e){
            res.status(500).json(e.message);
        };
    },

    async update(req,res) {
        const userId = req.user.id;
        try{
            const updateEbook = await EbookService.update(req.body, userId);
            return res.json(updateEbook);
        }catch(e){
            res.status(500).json(e.message);
        };
    },

    async delete(req,res) {
        const userId = req.user.id;
        try{
            const deleteEbook = await EbookService.delete(req.params.id, userId);
            return res.json(deleteEbook);
        }catch(e){
            res.status(500).json(e.message);
        };
    }
}

module.exports = EbookController