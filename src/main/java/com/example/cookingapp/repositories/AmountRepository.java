package com.example.cookingapp.repositories;

import com.example.cookingapp.model.Amount;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface AmountRepository extends JpaRepository<Amount, Integer> {
}
