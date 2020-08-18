package com.example.cookingapp.repositories;

import com.example.cookingapp.model.IngredientInRecipe;
import com.example.cookingapp.model.IngredientInRecipeKey;
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


    boolean existsById(IngredientInRecipeKey id);

    IngredientInRecipe findIngredientInRecipeById(IngredientInRecipeKey id);

    @Query(nativeQuery = true, value = "select  I.NAME, A.NUMBER, A.TYPE" +
            "from INGREDIENT_IN_RECIPE as IIR" +
            "inner join AMOUNT A on A.ID = IIR.AMOUNT_ID" +
            "inner join RECIPE R on R.ID = IIR.RECIPE_ID" +
            "inner join INGREDIENT I on IIR.INGREDIENT_ID = I.ID" +
            "where RECIPE_ID = :recipe_id")
    void showRecipeInfo(@Param("recipe_id") int recipe_id);

    @Transactional
    @Modifying
    @Query(nativeQuery = true, value = "delete from INGREDIENT_IN_RECIPE\n" +
            "where RECIPE_ID = :recipe_id and INGREDIENT_ID = :ingredient_id")
    void deleteIngredientFromRecipe(@Param("ingredient_id") int ingredient_id,
                                    @Param("recipe_id") int recipe_id);

}
