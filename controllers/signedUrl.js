const asyncHandler = require('../middleware/async');
const ErrorResponse = require('../utils/errorResponse');
const fetchSignedUrl = require('../utils/fetchSignedUrl');

exports.getSignedUrl = asyncHandler(async (req, res, next) => {
  console.log(req.query);
  const { action, fileName, fileType } = req.query;
  const url = await fetchSignedUrl(action, fileName, fileType);

  if (!url) {
    return next(new ErrorResponse('Failed to fetch signed url.', 500));
  }

  res.status(200).json({ url });
});
