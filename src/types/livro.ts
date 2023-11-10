
type livro = {
    id : number;
    titulo : string;
    subtitulo : string;
    codigo : string;
    livroCategoria : Object;
    fotoCapa : {dropboxLinkView : string}
    editora : string;
    autor : string;
    sinopse : string;
    usuarioCadastro : string;
    usuarioUltimaAlteracao : string;
    dataUltimaAlteracao : string;
    livroCategoriaId : number;
    anoEdicao : number
}

export default livro