package com.example.cookingapp.model;

public enum Unit {
    G("g"),
    DAG("dag"),
    KG("kg"),
    ML("ml"),
    l("l");

    public String amountType;

    Unit(final String amountType) {
        this.amountType = amountType;
    }

    @Override
    public String toString() {
        return amountType;
    }
}
