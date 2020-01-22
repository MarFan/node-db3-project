const db = require('../data/db-config')

module.exports = {
    find,
    findById,
    findSteps,
    add,
    update,
    remove
}

function find() {
    return db("schemes");
}

function findById(id) {
    return db("schemes").where({ id });
}

function findSteps(id) {
    return db("steps")
            .where('scheme_id',  id )
            .join('schemes', 'steps.scheme_id', 'schemes.id')
            .select('steps.id', 'scheme_name', 'instructions', 'step_number')
            .orderBy('step_number');
}

function add(data) {
    return db("schemes")
            .insert(data)
            .then(([ id ]) => {return findById(id)})
}

function update(changes, id) {
    return db('schemes')
            .where({ id })
            .update(changes, '*')
            .then(up => {return findById(id)})
}

function remove(id) {
    return db('schemes').where({ id }).del();
}