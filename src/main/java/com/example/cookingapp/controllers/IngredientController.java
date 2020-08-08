package com.example.cookingapp.controllers;

import com.example.cookingapp.model.Ingredient;
import com.example.cookingapp.repositories.IngredientRepository;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;
import java.net.URI;

@Controller
@RequestMapping(name = "/ingredients")
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

}
