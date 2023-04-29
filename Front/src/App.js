import './App.css';
import {useEffect, useState} from "react";
import Card from '@mui/material/Card';
import CardHeader from '@mui/material/CardHeader';
import CardMedia from '@mui/material/CardMedia';
import IconButton from '@mui/material/IconButton';
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';
import StarIcon from '@mui/icons-material/Star';
import { Tooltip, Rating } from "@mui/material";
import {motion} from "framer-motion";
import {
  BrowserRouter,
  Routes,
  Link,
  Route,
} from "react-router-dom";



function App() {
  const [selectedMovie, setSelectedMovie] = useState(null);
  useEffect(() => {
    const script = document.createElement('script');

    script.src = "https://unpkg.com/@eyevinn/web-player-component@latest/dist/web-player.component.js";
    script.async = true;

    document.body.appendChild(script);

    fetch("http://localhost:8000/api/movies")
        .then(response => response.json())
        .then(data => setMoviesInfo(data))
  }, [])
  const [moviesInfo, setMoviesInfo] = useState([
    {
      title: 'Hangover',
      ID: '1',
      imageUrl: 'https://i.etsystatic.com/27089413/r/il/7cb670/2846127541/il_1588xN.2846127541_3ew5.jpg',
      description: 'Three buddies wake up from a bachelor party in Las Vegas, with no memory of the previous night and the bachelor missing. They make their way around the city in order to find their friend before his wedding.',
      rate: 7.7,
      director: 'Todd Phillips'
    },
    {
      title: '12 Angry Men',
      ID: '2',
      imageUrl: 'https://i.etsystatic.com/27089413/r/il/7cb670/2846127541/il_1588xN.2846127541_3ew5.jpg',
      description: 'Three buddies wake up from a bachelor party in Las Vegas, with no memory of the previous night and the bachelor missing. They make their way around the city in order to find their friend before his wedding.',
      rate: 7.7,
      director: 'Todd Phillips',
      trailer_path: "https://fuck-mm.arvanvod.com/5MX06QZzpn/yAv75ZYJWM/h_,144_200,240_400,360_800,480_1500,k.mp4.list/master.m3u8"
    },
    {
      title: 'Hangover',
      ID: '3',
      imageUrl: 'https://i.etsystatic.com/27089413/r/il/7cb670/2846127541/il_1588xN.2846127541_3ew5.jpg',
      description: 'Three buddies wake up from a bachelor party in Las Vegas, with no memory of the previous night and the bachelor missing. They make their way around the city in order to find their friend before his wedding.',
      rate: 7.7,
      director: 'Todd Phillips'
    },
    {
      title: 'Hangover',
      ID: '4',
      imageUrl: 'https://i.etsystatic.com/27089413/r/il/7cb670/2846127541/il_1588xN.2846127541_3ew5.jpg',
      description: 'Three buddies wake up from a bachelor party in Las Vegas, with no memory of the previous night and the bachelor missing. They make their way around the city in order to find their friend before his wedding.',
      rate: 7.7,
      director: 'Todd Phillips'
    },
    {
      title: 'Hangover',
      ID: '5',
      imageUrl: 'https://i.etsystatic.com/27089413/r/il/7cb670/2846127541/il_1588xN.2846127541_3ew5.jpg',
      description: 'Three buddies wake up from a bachelor party in Las Vegas, with no memory of the previous night and the bachelor missing. They make their way around the city in order to find their friend before his wedding.',
      rate: 7.7,
      director: 'Todd Phillips'
    },
    {
      title: 'Hangover',
      ID: '6',
      imageUrl: 'https://i.etsystatic.com/27089413/r/il/7cb670/2846127541/il_1588xN.2846127541_3ew5.jpg',
      description: 'Three buddies wake up from a bachelor party in Las Vegas, with no memory of the previous night and the bachelor missing. They make their way around the city in order to find their friend before his wedding.',
      rate: 7.7,
      director: 'Todd Phillips'
    },
  ])
  return (
    <div className="container">
      <BrowserRouter>
        <Routes>
          <Route path="/" element={
            <>
              <header>
                <h1>IMDB Top 6 movies</h1>
              </header>
              <main>
                <section className="moviesPreviewContainer">
                  {moviesInfo.map((movie, index) => (
                    <motion.div
                      style={{margin: 0, padding: 0}}
                      initial={{opacity: 0, y: 100}}
                      animate={{opacity: 1, y: 0}}
                      transition={{ delay: index*0.1 }}
                    >
                      <Tooltip title={movie?.description} arrow>
                        <Link to={`/movies/${movie?.ID}`}>
                          <Card sx={{margin: '10px' }} onClick={() => {
                            setSelectedMovie(movie)
                          }}>
                            <CardHeader
                              title={movie?.title}
                              subheader={movie?.director}
                            />
                            <CardMedia
                              component="img"
                              height="194"
                              image={movie?.imageUrl}
                              alt="Paella dish"
                            />
                          </Card>
                        </Link>
                      </Tooltip>
                    </motion.div>
                  ))}
                </section>
              </main>
            </>
          } />
          {moviesInfo.map((movie) => (
            <Route path={`/movies/${movie?.ID}`} element={
              <>
                <header>
                  <span>
                    <Link to="/">
                      <IconButton>
                      <ArrowBackIosIcon sx={{color:'#eee'}} />
                    </IconButton>
                    </Link>
                    <h1>{movie?.title}</h1>
                  </span>
                  
                </header>
                <main className="movieInfoContainer" style={{backgroundImage: `url(${movie?.imageUrl})`}}> 
                  <div>
                  <motion.div initial={{opacity: 0, y: 100}}
                              animate={{opacity: 1, y: 0}}
                              src={movie?.imageUrl} alt={movie?.name} > 
                               <div style={{transform: 'scale(0.7)'}}>
                  <eyevinn-video  source={movie?.trailer_path} starttime="30" muted autoplay></eyevinn-video>
                   </div>
                              </motion.div>
                  <div className="movieInfo">
                    <motion.div initial={{opacity: 0, x: -100}}
                      animate={{opacity: 1, x: 0}}
                      transition={{ delay: 0.1 }}>
                      <p>Title:</p>
                      <p>{movie?.title}</p>
                    </motion.div>
                    <motion.div initial={{opacity: 0, x: -100}}
                      animate={{opacity: 1, x: 0}}
                      transition={{ delay: 0.2 }}>
                      <p>Director:</p>
                      <p>{movie?.director}</p>
                    </motion.div>
                    <motion.div initial={{opacity: 0, x: -100}}
                      animate={{opacity: 1, x: 0}}
                      transition={{ delay: 0.3 }}>
                      <p>Description:</p>
                      <p>{movie?.description}</p>
                    </motion.div>
                    <motion.div initial={{opacity: 0, x: -100}}
                      animate={{opacity: 1, x: 0}}
                      transition={{ delay: 0.3 }}>
                      <p>IMDb Rating:</p>
                      <span>
                      <p>
                      {movie?.rate || '-'} / 10
                      </p>
                      <Rating
                        name="text-feedback"
                        value={movie?.rate}
                        readOnly
                        precision={0.1}
                        max={10}
                        emptyIcon={<StarIcon style={{ opacity: 0.55 }} fontSize="inherit" />}
                      />
                        </span>  
                    </motion.div>
                   
                  </div>
                  </div>
                 
                </main>
              </>
            } />
          ))}
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
