const express = require("express");
const router = require("./routes");
const morgan = require("morgan");
const multer = require("multer");

const server = express();

server.use(express.urlencoded({ extended: false }));
server.use(morgan("dev"));
server.use(express.json());
server.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE');
    res.header('Access-Control-Allow-Headers', 'Content-Type');
    next();
  });
const storage = multer.memoryStorage();
// Aumenta el tamaño máximo de carga de archivos a 100 MB (en bytes)
const maxUploadSize = 100 * 1024 * 1024; // 100 MB
const upload = multer({
    storage,
    limits: { fileSize: maxUploadSize },
});

// const storage = multer.memoryStorage();
// const upload = multer({ storage });

server.use(router);

module.exports = server;
