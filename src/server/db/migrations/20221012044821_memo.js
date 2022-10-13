/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function(knex) {
  return knex.schema.createTable('memo', table => {
    table.increments();
    table.string('memoId').notNullable().unique();
    table.string('title').notNullable();
    table.text('memo').notNullable();
    table.string('userId').notNullable();
    table.string('writerName');
    table.timestamp('createDate');
    table.timestamp('updateDate');
  })
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function(knex) {
  return knex.schema.dropTable('memo');
};
