/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function(knex) {
    return knex.schema.createTable('comment', table => {
        table.string('commentId').notNullable().unique();
        table.string('memoId').notNullable();
        table.string('userId').notNullable();
        table.text('comment').notNullable();
        table.string('writerName');
    })
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function(knex) {
    return knex.schema.dropTable('comment');
};
