import express from 'express';
import dalleRoutes from './routes/dalle.routes.js';
import * as dotenv from 'dotenv';
//require('dotenv').config();
import cors from 'cors';
import nodemailer from 'nodemailer';
import multer from 'multer';
import { google } from 'googleapis';
import { PassThrough } from 'stream';
dotenv.config();

const app = express();
const port = process.env.PORT;

app.use(cors());
app.use(express.json({ limit: "50mb" }));
app.use(express.urlencoded({ limit: "50mb" }));
app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  next();
});

const upload = multer({
  storage: multer.memoryStorage()
});

app.use('/api/v1/dalle', dalleRoutes);

app.get('/', (req, res) => {
  res.status(200).json({ message:"Hello from DALL.E"})
})

// Set up Google Drive API credentials
const auth = new google.auth.JWT({
  email: process.env.GOOGLE_DRIVE_CLIENT_EMAIL,
  key: process.env.GOOGLE_DRIVE_PRIVATE_KEY.replace(/\\n/g, '\n'), // Make sure to replace '\n' with actual line breaks
  scopes: ['https://www.googleapis.com/auth/drive'],
});

const drive = google.drive({ version: 'v3', auth });

app.post("/send_email", upload.array('Image'), async (req, res) => {

  try {
    // Upload files to Google Drive
    const uploadedFiles = await Promise.all(
      req.files.map(async (file) => {
        const bufferStream = new PassThrough();
        bufferStream.end(file.buffer);
        const driveResponse = await drive.files.create({
          requestBody: {
            name: `${req.body.date}_${file.originalname}`,
            mimeType: file.mimetype,
            parents: [process.env.GDRIVE_FOLDER]
          },
          media: {
            mimeType: file.mimetype,
            body: bufferStream,
          },
        });
        return driveResponse.data;
      })
    );
    res.status(200).json({ message: 'Files uploaded successfully!', files: uploadedFiles });  

  var transporter = nodemailer.createTransport({
    /*host: process.env.HOST,
    port: process.env.SMTPPORT,
    secure: process.env.SECURE,*/
    service: process.env.SERVICE,
    auth: {
      user: process.env.USER,
      pass: process.env.PASS,
    },
  });

  /*const attachments = req.files.map(file => ({
    filename: file.originalname,
    content: file.buffer,
  }));*/
  console.log(req.files.length)
  const fileNames = req.files.map(file => file.originalname).join(', ');

  //Megrendelő Email

 const customerEmail = transporter.sendMail({
    from: process.env.USER,
      to: `${req.body.email}`,
      subject: "Sikeres DTF nyomat rendelés",
      html: `<!DOCTYPE html>
<html lang="en" >
<head>
  <meta charset="UTF-8">
  <title>DTF Megrendelés</title>
</head>
<body>
    <h1>Köszönjük a rendelését! </h1>
    <h2>Rendelés részletei:</h2>
    <p>Megrendelő neve: ${req.body.name}</p>
    <p>Céges vásárlás?: ${req.body.company}</p>
    <p>Cég neve: ${req.body.companyName}</p>
    <p>Adószám: ${req.body.taxNumber}</p>
    <p>Megrendelő email címe: ${req.body.email}</p>
    <p>Megrendelő telefonszáma: ${req.body.telNum}</p>
    <p>Megrendelő címe: ${req.body.country} ${req.body.zip} ${req.body.city} ${req.body.address}</p>
    <p>Nyomat(ok) hossza (m): ${req.body.length}</p>
    <p>Fájlok neve: ${fileNames}</p>
    <p>6000 Ft / méter (+ Áfa + Szállítási költség)</p>
    <p>Átvétel módja: ${req.body.shipping}</p>
    <p>Megjegyzés a megrendeléshez: ${req.body.message}</p>
</body>
</html>`,
//attachments,
  /*attachments: [{
    filename: req.file.originalname,
    content: req.file.buffer,
  }]*/
  })
  /*.then((response) => res.send(response.message))
  .catch((error) => res.status(500).send(error.message));*/

  //Cég Email

  const companyEmail = transporter.sendMail({
    from: process.env.USER,
      to: process.env.COMPANY,
      subject: "DTF nyomat rendelés",
      html: `<!DOCTYPE html>
<html lang="en" >
<head>
  <meta charset="UTF-8">
  <title>DTF Megrendelés</title>
</head>
<body>
    <h1>Leadtak egy rendelést! </h1>
    <h2>Rendelés részletei:</h2>
    <p>Megrendelő neve: ${req.body.name}</p>
    <p>Céges vásárlás?: ${req.body.company}</p>
    <p>Cég neve: ${req.body.companyName}</p>
    <p>Adószám: ${req.body.taxNumber}</p>
    <p>Megrendelő email címe: ${req.body.email}</p>
    <p>Megrendelő telefonszáma: ${req.body.telNum}</p>
    <p>Megrendelő címe: ${req.body.country} ${req.body.zip} ${req.body.city} ${req.body.address}</p>
    <p>Nyomat(ok) hossza (m): ${req.body.length}</p>
    <p>Fájlok neve: ${fileNames}</p>
    <p>6000 Ft / méter (+ Áfa + Szállítási költség)</p>
    <p>Átvétel módja: ${req.body.shipping}</p>
    <p>Megjegyzés a megrendeléshez: ${req.body.message}</p>
</body>
</html>`,
//attachments,
  /*attachments: [{
    filename: req.file.originalname,
    content: req.file.buffer,
  }]*/
  })
  Promise.all([customerEmail, companyEmail])
  .then((response) => res.send(response.message))
  .catch((error) => console.log(error) & res.status(500).send(error.message))//res.status(500).send(error.message));
}catch (error) {
  console.log('Hiba a képek feltöltése során:', error.message)
}
  /*} catch (error) {
  console.log(error);
  res.status(500).send(error.message);
} finally {
  client.close();
}*/
});


app.listen(port, () => {
  console.log(`nodemailerProject is listening at http://localhost:${port}`);
});
