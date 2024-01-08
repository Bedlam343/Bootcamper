const NodeGeocoder = require("node-geocoder");
const keys = require("../config/keys");

const options = {
  provider: keys.GEOCODER_PROVIDER,
  httpAdapter: "https",
  apiKey: keys.GEOCODER_API_KEY,
  formatter: null,
};

const geocoder = NodeGeocoder(options);

module.exports = geocoder;
