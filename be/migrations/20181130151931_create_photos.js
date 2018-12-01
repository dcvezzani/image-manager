
exports.up = function(knex, Promise) {
    return knex.schema.createTable('photos', function(t) {
        t.increments('id').unsigned().primary();
        t.dateTime('createdAt').notNull().defaultTo(knex.fn.now());
        t.dateTime('updatedAt').notNull().defaultTo(knex.fn.now());
        t.dateTime('deletedAt').nullable();

        t.string('name').notNull();
        t.string('location').notNull();
        t.text('description').nullable();
        // t.enum('category', ['apparel', 'electronics', 'furniture']).notNull();
    });
};

exports.down = function(knex, Promise) {
    return knex.schema.dropTable('photos');
  
};
