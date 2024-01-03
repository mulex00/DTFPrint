import express from 'express';
import dalleRoutes from './routes/dalle.routes.js';
import * as dotenv from 'dotenv';
//require('dotenv').config();
import cors from 'cors';
import nodemailer from 'nodemailer';
import multer from 'multer';
dotenv.config();


//const express = require("express");
//const nodemailer = require("nodemailer");
//const cors = require("cors");
const app = express();
const port = process.env.PORT;
//const multer = require("multer")

app.use(cors());
app.use(express.json({ limit: "25mb" }));
app.use(express.urlencoded({ limit: "25mb" }));
app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  next();
});

const upload = multer({
  storage: multer.memoryStorage()
});

//var myemail = process.env.SENDER_EMAIL;
//var mypassword = process.env.APPLICATION_PASSWORD;

app.use('/api/v1/dalle', dalleRoutes);

app.get('/', (req, res) => {
  res.status(200).json({ message:"Hello from DALL.E"})
})

app.post("/send_email", upload.array('Image'), (req, res) => {
  var transporter = nodemailer.createTransport({
    host: process.env.HOST,
    port: process.env.SMTPPORT,
    secure: true,
    //service: process.env.SERVICE,
    auth: {
      user: process.env.USER,
      pass: process.env.PASS,
    },
  });

  const attachments = req.files.map(file => ({
    filename: file.originalname,
    content: file.buffer,
  }));
  console.log(req.files.length)
  //Megrendelő Email

  transporter.sendMail({
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
    <p>Megrendelő címe: ${req.body.country} ${req.body.city} ${req.body.address} ${req.body.apartment}</p>
    <p>Nyomat hossza: ${req.body.length} m</p>
    <p>Fizetendő összeg: ${req.body.price} Ft (+ Áfa + Szállítási költség)</p>
    <p>Átvétel módja: ${req.body.shipping}</p>
    <p>Megjegyzés a megrendeléshez: ${req.body.message}</p>
</body>
</html>`,
attachments,
  /*attachments: [{
    filename: req.file.originalname,
    content: req.file.buffer,
  }]*/
  })
  .then((response) => res.send(response.message))
  .catch((error) => res.status(500).send(error.message));

  //Cég Email

  transporter.sendMail({
    from: process.env.USER,
      to: process.env.USER,
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
    <p>Megrendelő címe: ${req.body.country} ${req.body.city} ${req.body.address} ${req.body.apartment}</p>
    <p>Nyomat hossza: ${req.body.length} m</p>
    <p>Fizetendő összeg: ${req.body.price} Ft (+ Áfa + Szállítási költség)</p>
    <p>Átvétel módja: ${req.body.shipping}</p>
    <p>Megjegyzés a megrendeléshez: ${req.body.message}</p>
</body>
</html>`,
attachments,
  /*attachments: [{
    filename: req.file.originalname,
    content: req.file.buffer,
  }]*/
  })
  .then((response) => res.send(response.message))
  .catch((error) => res.status(500).send(error.message));
})

app.listen(port, () => {
  console.log(`nodemailerProject is listening at http://localhost:${port}`);
});
