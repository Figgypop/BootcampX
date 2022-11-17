const { Pool } = require('pg');
const [cohort] = process.argv.slice(2)

const pool = new Pool({
  user: 'labber',
  password: 'labber',
  host: 'localhost',
  database: 'bootcampx'
});
console.log('cohort:', typeof cohort)
const sql = `SELECT DISTINCT teachers.name as teacher, cohorts.name as cohort_name
FROM teachers
JOIN assistance_requests ON teacher_id = teachers.id
JOIN students ON student_id = students.id
JOIN cohorts ON cohort_id = cohorts.id
WHERE cohorts.name LIKE '%${cohort || 'JUL02'}%'
ORDER BY teacher`

pool.query(sql)
.then(res => {
  console.log(res.rows.length)
  res.rows.forEach(row => {
    console.log(`${row.cohort_name}: ${row.teacher}`);
  })
})
.catch(err => console.error('query error', err.stack));