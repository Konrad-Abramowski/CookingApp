package com.example.cookingapp.repositories;

import com.example.cookingapp.model.Ingredient;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface IngredientRepository extends JpaRepository<Ingredient, Integer>{

    @Override
    Optional<Ingredient> findById( Integer integer);
}
