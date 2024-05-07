import React, { useState, useEffect } from 'react';
import { Grid, Card, CardContent, Typography, CardMedia } from '@mui/material';

import '../App.css';

const RickAndMortyCharacters = () => {
  const [characters, setCharacters] = useState([]);

  useEffect(() => {
    fetch('https://rickandmortyapi.com/api/character')
      .then((response) => response.json())
      .then((data) => setCharacters(data.results)) // 
      .catch((error) => console.error('Error fetching characters:', error));
  }, []);



  //Aqui é pra lidar com os Desconhecidos---------------------------------
  const renderLocation = (locationName) => {
    return locationName !== 'unknown' ? locationName : 'Desconhecido';
  };

  const renderStatus = (status) => {
    return status !== 'unknown' ? status : 'Desconhecido';
  };
  //-----------------------------------------------------------------------




  //Irei usar Grid e card para exibir os personagems e seus dados
  return (
    <Grid container justifyContent="center" spacing={2}>

      {characters.map((character) => (
        <Grid item key={character.id}>

          <Card className="card">
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
                Especie: {character.species}
              </Typography>

              <Typography variant="body2" color="textSecondary" component="p">
                Genero: {character.gender}
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
  );
};

export default RickAndMortyCharacters;
