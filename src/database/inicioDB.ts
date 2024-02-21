import * as SQLite from 'expo-sqlite'

export const openDatabase = () => {
    const dbName = 'native-bd';
    return SQLite.openDatabase(dbName);
};