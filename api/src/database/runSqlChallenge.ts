import { makeDb } from '../database';
import {readFile} from "node:fs/promises";
import {execSync, spawn} from 'child_process'
import nodemon from 'nodemon'
import dotenv from 'dotenv';


(async () => {
    dotenv.config();
    const db = makeDb();

    async function runExec(...cmd: Array<string>) {
        let p = spawn(cmd[0], cmd.slice(1), { shell:true });

        return new Promise((resolveFunc) => {
            p.stdout.on("data", (x) => {
                process.stdout.write(x.toString());
            });
            p.stderr.on("data", (x) => {
                process.stderr.write(x.toString());
            });
            p.on("exit", (code) => {
                resolveFunc(code);
            });
        });
    }

    if(process.argv.length === 3 && process.argv[2] == 'challenge') {
        await runExec("npm", "run", "seed:run", "--", "--specific=attendance_challenge.js")
    }

    const sql = await readFile('./src/database/scripts/sql_challenge.sql', { encoding: 'utf8' })

    const { rows } = await db.raw(sql)

    if (process.argv.length == 2) {
        console.log('Running Full Query and Returning as JSON');
        console.log(rows);
    }
    else if(process.argv.length === 3 && process.argv[2] == 'challenge') {


        console.log(' id\t\t| attendance_date\t| periods_missed\t');
        console.log('----------------|-----------------------|------------------');

        rows.forEach( (row: { id: Number; attendance_date: Date; periods_missed: Number; }) => {

            if (!(row.id && row.attendance_date && row.periods_missed)) {
                throw new Error('Your challenge query does not include columns: id (int), attendance_date (date), periods_missed (int)');
            }

            console.log(` ${row.id}\t\t| ${row.attendance_date.toISOString().split('T')[0]}\t\t| ${row.periods_missed}\t\t`);
        });
    }

    execSync(`npm run seed:run`);
    process.exit();
})();
