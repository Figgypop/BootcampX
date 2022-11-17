const { Pool } = require('pg');
const [cohort, limit] = process.argv.slice(2)

const pool = new Pool({
  user: 'labber',
  password: 'labber',
  host: 'localhost',
  database: 'bootcampx'
});

const sql = `SELECT students.id as student_id, cohorts.name as cohort_name, students.name as student_name 
FROM students JOIN cohorts ON cohorts.id = cohort_id 
WHERE cohorts.name LIKE '%${cohort}%'
LIMIT ${limit || 5}`

pool.query(sql)
.then(res => {
  res.rows.forEach(user => {
    console.log(`${user.student_name} has an id of ${user.student_id} and was in the ${user.cohort_name} cohort`);
  })
})
.catch(err => console.error('query error', err.stack));