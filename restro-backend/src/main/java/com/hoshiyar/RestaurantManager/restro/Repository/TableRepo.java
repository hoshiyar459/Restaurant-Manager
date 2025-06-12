package com.hoshiyar.RestaurantManager.restro.Repository;

import org.bson.types.ObjectId;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

import com.hoshiyar.RestaurantManager.restro.Entity.Table;

@Repository
public interface TableRepo  extends MongoRepository<Table , ObjectId> {
}
