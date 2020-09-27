package com.example.cookingapp.model;

import javax.persistence.*;
import javax.validation.constraints.NotBlank;
import java.util.Set;

@Entity
public class Recipe {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int id;
    @NotBlank(message = "Recipe`s name must be not empty!")
    private String name;
    @OneToMany(mappedBy = "recipe", cascade = CascadeType.ALL, orphanRemoval = true)
    private Set<IngredientInRecipe> amount;
    @Column(length = 1000)
    private String preparation;

    public Recipe() {
    }

    public Recipe(final int id, @NotBlank(message = "Recipe`s name must be not empty!") final String name, final Set<IngredientInRecipe> amount, final String preparation) {
        this.id = id;
        this.name = name;
        this.amount = amount;
        this.preparation = preparation;
    }

    public int getId() {
        return id;
    }

    public void setId(final int id) {
        this.id = id;
    }

    public String getName() {
        return name;
    }

    public void setName(final String name) {
        this.name = name;
    }

    Set<IngredientInRecipe> getAmount() {
        return amount;
    }

    public void setAmount(final Set<IngredientInRecipe> amount) {
        this.amount = amount;
    }

    public String getPreparation() {
        return preparation;
    }

    public void setPreparation(final String preparation) {
        this.preparation = preparation;
    }
}
