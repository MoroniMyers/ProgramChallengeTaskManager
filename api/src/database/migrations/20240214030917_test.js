/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = async function(knex) {
  await knex.schema.createTable('tasks', (table) => {
    table.increments('tasks_id').primary();
    table.string('content');
    table.boolean('is_complete').default(false).notNullable();
  });

  await knex.schema.createTable('attendance', (table) => {
    table.increments('id').primary();
    table.date('attendance_date').notNullable();
    table.integer('periods_missed').default(0).notNullable();
  });

};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function(knex) {
  return knex.schema.dropTable('tasks').dropTable('attendance');
};
