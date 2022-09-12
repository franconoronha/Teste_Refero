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
            <input type="number" v-model="idade" placeholder="Idade" required>
            <input type="text" v-model="raca" placeholder="Raça" required>
            <div>
                <input class="radio" type="radio" value="0" id="tipo_gato" v-model="tipo" selected>
                <label for="tipo_gato">Gato</label>
            </div>
            <div>
                <input class="radio" type="radio" value="1" id="tipo_cachorro" v-model="tipo">
                <label for="tipo_cachorro">Cachorro</label>
            </div>
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
            editMode: this.pet || false
        }
    },
    methods: {
        sendValues() {
            let pet_obj = {
                id: this.pet.id,
                nome: this.nome,
                idade: this.idade,
                raca: this.raca,
                tipo: this.tipo,
                donoId: this.donoId
            };

            this.$emit('receiveValues', pet_obj, this.editMode);
            this.$emit('close');
        }
    }
}
</script>

<style lang="scss" scoped>

</style>