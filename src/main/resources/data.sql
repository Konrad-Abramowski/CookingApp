insert into INGREDIENT(NAME)
values ('Bacon'),
       ('Egg'),
       ('Milk'),
       ('Butter'),
       ('Ground beef'),
       ('Olive oil'),
       ('Onion'),
       ('Garlic'),
       ('Spaghetti pasta'),
       ('Parmesan cheese'),
       ('Tomato passata');

insert into RECIPE(NAME, PREPARATION)
values ('Scrambled Eggs With Bacon',
        'Cook bacon according to directions on package. Once cooked break each piece of bacon up into small pieces.
        Crack open eggs in small bowl.
        Add milk, salt, dash of pepper and bacon into bowl. Mix together until eggs are beaten.
        Melt butter in skillet on medium heat. Ad egg mixture.
        Once egg mixture seems to have set (about 4 minutes), break up with spatula to scramble and flip. Continue cooking and scrambling until eggs are fully cooked and no longer runny.
        Serve hot on plate.'),
       ('Hard Boiled Eggs',
        'Place eggs in a medium pot and cover with cold water by 1 inch. Bring to a boil, then cover the pot and turn the heat off. Let the eggs cook for 9 to 12 minutes, depending on your desired done-ness.
Transfer the eggs to a bowl of ice water and chill for 14 minutes. This makes the eggs easier to peel. Peel and enjoy!'),
        ('Spaghetti bolognese',
         'Cook spaghetti according to package directions. Meanwhile, heat oil in large skillet over medium-high heat. Add onion and garlic; cook 5 minutes or until onion is tender, stirring frequently. Add beef, cook 7 minutes or until beef is crumbled and no longer pink, stirring occasionally. Drain. Add tomato passata to skillet; stir together. Simmer covered over medium-low heat 10 minutes or until hot. Drain spaghetti. Serve meat sauce with spaghetti. Sprinkle with cheese, if desired.');

insert into AMOUNT(ID, NUMBER, UNIT)
values (1, 30, 'G'),
       (2, 150, 'G'),
       (3, 15, 'ML'),
       (4, 10, 'G'),
       (5, 25, 'G'),
       (6, 200, 'G'),
       (7, 10, 'ML'),
       (8, 80, 'G'),
       (9, 5, 'G'),
       (10, 200, 'G'),
       (11, 2, 'DAG'),
       (12, 350, 'G');

insert into INGREDIENT_IN_RECIPE (INGREDIENT_ID, RECIPE_ID, AMOUNT_ID)
values (1, 1, 1),
       (2, 1, 2),
       (3, 1, 3),
       (4, 1, 4),
       (2, 2, 5),
       (5, 3, 6),
       (6, 3, 7),
       (7, 3, 8),
       (8, 3, 9),
       (9, 3, 10),
       (10, 3, 11),
       (11, 3, 12);
