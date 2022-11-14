SELECT name, id, cohort_id
FROM students
WHERE end_date IS NULL
ORDER BY cohort_id;

/*
Weird (END) message at the end that i had to exit
*/