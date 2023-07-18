package form.email.kotlin

import org.springframework.mail.javamail.JavaMailSenderImpl
import org.springframework.mail.javamail.MimeMessageHelper
import jakarta.mail.internet.MimeMessage
import org.springframework.context.annotation.Bean
import org.springframework.beans.factory.annotation.Autowired
import org.springframework.core.env.Environment
import form.email.kotlin.ContactFormData
import org.springframework.web.bind.annotation.PostMapping
import org.springframework.web.bind.annotation.GetMapping
import org.springframework.web.bind.annotation.RequestBody
import org.springframework.web.bind.annotation.RequestMapping
import org.springframework.web.bind.annotation.RestController

@RestController
@RequestMapping("/")
class Controller {
    @Autowired
    private lateinit var environment: Environment

    @PostMapping("contact")
    fun sendContactForm(@RequestBody formData: ContactFormData): String {
        return try {
            sendEmail(formData)
            "Email sent successfully"
        } catch (e: Exception) {
            "Error sending email: ${e.message}"
        }
    }

    @GetMapping("contact")
    fun home(): String {
        return "Running!"
    }

    private fun sendEmail(formData: ContactFormData) {
        val mailSender = createMailSender()

        val message: MimeMessage = mailSender.createMimeMessage()
        val helper = MimeMessageHelper(message, true)

        val toAddress: String? = environment.getProperty("email.to.address")
        val ccAddress: String = formData.email

        helper.setTo(toAddress ?: "") // Provide a default value if `toAddress` is null
        helper.setCc(ccAddress)
        helper.setSubject("Contact Form Submission")
        helper.setText(
            """
            <html>
                <body>
                    <h2>Contact Form Submission</h2>
                    <p><strong>Name:</strong> ${formData.name}</p>
                    <p><strong>Email:</strong> ${formData.email}</p>
                    <p><strong>Message:</strong> ${formData.message}</p>
                </body>
            </html>
            """,
            true // Enable HTML content
        )

        mailSender.send(message)
    }

    private fun createMailSender(): JavaMailSenderImpl {
        val mailSender = JavaMailSenderImpl()
        mailSender.host = environment.getProperty("email.host")
        mailSender.port = environment.getProperty("email.port")?.toInt() ?: 0
        mailSender.username = environment.getProperty("email.username")
        mailSender.password = environment.getProperty("email.password")
        mailSender.javaMailProperties["mail.smtp.starttls.enable"] = "true"
        mailSender.javaMailProperties["mail.smtp.starttls.required"] = "true"
        // Configure any additional properties if required
        return mailSender
    }

    @Bean
    fun javaMailSender(environment: Environment): JavaMailSenderImpl {
        return createMailSender()
    }
}
