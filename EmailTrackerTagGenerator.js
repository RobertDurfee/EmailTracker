var prompt = require('prompt');

prompt.message = '';
prompt.delimiter = ':';

prompt.start();

prompt.get(['Subject', 'From', 'To'], function (err, result) {
    if(err) { console.log(err); }

    console.log('');

    var EmailHeaderObject = { "Subject" : result.Subject, "From" : result.From, "To" : result.To };

    var DecodedEmailHeaderString = JSON.stringify(EmailHeaderObject);
    var EncodedEmailHeaderString = encodeURIComponent(DecodedEmailHeaderString);
    var ImageURL = "<img src=\"http://%HOSTNAME%:8001/" + EncodedEmailHeaderString + "\">";

    console.log(ImageURL);
});
