package com.example.cookingapp.controllers;

import com.example.cookingapp.model.*;
import com.example.cookingapp.repositories.AmountRepository;
import com.example.cookingapp.repositories.IngredientInRecipeRepository;
import com.example.cookingapp.repositories.RecipeRepository;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;
import java.net.URI;
import java.util.*;

@Controller
@RequestMapping("/recipes")
class RecipeController {

    private final RecipeRepository recipeRepository;
    private final IngredientInRecipeRepository ingredientInRecipeRepository;
    private final AmountRepository amountRepository;

    private static final Logger logger = LoggerFactory.getLogger(RecipeController.class);

    RecipeController(final RecipeRepository recipeRepository, final IngredientInRecipeRepository ingredientInRecipeRepository, final AmountRepository amountRepository) {
        this.recipeRepository = recipeRepository;
        this.ingredientInRecipeRepository = ingredientInRecipeRepository;
        this.amountRepository = amountRepository;
    }

    @GetMapping
    ResponseEntity<List<Recipe>> readAllRecipes() {
        return ResponseEntity.ok(recipeRepository.findAll());
    }

    @GetMapping(value = "/{id}", produces = MediaType.APPLICATION_JSON_VALUE)
    ResponseEntity<?> readRecipe(@PathVariable int id) {
        List<Map<String, Object>> result = ingredientInRecipeRepository.showRecipeInfo(id);
        if (recipeRepository.existsById(id)) {
            return ResponseEntity.ok(result);
        } else {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
    }

    @PostMapping
    ResponseEntity<Recipe> addRecipe(@RequestBody @Valid Recipe toCreate) {
        Recipe result = recipeRepository.save(toCreate);
        return ResponseEntity.created(URI.create("/" + result.getId())).body(result);
    }

    @PostMapping(value = "/find", consumes = MediaType.APPLICATION_JSON_VALUE, produces = MediaType.APPLICATION_JSON_VALUE)
    ResponseEntity<?> findRecipeWithIngredients(@RequestBody HashMap<String, int[]> ids) {
        List<Integer> recipeIds = ingredientInRecipeRepository.findDistinctRecipeIds();
        int[] ownedIngredientIds = ids.get("ids");
        int resultRecipeIds = 0;
        List<List<Map<String, Object>>> result = new ArrayList<List<Map<String, Object>>>();
        int counter = 0;
        for (int recipeId : recipeIds) {
            List<Integer> ingredientsForRecipe = ingredientInRecipeRepository.findIngredientIdsByRecipeId(recipeId);
            for (int ingredientId : ingredientsForRecipe) {
                for (int ownedIngredient : ownedIngredientIds) {
                    if (ownedIngredient == ingredientId) {
                        resultRecipeIds++;
                    }
                }
            }
            result.add(ingredientInRecipeRepository.showRecipeIngredients(recipeId));
            Map<String, Object> toAdd = new HashMap<>();
            toAdd.put("MISSING_INGREDIENTS", ingredientsForRecipe.size() - resultRecipeIds);
            toAdd.put("RECIPE_NAME", recipeRepository.findById(recipeId).get().getName());
            toAdd.put("RECIPE_PREPARATION", recipeRepository.findById(recipeId).get().getPreparation());
            result.get(counter).add(toAdd);
            resultRecipeIds = 0;
            counter++;
        }
        return ResponseEntity.ok(result);
    }

    @Transactional
    @PostMapping(value = "/{recipeId}")
    ResponseEntity<IngredientInRecipe> addIngredientToRecipe(@PathVariable(value = "recipeId") final int recipeId,
                                                             @RequestParam int ingredientId,
                                                             @RequestParam String unit,
                                                             @RequestParam int number) {
        IngredientInRecipeKey id = new IngredientInRecipeKey(recipeId, ingredientId);
        if (ingredientInRecipeRepository.existsById(id)) {
            logger.warn("Such ingredientInRecipe already exists!");
            return new ResponseEntity<>(HttpStatus.OK);
        }
        Amount amount = new Amount(Unit.valueOf(unit), number);
        amountRepository.save(amount);
        ingredientInRecipeRepository.addIngredientToRecipe(ingredientId, recipeId, amount.getId());
        return new ResponseEntity<>(HttpStatus.OK);
    }

    @DeleteMapping("/{id}")
    ResponseEntity<?> deleteRecipe(@PathVariable int id) {
        if (recipeRepository.existsById(id)) {
            recipeRepository.deleteById(id);
            return new ResponseEntity<>(HttpStatus.OK);
        } else {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
    }
}
