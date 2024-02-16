import { useState } from "react"

interface Filme {
    nome: string,
    anoDeLancamento: string,
    genero: string
}

export const Formulario: React.FunctionComponent = () => {

    const [filme, setFilme] = useState<Filme>({ nome: '', anoDeLancamento: '', genero: '' })
    const [filmes, setFilmes] = useState<Filme[]>([])
    const [erro, setErro] = useState<string>('');

    const formularioValido = filme.nome && filme.anoDeLancamento && filme.genero

    function adicionarFilme(evento: React.MouseEvent<HTMLButtonElement>) {
        if (filmes.some(f => f.nome === filme.nome)) {
            setErro('Não é possível adicionar, pois o filme já está na lista!')
            setTimeout(() => setErro(''), 3000);
            return
        }
        evento.preventDefault()
        setFilmes(filmesAtuais => [...filmesAtuais, filme])
    }

    return (
        <div>
            <form>
                <input
                    type='text'
                    placeholder='Insira o nome do filme'
                    value={filme.nome}
                    onChange={evento => setFilme({ ...filme, nome: evento.target.value })}
                />
                <input
                    type='text'
                    placeholder='Digite o ano de lançamento'
                    value={filme.anoDeLancamento}
                    onChange={evento => setFilme({ ...filme, anoDeLancamento: evento.target.value })}
                />
                <input
                    type='text'
                    placeholder='De qual gênero pertence esse filme'
                    value={filme.genero}
                    onChange={evento => setFilme({ ...filme, genero: evento.target.value })}
                />
                <button
                    type='button'
                    disabled={!formularioValido}
                    onClick={adicionarFilme}
                >
                    Adicionar
                </button>
            </form>
            <ul>
                {filmes.map((f, index) => (
                    <li key={index}>{`${f.nome}(${f.anoDeLancamento})`}</li>
                ))}
            </ul>
            {erro && <p>{erro}</p>}
        </div>
    )
}