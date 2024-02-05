import { GET_GAMES, SEARCH, DETAIL, GET_GENEROS, PAGINATE, ORDEN, FILTER, FILTERER } from "../actions/action-types";

let initialState = {
  AllGames: [],
  AllGeneros: [],
  gamesDetail: {},
  AllGamesBackUp: [],
  Gamesfilterer: {},
  currentPage: 0,
  filtroscombi: []
};

function rootReducer(state = initialState, action) {
  const num_cards = 15;
  switch (action.type) {
  
    case GET_GAMES:
      return {
        ...state,
        AllGames: [...action.payload].splice(0, num_cards),
        AllGamesBackUp: action.payload,
        filtroscombi: []
      };
 
    case SEARCH:
      return {
        ...state,
        AllGames: action.payload,
        filtroscombi: []
      };
 
    case DETAIL:
      return {
        ...state,
        gamesDetail: action.payload
      };
 
    case GET_GENEROS:
      return {
        ...state,
        AllGeneros: action.payload
      };

      case PAGINATE:
        const prev_page = state.currentPage - 1;
        const next_page = state.currentPage + 1;
        const firstIndex = action.payload === "next" ? next_page * num_cards : prev_page * num_cards;
      

       if (action.payload === "next" && firstIndex >= state.AllGamesBackUp.length) return state;
      else if (action.payload === "prev" && prev_page < 0) return state;
    

      return {
        ...state,
        AllGames: [...state.AllGamesBackUp].splice(firstIndex, num_cards),
        currentPage: action.payload === "next" ? next_page : prev_page,
      };

      case ORDEN:
        let orderedGames;
        switch (action.payload) {
          case "A-Z":
            orderedGames = [...state.AllGamesBackUp].sort((prev, next) => {
              if (prev.name.toLowerCase() > next.name.toLowerCase()) return 1;
              if (prev.name.toLowerCase() < next.name.toLowerCase()) return -1;
              return 0;
            });
            break;
          case "Z-A":
            orderedGames = [...state.AllGamesBackUp].sort((prev, next) => {
              if (prev.name.toLowerCase() > next.name.toLowerCase()) return -1;
              if (prev.name.toLowerCase() < next.name.toLowerCase()) return 1;
              return 0;
            });
            break;
          case 'RATING_ASCEN':
            orderedGames = [...state.AllGamesBackUp].sort((prev, next) => prev.rating - next.rating);
            break;
          case 'RATING_DESCEN':
            orderedGames = [...state.AllGamesBackUp].sort((prev, next) => next.rating - prev.rating);
            break;
          default:
            return state;
        }
      
        let filteredGames = orderedGames;
        if (state.filtroscombi.length > 0) {
          state.filtroscombi.forEach((filtro) => {
            if (filtro.type === 'FILTER') {
              filteredGames = filteredGames.filter((game) => game.genres.some((g) => g.name === filtro.payload));
            } else if (filtro.type === 'FILTERER') {
              if (filtro.payload === "DB") {
                filteredGames = filteredGames.filter((game) => game.iscreated === true);
              } else {
                filteredGames = filteredGames.filter((game) => !isNaN(game.id));
              }
            }
          });
        }
      
        return {
          ...state,
          AllGames: filteredGames.slice(0, num_cards),
          AllGamesBackUp: orderedGames,
          currentPage: 0,
          filtroscombi: [...state.filtroscombi, { type: 'ORDEN', payload: action.payload }]
        };
    

        case FILTER:
          const genres = [...state.AllGamesBackUp].filter((game) => {
            return game.genres.some((g) => g.name === action.payload);
          });
          return {
            ...state,
            AllGames: genres,
            currentPage: 0,
            filtroscombi: [...state.filtroscombi, { type: 'FILTER', payload: action.payload }]
          };
         

          case FILTERER:
            if (action.payload === "DB") {
              return {
                ...state,
                AllGames: [...state.AllGamesBackUp].filter((game) => game.iscreated === true).splice(0, num_cards),
                Gamesfilterer: [...state.AllGamesBackUp].filter((game) => game.iscreated === true),
              };
            } else {
              return {
                ...state,
                AllGames: [...state.AllGamesBackUp].filter((game) => !isNaN((game.id))).splice(0, num_cards),
                Gamesfilterer: [...state.AllGamesBackUp].filter((game) => !isNaN((game.id))),
                filtroscombi: [...state.filtroscombi, { type: 'FILTERER', payload: action.payload }]
              };
            }

    default:
      return state;
  }
}

export default rootReducer;
