package com.example.cookingapp.model;

public enum AmountType {
    G("g"),
    DAG("dag"),
    KG("kg"),
    ML("ml"),
    l("l");

    public String amountType;

    AmountType(final String amountType) {
        this.amountType = amountType;
    }

    @Override
    public String toString() {
        return amountType;
    }
}
