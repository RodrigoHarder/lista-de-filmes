import { act, render, screen } from "@testing-library/react"
import { Formulario } from "./Formulario";
import userEvent from "@testing-library/user-event";

describe('no formulário', () => {
    //desabilitar o botão de adicionar se os campos não estiverem preenchidos
    test('se meus campos de input estiverem vazios, não é possível adicionar um filme à lista de favorito', () => {
        render(<Formulario />)

        const inputNome = screen.getByPlaceholderText('Insira o nome do filme')
        const inputAnoDeLancamento = screen.getByPlaceholderText('Digite o ano de lançamento')
        const inputGenero = screen.getByPlaceholderText('De qual gênero pertence esse filme')
        const botaoAdicionar = screen.getByRole('button');

        expect(inputNome).toBeInTheDocument()
        expect(inputAnoDeLancamento).toBeInTheDocument()
        expect(inputGenero).toBeInTheDocument()
        expect(botaoAdicionar).toBeDisabled()
    })

    //habilitar o botão de adicionar caso os campos de input estejam todos preenchidos;
    test('se os campos estiverem preenchidos, o botão para adicionar o filme estará habilitado', () => {
        render(<Formulario />)

        const inputNome = screen.getByPlaceholderText('Insira o nome do filme')
        const inputAnoDeLancamento = screen.getByPlaceholderText('Digite o ano de lançamento')
        const inputGenero = screen.getByPlaceholderText('De qual gênero pertence esse filme')
        const botaoAdicionar = screen.getByRole('button');

        // eslint-disable-next-line testing-library/no-unnecessary-act
        act(() => {
            userEvent.type(inputNome, 'Interestelar')
            userEvent.type(inputAnoDeLancamento, '2014')
            userEvent.type(inputGenero, 'Ficção Científica')
        })

        expect(botaoAdicionar).not.toBeDisabled()
    })

    //adicionar filme quando os campos estiverem preenchidos
    test('se meus campos de input estiverem preenchidos, é possível adicionar um filme à lista de favoritos', () => {
        render(<Formulario />)

        const inputNome = screen.getByPlaceholderText('Insira o nome do filme')
        const inputAnoDeLancamento = screen.getByPlaceholderText('Digite o ano de lançamento')
        const inputGenero = screen.getByPlaceholderText('De qual gênero pertence esse filme')
        const botaoAdicionar = screen.getByRole('button')


        // eslint-disable-next-line testing-library/no-unnecessary-act
        act(() => {
            userEvent.type(inputNome, 'Interestelar')
            userEvent.type(inputAnoDeLancamento, '2014')
            userEvent.type(inputGenero, 'Ficção Científica')

            userEvent.click(botaoAdicionar)
        });

        const filmeNaLista = screen.getByText('Interestelar(2014)')

        expect(filmeNaLista).toBeInTheDocument()

    })

    //adição de mensagem de erro caso a pessoa usuária queira adicionar um filme que já esteja na lista
    test('uma mensagem de erro deve aparecer na tela se a pessoa usuária tentar inserir um filme repetido', () => {
        render(<Formulario />)
        const inputNome = screen.getByPlaceholderText('Insira o nome do filme')
        const inputAnoDeLancamento = screen.getByPlaceholderText('Digite o ano de lançamento')
        const inputGenero = screen.getByPlaceholderText('De qual gênero pertence esse filme')
        const botaoAdicionar = screen.getByRole('button')

        // eslint-disable-next-line testing-library/no-unnecessary-act
        act(() => {
            userEvent.type(inputNome, 'Interestelar')
            userEvent.type(inputAnoDeLancamento, '2014')
            userEvent.type(inputGenero, 'Ficção Científica')

            userEvent.click(botaoAdicionar)
        });

        // eslint-disable-next-line testing-library/no-unnecessary-act
        act(() => {
            userEvent.clear(inputNome);
            userEvent.clear(inputAnoDeLancamento);
            userEvent.clear(inputGenero);
        });

        // eslint-disable-next-line testing-library/no-unnecessary-act
        act(() => {
            userEvent.type(inputNome, 'Interestelar')
            userEvent.type(inputAnoDeLancamento, '2014')
            userEvent.type(inputGenero, 'Ficção Científica')

            userEvent.click(botaoAdicionar)
        });

        const mensagemDeErro = screen.getByText('Não é possível adicionar, pois o filme já está na lista!')

        expect(mensagemDeErro).toBeInTheDocument()

    })

    test('a mensagem de erro que aparece ao adicionar um filme repetido deve sumir após um determinado tempo', () => {
        jest.useFakeTimers()
        render(<Formulario />)
        const inputNome = screen.getByPlaceholderText('Insira o nome do filme')
        const inputAnoDeLancamento = screen.getByPlaceholderText('Digite o ano de lançamento')
        const inputGenero = screen.getByPlaceholderText('De qual gênero pertence esse filme')
        const botaoAdicionar = screen.getByRole('button')

        // eslint-disable-next-line testing-library/no-unnecessary-act
        act(() => {
            userEvent.type(inputNome, 'Interestelar')
            userEvent.type(inputAnoDeLancamento, '2014')
            userEvent.type(inputGenero, 'Ficção Científica')

            userEvent.click(botaoAdicionar)
        });

        // eslint-disable-next-line testing-library/no-unnecessary-act
        act(() => {
            userEvent.clear(inputNome);
            userEvent.clear(inputAnoDeLancamento);
            userEvent.clear(inputGenero);
        });

        // eslint-disable-next-line testing-library/no-unnecessary-act
        act(() => {
            userEvent.type(inputNome, 'Interestelar')
            userEvent.type(inputAnoDeLancamento, '2014')
            userEvent.type(inputGenero, 'Ficção Científica')

            userEvent.click(botaoAdicionar)
        });

        act(()=>{
            jest.runAllTimers()
        })

        const mensagemDeErro = screen.queryByText('Não é possível adicionar, pois o filme já está na lista!')

        expect(mensagemDeErro).toBeNull()

    })
})

