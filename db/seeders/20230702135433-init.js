const bcrypt = require('bcrypt');

module.exports = {
    up: async(queryInterface) => {

      const adminUsername = "admin";
      const adminEmail = "admin@gmail.com";
      const adminPassword = "admin123!";

      const saltRounds = Number(process.env.SALT_ROUNDS);
      const adminPasswordHash = await bcrypt.hash(adminPassword, saltRounds);
      const createdAt = new Date().toISOString();
      const updatedAt = createdAt;

      const sql = `
        create extension if not exists "uuid-ossp";

        insert into public."roles" (
            "accessLevel",
            "title"
        ) values (
            1,
            'USER'
        ), (
            2,
            'MODERATOR'
        ), (
            3,
            'ADMIN'
        );

        insert into public."users" (
            "email",
            "username",
            "passwordHash",
            "roleId",
            "createdAt",
            "updatedAt"
        ) values (
            '${adminEmail}',
            '${adminUsername}',
            '${adminPasswordHash}',
            (SELECT "id" FROM public."roles" WHERE "title" = 'ADMIN'),
            '${createdAt}',
            '${updatedAt}'
        );
    `;
      queryInterface.sequelize.query(sql);
    },
    down: () => {},
};