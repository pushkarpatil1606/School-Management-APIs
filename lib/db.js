import mysql from 'mysql2/promise';

function parseDatabaseUrl(databaseUrl) {
  const url = new URL(databaseUrl);
  return {
    host: url.hostname,
    port: url.port ? Number(url.port) : 3306,
    user: decodeURIComponent(url.username),
    password: decodeURIComponent(url.password),
    database: url.pathname.replace(/^\//, ''),
    waitForConnections: true,
    connectionLimit: 10,
    queueLimit: 0
  };
}

function createPool() {
  const { DATABASE_URL, MYSQLHOST, MYSQLPORT, MYSQLUSER, MYSQLPASSWORD, MYSQLDATABASE } = process.env;

  if (DATABASE_URL) {
    return mysql.createPool(parseDatabaseUrl(DATABASE_URL));
  }

  if (!MYSQLHOST || !MYSQLUSER || !MYSQLDATABASE) {
    throw new Error(
      'Database connection details are missing.'
    );
  }

  return mysql.createPool({
    host: MYSQLHOST,
    port: MYSQLPORT ? Number(MYSQLPORT) : 3306,
    user: MYSQLUSER,
    password: MYSQLPASSWORD || '',
    database: MYSQLDATABASE,
    waitForConnections: true,
    connectionLimit: 10,
    queueLimit: 0
  });
}

const globalForMySql = globalThis;

const pool = globalForMySql.__schoolMysqlPool || createPool();

if (process.env.NODE_ENV !== 'production') {
  globalForMySql.__schoolMysqlPool = pool;
}

export default pool;
