const connection = require('../database/connection')

module.exports = {
    async create(request, response) {
        try {
            const { id } = request.body;

            const ong = await connection('ongs')
                .where('id', id)
                .select("name")
                .first()

            if (!ong) return response.status(400).send({ error: 'Ong not found!' });

            return response.send(ong)
        } catch (err) {
            console.log(err);
            return response.status(500).send(err.message)
        }
    }
}