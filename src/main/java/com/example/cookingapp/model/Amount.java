package com.example.cookingapp.model;

import javax.persistence.*;
import javax.validation.constraints.NotNull;

@Entity
public class Amount {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int id;
    private AmountType type;
    @NotNull
    private int number;

    public Amount() {
    }

    public Amount(final int id, final AmountType type, @NotNull final int number) {
        this.id = id;
        this.type = type;
        this.number = number;
    }

    public int getId() {
        return id;
    }

    public void setId(final int id) {
        this.id = id;
    }

    public AmountType getType() {
        return type;
    }

    public void setType(final AmountType amountType) {
        this.type = amountType;
    }

    public int getNumber() {
        return number;
    }

    public void setNumber(final int number) {
        this.number = number;
    }
}
