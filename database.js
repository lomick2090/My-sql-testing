import mysql from 'mysql2';
import dotenv from 'dotenv';
dotenv.config();

const pool = mysql.createPool({
    host: process.env.MYSQL_HOST,
    user: process.env.MYSQL_USER,
    password: process.env.MYSQL_PASSWORD,
    database:process.env.MYSQL_DATABASE,
}).promise();


async function getNotes() {
    const result = await pool.query('SELECT * from note');
    const rows = result[0]

    return rows
}

async function getNoteByTitle(title) {
    const [rows] = await pool.query(`
        SELECT *
        FROM note
        WHERE title = ?
    `, [title] )

    return rows
}

async function createNote(title, description) {
    const [result] = await pool.query(`
    INSERT INTO note (title, description)
    VALUES (?, ?)
    `, [title, description])
}

const notes = await getNotes();
const note = await getNoteByTitle('to-do')

//console.log(notes)

console.log(note)