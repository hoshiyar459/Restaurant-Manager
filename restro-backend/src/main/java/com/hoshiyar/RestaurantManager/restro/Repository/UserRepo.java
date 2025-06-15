package com.hoshiyar.RestaurantManager.restro.Repository;


import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

import com.hoshiyar.RestaurantManager.restro.Entity.User;
import java.util.List;


@Repository
public interface UserRepo extends MongoRepository<User , String> {
    
    User findByUsername(String username);
    boolean existsByUsername(String username);
    boolean existsByMobileNumber(String mobileNumber);
    User findByMobileNumber(String mobileNumber);
     boolean existsByUsernameAndMobileNumber(String username, String mobileNumber);
     User findByRestaurantName(String restaurantName);
     List<User> findByRestaurantNameNotNull();
      User findByUsernameAndMobileNumber(String username, String mobileNumber);
}
