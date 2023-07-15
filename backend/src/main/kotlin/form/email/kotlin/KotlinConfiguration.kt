import org.springframework.mail.javamail.JavaMailSender
import org.springframework.mail.javamail.MimeMessageHelper
import jakarta.mail.MessagingException
import jakarta.mail.internet.MimeMessage
import org.springframework.context.annotation.Configuration
import org.springframework.context.annotation.Bean
import org.springframework.beans.factory.annotation.Autowired
import org.springframework.core.env.Environment
import org.springframework.mail.javamail.JavaMailSenderImpl
import form.email.kotlin.ContactFormData

@Configuration
class KotlinFormEmailConfig {
    @Autowired
    private lateinit var environment: Environment

    @Bean
    fun contactFormFunction(mailSender: JavaMailSender): (ContactFormData) -> String {
        return { formData ->
            try {
                sendEmail(formData, mailSender)
                "Email sent successfully"
            } catch (e: Exception) {
                "Error sending email: ${e.message}"
            }
        }
    }

    private fun sendEmail(formData: ContactFormData, mailSender: JavaMailSender) {
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

    @Bean
    fun mailSender(): JavaMailSender {
        val mailSender = JavaMailSenderImpl()
        mailSender.host = environment.getProperty("email.host")
        mailSender.port = environment.getProperty("email.port")?.toInt() ?: 0
        mailSender.username = environment.getProperty("email.username")
        mailSender.password = environment.getProperty("email.password")
        // Configure any additional properties if required
        return mailSender
    }
}
