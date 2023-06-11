const Router = require('express');
const EbookController = require('../EbookController');
const authMiddleware = require('../../middleware/authMiddleware');
const ebookValidation = require('../validation/ebookValidation');

const router = new Router();

router.post('/posts', ebookValidation, authMiddleware, EbookController.create);

router.get('/get', authMiddleware,  EbookController.getAll);
router.get('/get/email/:email', authMiddleware, EbookController.getOne);
router.get('/get/firstName/:firstName', authMiddleware,  EbookController.getOne);
router.get('/get/lastName/:lastName', authMiddleware,  EbookController.getOne);
router.get('/get/:id', authMiddleware,  EbookController.getById);
router.get('/contacts/sortedByName', authMiddleware,  EbookController.sortedByName);
router.get('/contacts/sortedByDate', authMiddleware,  EbookController.sortedByDate);

router.put('/put/:id', authMiddleware, EbookController.update);

router.delete('/delete/:id', authMiddleware, EbookController.delete);


module.exports = router;