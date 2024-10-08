const jwt = require('jsonwebtoken');
const asyncHandler = require('./async');
const ErrorResponse = require('../utils/errorResponse');
const User = require('../models/User');
const keys = require('../config/keys');

// Protect routes
exports.protect = asyncHandler(async (req, res, next) => {
  let token;

  // check for presence of token, if there, store it
  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith('Bearer')
  ) {
    // Set token from Bearer token in header
    token = req.headers.authorization.split(' ')[1];
  }

  // Set token from cookie
  // else if (req.cookies.token) {
  //   token = req.cookies.token;
  // }

  // Make sure token exists
  if (!token) {
    return next(new ErrorResponse('Not authorized to access this route', 401));
  }

  try {
    // Verify token

    // (extract it from the payload)
    const decoded = jwt.verify(token, keys.JWT_SECRET);

    // get the user corresponding to the token
    req.user = await User.findById(decoded.id);

    next();
  } catch (err) {
    return next(new ErrorResponse('Not authorized to access this route', 401));
  }
});

// Grant access to specific roles
exports.authorize = (...roles) => {
  return (req, res, next) => {
    // the req.user was set in protect middleware
    // so authorize must be called AFTER protect
    if (!roles.includes(req.user.role)) {
      return next(
        new ErrorResponse(
          `User roles ${req.user.role} is not authorized to access this route`,
          403
        )
      );
    }

    next();
  };
};
