package com.example.cookingapp.repositories;

import com.example.cookingapp.model.IngredientInRecipe;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface IngredientInRecipeRepository extends JpaRepository<IngredientInRecipe, Integer> {

}
