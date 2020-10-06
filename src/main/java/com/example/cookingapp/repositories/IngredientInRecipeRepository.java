package com.example.cookingapp.repositories;

import com.example.cookingapp.model.IngredientInRecipe;
import com.example.cookingapp.model.IngredientInRecipeKey;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.Map;


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

    @Query(nativeQuery = true, value = "select R.NAME as recipe_name, R.PREPARATION as recipe_preparation, I.NAME as ingredient_name, A.NUMBER, A.UNIT, I.ID as ingredient_id\n" +
            " from INGREDIENT_IN_RECIPE as IIR\n" +
            "         inner join AMOUNT as A on A.ID = IIR.AMOUNT_ID\n" +
            "         inner join RECIPE as R on R.ID = IIR.RECIPE_ID\n" +
            "         inner join INGREDIENT as I on I.ID = IIR.INGREDIENT_ID\n" +
            " where IIR.RECIPE_ID = :recipe_id")
    List<Map<String, Object>> showRecipeInfo(@Param("recipe_id") int recipe_id);

    @Query(nativeQuery = true, value = "select  I.NAME as ingredient_name, A.NUMBER, A.UNIT\n" +
            " from INGREDIENT_IN_RECIPE as IIR\n" +
            "         inner join AMOUNT as A on A.ID = IIR.AMOUNT_ID\n" +
            "         inner join RECIPE as R on R.ID = IIR.RECIPE_ID\n" +
            "         inner join INGREDIENT as I on I.ID = IIR.INGREDIENT_ID\n" +
            " where IIR.RECIPE_ID = :recipe_id")
    List<Map<String, Object>> showRecipeIngredients(@Param("recipe_id") int recipe_id);

    @Transactional
    @Modifying
    @Query(nativeQuery = true, value = "delete from INGREDIENT_IN_RECIPE\n" +
            "where RECIPE_ID = :recipe_id and INGREDIENT_ID = :ingredient_id")
    void deleteIngredientFromRecipe(@Param("ingredient_id") int ingredient_id,
                                    @Param("recipe_id") int recipe_id);

    @Query(nativeQuery = true, value = "select distinct IIR.RECIPE_ID " +
            "from INGREDIENT_IN_RECIPE as IIR")
    List<Integer> findDistinctRecipeIds();

    @Query(nativeQuery = true, value = "select  IIR.INGREDIENT_ID " +
            "from INGREDIENT_IN_RECIPE as IIR " +
            "where RECIPE_ID = :recipeId")
    List<Integer> findIngredientIdsByRecipeId(@Param("recipeId") int recipeId);

}
