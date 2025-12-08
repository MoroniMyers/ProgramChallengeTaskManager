/* 
  Mission Three: Analyze student attendance.
  
  Strategy:
  - First filter out rows that don't meet the 500+ requirement.
  - Use the "id - row_number()" trick to assign a group ID to each
    run of consecutive ids.
  - Keep only groups that have at least 3 rows.
  - Return all rows from those qualifying groups.
*/


WITH filtered AS (
  SELECT
    id,
    attendance_date,
    periods_missed,
    -- This creates a "group id" for consecutive ids where periods_missed >= 500
    id - ROW_NUMBER() OVER (ORDER BY id) AS grp
  FROM attendance
  WHERE periods_missed >= 500
),
groups_with_three_or_more AS (
  SELECT
    grp
  FROM filtered
  GROUP BY grp
  -- Keep only groups with 3 or more entries
  HAVING COUNT(*) >= 3
)
SELECT
  f.id,
  f.attendance_date,
  f.periods_missed
FROM filtered f
-- Join back to get only rows from qualifying groups
JOIN groups_with_three_or_more g
  ON f.grp = g.grp
ORDER BY
  f.attendance_date ASC;