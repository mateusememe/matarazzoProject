const mysql = require('mysql2/promise');

module.exports = new
    class Database {
        constructor() {
            this.err = "";
        }

        async conecta() {
            const config = {
                host: "localhost",
                user: "root",
                password: "123698741",
                database: "pi3"
                /* host: "den1.mysql1.gear.host",
                user: "trabpi3",
                password: "Me4XYM1?1_Jr",
                database: "trabpi3" */
            }
            try {
                this.connection = await new mysql.createConnection(config);
                return true;
            }
            catch (ex) {
                return false;
            }
        }
        //para SELECT
        async consulta(sql, values) {
            try {
                const [rows, fields] = await this.connection.execute(sql, values);
                return {
                    status: true,
                    data: rows
                }
            }
            catch (ex) {
                return {
                    status: false,
                    err: ex.code,
                    message: ex.message,
                    data: []
                };
            }
        }//fim do método consulta
        //para insert, update e delete
        async manipula(sql, values) {
            try {
                const [rows, fields] = await this.connection.execute(sql, values);
                if (rows.affectedRows > 0) //qtde de linhas afetadas
                    return {
                        status: true,
                        lastId: rows.insertId
                        //data: rows
                    }
                return {
                    status: false,
                    err: "NOT_ROWS"
                };
            }
            catch (ex) {
                return {
                    status: false,
                    err: ex.code,
                    message: ex.message
                }
            }
        }
    }