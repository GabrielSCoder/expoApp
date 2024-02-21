export const inserirLivro = (db, livro) => {
  const { id, titulo, subtitulo, fotoCapa, editora, autor, sinopse, ano } = livro;

  const query = `
    INSERT INTO livro (livro_id, livro_titulo, livro_subtitulo, livro_fotoCapa, livro_editora,
       livro_autor, livro_sinopse, livro_ano)
    VALUES (?, ?, ?, ?, ?, ?, ?, ?)
  `;

  db.transaction((tx) => {
    tx.executeSql(query, [id, titulo, subtitulo, fotoCapa, editora, autor, sinopse, ano],
    (_, result) => {
      
      console.log('Livro inserido com sucesso');
    },
    (_, error) => {
      
      console.error('Erro ao inserir o livro:', error);
    });
  });
};
  
export const removerLivro = async (db, id) => {
    try {
      await db.transaction(async (tx) => {
        await tx.executeSql(
          'DELETE FROM exemplo WHERE id = ?',
          [id]
        );
      });
    } catch (error) {
      console.error(error);
    }
};

export const limparTabela = async (db, tabela) => {
  try {
    await db.transaction(async (tx) => {
      await tx.executeSql(
        'DELETE FROM livro', [],
        (_, result) => {
          console.log('Todas as linhas removidas')
        },
        (_, error) => {
          console.log(error)
        }
      )
    })
  } catch (error) {
    console.log(error)
  }
}

export const selectLivros = (db) => {
    return new Promise((resolve, reject) => {
      db.transaction((tx) => {
        tx.executeSql(
          'SELECT * FROM livro',
          [],
          (_, result) => {
            const rows = result.rows;
            const livros = [];
  
            for (let i = 0; i < rows.length; i++) {
              livros.push(rows.item(i));
            }
  
            resolve(livros);
          },
          (_, error) => {
            reject(error);
          }
        );
      });
    });
};
