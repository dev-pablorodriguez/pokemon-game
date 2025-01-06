import pokemonApi from '@/api/pokemonApi'

const getPokemons = () => {
    //151 first
    //251 second
    //386 third
    const pokemonsArr = Array.from(Array(386))
    return pokemonsArr.map((_, idx) => idx +1);
}

const getPokemonNames = async ([a, b, c, d] = []) => {
    const promisesArr = [
        pokemonApi.get(`/${ a }`),
        pokemonApi.get(`/${ b }`),
        pokemonApi.get(`/${ c }`),
        pokemonApi.get(`/${ d }`)
    ]

    const [ pkmnA, pkmnB, pkmnC, pkmnD ] = await Promise.all(promisesArr)

    return [
        { id: pkmnA.data.id, name: pkmnA.data.name },
        { id: pkmnB.data.id, name: pkmnB.data.name },
        { id: pkmnC.data.id, name: pkmnC.data.name },
        { id: pkmnD.data.id, name: pkmnD.data.name }
    ];
}

export const getPokemonOptions = () => {
    const mixedPokemons = getPokemons().sort(() => Math.random() - 0.5);
    return getPokemonNames(mixedPokemons.splice(0, 4));
}