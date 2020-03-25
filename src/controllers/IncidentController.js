const connection = require('../database/connection')

module.exports = {
    async create(request, response) {
        try {
            const { title, description, value } = request.body;
            const ong_id = request.headers.authorization

            const [id] = await connection('incidents').insert({ title, description, value, ong_id });
            return response.send({ id })
        } catch (err) {
            console.error(err);
            return response.send(err.message)
        }

    },

    async index(request, response) {
        const { page = 1 } = request.query;
        try {
            const [count] = await connection('incidents').count();

            const incidents = await connection('incidents')
                .join('ongs', 'ongs.id', '=', 'incidents.ong_id')
                .limit(5)
                .offset((page - 1) * 5)
                .select([
                    'incidents.*',
                    'ongs.name',
                    'ongs.email',
                    'ongs.whatsapp',
                    'ongs.city',
                    'ongs.uf'
                ])

            response.header('X-Total-Count', count['count(*)'])
            response.header('X-Total-Pages', count['count(*)'] / 5)
            return response.send(incidents)
        } catch (err) {
            console.error(err);
            return response.send(err.message)
        }
    },

    async destroy(request, response) {
        try {
            const { id } = request.params
            const ong_id = request.headers.authorization

            const incident = await connection('incidents')
                .where('id', id)
                .select('ong_id')
                .first();

            if (incident.ong_id !== ong_id) return response.status(401).send({ error: 'Not Allowed' })

            await connection('incidents').where('id', id).delete();

            return response.status(204).send()
        } catch (err) {
            console.error(err)
            return response.status(500).send(err.message)
        }
    }
}