package com.example.cookingapp.controllers;

import com.example.cookingapp.model.*;
import com.example.cookingapp.repositories.AmountRepository;
import com.example.cookingapp.repositories.IngredientInRecipeRepository;
import com.example.cookingapp.repositories.RecipeRepository;
import com.fasterxml.jackson.annotation.JsonFormat;
import com.fasterxml.jackson.core.type.TypeReference;
import com.fasterxml.jackson.databind.DeserializationFeature;
import com.fasterxml.jackson.databind.ObjectMapper;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.configurationprocessor.json.JSONObject;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.bind.annotation.*;

import javax.print.attribute.standard.Media;
import javax.validation.Valid;
import java.lang.reflect.Array;
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

    @GetMapping(value = "/find")
    ResponseEntity<?> findRecipeWithIngredients(@RequestBody @Valid List<Integer> ownedIngredientIds){
        List<Integer> recipeIds = ingredientInRecipeRepository.findDistinctRecipeIds();
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
            result.add(ingredientInRecipeRepository.showRecipeInfo(recipeId));
            Map<String, Object> toAdd = new HashMap<>();
            toAdd.put("MISSING_INGREDIENTS", ingredientsForRecipe.size() - resultRecipeIds);
            result.get(counter).add(toAdd);
            resultRecipeIds = 0;
            counter++;
        }
        return ResponseEntity.ok(result);
    }

    @Transactional
    @PostMapping(value = "/{recipeId}", consumes = MediaType.APPLICATION_JSON_VALUE)
    ResponseEntity<IngredientInRecipe> addIngredientToRecipe(@PathVariable(value = "recipeId") final int recipeId,
                                                             @RequestParam int ingredientId,
                                                             @RequestParam String type,
                                                             @RequestParam int number) {
        IngredientInRecipeKey id = new IngredientInRecipeKey(recipeId, ingredientId);
        if (ingredientInRecipeRepository.existsById(id)) {
            logger.warn("Such ingredientInRecipe already exists!");
            return new ResponseEntity<>(HttpStatus.OK);
        }
        Amount amount = new Amount(AmountType.valueOf(type), number);
        amountRepository.save(amount);
        ingredientInRecipeRepository.addIngredientToRecipe(ingredientId, recipeId, amount.getId());
        return new ResponseEntity<>(HttpStatus.OK);
    }

    @Transactional
    @DeleteMapping(value = "/{recipeId}", consumes = MediaType.APPLICATION_JSON_VALUE)
    ResponseEntity<IngredientInRecipe> deleteIngredientFromRecipe(@PathVariable(value = "recipeId") final int recipeId,
                                                                  @RequestParam int ingredientId) {
        IngredientInRecipeKey id = new IngredientInRecipeKey(recipeId, ingredientId);
        if (!ingredientInRecipeRepository.existsById(id)) {
            return new ResponseEntity<>(HttpStatus.OK);
        }
        IngredientInRecipe ingredientInRecipe = ingredientInRecipeRepository.findIngredientInRecipeById(id);
        int amountId = ingredientInRecipe.getAmount().getId();
        ingredientInRecipeRepository.deleteIngredientFromRecipe(ingredientId, recipeId);
        logger.warn("id: " + ingredientInRecipe.getAmount().getId());
        amountRepository.deleteById(amountId);
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
