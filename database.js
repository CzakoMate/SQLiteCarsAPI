import sqlite3 from "sqlite3";
const db = new sqlite3.Database("./database.sqlite");
const initilaizeDB = async () => {
  await dbRun(
    "CREATE TABLE IF NOT EXISTS cars (id INTEGER PRIMARY KEY AUTOINCREMENT, brand TEXT, model TEXT, color TEXT, year INTEGER)"
  );
};
function dbQuerry(sql, params = []) {
  return new Promise((resolve, reject) => {
    db.all(sql, params, (err, rows) => {
      if (err) reject(err);
      else resolve(rows);
    });
  });
}
function dbRun(sql, params = []) {
  return new Promise((resolve, reject) => {
    db.run(sql, params, (err) => {
      if (err) reject(err);
      else resolve(this);
    });
  });
}
export { db, dbQuerry, dbRun, initilaizeDB };
