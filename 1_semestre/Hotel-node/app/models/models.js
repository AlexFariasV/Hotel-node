var pool = require("../../config/pool_conexoes");

const tarefasModel = {
    findAll: async () => {
        try {
            const [linhas] = await pool.query('INSET INTO ususario ( nome_ususario  ) ',  [data.senha])  
            return linhas;

        } catch (error) {
            return error;
        }
    },
  
};
