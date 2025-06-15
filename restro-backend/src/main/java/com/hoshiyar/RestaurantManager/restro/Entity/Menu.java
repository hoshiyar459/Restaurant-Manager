package com.hoshiyar.RestaurantManager.restro.Entity;

import java.math.BigDecimal;


import org.springframework.data.annotation.Id;

import org.springframework.data.mongodb.core.mapping.Document;



import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;


@Document(collection = "menuTable")
@Data
@AllArgsConstructor
@NoArgsConstructor
public class Menu {

 @Id
private String id  ;
private String name ; 
private String description ;  
private BigDecimal price  ;
private String category  ;
private String imageUrl  ;
private String status ;
}