package com.example.cookingapp.model;

import javax.persistence.*;
import javax.validation.constraints.NotNull;

@Entity
public class Amount {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int id;
    @Enumerated(EnumType.STRING)
    private Unit unit;
    @NotNull
    private int number;

    public Amount() {
    }

    public Amount(final Unit unit, @NotNull final int number) {
        this.unit = unit;
        this.number = number;
    }

    public Amount(final int id, final Unit unit, @NotNull final int number) {
        this.id = id;
        this.unit = unit;
        this.number = number;
    }

    public int getId() {
        return id;
    }

    public void setId(final int id) {
        this.id = id;
    }

    public Unit getUnit() {
        return unit;
    }

    public void setUnit(final Unit unit) {
        this.unit = unit;
    }

    public int getNumber() {
        return number;
    }

    public void setNumber(final int number) {
        this.number = number;
    }
}
