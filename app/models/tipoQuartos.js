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
    // Paginação 

    findPage: async (pagina, total) => {
        try {
            const [linhas] = await pool.query('SELECT * FROM tipo_quartos WHERE status_quarto = 1 limit ?, ?', [pagina, total])
            return linhas;
        } catch (error) {
            return error;
        }
    },

    totalReg: async () => {
        try {
            const [linhas] = await pool.query('SELECT count(*) total FROM tipo_quartos  WHERE status_quarto = 1')
            return linhas;
        } catch (error) {
            return error;
        }
    },


};


module.exports = tipoQuartosModel