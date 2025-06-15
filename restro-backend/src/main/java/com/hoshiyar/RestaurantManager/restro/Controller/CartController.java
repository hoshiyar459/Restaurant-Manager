package com.hoshiyar.RestaurantManager.restro.Controller;

import java.time.LocalDateTime;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import com.hoshiyar.RestaurantManager.restro.Entity.Cart;
import com.hoshiyar.RestaurantManager.restro.Entity.Menu;
import com.hoshiyar.RestaurantManager.restro.Entity.User;
import com.hoshiyar.RestaurantManager.restro.Repository.CartRepo;
import com.hoshiyar.RestaurantManager.restro.Repository.UserRepo;
import com.hoshiyar.RestaurantManager.restro.Service.MenuService;

@RestController
@RequestMapping("/cart/api")
public class CartController {

    @Autowired
    private CartRepo cartRepo;

    @Autowired
    private UserRepo userRepo;

    

    @Autowired
    private MenuService menuService;

    @PostMapping("/create/{userId}/{menuId}")
    public ResponseEntity<?> createCartItem(@PathVariable String userId, @PathVariable String menuId) {
        try {
            // Find user
            User user = userRepo.findById(userId).orElse(null);
            if (user == null) {
                return ResponseEntity.status(HttpStatus.NOT_FOUND).body("❌ User not found");
            }

            // Find menu
            Menu menu = menuService.findById(menuId);
            if (menu == null) {
                return ResponseEntity.status(HttpStatus.NOT_FOUND).body("❌ Menu item not found");
            }

            // Create cart item
            Cart cart = new Cart();
            cart.setUserId(user.getId());
            cart.setMenuId(menu.getId());
            cart.setCreateDate(LocalDateTime.now());
            cart.setQuantity(1); // Default quantity

             user.getCart().add(cart);
              
              userRepo.save(user);
            

            // Save
            Cart savedCart = cartRepo.save(cart);
            return new ResponseEntity<>(savedCart, HttpStatus.CREATED);

        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body("🔥 Error occurred: " + e.getMessage());
        }
    }
}
 