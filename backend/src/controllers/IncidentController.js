const connection = require('../database/connection');

module.exports = {
    async index(request, response) {
        
        const {page = 1} = request.query;

        const [count] = await connection('incidents').count();

        const incidents = await connection('incidents')
        .join('ongs', 'ongs.id', '=', 'incidents.ong_id')
        .limit(5)
        .offset((page -1) * 5)
        .select(['incidents.*', 
        'ongs.nome', 
        'ongs.email',
        'ongs.whatsapp',
        'ongs.city',
        'ongs.uf'
    ]);

    
        return response.header('X-Total-Count', count['count(*)']).json(incidents);
    },
    async create(request, response) {
        const {titulo, descricao, valor} = request.body;

        const ong_id = request.headers['auth-token'];
        

        const [id] = await connection('incidents').insert({
            titulo, descricao, valor, ong_id
        });

        return response.json({id});
    },
    async delete(request, response) {
        
        const { id } = request.params;
        
        const ong_id = request.headers['auth-token'];

        

        const incident = await connection('incidents')
        .where('id', parseInt(id))
        .select('ong_id')
        .first();

        if (!incident) {
            return response.status('404').json({error: 'Incidente não encontrado'});
        } else if (incident.ong_id != ong_id) {
            return response.status('401').json({error: 'Operação não autorizada'});
        }

        await connection('incidents').where('id', id).delete();

        return response.status('204').send();
    }
}