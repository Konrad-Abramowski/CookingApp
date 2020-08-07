package com.example.cookingapp.model;

import javax.persistence.*;
import javax.validation.constraints.NotBlank;

public class Ingredient {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int id;
    @NotBlank(message = "Ingredient`s name must be not empty!")
    private String name;



}
