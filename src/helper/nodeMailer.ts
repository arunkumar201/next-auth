import nodemailer from "nodemailer";
import bcryptjs from "bcryptjs";
import { User } from "@/model/userModel";
interface EmailOptions {
	from: "arun24@google.com";
	to: string;
	subject: string;
	html: string;
}

export async function sendEmail({ email, emailType }: any) {
	try {
		const hash = await bcryptjs.hash(email, 10);
		console.log("123", hash);
		if (emailType === "VERIFY") {
			await User.findOneAndUpdate(
				{ email },
				{
					verifyToken: hash,
					verifyTokenExpiry: Date.now() + 360000,
				}
			);
		} else if (emailType === "RESET") {
			await User.findOneAndUpdate(
				{ email },
				{
					forgotPasswordToken: hash,
					forgotPasswordTokenExpiry: Date.now() + 360000,
				}
			);
		}
		const transporter = nodemailer.createTransport({
			host: "sandbox.smtp.mailtrap.io",
			port: 2525,
			auth: {
				user: process.env.SMTP_USERNAME,
				pass: process.env.SMTP_PASSWORD,
			},
		});

		const mailOptions: EmailOptions = {
			from: "arun24@google.com",
			to: email,
			subject:
				emailType === "VERIFY"
					? "Verify Your Email Address"
					: "Reset Your Password",
			html: `
<div style="font-family:sans-serif;">
    
<div style="background-color:#f7f6fb;padding:30px 0;">  
  
<div style="max-width:560px;margin:0 auto; text-align:center;">
  
<img src="https://cryptologos.cc/logos/ethereum-eth-logo.svg?v=025" alt="Logo" style="width:20px; height:20px">

</div>

</div>  

<div style="background-color:#fff;padding:30px 0;">

<div style="max-width:560px;margin:0 auto;">

<p style="color:#333;">Hey there,</p>

<p>Please click the button below to ${
				emailType === "VERIFY" ? "verify your email" : "reset your password"
			} for your account.</p>

       <a href="${process.env.DOMAIN_NAME}/verifyemail?token=${hash}" style=" 
   background-color:#3498db;
   color:#fff;
   padding:15px 25px;
   text-decoration: none;
   display:inline-block;">       
   Verify Email / Reset Password
   </a>  
   
   <p>If the button is not clickable, please copy the link below in your browser:</p>      
        
   <p style="color:#666;">${
			process.env.DOMAIN_NAME
		}/verifyemail?token=${hash}</p> 
    
   <p>If you did not request a password reset, please ignore this email.</p>

</div> 

</div>
      
</div>   
`,
		};

		// send mail with defined transport object
		const mailResponse = await transporter.sendMail(mailOptions);
		console.log(`Message sent: ${mailResponse.messageId} ${mailResponse}`);
		return mailResponse;
	} catch (error: any) {
		throw new Error(error.message);
	}
}
