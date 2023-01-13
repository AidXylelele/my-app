const pool = require('../db/pool');

const sql = {
  all: ({ page, count }) => `SELECT * from users
          ORDER By id
          OFFSET ${count * (page - 1)} ROWS
          FETCH NEXT ${count} ROWS ONLY;`,
  count: () => 'SELECT COUNT(id) FROM users;',
  create: (id, { email, name, surname, password }) => `
    INSERT INTO users(
	id, email, name, surname, status, skills, password) VALUES (
	 '${id}', '${email}', '${name}', '${surname}', '', '', '${password}');
   SELECT * from users WHERE id = '${id}';
    `,
  find: (key, data) => `
     SELECT * FROM users WHERE ${key} = '${data[key]}'`,
  update: (id, queryPart) =>
    `UPDATE users SET ${queryPart} WHERE id = '${id}';`,
};

class UserModel {
  static async getUsers(query) {
    try {
      const users = await pool.query(sql.all(query));
      const totalCount = await pool.query(sql.count());
      return {
        items: users.rows,
        totalCount: Number(totalCount.rows[0].count),
      };
    } catch (error) {
      return null;
    }
  }

  static async createNewUser(data, id) {
    try {
      const user = await pool.query(sql.create(id, data));
      return { id, ...user };
    } catch (error) {
      console.log(error);
      return null;
    }
  }

  static async findUser(data) {
    try {
      const [key] = Object.keys(data).filter(
        (item) => item === 'email' || item === 'token' || item === 'id'
      );
      if (key) {
        const result = await pool.query(sql.find(key, data));
        if (result.rows[0] !== []) {
          return { ...result.rows[0], photos: {} };
        }
      }
      return null;
    } catch (error) {
      console.log(error);
      return null;
    }
  }

  static async updateUser(id, queryPart, param) {
    try {
      await pool.query(sql.update(id, queryPart));
      return { param, resultCode: 0 };
    } catch (error) {
      return { messages: 'Something went wrong!', resultCode: 1 };
    }
  }
}

module.exports = UserModel;
