# EmailTracker
A pair of JavaScript programs that enable email tracking.

### Disclaimer
This is not production-worthy code! View this simply as a proof-of-concept. Preconditions are implicit. No error checking exists.

## Server
A JavaScript program that reponds to a tracking URL when an email is loaded.

### Usage
Generally speaking, you must have a web server with a port exposed to the internet. This web server must also have Node.js and the necesary dependencies installed. Additionally, you must have a Gmail account (I was only able to get this running using Gmail, not Outlook or another email provider).

Once this is set up, replace `%EMAIL_ADDRESS%` and `%EMAIL_PASSWORD%` with their respective contents throughout the `EmailTrackerServer.js` script. Also, replace `%PORT_NUMBER%` with an unused port number (which you have also allowed through firewalls and forwarded from your router, if necessary).

Now, run the script. Preferably, you would want to set up a cron job that would automatically run this script on startup.

In order for this to run without the email recipient noticing, `EMAIL.png` should be a single pixel, transparent image. If it isn't, the recipient would notice its presence.

## Client
A JavaScript program that generates a tracking URL.

### Usage
Replace `%HOSTNAME%` with your server's IP address or DNS hostname. Replace `%PORT_NUMBER%` with the port number you used with the server script above.

Run the scipt using Node.js in a console window and supply th necessary information about the email and copy the `img` tag generated into the email. This tag must be inserted as HTML in order to work correctly (not as text). To do this, use an email client like Mozilla Thunderbird and click `Insert` > `HTML...` (or something similar).

### Quirks
The server will alert you when you first send the email as the image will be loaded by your email client as a preview before you send the email.

## Example
Generated Image Tag:
```
<img src="http://www.robertdurfee.com:32537/%7B%22Subject%22%3A%22Email%20Test%22%2C%22Recipient%22%3A%22rbdurfee%40mit.edu%22%7D">
```
Email Notification:
![Example](/Example.png)
