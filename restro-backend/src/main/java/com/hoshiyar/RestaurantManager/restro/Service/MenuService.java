package com.hoshiyar.RestaurantManager.restro.Service;

import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.NoSuchFileException;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.nio.file.StandardCopyOption;
import java.util.List;
import java.util.UUID;

import org.bson.types.ObjectId;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.multipart.MultipartFile;

import com.hoshiyar.RestaurantManager.restro.Entity.Menu;
import com.hoshiyar.RestaurantManager.restro.Repository.MenuRepo;

import jakarta.annotation.PostConstruct;

@Service
public class MenuService {

    // Injecting the Required Dependencies & Configuration & Repository
    @Autowired
    private MenuRepo menuRepo;

    @Value("${file.upload-dir}")
    private String uploadDir;

    // post construct method to initialize the upload directory
    // This method will be called after the bean is created and all dependencies are
    // injected
    @PostConstruct
    public void initUploadDir() {
        Path path = Paths.get(uploadDir);
        if (!Files.exists(path)) {
            try {
                Files.createDirectories(path);
                System.out.println("✅ Upload directory created: " + path.toAbsolutePath());
            } catch (IOException e) {
                System.err.println("❌ Failed to create upload directory: " + e.getMessage());
            }
        } else {
            System.out.println("📁 Upload directory already exists: " + path.toAbsolutePath());
        }
    }

    public boolean isMenuExists(String name) {
        return menuRepo.existsByName(name);
    }

    public boolean findById(ObjectId id) {
        return menuRepo.existsById(id);
    }
    // method to get All the products from the database
    public List<Menu> getAllMenu() {
        return menuRepo.findAll();
    }

    // Method to save the menu item and its image
    @Transactional
    public Menu SaveMenu(Menu menu, MultipartFile image) throws IOException {
        String UniqueImageName = saveImageToLocal(image);
        menu.setImageUrl("/" + uploadDir + "/" + UniqueImageName);
        if (isMenuExists(menu.getName())) {
            throw new IllegalArgumentException("Menu item with name " + menu.getName() + " already exists.");
        }
        return menuRepo.save(menu);
    }

    // method to update the menu item or update the existing menu item
    @Transactional
    public Menu updateMenu(ObjectId id, Menu updatedMenu, MultipartFile newImage) throws IOException {
        Menu existingMenu = menuRepo.findById(id)
                .orElseThrow(() -> new IllegalArgumentException("Menu with ID " + id + " not found."));

        // Update fields
        existingMenu.setName(
                (updatedMenu.getName() != null && !updatedMenu.getName().isEmpty())
                        ? updatedMenu.getName()
                        : existingMenu.getName());
        existingMenu.setPrice(
                updatedMenu.getPrice() != null && updatedMenu.getPrice().compareTo(java.math.BigDecimal.ZERO) > 0
                        ? updatedMenu.getPrice()
                        : existingMenu.getPrice());

        existingMenu.setDescription(
                (updatedMenu.getDescription() != null && !updatedMenu.getDescription().isEmpty())
                        ? updatedMenu.getDescription()
                        : existingMenu.getDescription());

        existingMenu.setCategory(
                (updatedMenu.getCategory() != null && !updatedMenu.getCategory().isEmpty())
                        ? updatedMenu.getCategory()
                        : existingMenu.getCategory());

        if (newImage != null && !newImage.isEmpty()) {
            deleteImageFromFileSystem(existingMenu.getImageUrl());
            String uniqueImageName = saveImageToLocal(newImage);
            existingMenu.setImageUrl("/" + uploadDir + "/" + uniqueImageName);
        }
        return menuRepo.save(existingMenu);
    }

    // Method to delete the menu item by ID
    @Transactional
    public void deleteMenu(ObjectId id) {
        Menu menu = menuRepo.findById(id)
                .orElseThrow(() -> new IllegalArgumentException("Menu with ID " + id + " not found."));
        deleteImageFromFileSystem(menu.getImageUrl());
        menuRepo.deleteById(id);
    }

    // Helper method to save the image file
    private String saveImageToLocal(MultipartFile image) throws IOException {
        String originalFilename = image.getOriginalFilename();
        String extension = originalFilename != null && originalFilename.contains(".")
                ? originalFilename.substring(originalFilename.lastIndexOf("."))
                : "";

        String uniqueFileName = UUID.randomUUID().toString() + extension;
        Path uploadPath = Paths.get(uploadDir);

        if (!Files.exists(uploadPath)) {
            Files.createDirectories(uploadPath);
        }

        Path filePath = uploadPath.resolve(uniqueFileName);
        Files.copy(image.getInputStream(), filePath, StandardCopyOption.REPLACE_EXISTING);

        return uniqueFileName;
    }

    private void deleteImageFromFileSystem(String imageUrl) {
        if (imageUrl == null || imageUrl.isEmpty())
            return;

        String relativePath = imageUrl.replaceFirst("^/", ""); // remove starting slash
        Path imagePath = Paths.get(relativePath);

        try {
            Files.deleteIfExists(imagePath);
            System.out.println("🗑️ Image deleted: " + imagePath.toAbsolutePath());
        } catch (NoSuchFileException e) {
            System.err.println("⚠️ Image file not found: " + imagePath.toAbsolutePath());
        } catch (IOException e) {
            System.err.println("❌ Failed to delete image: " + e.getMessage());
        }
    }

}
