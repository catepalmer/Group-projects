
exports.seed = function(knex, Promise) {
  // Deletes ALL existing entries
  return knex('choices').del()
    .then(function () {
      // Inserts seed entries
      return knex('choices').insert([
        {scene_id: 1, choice_id: 1, text: 'This is your first choice', points: 8, consequences: 'Some awesome shit happens to you'},
        {scene_id: 1, choice_id: 2, text: 'This is your second choice', points: 5, consequences: 'Some meh shit happens to you'},
        {scene_id: 1, choice_id: 3, text: 'This is your third choice', points: 2, consequences: 'Some terrible shit happens to you'}
      ]);
    });
};
