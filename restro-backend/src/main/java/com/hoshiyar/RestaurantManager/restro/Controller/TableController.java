package com.hoshiyar.RestaurantManager.restro.Controller;

import java.util.List;
import java.util.Optional;

import org.bson.types.ObjectId;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;

import com.hoshiyar.RestaurantManager.restro.Entity.Table;
import com.hoshiyar.RestaurantManager.restro.Entity.User;
import com.hoshiyar.RestaurantManager.restro.Repository.TableRepo;
import com.hoshiyar.RestaurantManager.restro.Repository.UserRepo;

@RestController
@RequestMapping("/admin/table")
public class TableController {

    @Autowired
    private TableRepo tableRepo;

    @Autowired
    private UserRepo userRepo;

    // ✅ Get all tables by restaurant name
    @GetMapping("/all/{restaurantName}")
    public ResponseEntity<List<Table>> getAllTables(@PathVariable String restaurantName) {
        User restro = userRepo.findByRestaurantName(restaurantName);
        if (restro == null) {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
        List<Table> tableList = restro.getTables();
        return tableList.isEmpty()
                ? new ResponseEntity<>(tableList, HttpStatus.NO_CONTENT)
                : new ResponseEntity<>(tableList, HttpStatus.OK);
    }

    // ✅ Add a table to specific restaurant
    @PostMapping("/create/{restaurantName}")
    public ResponseEntity<?> createTable(@PathVariable String restaurantName, @RequestBody Table table) {
        try {
            User restro = userRepo.findByRestaurantName(restaurantName);
            
            Table savedTable = tableRepo.save(table);
            restro.getTables().add(savedTable);
            userRepo.save(restro);
            return ResponseEntity.ok(savedTable);
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body("Error creating table: " + e.getMessage());
        }

    }

    // ✅ Update a table by its ID
    @PutMapping("/update/{id}")
    public ResponseEntity<?> updateTable(@PathVariable ObjectId id, @RequestBody Table updatedData) {
        Optional<Table> existing = tableRepo.findById(id);
        if (existing.isPresent()) {
            Table table = existing.get();
            table.setStatus(updatedData.getStatus());
            table.setCapacity(updatedData.getCapacity());
            Table saved = tableRepo.save(table);
            return ResponseEntity.ok(saved);
        }
        return ResponseEntity.status(HttpStatus.NOT_FOUND).body("Table not found");
    }

    // ✅ Delete a table from restaurant and tableRepo
    @DeleteMapping("/delete/{id}")
    public ResponseEntity<String> deleteTable(@PathVariable ObjectId id) {
        Optional<Table> optionalTable = tableRepo.findById(id);
        if (optionalTable.isEmpty()) {
            return new ResponseEntity<>("Table ID not found", HttpStatus.NOT_FOUND);
        }

        tableRepo.deleteById(id);

        // Remove the table from all restaurant's table lists (cleanup)
        List<User> users = userRepo.findAll();
        for (User user : users) {
            user.getTables().removeIf(table -> table.getId().equals(id));
            userRepo.save(user);
        }

        return new ResponseEntity<>("Table deleted successfully", HttpStatus.NO_CONTENT);
    }
}
