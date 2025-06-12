package com.hoshiyar.RestaurantManager.restro.Entity;

import java.time.LocalDateTime;

import org.bson.types.ObjectId;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

import lombok.Data;

@Document(collection = "users")
@Data
public class User {

     @Id
     private ObjectId id ;
    private String username ; 
    private String mobileNumber ; 
    private LocalDateTime createdAt ;
    private String role ;
    private String Otp ; 

}
