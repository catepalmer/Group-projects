
exports.seed = function(knex, Promise) {
  // Deletes ALL existing entries
  return knex('scenes').del()
    .then(function () {
      // Inserts seed entries
      return knex('scenes').insert([
        {id: 1, title: 'title 1', text: 'This is scene 1', next: 2, image: 'https://images-na.ssl-images-amazon.com/images/I/91pzkLOWEoL._SX355_.jpg'},
        {id: 2, title: 'title 2', text: 'This is scene 2', next: 3, image: 'https://images-na.ssl-images-amazon.com/images/I/81YZDy5lXzL._SL1500_.jpg'},
        {id: 3, title: 'title 3', text: 'This is scene 3', next: 1, image: 'https://www.newdinosaurs.com/wp-content/uploads/2016/01/28_stegosaurus_karen_carr.jpg'}
      ]);
    });
};
