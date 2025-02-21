const express = require("express");
const nodemailer = require("nodemailer");
const cors = require("cors");
require("dotenv").config();

const app = express();
const PORT = 5000;

app.use(express.json());
app.use(cors()); // Allow requests from React frontend

// Nodemailer transporter setup
const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS, // App password
    },
});

// API route to send email
app.post("/send-email", async (req, res) => {
    const { name, email, message } = req.body;

    const mailOptions = {
        from: process.env.EMAIL_USER,
        to: email, // Send email to the client
        subject: "Thank You for Contacting Us!",
        text: `Hello ${name},\n\nThank you for reaching out. We have received your message:\n"${message}"\n\nWe will get back to you shortly.\n\nBest Regards,\nYour Company Name`,
    };

    try {
        await transporter.sendMail(mailOptions);
        res.status(200).json({ mailOptions, message: "Email sent successfully!" });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Error sending email" });
    }
});

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
