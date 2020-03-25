const connection = require('../database/connection')

module.exports = {
    async index(request, response) {
        try {
            const ong_id = request.headers.authorization

            if(!ong_id) return response.status(404).send({error: 'Ong is required'})

            const incidents = await connection('incidents')
                .where('ong_id', ong_id)
                .select("*")

            return response.send(incidents)
        } catch (err) {
            console.error(err);
            return response.status(500).send(err.message)
        }
    }
}