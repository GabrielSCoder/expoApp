export const criarTabelaLivro = (db) => {

  try {
    const query = `
      CREATE TABLE IF NOT EXISTS livro (
        livro_id INTEGER PRIMARY KEY NOT NULL ,
        livro_titulo TEXT DEFAULT NULL,
        livro_subtitulo TEXT DEFAULT NULL,
        livro_fotoCapa TEXT DEFAULT NULL,
        livro_editora TEXT DEFAULT NULL,
        livro_autor TEXT DEFAULT NULL,
        livro_sinopse TEXT DEFAULT NULL,
        livro_ano TEXT DEFAULT NULL
      )
    `;
  
    db.transaction((tx) => {
      tx.executeSql(query, [], (_, result) => {
        console.log('Tabela "livro" criada com sucesso');
      },
      (_, error) => {
        console.error('Erro ao criar a tabela "livro":', error);
      });
    });
  } catch (error) {
    console.log(error)
  }

}