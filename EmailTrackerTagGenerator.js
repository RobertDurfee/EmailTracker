var prompt = require('prompt');

prompt.message = '';
prompt.delimiter = ':';

prompt.start();

prompt.get(['Subject', 'Recipient'], function (err, result) {
    if(err) { console.log(err); }

    console.log('');

    var EmailHeaderObject = { "Subject" : result.Subject, "Recipient" : result.Recipient };

    var DecodedEmailHeaderString = JSON.stringify(EmailHeaderObject);
    var EncodedEmailHeaderString = encodeURIComponent(DecodedEmailHeaderString);
    var ImageURL = "<img src=\"http://%HOSTNAME%:%PORT_NUMBER%/" + EncodedEmailHeaderString + "\">";

    console.log(ImageURL);
});
