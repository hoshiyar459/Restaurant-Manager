package com.hoshiyar.RestaurantManager.restro.Entity;

import org.bson.types.ObjectId;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;
import lombok.Data;

@Document(collection = "tables")
@Data
public class Table {
 
    @Id
    private ObjectId id;
    private String name; 
    private String status; 
    private int capacity;
}
