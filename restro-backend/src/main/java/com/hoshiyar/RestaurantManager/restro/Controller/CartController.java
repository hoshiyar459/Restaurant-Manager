package com.hoshiyar.RestaurantManager.restro.Controller;

import java.time.LocalDateTime;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import com.hoshiyar.RestaurantManager.restro.Entity.Cart;
import com.hoshiyar.RestaurantManager.restro.Entity.Menu;
import com.hoshiyar.RestaurantManager.restro.Entity.User;
import com.hoshiyar.RestaurantManager.restro.Repository.CartRepo;
import com.hoshiyar.RestaurantManager.restro.Repository.MenuRepo;
import com.hoshiyar.RestaurantManager.restro.Service.MenuService;
import com.hoshiyar.RestaurantManager.restro.Service.UserService;



@RestController
@RequestMapping("/cart/api")
public class CartController {

    @Autowired
    private CartRepo cartRepo;

    @Autowired
   private UserService userService ; 

    @Autowired
    private MenuRepo menuRepo;

    @Autowired
    private MenuService menuService ; 


@PostMapping("/create/{userId}/{menuId}")
public ResponseEntity<?> addToCart(@PathVariable String userId, @PathVariable String menuId) {
    try {
        // Check if menu exists
        if (!menuRepo.existsById(menuId)) {
            throw new IllegalArgumentException("Menu not found with ID: " + menuId);
        }
        // Create Cart entry
        Cart cart = new Cart();
        cart.setUserId(userId);
        cart.setMenuId(menuId);
        cart.setCreateDate(LocalDateTime.now());

        // Save cart entry separately
        Cart savedCart = cartRepo.save(cart);

         userService.UpdateUserCart(userId, savedCart);
        return ResponseEntity.ok(savedCart);

    } catch (IllegalArgumentException ex) {
        return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(ex.getMessage());
    } catch (Exception ex) {
        ex.printStackTrace(); // Log for debugging
        return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("An error occurred while adding to cart.");
    }
}
 
  @GetMapping("get/{userId}/cart")
public ResponseEntity<List<Cart>> getUserCartWithMenu(@PathVariable String userId) {
    try {
        User user = userService.findByUserId(userId).orElse(null);
        if (user == null) {
            return ResponseEntity.badRequest().body(null);
        }

        List<Cart> cartList = user.getCart();

        for (Cart cart : cartList) {
            Menu menu = menuService.findById(cart.getMenuId());
            if (menu != null) {
                cart.setMenu(menu);
            }
        }

        return ResponseEntity.ok(cartList);
    } catch (Exception e) {
        e.printStackTrace();
        return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(null);
    }
}
    

}
 