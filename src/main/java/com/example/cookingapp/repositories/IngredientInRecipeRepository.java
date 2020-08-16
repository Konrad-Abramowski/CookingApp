package com.example.cookingapp.repositories;

import com.example.cookingapp.model.IngredientInRecipe;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;
import org.springframework.transaction.annotation.Transactional;


@Repository
public interface IngredientInRecipeRepository extends JpaRepository<IngredientInRecipe, Integer> {

    @Transactional
    @Modifying
    @Query(nativeQuery = true, value = "insert into INGREDIENT_IN_RECIPE(INGREDIENT_ID, RECIPE_ID, AMOUNT_ID) " +
            "values (:ingredient_id, :recipe_id, :amount_id)")
    int addIngredientToRecipe(@Param("ingredient_id") int ingredient_id,
                                          @Param("recipe_id") int recipe_id,
                                          @Param("amount_id") int amount);


}
