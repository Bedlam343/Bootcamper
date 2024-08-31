const express = require('express');
const { getSignedUrl } = require('../controllers/signedUrl');

const router = express.Router();

const { protect, authorize } = require('../middleware/auth');

router.route('/').get(protect, authorize('publisher', 'admin'), getSignedUrl);

module.exports = router;
