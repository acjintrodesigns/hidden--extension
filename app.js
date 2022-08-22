const nodemailer = require('nodemailer')
const express = require('express')

const path = require('path')

const app = express()
const publicPath = path.join(__dirname, 'public')

app.use(express.static(publicPath))
app.use(express.json())

app.get('', (_, resp) => {
  resp.sendFile(`${publicPath}/index.html`)
})

app.get('/about', (_, resp) => {
  resp.sendFile(`${publicPath}/about.html`)
})

app.get('/services', (_, resp) => {
  resp.sendFile(`${publicPath}/services.html`)
})

app.get('/contact', (_, resp) => {
  resp.sendFile(`${publicPath}/contact.html`)
})



//sending emails via nodemailer

app.post('/send', (req, res) => {
  let output = `
                <p>You have a new ${req.body.subject} Inquiry</p>
                <h3>Contact Details</h3>
                <ul>  
               
                <li><strong>Solution Inquiry: </strong> ${req.body.subject}</li>

                <li><strong>Name: </strong> ${req.body.name}</li>
                <li><strong>Surname: </strong> ${req.body.surname}</li>
                <li><strong>Company: </strong> ${req.body.company}</li>
                <li><strong>Email: </strong> ${req.body.email}</li>
                <li><strong>Phone: </strong> ${req.body.phone}</li>
                </ul>
                <h3>Message</h3>
                <p>${req.body.message}</p>
            `
  // var subject

  var transporter = nodemailer.createTransport({
    host: '*********.com',
    port: 465,
    secure: true,
    auth: {
      user: '*******@*******.com',
      pass: '*********',
    },
    tls: {
      rejectUnauthorized: false,
    },
  })

  let mailOptions = {
    from: 'Contact form <*******@**********.com>', // sender address
    to: '*******@******.com, ', // list of receivers'
    subject: `${req.body.subject} Contact Inquiry`, // Subject line
    text: 'Contact Request ', // plain text body
    html: output, // html body
  }

  transporter.sendMail(mailOptions, function (error, data) {
    if (error) {
      return console.log(error)
    }
    console.log('Message sent: %s', info.messageId)
    console.log('Preview URL: %s', nodemailer.getTestMessageUrl(info))
  })
  res.redirect('/')
})
// order form

app.listen(3000, () => {
  console.log('App started on port 3000')
})
