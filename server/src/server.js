const express = require('express');
const {
	testController,
	echoController,
	createController,
} = require('./EndPoints');
const { ROOT, CREATE } = require('./RouteConstants');
const { SERVER_START } = require('./CopyContants');
const cors = require('cors');
const multer = require('multer');
const upload = multer();
const PORT = process.env.PORT || 8080;
const app = express();

// Deal with CORS
app.use(cors());

// Start Express listening
app.listen(PORT, () => {
	console.log(`${SERVER_START} ${PORT}`);
});

// Test to make sure the API can talk to React
app.get(`${ROOT}`, testController);

// An echo, to help with debugging
app.post(`${ROOT}`, echoController);

// An API endpoint to store form post data
app.post(`${ROOT}${CREATE}`, upload.none(), createController);
