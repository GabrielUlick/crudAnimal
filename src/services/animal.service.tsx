import { Animal } from '../models/animal.model'
import {DatabaseConnection} from '../database/database-connection'

const table = "animal"
const db=DatabaseConnection.getConnection()

export default class AnimalService {


     static addData(param: Animal) {
        return new Promise((resolve, reject) =>db.transaction(
            tx => {
                tx.executeSql(`insert into ${table} (nome) 
                values (?)`, 
                [param.nome], 
                (_, { insertId, rows }) => {
                    console.log("id insert: " + insertId);
                    resolve(insertId)
                }), (sqlError: any) => {
                    console.log(sqlError);
                }}, (txError) => {
                console.log(txError);
            }));
    }

     static deleteById(id: number) {
        db.transaction(
            tx => {
                tx.executeSql(`delete from ${table} where id = ?;`, [id], (_, { rows }) => {
                }), (sqlError: any) => {
                    console.log(sqlError);
                }}, (txError) => {
                console.log(txError);
    
            });
    }


     static updateById(param: Animal) {
        return new Promise((resolve, reject) =>db.transaction(tx => {
                tx.executeSql(`update ${table} set nome = ? where id = ?;`, [param.nome,param.id], () => {
                }), (sqlError: any) => {
                    console.log(sqlError);
                }}, (txError) => {
                console.log(txError);
    
            }));
    }

     static findById(id: number) {
        return new Promise((resolve, reject) => db.transaction(tx => {
            tx.executeSql(`select * from ${table} where id=?`, [id], (_, { rows }) => {
                resolve(rows)
            }), (sqlError: any) => {
                console.log(sqlError);
            }}, (txError) => {
            console.log(txError);

        }));
    }

      static findAll() {
        return new Promise((resolve, reject) => db.transaction(tx => {
           // console.log("entrou no all" );
            tx.executeSql(`select * from ${table}`, [], (_, { rows }) => {
               // console.log("entrou no execute" );
                resolve(rows)
            }), (sqlError: any) => {
                console.log(sqlError);
            }}, (txError) => {
            console.log(txError);
        }))


    }


}