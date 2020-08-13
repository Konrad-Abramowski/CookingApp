package com.example.cookingapp.controllers;

import com.example.cookingapp.model.Ingredient;
import com.example.cookingapp.model.IngredientInRecipe;
import com.example.cookingapp.model.IngredientInRecipeKey;
import com.example.cookingapp.model.Recipe;
import com.example.cookingapp.repositories.IngredientInRecipeRepository;
import com.example.cookingapp.repositories.RecipeRepository;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;
import java.net.URI;
import java.util.List;

@Controller
@RequestMapping("/recipes")
class RecipeController {

    private final RecipeRepository recipeRepository;
    private final IngredientInRecipeRepository ingredientInRecipeRepository;

    RecipeController(final RecipeRepository recipeRepository, final IngredientInRecipeRepository ingredientInRecipeRepository) {
        this.recipeRepository = recipeRepository;
        this.ingredientInRecipeRepository = ingredientInRecipeRepository;
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

    @PostMapping(value = "/{id}",consumes = MediaType.APPLICATION_JSON_VALUE)
    ResponseEntity<IngredientInRecipe> addIngredientToRecipe(@PathVariable(value = "id") final int recipeId,
                                            @RequestBody @Valid Ingredient ingredient){
        // TODO
        return new ResponseEntity<>(HttpStatus.OK);
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
