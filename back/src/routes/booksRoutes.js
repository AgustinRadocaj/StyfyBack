const { Router } = require("express");
const { getBooksHandler, getFilteredBooksHandler } = require("../handlers/books/getBooksHandler");
const { getByIDHandler } = require("../handlers/books/getByIDHandler");
const { postHandler } = require("../handlers/books/postBook")
const { deactivateBookHandler, updateBookHandler } = require("../handlers/books/updateBookHandler");
const { removeUnitHandler } = require('../handlers/books/removeUnitHandler')


const cloudinary = require("cloudinary").v2;
const Multer = require("multer");
cloudinary.config({
    cloud_name: "dhqudb28a",
    api_key: "259744883376975",
    api_secret: "SbxYf1-MgZ4Fda6qITh57M4H9lE",
});
async function handleUpload(file) {
    const res = await cloudinary.uploader.upload(file, {
        resource_type: "auto",
    });
    return res;
}
const storage = new Multer.memoryStorage();
const upload = Multer({
    storage,
});

const booksRouter = Router();

booksRouter.get("/", getBooksHandler);
booksRouter.get("/filters", getFilteredBooksHandler);
booksRouter.get("/:id", getByIDHandler);
booksRouter.post("/create", postHandler);
booksRouter.put("/activation", deactivateBookHandler);
booksRouter.put("/update", updateBookHandler);
booksRouter.put("/remove_unit", removeUnitHandler)
booksRouter.post("/uploads", upload.single("image"), async (req, res) => {
    try {
        const b64 = Buffer.from(req.file.buffer).toString("base64");
        let dataURI = "data:" + req.file.mimetype + ";base64," + b64;
        const cldRes = await handleUpload(dataURI);
        res.json(cldRes);
    } catch (error) {
        console.log(error);
        res.send({
            message: error.message,
        });
    }
});


module.exports = { booksRouter }
