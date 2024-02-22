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

  //Convert string value to bool. Check if the customer has filled in the company information or requested a free sample pack
  var company = req.body.company == 'true';
  var freeSamplePack = req.body.freeSamplePack == 'true';
    
  var transporter = nodemailer.createTransport({
    service: process.env.SERVICE,
    auth: {
      user: process.env.USER,
      pass: process.env.PASS,
    },
  });

  console.log(req.files.length)
  const fileNames = req.files.map(file => file.originalname).join(', ');

  //Megrendelő Email

let htmlContentCustomer = `<!DOCTYPE html>
<html lang="en" >
<head>
  <meta charset="UTF-8">
  ${freeSamplePack ?
  `<title>Ingyenes DTF mintacsomag kérelmedet megkaptuk!</title>`
: `<title>DTF Megrendelés</title>`}
<script src="https://kit.fontawesome.com/0f95a734d9.js" crossorigin="anonymous"></script>
<style>
* {font-family: 'PT Sans', sans-serif;}
h1 {font-size: 18px; color: rgb(200, 0, 0)}
h2 {font-size: 18px;}
p  {font-size: 14px; font-weight:700}
</style>
</head>
<body>
<section style="margin-left:32px;">
    ${freeSamplePack ? 
      `<h1>Köszönjük, az érdeklődést, hamarosan postázzuk ingyenes DTF mintacsomagunkat.</h1>
      <h2>Rendelés részletei:</h2>`
      :
    `<h1>Köszönjük a rendelését!</h1>
    <h2>Rendelés részletei:</h2>`}
    <p>Megrendelő neve: ${req.body.name}</p>
    ${company ? 
    `<p>Cég neve: ${req.body.companyName}</p>
    <p>Adószám: ${req.body.taxNumber}</p>` 
    : 
    ` `}
    <p>Megrendelő email címe: ${req.body.email}</p>
    <p>Megrendelő telefonszáma: ${req.body.telNum}</p>
    <p>Megrendelő címe: ${req.body.country} ${req.body.zip} ${req.body.city} ${req.body.address}</p>
    ${freeSamplePack ? ``
    :
    `<p>Nyomat(ok) hossza (m): ${req.body.length}</p>
    <p>Fájlok neve: ${fileNames}</p>
    <p>6000 Ft / méter (+ Áfa + Szállítási költség)</p>
    <p>Átvétel módja: ${req.body.shipping}</p>`}
    <p>Megjegyzés a megrendeléshez: ${req.body.message}</p>
    </section>
    <section style="background-color:rgb(200, 0, 0); color:white;" className="footer-contact">
        <p style="color:white; font-size:16px; font-weight:700; margin-left: 32px;
        margin-right: 32px; padding-top: 20px">
          Kérdésed van? Állunk rendelkezésedre!
          <div style="color:white; font-size:16px; font-weight:700; margin-left: 32px;">
            Telefon:
            <a style="text-decoration: none; color:white;" href="tel: +36 (20) 967 45 46"> +36 (20) 967 45 46 </a> 
            </div>
            <div style="color:white; font-size:16px; font-weight:700; margin-left: 32px;
            margin-right: 32px;">
            Email: <a style="text-decoration: none; color:white;" href="mailto: dtf@mmsticker.hu">dtf@mmsticker.hu</a>
            </div>
            <div style="color:white; font-size:16px; font-weight:700; margin-left: 32px;">
            DTF Bérnyomtatás: <a style="text-decoration: none; color:white;" href="www.mmstore.hu">www.mmstore.hu</a>
            </div>
            <div style="color:white; font-size:16px; font-weight:700; margin-left: 32px;">
            Webshop: <a style="text-decoration: none; color:white;" href="www.mmsticker.hu">www.mmsticker.hu</a>
            </div>
            </p>
            <div style="display: flex; padding-bottom:20px", className="footer-socialmedia">
        <a
          style="text-decoration: none; color:white; margin-left:32px;"
          href="https://www.facebook.com/profile.php?id=100057566885552"
          target="_blank"
          aria-label="Facebook"
        >
          <img style="width: 40px", src="cid:fb_logo" alt="fb_logo"/>
        </a>
        <a
          style="text-decoration: none; color:white; margin-left:32px;;"
          href="https://www.instagram.com/mmsticker_reklam_kft/"
          target="_blank"
          aria-label="Instagram"
        >
          <img style="width: 40px", src="cid:insta_logo" alt="insta_logo"/>
        </a>
        <a
          style="text-decoration: none; color:white; margin-left:32px;"
          href="https://www.tiktok.com/@mmsticker_reklam_kft?lang=hu-HU"
          target="_blank"
          aria-label="Tiktok"
        >
          <img style="width: 40px", src="cid:tiktok_logo" alt="tiktok_logo"/>
        </a>
        <a
          style="text-decoration: none; color:white; margin-left:32px;"
          href="https://www.youtube.com/@MMStickerReklamKft."
          target="_blank"
          aria-label="Youtube"
        >
          <img style="width: 40px", src="cid:youtube_logo" alt="youtube_logo"/>
        </a>
      </div>
      </section>
      <section style="margin-left:32px;">
        <img style="padding-top: 20px; width: 80px", src="cid:logo" alt="logo"/>
      </section>
</body>
</html>`

console.log(typeof req.body.company)
console.log(company)
 const customerEmail = transporter.sendMail({
    from: process.env.USER,
      to: `${req.body.email}`,
      subject: `${freeSamplePack ? `Ingyenes DTF mintacsomag kérelmedet megkaptuk!`:`Sikeres DTF nyomat rendelés!`}`,
      html: htmlContentCustomer,
      attachments: [
        {
          filename: 'image.png',
          path: './img/cropped-mmstickerlogo-1.png',
          cid: 'logo' //same cid value as in the html img src
        },
        {
          filename: 'fb_logo.png',
          path: './img/fb_logo.png',
          cid: 'fb_logo' //same cid value as in the html img src
        },
        {
          filename: 'insta_logo.png',
          path: './img/insta_logo.png',
          cid: 'insta_logo' //same cid value as in the html img src
        },
        {
          filename: 'tiktok_logo.png',
          path: './img/tiktok_logo.png',
          cid: 'tiktok_logo' //same cid value as in the html img src
        },
        {
          filename: 'youtube_logo.png',
          path: './img/youtube_logo.png',
          cid: 'youtube_logo' //same cid value as in the html img src
        },

        
  ]
  })

  //Cég Email
  let htmlContentCompany = `<!DOCTYPE html>
  <html lang="en" >
  <head>
    <meta charset="UTF-8">
    ${freeSamplePack ?
      `<title>Ingyenes DTF mintacsomagot igényeltek</title>`
      :
    `<title>DTF Megrendelés</title>`}
    <script src="https://kit.fontawesome.com/0f95a734d9.js" crossorigin="anonymous"></script>
    <style>
    * {font-family: 'PT Sans', sans-serif;}
    h1 {font-size: 18px; color: rgb(200, 0, 0)}
    h2 {font-size: 18px;}
    p  {font-size: 14px; font-weight:700}
    </style>
  </head>
  <body>
  <section style="margin-left:32px;">
  ${freeSamplePack ? 
    `<h1>Ingyenes DTF mintacsomagot igényeltek! </h1>
    <h2>Igénylő adatai:</h2>`
    :
      `<h1>Leadtak egy rendelést! </h1>
      <h2>Rendelés részletei:</h2>`}
      <p>Megrendelő neve: ${req.body.name}</p>
      ${company ? 
        `<p>Cég neve: ${req.body.companyName}</p>
        <p>Adószám: ${req.body.taxNumber}</p>
        ` : 
        ` `}
      <p>Megrendelő email címe: ${req.body.email}</p>
      <p>Megrendelő telefonszáma: ${req.body.telNum}</p>
      <p>Megrendelő címe: ${req.body.country} ${req.body.zip} ${req.body.city} ${req.body.address}</p>
      ${freeSamplePack ? ``
      :
      `<p>Nyomat(ok) hossza (m): ${req.body.length}</p>
      <p>Fájlok neve: ${fileNames}</p>
      <a
          style="text-decoration: none;;"
          href= ${process.env.GDRIVE_LINK}
          target="_blank"
          aria-label="GDRIVE"
        >
          <p>GOOGLE DRIVE</p>
        </a>
      <p>6000 Ft / méter (+ Áfa + Szállítási költség)</p>
      <p>Átvétel módja: ${req.body.shipping}</p>`}
      <p>Megjegyzés a megrendeléshez: ${req.body.message}</p>
      </section>
  </body>
  </html>`

  const companyEmail = transporter.sendMail({
    from: process.env.USER,
      to: process.env.COMPANY,
      subject: `${freeSamplePack ? `Ingyenes DTF mintacsomagot igényeltek!` : `DTF nyomat rendelés érkezett!`}`,
      html: htmlContentCompany,
  })
  Promise.all([customerEmail, companyEmail])
  .then((response) => res.send(response.message))
  .catch((error) => console.log(error) & res.status(500).send(error.message))//res.status(500).send(error.message));
}catch (error) {
  console.log('Hiba a képek feltöltése során:', error.message)
}
});


app.listen(port, () => {
  console.log(`nodemailerProject is listening at http://localhost:${port}`);
});
