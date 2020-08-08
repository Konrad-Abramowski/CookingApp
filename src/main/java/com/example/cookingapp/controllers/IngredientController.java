package com.example.cookingapp.controllers;

import com.example.cookingapp.model.Ingredient;
import com.example.cookingapp.repositories.IngredientRepository;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;
import java.net.URI;
import java.util.List;
import java.util.Optional;

@Controller
@RequestMapping("/ingredients")
class IngredientController {

    private final IngredientRepository ingredientRepository;

    IngredientController(final IngredientRepository ingredientRepository) {
        this.ingredientRepository = ingredientRepository;
    }

    @PostMapping
    ResponseEntity<Ingredient> createIngredient(@RequestBody @Valid Ingredient toCreate) {
        Ingredient result = ingredientRepository.save(toCreate);
        return ResponseEntity.created(URI.create("/" + result.getId())).body(result);
    }

    @GetMapping
    ResponseEntity<List<Ingredient>> readAllIngredients() {
        return ResponseEntity.ok(ingredientRepository.findAll());
    }

    @GetMapping("/{id}")
    ResponseEntity<Ingredient> readIngredient(@PathVariable int id) {
        return ingredientRepository.findById(id)
                .map(ingredient -> ResponseEntity.ok(ingredient))
                .orElse(ResponseEntity.notFound().build());
    }

    @DeleteMapping("/{id}")
    ResponseEntity<?> deleteIngredient(@PathVariable int id) {
        if (ingredientRepository.existsById(id)) {
            ingredientRepository.deleteById(id);
            return new ResponseEntity<>(HttpStatus.OK);
        } else {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }

    }

}
