/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.seed = async function(knex) {
    // Deletes ALL existing entries
    await knex('attendance').del()

    const attendance = [
        {
            'attendance_date': '2024-01-01',
            'periods_missed': 456
        },
        {
            'attendance_date': '2024-01-02',
            'periods_missed': 585
        },
        {
            'attendance_date': '2024-01-03',
            'periods_missed': 664
        },
        {
            'attendance_date': '2024-01-04',
            'periods_missed': 215
        },
        {
            'attendance_date': '2024-01-05',
            'periods_missed': 549
        },
        {
            'attendance_date': '2024-01-06',
            'periods_missed': 599
        },
        {
            'attendance_date': '2024-01-07',
            'periods_missed': 641
        },
        {
            'attendance_date': '2024-01-09',
            'periods_missed': 596
        },

    ];

    await knex('attendance').insert(attendance);
};
