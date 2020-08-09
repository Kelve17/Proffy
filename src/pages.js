const Database = require("./database/db")
const { subjects, weekdays, convertTimetoMinutes } = require("./utils/format")
const e = require("express")
const addTeacher = require("./database/addTeacher")

function landingPage(req, res) {
    return res.render("index.html")
}

async function studyPage(req, res) {
    const filters = req.query

    if (!filters.subject || !filters.weekday || !filters.time) {
        return res.render("study.html", { filters, subjects, weekdays })
    }

    const timeToMinutes = convertTimetoMinutes(filters.time)
    const query =
        `
        SELECT name, avatar, cost, subject, bio
        FROM TEACHERS, CLASSES, SCHEDULES
        WHERE TEACHERS.teacher_id = CLASSES.teacher_id
        AND CLASSES.class_id = SCHEDULES.class_id
        AND SCHEDULES.time_from <= ${timeToMinutes}
        AND SCHEDULES.time_to > ${timeToMinutes}
        AND SCHEDULES.weekday = ${filters.weekday}
        AND CLASSES.subject = ${filters.subject}
    `
    try {
        const db = await Database
        const teachers = await db.all(query)
        teachers.map((teacher) => {
            teacher.subject = subjects[teacher.subject]
        }
        )
        return res.render("study.html", { teachers, filters, subjects, weekdays })
    } catch (err) {
        console.log(err)

    }

}

function teachPage(req, res) {
    return res.render("teach.html", { subjects, weekdays })
}

async function addTeacherPage(req, res) {
    const newTeacher = require("./database/addTeacher")

    const teacherData = {
        name: req.body.name,
        avatar: req.body.avatar,
        whatsapp: req.body.whatsapp,
        bio: req.body.bio
    }

    const classData = {
        subject: req.body.subject,
        cost: req.body.cost
    }

    const schedulesData = req.body.weekday.map((weekday, index) => {
        return {
            weekday,
            time_from: convertTimetoMinutes(req.body.time_from[index]),
            time_to: convertTimetoMinutes(req.body.time_to[index])
        }
    })

    try {
        const db = await Database
        await newTeacher(db, { teacherData, classData, schedulesData })
        let queryString = "?subject=" + req.body.subject
        queryString += "&weekday=" + req.body.weekday[0]
        queryString += "&time=" + req.body.time_from[0]
        return res.redirect("/study" + queryString)
    }
    catch (error) {
        console.log(error)
    }
}

module.exports = {
    landingPage,
    studyPage,
    teachPage,
    addTeacherPage
}