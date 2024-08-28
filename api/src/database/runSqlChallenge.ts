import { makeDb } from '../database';
import {readFile} from "node:fs/promises";
import dotenv from 'dotenv';


(async () => {
    dotenv.config();
    const db = makeDb();

    const sql = await readFile('./src/database/scripts/sql_challenge.sql', { encoding: 'utf8' })

    const { rows } = await db.raw(sql)

    console.log(' id\t\t| attendance_date\t| periods_missed\t');
    console.log('----------------|-----------------------|------------------');

    rows.forEach( (row: { id: Number; attendance_date: Date; periods_missed: Number; }) => {

        if (!(row.id && row.attendance_date && row.periods_missed)) {
            throw new Error('Your challenge query does not include columns: id (int), attendance_date (date), periods_missed (int)');
        }

        console.log(` ${row.id}\t\t| ${row.attendance_date.toISOString().split('T')[0]}\t\t| ${row.periods_missed}\t\t`);
    });

})();
