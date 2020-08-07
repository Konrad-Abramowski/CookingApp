package com.example.cookingapp.model;

import javax.persistence.*;
import javax.validation.constraints.NotBlank;

public class Recipe {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int id;
    @NotBlank(message = "Recipe`s name must be not empty!")
    private String name;


}
