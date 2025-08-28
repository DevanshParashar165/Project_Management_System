import Mailgen from "mailgen";
import nodemailer from "nodemailer"

const sendEmail = async(options) => {
    const mailGenerator = new Mailgen({
        theme : "default",
        product : {
            name : "Project Manager",
            link : "https://projectmanager.com"
        }
    })

    const emailTextual = mailGenerator.generatePlaintext(options.mailgenContent)

    const emailHtml = mailGenerator.generate(options.mailgenContent)

    const transporter = nodemailer.createTransport({
        host : process.env.MAIL_TRAP_SMTP_HOST,
        port : process.env.MAIL_TRAP_SMTP_PORT,
        auth : {
            user : process.env.MAIL_TRAP_SMTP_USER,
            pass : process.env.MAIL_TRAP_SMTP_PASS
        }
    })

    const mail = {
        from : "mail.taskmanager@example.com",
        to : options.email,
        subject : options.subject,
        text : emailTextual,
        html : emailHtml
    }

    try {
        await transporter.sendMail(mail)
    } catch (error) {
        console.error("Email service failed silently ! , Make sure you have provided your correct mailtrap crendetials in .env file");
        console.error(error)
    }
}

const emailVerificationMailgenContent = (username, verificationUrl) => {
    return {
        body: {
            name: username,
            intro: "Welcome to Project Management System! We're excited to get you onboard.",
            action: {
                instructions: 'To confirm your account, please click here:',
                button: {
                    color: '#22BC66', // Optional action button color
                    text: 'Confirm your account',
                    link: verificationUrl
                }
            }
        },
        outro: 'Need help, or have questions? Just reply to this email, we\'d love to help.'
    }
}



const forgotPasswordMailgenContent = (username, passwordResetUrl) => {
    return {
        body: {
            name: username,
            intro: "We got the request to reset the password of your account",
            action: {
                instructions: 'To change the password, please click here:',
                button: {
                    color: '#22BC66', // Optional action button color
                    text: 'Confirm your account',
                    link: passwordResetUrl
                }
            }
        },
        outro: 'Need help, or have questions? Just reply to this email, we\'d love to help.'
    }
}

export {emailVerificationMailgenContent,forgotPasswordMailgenContent,sendEmail}