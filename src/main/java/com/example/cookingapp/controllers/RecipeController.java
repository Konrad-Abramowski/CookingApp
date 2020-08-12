package com.example.cookingapp.controllers;

import com.example.cookingapp.model.Recipe;
import com.example.cookingapp.repositories.RecipeRepository;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;
import java.net.URI;
import java.util.List;

@Controller
@RequestMapping("/recipes")
class RecipeController {

    private final RecipeRepository recipeRepository;

    RecipeController(final RecipeRepository recipeRepository) {
        this.recipeRepository = recipeRepository;
    }

    @GetMapping
    ResponseEntity<List<Recipe>> readAllRecipes(){
        return ResponseEntity.ok(recipeRepository.findAll());
    }

    @GetMapping("/{id}")
    ResponseEntity<Recipe> readRecipe(@PathVariable int id){
        return recipeRepository.findById(id)
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }

    @PostMapping
    ResponseEntity<Recipe> addRecipe(@RequestBody @Valid Recipe toCreate){
        Recipe result = recipeRepository.save(toCreate);
        return ResponseEntity.created(URI.create("/" + result.getId())).body(result);
    }

    @DeleteMapping("/{id}")
    ResponseEntity<?> deleteIngredient(@PathVariable int id) {
        if (recipeRepository.existsById(id)) {
            recipeRepository.deleteById(id);
            return new ResponseEntity<>(HttpStatus.OK);
        } else {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
    }
}
