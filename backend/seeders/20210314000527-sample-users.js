'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    /**
     * Add seed commands here.
     *
     * Example:
     * await queryInterface.bulkInsert('People', [{
     *   name: 'John Doe',
     *   isBetaMember: false
     * }], {});
    */
   return await queryInterface.bulkInsert(
     "Users",
     [
       {
         username: "Dylan",
         email: "dh@gmail.com",
         createdAt: new Date(),
         updatedAt: new Date(),
       },
       {
        username: "Dylan2",
        email: "dh2@gmail.com",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        username: "Dylan3",
        email: "dh3@gmail.com",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
     ],
     {}
   );
  },

  down: async (queryInterface, Sequelize) => {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
    return await queryInterface.bulkDelete("Users", null, {});
  }
};
