/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> } 
 */
exports.seed = async function (knex) {
  // Deletes ALL existing entries
  await knex('user_rights').del()
  await knex('user_rights').insert([
    { id: 1, user_id: 1, right_id: 1 },
    { id: 2, user_id: 2, right_id: 2 },

  ]);

  // Reset sequences in PostgreSQL to avoid primary key duplicate errors on subsequent inserts
  if (knex.client.config.client === 'postgresql' || knex.client.config.client === 'pg') {
    await knex.raw("SELECT setval('users_id_seq', COALESCE((SELECT MAX(id) FROM users), 1))");
    await knex.raw("SELECT setval('rights_id_seq', COALESCE((SELECT MAX(id) FROM rights), 1))");
    await knex.raw("SELECT setval('user_rights_id_seq', COALESCE((SELECT MAX(id) FROM user_rights), 1))");
  }
};