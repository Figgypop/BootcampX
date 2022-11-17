const { Pool } = require('pg');
const cohort = process.argv[2];
const values = [`%${cohort}%`]

const pool = new Pool({
  user: 'labber',
  password: 'labber',
  host: 'localhost',
  database: 'bootcampx'
});

const sql = `SELECT DISTINCT teachers.name as teacher, cohorts.name as cohort_name
FROM teachers
JOIN assistance_requests ON teacher_id = teachers.id
JOIN students ON student_id = students.id
JOIN cohorts ON cohort_id = cohorts.id
WHERE cohorts.name LIKE $1
ORDER BY teacher`

pool.query(sql, values)
.then(res => {
  console.log(res.rows.length)
  res.rows.forEach(row => {
    console.log(`${row.cohort_name}: ${row.teacher}`);
  })
})
.catch(err => console.error('query error', err.stack));

pool.query(sql, values)