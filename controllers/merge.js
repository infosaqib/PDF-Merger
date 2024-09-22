const fs = require('fs'),
    path = require('path');


const mergerPdfs = async (p1, p2) => {
    const PDFMerger = (await import('pdf-merger-js')).default;
    const merger = new PDFMerger();

    await merger.add(p1);  //merge all pages. parameter is the path to file and filename.
    await merger.add(p2); // merge only page 2

    await merger.save('public/merged.pdf'); //save under given name and reset the internal document
};

// Path to the uploads folder
const uploadsFolder = path.join(__dirname, '../uploads');
function clearUploadsFolder() {
    fs.readdir(uploadsFolder, (err, files) => {
        if (err) throw err;

        for (const file of files) {
            fs.unlink(path.join(uploadsFolder, file), err => {
                if (err) throw err;
            });
        }
    });
}


module.exports = { mergerPdfs, clearUploadsFolder };