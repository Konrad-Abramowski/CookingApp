package com.example.cookingapp.model;

import javax.persistence.*;
import javax.validation.constraints.NotBlank;
import java.io.Serializable;


@Entity
public class IngredientInRecipe implements Serializable {
    @EmbeddedId
    private IngredientInRecipeKey id;
    @ManyToOne
    @MapsId("recipe_id")
    @JoinColumn(name = "recipe_id")
    private Recipe recipe;
    @ManyToOne
    @MapsId("ingredient_id")
    @JoinColumn(name = "ingredient_id")
    private Ingredient ingredient;
    @NotBlank(message = "Amount must be not empty!")
    private String amount;

    public IngredientInRecipe() {
    }

    public IngredientInRecipe(final IngredientInRecipeKey id, final Recipe recipe, final Ingredient ingredient, @NotBlank(message = "Amount must be not empty!") final String amount) {
        this.id = id;
        this.recipe = recipe;
        this.ingredient = ingredient;
        this.amount = amount;
    }

    public IngredientInRecipeKey getId() {
        return id;
    }

    public void setId(final IngredientInRecipeKey id) {
        this.id = id;
    }

    public Recipe getRecipe() {
        return recipe;
    }

    public void setRecipe(final Recipe recipe) {
        this.recipe = recipe;
    }

    public Ingredient getIngredient() {
        return ingredient;
    }

    public void setIngredient(final Ingredient ingredient) {
        this.ingredient = ingredient;
    }

    public String getAmount() {
        return amount;
    }

    public void setAmount(final String amount) {
        this.amount = amount;
    }
}

