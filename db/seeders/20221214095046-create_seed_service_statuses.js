

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.bulkInsert("service_statuses", [
      {
        id: 1,
        name: "menunggu konfirmasi",
        del_status: false,
        created_at: new Date(),
        updated_at: new Date(),
      },
      {
        id: 2,
        name: "konfirmasi batal",
        del_status: false,
        created_at: new Date(),
        updated_at: new Date(),
      },
      {
        id: 3,
        name: "konfirmasi datang",
        del_status: false,
        created_at: new Date(),
        updated_at: new Date(),
      },
      {
        id: 4,
        name: "tidak datang",
        del_status: false,
        created_at: new Date(),
        updated_at: new Date(),
      },
      {
        id: 5,
        name: "datang",
        del_status: false,
        created_at: new Date(),
        updated_at: new Date(),
      }
    ], {});
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete("service_statuses", null, {});
  },
};
