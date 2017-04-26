var http = require('http');
var url = require('url');
var fs = require('fs');
var nodemailer = require('nodemailer');

function getFormattedDate() {
    var date = new Date();

    var month = date.getMonth() + 1;
    var date2 = date.getDate();
    var year = date.getYear() + 1900;

    return ((month < 10) ? '0' + month : month) + '-' + ((date2 < 10) ? '0' + date2 : date2) + '-' + year;
}
function getFormattedTime() {
    var date = new Date();
    
    var hour = date.getHours();
    var minutes = date.getMinutes();
    var seconds = date.getSeconds();
    var milliseconds = date.getMilliseconds();

    return ((hour < 10) ? '0' + hour : hour) + ':' + ((minutes < 10) ? '0' + minutes : minutes) + ':' + ((seconds < 10) ? '0' + seconds : seconds) + '.' + ('00' + milliseconds).slice(-3);
}

var transporter = nodemailer.createTransport({
    host: 'smtp.gmail.com',
    port: 587,
    secure: false,
    auth: {
        user: '%EMAIL_ADDRESS%',
        pass: '%EMAIL_PASSWORD%'
    }
});

var server = http.createServer(function (req, res) {
    try {
        var IPAddress = req.connection.remoteAddress.replace(/^.*:/, '');
        
        var path = url.parse(req.url).pathname;
        var EncodedEmailHeaderString = path.slice(1);
        var DecodedEmailHeaderString = decodeURIComponent(EncodedEmailHeaderString);

        var EmailHeader = JSON.parse(DecodedEmailHeaderString);

        var EmailBodyString = "Subject: " + EmailHeader.Subject + "\n" +
                              "Recipient: " + EmailHeader.Recipient + "\n" +
                              "Date: " + getFormattedDate() + "\n" +
                              "Time: " + getFormattedTime() + "\n" +
                              "IP: " + IPAddress;

        var EmailSubjectString = "Email Viewed: '" + EmailHeader.Subject + "'";

        var mailOptions = {
            from : '"Email Tracker" <%EMAIL_ADDRESS%>',
            to : '%EMAIL_ADDRESS%',
            subject : EmailSubjectString,
            text : EmailBodyString
        };

        transporter.sendMail(mailOptions, function(err, info) {
            if(err) { console.log(err); }
        });

        fs.readFile(__dirname + '/EMAIL.png', function(err, data) {
            res.writeHead(200, { 'Content-Type' : 'image/png' });
            res.write(data, 'utf-8');
            res.end();
        });
    } catch(error) {
        res.writeHead(404, { 'Content-Type' : 'text/plain' });
        res.write('404', 'utf-8');
        res.end();
    }
});

server.listen(%PORT_NUMBER%);
