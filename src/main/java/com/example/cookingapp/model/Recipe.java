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
    @OneToMany(mappedBy = "recipe")
    private Set<IngredientInRecipe> amount;

    public Recipe() {
    }

    public Recipe(final int id, @NotBlank(message = "Recipe`s name must be not empty!") final String name) {
        this.id = id;
        this.name = name;
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
}
