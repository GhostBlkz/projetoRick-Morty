import React, { useState, useEffect } from 'react';
import { Grid, Card, CardContent, Typography, CardMedia, Button, Box } from '@mui/material';

import '../App.css';

const RickAndMortyCharacters = () => {
  const [characters, setCharacters] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [pageInfo, setPageInfo] = useState({
    count: 0,
    pages: 0,
    next: null,
    prev: null
  });
  




//useEffect() para buscar os dados do site ao carregar a pagina
useEffect(() => {
  fetch('https://rickandmortyapi.com/api/character/')
    .then((response) => response.json())
    .then((data) => {
      setCharacters(data.results);
      setPageInfo({
        count: data.info.count,
        pages: data.info.pages,
        next: data.info.next,
        prev: data.info.prev
      });
    })
    .catch((error) => console.error('Error fetching characters:', error));
}, []);


//aqui para lidar com a paginação ------------------------------------------
  const handleNextPage = () => {
    if (pageInfo.next) {
      fetch(pageInfo.next)
        .then((response) => response.json())
        .then((data) => {
          setCharacters(data.results);
          setPageInfo({
            count: data.info.count,
            pages: data.info.pages,
            next: data.info.next,
            prev: data.info.prev
          });
          setCurrentPage(currentPage + 1);
        })
        .catch((error) => console.error('Error fetching characters:', error));
    }
    
  };

  const handlePrevPage = () => {
    if (pageInfo.prev) {
      fetch(pageInfo.prev)
        .then((response) => response.json())
        .then((data) => {
          setCharacters(data.results);
          setPageInfo({
            count: data.info.count,
            pages: data.info.pages,
            next: data.info.next,
            prev: data.info.prev
          });
          setCurrentPage(currentPage - 1);
        })
        .catch((error) => console.error('Error fetching characters:', error));
    }
  };
//--------------------------------------------------------------------------



  //Aqui é pra lidar com os Desconhecidos e traduzir algumas informações---------------------------------
  const renderLocation = (locationName) => {
    return locationName !== 'unknown' ? locationName : 'Desconhecido';
  };

  const renderStatus = (status) => {
    return status !== 'unknown' ? 
        (status === 'Alive' ? 'Vivo' : (status === 'Dead' ? 'Morto' : status)) 
        : 'Desconhecido';
};

  const renderGender = (gender) => {
    return gender === 'Male' ? 'Masculino' : gender === 'Female' ? 'Feminino' : gender === 'Genderless' ? 'Sem Gênero' : gender;
};

  const renderSpecies = (species) => {
    return species !== 'Human' && species !== 'Alien' && species !== 'Humanoid' && species !== 'unknown' ? 
    species 
    : species === 'Human' ? 
      'Humano' 
      : species === 'Alien' ? 
        'Alienígena' 
        : species === 'Humanoid' ?
          'Humanoide'
          : 'Desconhecida';
  }

  //Localização preferi manter original por serem nomes e tambem haverem muitas
  //----------------------------------------------------------------------------------------




  //Irei usar Grid e card para exibir os personagems e seus dados
  return (
    <>
    <Grid container justifyContent='center' alignContent={'space-between'} spacing={4} xs={12}>
      {characters.map((character) => (
        <Grid item key={character.id}>

          <Card className="card" elevation={6}>
            <CardMedia
              className="media"
              image={character.image}
              title={character.name}
            />

            <CardContent>

              <Typography variant="h6" component="h2">
                {character.name}
              </Typography>

              <Typography variant="body2" color="textSecondary" component="p">
                Especie: {renderSpecies(character.species)}
              </Typography>

              <Typography variant="body2" color="textSecondary" component="p">
                Genero: {renderGender(character.gender)}
              </Typography>

              <Typography variant="body2" color="textSecondary" component="p">
                Status: {renderStatus(character.status)}
              </Typography>

              <Typography variant="body2" color="textSecondary" component="p">
                Localização: {renderLocation(character.location.name)}
              </Typography>

            </CardContent>

          </Card>

        </Grid>
        
      ))}
    </Grid>
        <Typography variant="body1" color="white">
          Página {currentPage} de {pageInfo.pages}
        </Typography>
    <Box
        position="center"
        bottom={0}
        width="100%"
        display="flex"
        justifyContent="space-between"
        alignItems="center"
        marginTop={2}
      >

          <Button
            variant="contained"
            disabled={!pageInfo.prev}
            onClick={handlePrevPage}
            color='secondary'
          >
            Página Anterior
          </Button>

          <Button
            variant="contained"
            disabled={!pageInfo.next}
            onClick={handleNextPage}
            style={{ marginLeft: '10px' }}
          >
            Próxima Página
          </Button>
        
      </Box>
    </>
    
    
  );
};

export default RickAndMortyCharacters;
