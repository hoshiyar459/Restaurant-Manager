package com.hoshiyar.RestaurantManager.restro.Controller;

import java.security.SecureRandom;
import java.time.LocalDateTime;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.hoshiyar.RestaurantManager.restro.Entity.User;
import com.hoshiyar.RestaurantManager.restro.Service.UserService;

@RestController
@RequestMapping("/user/api")

public class UserController {

    @Autowired
    private UserService userService;

    private static final SecureRandom random = new SecureRandom();

    @PostMapping("/send-otp")
    public ResponseEntity<?> sendOtp(@RequestBody User user) {
        if (user.getUsername() == null || user.getMobileNumber() == null) {
            return ResponseEntity.badRequest().body("Username and Mobile Number are required.");
        }

        String otp = generateOtp();
        userService.saveOtp(user.getMobileNumber(), otp); // Store in memory

        boolean exists = userService.isUserExists(user.getUsername(), user.getMobileNumber());

        return ResponseEntity.ok()
                .body(Map.of("otp", otp, "message", exists ? "OTP for existing user" : "OTP for new user"));
    }

    @PostMapping("/verify-otp")
    public ResponseEntity<?> verifyOtp(@RequestBody User user) {
        String storedOtp = userService.getOtp(user.getMobileNumber());
        System.err.println("Verifying OTP for user: " + user.getUsername() + ", Mobile: " + user.getMobileNumber());

        if (storedOtp != null && storedOtp.equals(user.getOtp())) {
            boolean exists = userService.isUserExists(user.getUsername(), user.getMobileNumber());

            if (!exists) {
                userService.createUser(user);
                userService.removeOtp(user.getMobileNumber());
                return ResponseEntity.ok("New user created and verified.");
            } else {
                userService.removeOtp(user.getMobileNumber());
                return ResponseEntity.ok("Existing user verified.");
            }
        } else {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("Invalid OTP");
        }
    }

    public static String generateOtp() {
        int otp = 100000 + random.nextInt(900000); // Generates between 100000 and 999999
        return String.valueOf(otp);
    }
}
