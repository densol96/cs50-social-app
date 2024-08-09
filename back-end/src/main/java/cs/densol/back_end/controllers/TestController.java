package cs.densol.back_end.controllers;

import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.bind.annotation.GetMapping;

@RestController
public class TestController {

    @GetMapping("/test")
    public String getMethodName() {
        return "This is a protected route!";
    }

}
