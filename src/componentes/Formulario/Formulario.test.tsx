import { act, render, screen } from "@testing-library/react"
import { Formulario } from "./Formulario";
import userEvent from "@testing-library/user-event";

describe('no formulário', () => {

    test('se meus campos de input estiverem vazios, não é possível adicionar um filme à lista de favorito', () => {
        render(<Formulario />)
        const inputNome = screen.getByPlaceholderText('Insira o nome do filme')
        const inputAnoDeLancamento = screen.getByPlaceholderText('Digite o ano de lançamento')
        const botaoAdicionar = screen.getByRole('button');
        expect(inputNome).toBeInTheDocument()
        expect(inputAnoDeLancamento).toBeInTheDocument()
        expect(botaoAdicionar).toBeDisabled()
    })

    test('se meus campos de input estiverem preenchidos, é possível adicionar um filme à lista de favoritos', () => {
        render(<Formulario />)
        const inputNome = screen.getByPlaceholderText('Insira o nome do filme')
        const inputAnoDeLancamento = screen.getByPlaceholderText('Digite o ano de lançamento')
        const botaoAdicionar = screen.getByRole('button')
        // eslint-disable-next-line testing-library/no-unnecessary-act
        act(() => {
            userEvent.type(inputNome, 'Interestelar')
            userEvent.type(inputAnoDeLancamento, '2014')
            userEvent.click(botaoAdicionar)
        });
        const filmeNaLista = screen.getByText('Interestelar(2014)')
        expect(filmeNaLista).toBeInTheDocument()

    })

    test('uma mensagem de erro deve aparecer na tela se a pessoa usuária tentar inserir um filme repetido', () => {
        render(<Formulario />)
        const inputNome = screen.getByPlaceholderText('Insira o nome do filme')
        const inputAnoDeLancamento = screen.getByPlaceholderText('Digite o ano de lançamento')
        const botaoAdicionar = screen.getByRole('button')
         // eslint-disable-next-line testing-library/no-unnecessary-act
         act(() => {
            userEvent.type(inputNome, 'Interestelar')
            userEvent.type(inputAnoDeLancamento, '2014')
            userEvent.click(botaoAdicionar)
            userEvent.clear(inputNome);
            userEvent.clear(inputAnoDeLancamento);
            userEvent.type(inputNome, 'Interestelar')
            userEvent.type(inputAnoDeLancamento, '2014')
            userEvent.click(botaoAdicionar)
        });
        const mensagemDeErro = screen.getByText('Não é possível adicionar, pois o filme já está na lista!')
        expect(mensagemDeErro).toBeInTheDocument()

    })

    test('a mensagem de erro que aparece ao adicionar um filme repetido deve sumir após um determinado tempo', () => {
        jest.useFakeTimers()
        render(<Formulario />)
        const mensagemDeErro = screen.queryByText('Não é possível adicionar, pois o filme já está na lista!')
        expect(mensagemDeErro).toBeNull()
    })
})

