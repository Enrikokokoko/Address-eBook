const ebookModel = require('../Schema/EbookSchema');

const EbookService = {
    async create(ebook, userId) {      
            const createdEbook = await ebookModel.create({...ebook, userId});
            return createdEbook;
    },

    async getAll(userId) {
            const getAll = await ebookModel.find({userId});
            return getAll;
    },

    async getOne(email, firstName, lastName, userId) {
        let data = {};

        if(email) {
                data.email = email;
        }
        if(firstName) {
                data.firstName = firstName;
        }
        if(lastName) {
                data.lastName = lastName;
        }

        data.userId = userId;
            const ebookById = await ebookModel.find(data);
            if(!ebookById){
                throw new Error('User was not found');
            }
            return ebookById;
    },

   async getById(id, userId) { 
            if(!id) {
                throw new Error('ID was not found');
            }
            const ebookById = await ebookModel.findOne({_id: id, userId});
            if(!ebookById){
                throw new Error('User with this id was not found');
            }
            return ebookById ;
    },

    async sortedByName(userId) {
        const sorted = await ebookModel.find({userId}).sort({ firstName: 1 });
            return sorted;
    },

    async sortedByDate(userId) {
        const sorted = await ebookModel.find({userId}).sort({ date: 1 });
            return sorted;
    },

    async update(ebook, userId) {   
        if(!ebook._id){
                throw new Error('ID was not found');
        } 
        const updateEbook = await ebookModel.findByIdAndUpdate({_id: ebook._id, userId}, ebook, { new: true });
        if(!updateEbook){
                throw new Error('User with this id was not found');
            }
        return updateEbook;
    },

    async delete(id, userId) {     
            if(!id){
                throw new Error('ID was not found');
            }
            const deleteEbook = await ebookModel.findOneAndDelete({_id: id, userId});
            if(!deleteEbook){
                throw new Error('User with this id was not found');
            }
            return deleteEbook;
    }
}

module.exports = EbookService;