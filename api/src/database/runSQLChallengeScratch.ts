import { makeDb } from '../database';
import {readFile} from "node:fs/promises";
import dotenv from 'dotenv';


(async () => {
    dotenv.config();
    const db = makeDb();

    const sql = await readFile('./src/database/scripts/sql_challenge_scratch.sql', { encoding: 'utf8' })

    const { rows } = await db.raw(sql)

    console.log(rows);

})();
