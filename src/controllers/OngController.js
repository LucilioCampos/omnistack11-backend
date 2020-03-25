const crypto = require('crypto');
const connection = require('../database/connection')
module.exports = {
    async create(request, response) {
        try {
            const { name, email, whatsapp, city, uf } = request.body
            const id = crypto.randomBytes(4).toString('HEX')
    
            await connection('ongs').insert({ id, name, email, whatsapp, city, uf })
            return response.send({ id })
        } catch (err) {
            console.error(err)
            return response.send(err.message)
        }
    },

    async index(request, response) {
        try {
            const ongs = await connection('ongs').select("*")
            return response.send(ongs)
        } catch (err) {
            console.error(err);
            return response.send(err.message)
        }
    }
}