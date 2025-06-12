package com.hoshiyar.RestaurantManager.restro.Controller;

import java.util.List;
import java.util.Optional;

import org.bson.types.ObjectId;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.hoshiyar.RestaurantManager.restro.Entity.Table;
import com.hoshiyar.RestaurantManager.restro.Repository.TableRepo;

@RestController
@RequestMapping("/api/tables")
public class TableController {

    @Autowired
    private TableRepo tableRepo;

    @GetMapping("/all")
    public List<Table> getAllTables() {
        return tableRepo.findAll();
    }

    @PostMapping("/create")
    public Table createTable(@RequestBody Table table) {
        return tableRepo.save(table);
    }

    @PutMapping("/{id}")
    public ResponseEntity<Table> updateTable(@PathVariable ObjectId id, @RequestBody Table table) {
        Optional<Table> existing = tableRepo.findById(id);
        if (existing.isPresent()) {
            Table updated = existing.get();
            updated.setStatus(table.getStatus());
            updated.setCapacity(table.getCapacity());
            return ResponseEntity.ok(tableRepo.save(updated));
        }
        return ResponseEntity.notFound().build();
    }

    @DeleteMapping("/{id}")
    public void deleteTable(@PathVariable ObjectId id) {
        tableRepo.deleteById(id);
    }
}
