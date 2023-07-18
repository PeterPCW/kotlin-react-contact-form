package form.email.kotlin

import org.springframework.boot.autoconfigure.SpringBootApplication
import org.springframework.boot.runApplication
import org.springframework.web.bind.annotation.GetMapping
import org.springframework.web.bind.annotation.RestController

@SpringBootApplication
class KotlinFormEmail

fun main(args: Array<String>) {
    runApplication<KotlinFormEmail>(*args)
}

@RestController
class HomeController {
    @GetMapping("/")
    fun home(): String {
        return "Running!"
    }
}
