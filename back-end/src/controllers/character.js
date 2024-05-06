import axios from 'axios'


const controller = {}   // Objeto vazio

//pegando os personagens da API do Rick e Morty
controller.retrieveAll = async function (req, res) {

    try {
        // Fazer solicitação GET para a API do Rick and Morty
        const response = await axios.get('https://rickandmortyapi.com/api/character')

        //mandar os dados para o frontend
        res.json(response.data.results)
    }
    catch (error) {
        console.log(error)
        //Erro 500: Internal Server Error
        res.status(500).end()
    }
}

export default controller



