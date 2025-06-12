package com.hoshiyar.RestaurantManager.restro.Config;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.data.mongodb.MongoDatabaseFactory;
import org.springframework.data.mongodb.MongoTransactionManager;
import org.springframework.transaction.PlatformTransactionManager;
import org.springframework.transaction.annotation.EnableTransactionManagement;

@EnableTransactionManagement
@Configuration
public class Transactional {
     
    @Bean
     public PlatformTransactionManager transactionManager(MongoDatabaseFactory databaseFactory) {
             return new MongoTransactionManager(databaseFactory);
     }
    
}
