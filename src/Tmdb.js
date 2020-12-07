const API_KEY = 'ac6cf60223fbcc7db65eb33c35ac4095'
const API_BASE = 'https://api.themoviedb.org/3'
const API_LANGUAGE = 'pt-BR'

/*
- ORIGINAIS NETFLIX
- RECOMENDADOS (TRENDING)
- EM ALTA (TOP RATED)
- ACAO
- COMEDIA
- TERROR
-ROMANCE
- DOCUMENTARIOS
*/

const basicFetch = async (endpoint, parametros = '') => {
    if (parametros !== '') {
        parametros = '&' + parametros;
    }
    const url = `${API_BASE}/${endpoint}?api_key=${API_KEY}&language=${API_LANGUAGE}${parametros}`;

    const req = await fetch(url)
    const json = await req.json()
    return json
}

export default {
    getHomeList: async () => {
        return [
            {
                slug: 'originals',
                title: 'Originais do Netflix',
                items: await basicFetch('discover/tv', 'with_network=213')
            },
            {
                slug: 'trending',
                title: 'Recomendados para você',
                items: await basicFetch('trending/all/week')
            },
            {
                slug: 'toprated',
                title: 'Em Alta',
                items: await basicFetch('movie/top_rated')
            },
            {
                slug: 'action',
                title: 'Ação',
                items: await basicFetch('discover/movie', 'with_genres=28')
            },
            {
                slug: 'comedy',
                title: 'Comédia',
                items: await basicFetch('discover/movie', 'with_genres=35')
            },
            {
                slug: 'horror',
                title: 'Terror',
                items: await basicFetch('discover/movie', 'with_genres=27')
            },
            {
                slug: 'romance',
                title: 'Romance',
                items: await basicFetch('discover/movie', 'with_genres=10749')
            },
            {
                slug: 'documentary',
                title: 'Documentários',
                items: await basicFetch('discover/movie', 'with_genres=99')
            }
        ]
    },
    getMovieInfo: async (id, type) => {
        let info = {}
        let url = null
        if (id) {
            switch (type) {
                case 'movie':
                    url = `movie/${id}`
                    break;
                case 'tv':
                    url = `tv/${id}`
                    break;
                default:
                    url = null
                    break;

            }
            if (url) {
                info = await basicFetch(url)
            }
        }
        return info
    }
}