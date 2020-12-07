import React, { useEffect, useState } from 'react';
import './App.css';
import Tmdb from './Tmdb';
import MovieRow from './components/MovieRow';
import FeaturedMovie from './components/FeaturedMovie';
import Header from './components/Header';


export default props => {
    const [movieList, setMovieList] = useState([]);
    const [featuredData, setFeaturedData] = useState(null);
    const [blackHeader, setblackHeader] = useState(false);
    useEffect(() => {
        const loadAll = async () => {
            //Pegando a lista total
            let list = await Tmdb.getHomeList();
            setMovieList(list);
            //pegando o featured
            let originals = list.filter(i => i.slug === 'originals');
            let random = Math.floor(Math.random() * (originals[0].items.results.length - 1));
            let chosen = originals[0].items.results[random];
            let chosenInfo = await Tmdb.getMovieInfo(chosen.id, 'tv')
            setFeaturedData(chosenInfo);
        };
        loadAll();
    }, [])
    useEffect(() => {
        const scrollListener = () => {
            var black = false;
            if (window.scrollY > 10) {
                black = true;
            }
            setblackHeader(black);
        }
        window.addEventListener('scroll', scrollListener);
        return () => {
            window.removeEventListener('scroll', scrollListener);
        }
    })
    return (
        <div className='page'>
            {/* Header
            Destaque
            As Listas
            Rodapé */}
            <Header black={blackHeader}></Header>
            {featuredData && <FeaturedMovie item={featuredData}></FeaturedMovie>}

            <section className='lists'>
                {movieList.map((item, key) => (
                    <MovieRow key={key} title={item.title} items={item.items}></MovieRow>
                ))}
            </section>
            <footer>
                Feito por Murilo Álvaro Pinto <br/>
                Direitos de imagem para Netflix <br/>
                Dados pegos do site themoviedb.org
            </footer>
            {movieList.length<=0 &&
            <div className="loading">
                <img src="https://media.wired.com/photos/592744d3f3e2356fd800bf00/master/w_1132,c_limit/Netflix_LoadTime.gif" alt="Carregando"></img>
            </div>
            }
        </div>
    );
}