const express = require('express');
const fs = require('fs');
const cors = require('cors');
const app = express();
const path = require('path');
const multer = require('multer');
const upload = multer({ dest: 'visitorimage/' });

app.use(cors());
app.use(express.json({ limit: '10mb' }));

app.get('/download/:filename', (req, res) => {
    const fileName = req.params.filename; 
    const filePath = path.join(__dirname, 'visitorimage', fileName);
    res.download(filePath, (err) => {
        if (err) {
            console.error(err);
            res.status(404).send('File tidak ditemukan');
        }
    });
});

app.post('/saveimage', upload.single('image'), (req, res) => {
    const tempPath = req.file.path;
    const originalName = req.body.filename || req.file.originalname;
    const targetPath = path.join(__dirname, 'visitorimage', `${originalName}`);

    fs.rename(tempPath, targetPath, err => {
        if (err) {
            console.error(err);
            return res.status(500).send('Gagal menyimpan gambar');
        }
        res.send(`Gambar berhasil disimpan sebagai ${originalName}`);
    });
});


// app.post('/saveimage', (req, res) => {
//     // console.log(req);
//     const base64DataURL = req.body.image;

//     if (!base64DataURL || !base64DataURL.startsWith('data:image')) {
//         return res.status(400).send('Data gambar tidak valid');
//     }

//     const matches = base64DataURL.match(/^data:image\/(\w+);base64,(.+)$/);
//     const ext = matches[1];
//     const base64Data = matches[2];
//     const buffer = Buffer.from(base64Data, 'base64');

//     const filename = `${req.body.filename}.${ext}`;
//     fs.writeFile(`./visitorimage/${filename}`, buffer, (err) => {
//         if (err) {
//         console.error(err);
//         return res.status(500).send('Gagal menyimpan gambar');
//         }
//         res.send(`Gambar berhasil disimpan sebagai ${filename}`);
//     });
// });

app.listen(3000, () => {
  console.log('Running on port 3000');
});