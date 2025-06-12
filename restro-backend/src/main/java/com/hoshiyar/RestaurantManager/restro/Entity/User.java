package com.hoshiyar.RestaurantManager.restro.Entity;

import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;

import org.bson.types.ObjectId;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.index.Indexed;
import org.springframework.data.mongodb.core.mapping.DBRef;
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
    private String otp ; 


//     @Indexed(unique = true)
     private String restaurantName ;  
      
     @DBRef
     private List<Menu> menuList = new ArrayList<>() ;

     @DBRef
      private List<Table> tables = new ArrayList<>() ;

      
}
