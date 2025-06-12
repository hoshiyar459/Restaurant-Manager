package com.hoshiyar.RestaurantManager.restro.Entity;

import java.math.BigDecimal;

import org.bson.types.ObjectId;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.index.Indexed;
import org.springframework.data.mongodb.core.mapping.Document;

import com.mongodb.lang.NonNull;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;


@Document(collection = "menuTable")
@Data
@AllArgsConstructor
@NoArgsConstructor
public class Menu {

 @Id
private ObjectId id  ;

@Indexed(unique = true)
private String name ; 
@NonNull
private String description ;  
private BigDecimal price  ;
private String category  ;
private String imageUrl  ;
private String status ;
}