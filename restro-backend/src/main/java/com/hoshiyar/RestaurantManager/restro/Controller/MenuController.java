package com.hoshiyar.RestaurantManager.restro.Controller;

import java.io.IOException;
import java.math.BigDecimal;
import java.util.List;

import org.bson.types.ObjectId;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.ModelAttribute;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;

import com.hoshiyar.RestaurantManager.restro.Entity.Menu;
import com.hoshiyar.RestaurantManager.restro.Entity.User;
import com.hoshiyar.RestaurantManager.restro.Repository.UserRepo;
import com.hoshiyar.RestaurantManager.restro.Service.MenuService;

@RestController
@RequestMapping("/admin/menu")
public class MenuController {

     @Autowired
     private UserRepo userRepo ; 

    @Autowired
    private MenuService menuService;

  
    // Rest Api For Getting All Products from Database
    @GetMapping("/all/{restaurantName}/products")
    public ResponseEntity<List<Menu>> getAllMenu(@PathVariable String restaurantName) {
        try {
            User restro =  userRepo.findByRestaurantName(restaurantName);

             if(restro == null) {
                return new ResponseEntity<>(HttpStatus.NOT_FOUND);
             }
              List<Menu> menuList = restro.getMenuList(); 
            if (!menuList.isEmpty() && menuList.size() > 0) {
                return new ResponseEntity<>(menuList, HttpStatus.OK);
            } 
             return new ResponseEntity<>(menuList , HttpStatus.NO_CONTENT) ;
           
        } catch (Exception e) {
            return new ResponseEntity<>(null, HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    // Rest Api For Product Addition in Database
   @PostMapping("/upload/product/{restaurantName}")
public ResponseEntity<?> addMenu(
        @PathVariable String restaurantName,
        @RequestParam("name") String name,
        @RequestParam("description") String description,
        @RequestParam("price") BigDecimal price,
        @RequestParam("category") String category,
        @RequestParam("status") String status,
        @RequestParam("image") MultipartFile image) throws IOException {

    try {
        User restro = userRepo.findByRestaurantName(restaurantName);
        if (restro == null) {
            return new ResponseEntity<>("Restaurant not found", HttpStatus.NOT_FOUND);
        }

        Menu menu = new Menu();
        menu.setName(name);
        menu.setDescription(description);
        menu.setPrice(price);
        menu.setCategory(category);
        menu.setStatus(status);

        // Save menu and get reference
        menu = menuService.SaveMenu(menu, image);

        // Add menu to restaurant
        restro.getMenuList().add(menu);
        userRepo.save(restro);

        return ResponseEntity.ok(menu);
    } catch (IllegalArgumentException e) {
        return ResponseEntity.badRequest().body("Invalid input");
    }
}


    // Rest Api For Updating a Existing product in Database
  @PutMapping("/update/product/{id}")
public ResponseEntity<Menu> updateMenu(
        @PathVariable ObjectId id,
        @ModelAttribute Menu menu,
        @RequestParam("image") MultipartFile image) {
    try {
        Menu updatedMenu = menuService.updateMenu(id, menu, image);
        return ResponseEntity.ok(updatedMenu);
    } catch (IllegalArgumentException e) {
        return ResponseEntity.badRequest().body(null);
    } catch (Exception e) {
        return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(null);
    }
}


    // Rest Api For Deleting a product from Database
@Transactional
@DeleteMapping("/delete/product/{id}")
public ResponseEntity<String> deleteMenu(@PathVariable ObjectId id) {
    try {
        boolean exists = menuService.findById(id);
        if (!exists) {
            return new ResponseEntity<>("Product Id not found", HttpStatus.NOT_FOUND);
        }

        menuService.deleteMenu(id);

        // Also remove it from all users’ menu lists (optional cleanup)
        List<User> users = userRepo.findAll();
        for (User user : users) {
            user.getMenuList().removeIf(menu -> menu.getId().equals(id));
            userRepo.save(user);
        }

        return new ResponseEntity<>("Product deleted successfully", HttpStatus.NO_CONTENT);
    } catch (Exception e) {
        return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                .body("Error deleting product: " + e.getMessage());
    }
}

}
