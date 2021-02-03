const People = require('../models/people');
const {peopleSchema} = require('../schema/people');

const getPeopleAPI = async (req, res) => {
    const peopleList = await People.find();
    return res.send({
        peopleList
    })
}

const postPeopleAPI = async (req, res) => {
    const validRequest =  peopleSchema.validate(req.body);

    if (validRequest.error) {
        return res.send({
            isSuccess: false,
            message: 'Invalid data',
            error: validRequest.error.details[0].message
        })
    } 

    const { name } = req.body
    const foundPeople = await People.findOne({ name });
    if (foundPeople) {
        return res.status(400).send({
            isSuccess: false,
            message: `${name}, this name is already exist.`
        })
    }

    peopleSchema
        await People.create(req.body)
        return res.send({
            isSuccess: true,
            message: 'created'
        })
}

module.exports = {
    getPeopleAPI,
    postPeopleAPI
}