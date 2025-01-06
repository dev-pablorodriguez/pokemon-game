<template>

    <div v-if="winnerPokemon">
        <h1>¿Quién es este pokémon?</h1>

        <PokemonPicture
            :pokemonId="winnerPokemon.id"
            :showPokemon="showPokemon" />
        <PokemonOptions
            :pokemons="pokemonArr"
            @onSelectedPkmn="handleSelectedPkmn"/>


        <h2 v-if="resultMessage">{{ resultMessage }}</h2>
        <button @click="newGame">Nuevo Juego</button>
    </div>
    <h1 v-else>Espere por favor...</h1>
</template>

<script>
// @ indica posicionarse en carpeta src
import PokemonPicture from '@/components/PokemonPicture'
import PokemonOptions from '@/components/PokemonOptions'

import { getPokemonOptions } from '@/helpers/getPokemonOptions'

export default {
    name: 'PokemonPage',
    components: {
        PokemonPicture,
        PokemonOptions
    },
    data(){
        return {
            pokemonArr: [],
            winnerPokemon: null,
            showPokemon: false,
            resultMessage: null
        }
    },
    methods: {
        async setPokemonOptions(){
            this.pokemonArr  = await getPokemonOptions();

            //generate a random number between 0 and 3
            const rndIdx = Math.floor( Math.random() * 4 )
            this.winnerPokemon = this.pokemonArr[rndIdx];
        },
        handleSelectedPkmn(selectedId){
            this.showPokemon = true;
            if(selectedId === this.winnerPokemon.id){
                this.resultMessage = `¡Has ACERTADO el pokémon! Era ${ this.winnerPokemon.name }`
            }else{
                this.resultMessage = `¡Has FALLADO! Era ${ this.winnerPokemon.name }`
            }
        },
        newGame(){
            this.resultMessage = null;
            this.showPokemon = false;
            this.setPokemonOptions()
        }
    },
    mounted(){
        this.setPokemonOptions();
    }
}
</script>