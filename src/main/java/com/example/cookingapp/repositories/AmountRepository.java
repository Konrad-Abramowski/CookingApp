package com.example.cookingapp.repositories;

import com.example.cookingapp.model.Amount;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;
import org.springframework.transaction.annotation.Transactional;

@Repository
public interface AmountRepository extends JpaRepository<Amount, Integer> {

    @Override
    @Transactional
    @Modifying
    @Query(nativeQuery = true, value = "delete from AMOUNT " +
            "where AMOUNT.ID = :id")
    void deleteById(Integer id);
}
