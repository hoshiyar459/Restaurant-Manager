package com.hoshiyar.RestaurantManager.restro.Entity;

import java.time.LocalDateTime;


import org.springframework.data.annotation.Id;
import org.springframework.data.annotation.Transient;
import org.springframework.data.mongodb.core.mapping.Document;

import lombok.Data;

@Document(collection = "UserCart")
@Data
public class Cart {
    
    @Id
    private String Cartid  ; 
    private String MenuId ; 
    private int quantity = 1 ; 
    private String UserId ; 
    private LocalDateTime CreateDate ; 
    
        @Transient
    private Menu menu;

}
