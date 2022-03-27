const internModel = require('../Models/internModel')
const collegeModel = require("../Models/collegeModel")
const mongoose = require("mongoose")
const ObjectId = mongoose.Types.ObjectId



const isValid = function (value) {
    if (typeof value === 'undefined' || value === null) return false
    if (typeof value === 'string' && value.trim().length === 0) return false
    return true;
}

const isValidObjectId = function (objectId) {
    return mongoose.Types.ObjectId.isValid(objectId)
}

const createIntern = async function (req, res) {
    try {
        let data = req.body

        let { name, email, mobile, collegeId } = data

        if (Object.keys(data).length == 0) {
            res.status(400).send({ status: false, msg: "BAD REQUEST" })
            return
        }
        if (!isValid(name)) {
            res.status(400).send({ status: false, msg: "name is required" })
            return
        }
        if (!isValid(email)) {
            res.status(400).send({ status: false, msg: "email is required" })
            return
        }
        if (!(/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(email))) {
            res.status(400).send({ status: false, msg: "email is not a valid email" })
            return
        }
        if (!isValid(mobile)) {
            res.status(400).send({ status: false, msg: "mobile is required" })
            return
        }
        if (!(/^(\+91[\-\s]?)?[0]?(91)?[6789]\d{9}$/.test(mobile))) {
            res.status(400).send({ status: false, msg: "mobile is not a valid mobile" })
            return
        }
        if (!isValid(Name)) {
            res.status(400).send({ status: false, msg: "collegeName is required" })
            return
        }

        let isemailAlreadyUsed = await internModel.findOne({ email })
        if (isemailAlreadyUsed) {
            res.status(400).send({ status: false, msg: "this email is already used, please provide another email" })
            return
        }

        let isMobileAlreadyUsed = await internModel.findOne({ mobile })
        if (isMobileAlreadyUsed) {
            res.status(400).send({ status: false, msg: "mobile is already used, please provide another mobile" })
            return
        }

        let collegeDetails = await collegeModel.findOne({name: collegeNmae})
        if (!collegeDetails) {
            res.status(404).send({ status: false, msg: "details with this collegeNamenot exist" })
            return
        } 
        if (isDeleted = true) {
            let internToBeCreated = { name, email, mobile, collegeId: collegeDetails._id, isDeleted: false }
            let internCreated = await internModel.create(internToBeCreated)
            res.status(201).send({ status: true, msg: "intern created successfully", data: internCreated })
        } 
        else {
            let internToBeCreated = { name, email, mobile, collegeId: collegeDetails._id }
            let internCreated = await internModel.create(internToBeCreated)
            res.status(201).send({ status: true, data: internCreated })
        }
    }

 catch (error) {
        console.log(error)
        res.status(500).send({ msg: error.message })
    }
}

module.exports.createIntern = createIntern
