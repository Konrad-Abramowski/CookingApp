package com.example.cookingapp.model;

import javax.persistence.*;
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
    @ManyToOne
    @MapsId("amount_id")
    @JoinColumn(name = "amount_id")
    private Amount amount;

    public IngredientInRecipe() {
    }

    public IngredientInRecipe(final IngredientInRecipeKey id, final Recipe recipe, final Ingredient ingredient, final Amount amount) {
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

    public Amount getAmount() {
        return amount;
    }

    public void setAmount(final Amount amount) {
        this.amount = amount;
    }
}

