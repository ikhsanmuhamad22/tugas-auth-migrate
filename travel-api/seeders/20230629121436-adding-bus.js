'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {

    await queryInterface.bulkInsert('Buses', [
      {
      nama_bus: 'bus a',
      jadwal_keberangkatan: '12.00 am',
      harga: 'Rp 50.000'
      },
      {
      nama_bus: 'bus b',
      jadwal_keberangkatan: '11.00 am',
      harga: 'Rp 60.000'
      },
      {
      nama_bus: 'bus c',
      jadwal_keberangkatan: '9.00 am',
      harga: 'Rp 45.000'
      },
    ], {});

  },

  async down (queryInterface, Sequelize) {
    /**
     * Add commands to revert seed here.
     *
     * Example:
    */
     await queryInterface.bulkDelete('buses', null, {});
  }
};
