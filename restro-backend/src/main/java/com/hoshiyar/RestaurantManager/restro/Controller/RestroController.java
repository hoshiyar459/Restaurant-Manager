package com.hoshiyar.RestaurantManager.restro.Controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.hoshiyar.RestaurantManager.restro.Entity.User;
import com.hoshiyar.RestaurantManager.restro.Repository.UserRepo;
import com.hoshiyar.RestaurantManager.restro.Service.UserService;

@RestController
@RequestMapping("/restro/api")
public class RestroController {

     @Autowired
     private UserService userService ; 
      
     @Autowired
     private UserRepo userRepo;

     @GetMapping("/all")
     private List<User> getAllRestro() {
         return userRepo.findByRestaurantNameNotNull();
     }
    
}
