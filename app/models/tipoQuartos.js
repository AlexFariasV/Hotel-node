var pool = require("../../config/pool_conexoes");

const tipoQuartosModel = {
    findAll: async () => {
        try {
            const [linhas] = await pool.query('SELECT * FROM tipo_quartos WHERE status_quarto = 1')
            return linhas;
        } catch (error) {
            return error;
        }
    },


};
    

module.exports = tipoQuartosModel