
let express = require('express');
var path = require('path');
let cmd = require('node-cmd');
let nodemailer = require('nodemailer')
let emailTemplates = require('email-templates');
let ejs = require('ejs');
let app = express();
var server = app.listen(process.env.PORT || 3000, listen)
app.engine('html', require('ejs').renderFile);
app.set('view engine', 'html');
app.set('view engine', 'ejs');
var io = require('socket.io')(server);

var s

function listen() {
  var port = server.address().port;
  console.log('Server listening at http://127.0.0.1:' + port);
}
try {

} catch (e) {

} finally {

}
app.use(express.static('public'));

io.sockets.on('connection',
  function (socket) {
    s = socket

    console.log('Socket connection: ' + socket.id);
    socket.on('mail',
      function(data) {
        sendMail(data.mail)
      }
    );
          socket.on('print', function() {
                    const { spawn } = require('child_process');
                    const child = spawn('python3', ['public/modify.py']);
                    child.stdout.on('data', (data) => {
                                    console.log(`child stdout:\n${data}`);
                                    });
                    
                    child.stderr.on('data', (data) => {
                                    console.error(`child stderr:\n${data}`);
                                    });
                    })

    socket.on('capture',function(){
              const { spawn } = require('child_process');
              const child = spawn('python3', ['public/modify.py']);
              child.stdout.on('data', (data) => {
                              console.log(`child stdout:\n${data}`);
                              });
              
              child.stderr.on('data', (data) => {
                              console.error(`child stderr:\n${data}`);
                              });
    })
  }
)

function sendMail(email){
    var transporter = nodemailer.createTransport({
                                                 service: 'gmail',
                                                 auth: {
                                                 user: 'carlosrincon01@gmail.com',
                                                 pass: '040695.google'
                                                 }
                                                 })
    var mailOptions = {
    from: 'carlosrincon01@gmail.com',
    to: email,
    subject: 'Pink BTN',
    text: 'Click Clack!',
    attachments:[{
                 filename: 'picture.png',
                 path: __dirname + '/public/assets/picture.png',
                 cid: 'picture'
                 }],
    html: { path: 'public/template.html' }
    }
    transporter.sendMail(mailOptions, function(error, info){
                         if (error) {
                         console.log(error)
                         } else {
                         console.log('Email sent to: '+ email + '\nResponse: ' + info.response)
                         }
                         });
}
