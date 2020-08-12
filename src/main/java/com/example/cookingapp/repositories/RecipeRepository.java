package com.example.cookingapp.repositories;

import com.example.cookingapp.model.Recipe;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface RecipeRepository extends JpaRepository<Recipe, Integer> {

    @Override
    Optional<Recipe> findById(Integer integer);
}
