module.exports = async function (db, { teacherData, classData, schedulesData }) {
    //insert data on teachers table
    const insertedTeacher = await db.run(`
        INSERT INTO TEACHERS(
            name,
            avatar,
            whatsapp,
            bio
        ) VALUES(
            "${teacherData.name}",
            "${teacherData.avatar}",
            "${teacherData.whatsapp}",
            "${teacherData.bio}"
        );    
    `)

    //insert data on classes table
    const insertedClass = await db.run(`
            INSERT INTO CLASSES(
                subject,
                cost,
                teacher_id
            ) VALUES(
                "${classData.subject}",
                "${classData.cost}",
                "${insertedTeacher.lastID}"
            );
    `)

    //insert data on schedules table
    const insertedSchedules = schedulesData.map((schedule) => {
        return db.run(`
            INSERT INTO SCHEDULES(
                class_id,
                weekday,
                time_from,
                time_to
            ) VALUES(
                "${insertedClass.lastID}",
                "${schedule.weekday}",
                "${schedule.time_from}",
                "${schedule.time_to}"
            );
        `)
    });

    await Promise.all(insertedSchedules)

}