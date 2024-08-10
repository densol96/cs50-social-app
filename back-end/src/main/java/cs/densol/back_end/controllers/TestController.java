package cs.densol.back_end.controllers;

import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;

@RestController
@CrossOrigin(origins = { "http://localhost:5173", "http://127.0.0.1:5173" })
public class TestController {

    @GetMapping("/api/v1/test")
    public String getMethodName() {
        return "This is a protected route!";
    }

}
