package com.hoshiyar.RestaurantManager.restro.Service;

import java.time.LocalDateTime;
import java.util.List;
import java.util.Optional;
import java.util.concurrent.ConcurrentHashMap;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.hoshiyar.RestaurantManager.restro.Entity.Cart;
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

     public User getUserByUsernameAndMobile(String username, String mobileNumber) {
        return userRepository.findByUsernameAndMobileNumber(username, mobileNumber);
    }

    public User createUser(User user) {
         if(user.getRole() == null || user.getRole().isEmpty()) {
            user.setRole("USER"); 
         }
         user.setCreatedAt(LocalDateTime.now());
       return  userRepository.save(user);
    }

     public void SaveUser(User user){
          userRepository.save(user);
     }

     public Optional<User> findByUserId(String id){
          return userRepository.findById(id); 
     }

     public void UpdateUserCart(String Id, Cart cart) throws Exception{
         User user =  findByUserId(Id).orElse(null);
          if(user == null){
             throw new Exception("User Not Found");
          } 
          user.getCart().add(cart); 
          SaveUser(user);
     }

    public void createOwner(User user) {
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

    public List<User> getAllUsers() {
         return userRepository.findAll();
    }


}
