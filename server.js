const express = require("express");
const fs = require('fs');
const app = express();
var cors = require('cors');
const ComfyJS =require('comfy.js');
const nodemailer = require('nodemailer');
var cron = require('node-cron');
const { Console } = require("console");
require('dotenv').config()
cron.schedule('45 17 */1 */1 *', () => {
  console.log('running a task every minute');
  download(messages, 'ahmadtwich.html');

});


var messages = [];


ComfyJS.onChat = (user, message, flags, self, extra) => {
    updateMessages(`<p>${user}  =  ${message}</p>`);
    console.log(message);


};

ComfyJS.Init('VALORANT');
const updateMessages = (message) => {
    messages.push(message);
};


function download(message, filename, type) {
    console.log(message,'ammar');
    fs.writeFile(__dirname + '/chat/test.html', (message +'').replaceAll(',','<br>') , err => {
      if (err) {
        console.log(err);
      }
      else{
        sendData();
      }
    });
    
    }
   
function sendData(){
    
  
    // Step 1 :
    let transporter = nodemailer.createTransport({
        host: "smtp.gmail.com",
            secure: true,
            port: 465,
        auth: {
            user: "ammarhardann@gmail.com",
            pass: process.env.PASS
        }
    });
    
    let mailOptions = {
        from: 'ammarhardann@gmail.com',
        to: 'asia.nuairat@gmail.com',
        subject:'chat of Twitch channel',
        text:'Hello World',
        attachments: [
          { filename: 'ahmadtwich.html' , path:__dirname + '/chat/test.html'}
        ]
    };
    
    // Step 3
    
    transporter.sendMail(mailOptions, function(err,info){
        if(err){
            console.log('Error:', err);
        } else {
            console.log('message sent!!!');
        }
    });
    
}







app.listen(8080, () => {
  console.log("Backend server is running! port = " + '8080');
});
