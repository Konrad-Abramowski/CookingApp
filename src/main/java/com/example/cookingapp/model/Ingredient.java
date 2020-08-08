package com.example.cookingapp.model;

import javax.persistence.*;
import javax.validation.constraints.NotBlank;
import java.util.Set;

@Entity
public class Ingredient {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int id;
    @NotBlank(message = "Ingredient`s name must be not empty!")
    private String name;
    @OneToMany(mappedBy = "ingredient")
    private Set<IngredientInRecipe> amount;

    public Ingredient() {
    }

    public Ingredient(final int id, @NotBlank(message = "Ingredient`s name must be not empty!") final String name) {
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
