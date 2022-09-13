<template>
    <div class="modal">
        <div class="modal-header">
            <div class="title">
                <h1 v-if="this.pet">Editar Pet</h1>
                <h1 v-else>Cadastro de Pet</h1>
            </div>
            <button class="button round-button close center-flex" @click="this.$emit('close')">X</button>
        </div>
        <form class="formulario" @submit.prevent="sendValues()">
            <input v-if="this.pet" type="hidden" :value="this.pet.id">
            <input type="text" v-model="nome" placeholder="Nome" required>
            <div id="idade">
                <input type="number" v-model="idade" placeholder="Idade" required>
                <div class="flex-column">
                    <div>
                        <input class="radio" type="radio" value="0" name="idade" v-model="meses" checked>
                        <label>Anos</label>
                    </div>
                    <div>
                        <input class="radio" type="radio" value="1" name="idade" v-model="meses">
                        <label>Meses</label>
                    </div>
                </div>
            </div>
            <input type="text" v-model="raca" placeholder="Raça" required>
            <div>
                <input class="radio" type="radio" value="0" name="tipo" v-model="tipo" checked>
                <label for="tipo_gato">Gato</label>
            </div>
            <div>
                <input class="radio" type="radio" value="1" name="tipo" v-model="tipo">
                <label for="tipo_cachorro">Cachorro</label>
            </div>
            <p>Dono</p>
            <select v-model="donoId" required>
                <option v-for="dono in donos" :key="dono.id" :value="dono.id" :selected="this.donoId === dono.id">{{dono.nome}}</option>
            </select>
            <button class="button" type="submit">Finalizar</button>
        </form>
    </div>
</template>

<script>
export default {
    name: "petModal",
    props: ['pet', 'donos'],
    data() {
        return {
            nome: this.pet.nome || "",
            idade: this.pet.idade || "",
            raca: this.pet.raca || "",
            tipo: this.pet.tipo || 0,
            donoId: this.pet.donoId || null,
            editMode: this.pet || false,
            meses: "0"
        }
    },
    methods: {
        sendValues() {
            let idade = this.idade;
            if(this.meses === "0") {
                idade = idade * 12;
                console.log(idade);
            }
            console.log(idade);

            let pet_obj = {
                id: this.pet.id,
                nome: this.nome,
                raca: this.raca,
                tipo: this.tipo,
                donoId: this.donoId,
                idade
            };

            this.$emit('receiveValues', pet_obj, this.editMode);
            this.$emit('close');
        }
    }
}
</script>

<style lang="scss" scoped>
.flex-column {
    display: flex;
    flex-direction: column;
}

#idade {
    display: flex;
    gap: 10px;
}
</style>