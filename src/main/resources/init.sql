create table amount (id integer generated by default as identity, number integer not null, unit varchar(255), primary key (id));
create table ingredient (id integer generated by default as identity, name varchar(255), primary key (id));
create table ingredient_in_recipe (ingredient_id integer not null, recipe_id integer not null, amount_id integer not null, primary key (ingredient_id, recipe_id));
create table recipe (id integer generated by default as identity, name varchar(255), preparation varchar(1000), primary key (id));
alter table ingredient_in_recipe add constraint FKgmy1593eusrk3tnmni7aiim2s foreign key (amount_id) references amount;
alter table ingredient_in_recipe add constraint FKejjhy5r5c0r3ch8rhenjcsmf2 foreign key (ingredient_id) references ingredient;
alter table ingredient_in_recipe add constraint FKhnthpqo9kxhkjc52x2hrgrr38 foreign key (recipe_id) references recipe;
