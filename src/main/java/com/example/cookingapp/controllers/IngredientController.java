package com.example.cookingapp.controllers;

import com.example.cookingapp.model.Ingredient;
import com.example.cookingapp.repositories.IngredientRepository;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;
import java.net.URI;
import java.util.List;

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

    @ResponseBody
    @GetMapping(produces = MediaType.APPLICATION_JSON_VALUE)
    ResponseEntity<List<Ingredient>> readAllIngredients() {
        return ResponseEntity.ok(ingredientRepository.findAll());
    }

    @GetMapping("/{id}")
    ResponseEntity<Ingredient> readIngredient(@PathVariable int id) {
        return ingredientRepository.findById(id)
                .map(ResponseEntity::ok)
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

    @PutMapping("/{id}")
    ResponseEntity<?> updateIngredient(@PathVariable int id, @RequestBody @Valid Ingredient toUpdate) {
        if (!ingredientRepository.existsById(id)) {
            return ResponseEntity.notFound().build();
        }
        ingredientRepository.findById(id)
                .ifPresent(ingredient -> {
                    ingredient.setName(toUpdate.getName());
                    ingredientRepository.save(ingredient);
                });
        return ResponseEntity.ok(ingredientRepository.findById(id));
    }

    @ModelAttribute("ingredients")
    List<Ingredient> getIngredients() {
        return ingredientRepository.findAll();
    }

}
