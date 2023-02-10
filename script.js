const express = require("express");
const app = express();
const nodemailer = require("nodemailer");
var smtpTransport = require("nodemailer-smtp-transport");

const PORT = process.env.PORT || 4002;

app.use(express.static(__dirname + "Sytin"));

app.get("/", (req, resp) => {
	resp.sendFile(__dirname + "/sytin.html");
});

app.use(express.json());
app.use(express.urlencoded());

app.post("/formData", (req, resp) => {
	const data = req.body;

	var transport = nodemailer.createTransport(
		smtpTransport({
			service: "mail",
			auth: {
				user: "samoyilova_blog@mail.ru",
				pass: "Dimax125321",
			},
		})
	);

	transport.sendMail(
		{
			//email options
			from: "Sender Name <email@gmail.com>",
			to: "Receiver Name <receiver@email.com>", // receiver
			subject: "Emailing with nodemailer", // subject
			html: data, // body (var data which we've declared)
		},
		function (error, response) {
			//callback
			if (error) {
				console.log(error);
			} else {
				console.log("Message sent:");
				resp.send("success!");
			}

			transport.close();
		}
	);
});

app.listen(PORT, () => {
	console.log(`server running on port ${PORT}`);
});