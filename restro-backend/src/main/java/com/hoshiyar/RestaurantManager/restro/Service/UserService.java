package com.hoshiyar.RestaurantManager.restro.Service;

import java.time.LocalDateTime;
import java.util.concurrent.ConcurrentHashMap;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.hoshiyar.RestaurantManager.restro.Entity.User;
import com.hoshiyar.RestaurantManager.restro.Repository.UserRepo;

@Service
public class UserService {

    @Autowired
    private UserRepo userRepository;

    private final ConcurrentHashMap<String, String> otpStore = new ConcurrentHashMap<>();

    public boolean isUserExists(String username, String mobileNumber) {
        return userRepository.existsByUsernameAndMobileNumber(username, mobileNumber);
    }

    public void createUser(User user) {
         user.setRole("USER");
         user.setCreatedAt(LocalDateTime.now());
        userRepository.save(user);

    }

    public void saveOtp(String mobileNumber, String otp) {
        otpStore.put(mobileNumber, otp);
    }

    public String getOtp(String mobileNumber) {
        return otpStore.get(mobileNumber);
    }

    public void removeOtp(String mobileNumber) {
        otpStore.remove(mobileNumber);
    }
}
