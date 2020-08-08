package com.example.cookingapp.model;

import javax.persistence.Column;
import javax.persistence.Embeddable;
import java.io.Serializable;

@Embeddable
public class IngredientInRecipeKey implements Serializable {
    @Column(name = "recipe_id")
    private int recipeId;
    @Column(name = "ingredient_id")
    private int ingredientId;

    public IngredientInRecipeKey() {
    }

    public IngredientInRecipeKey(final int recipeId, final int ingredientId) {
        this.recipeId = recipeId;
        this.ingredientId = ingredientId;
    }

    public int getRecipeId() {
        return recipeId;
    }

    public void setRecipeId(final int recipeId) {
        this.recipeId = recipeId;
    }

    public int getIngredientId() {
        return ingredientId;
    }

    public void setIngredientId(final int ingredientId) {
        this.ingredientId = ingredientId;
    }

    @Override
    public boolean equals(final Object o) {
        if (this == o) return true;
        if (o == null || getClass() != o.getClass()) return false;

        final IngredientInRecipeKey that = (IngredientInRecipeKey) o;

        if (recipeId != that.recipeId) return false;
        if (ingredientId != that.ingredientId) return false;

        return true;
    }

    @Override
    public int hashCode() {
        int result = recipeId;
        result = 31 * result + ingredientId;
        return result;
    }
}
