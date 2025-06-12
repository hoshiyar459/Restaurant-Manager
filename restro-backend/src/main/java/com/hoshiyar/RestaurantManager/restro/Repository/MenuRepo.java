package com.hoshiyar.RestaurantManager.restro.Repository;

import org.bson.types.ObjectId;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

import com.hoshiyar.RestaurantManager.restro.Entity.Menu;

@Repository
public interface MenuRepo extends MongoRepository<Menu, ObjectId> {
    Menu findByName(String name);
    boolean existsByName(String name);
    void deleteByName(String name);
}
