<template>
    <div class="modal">
        <div class="modal-header">
            <div class="title">
                <h1 v-if="this.dono">Editar Dono</h1>
                <h1 v-else>Cadastro de Dono</h1>
            </div>
            <button class="button round-button close center-flex" @click="this.$emit('close')">X</button>
        </div>
        <form class="formulario" @submit.prevent="sendValues()">
            <input v-if="this.dono" type="hidden" :value="this.dono.id">
            <input type="text" v-model="nome" placeholder="Nome" required>
            <input type="email" v-model="email" placeholder="exemplo@email.com" required>
            <input type="text" v-model="endereco" placeholder="Endereço" required>
            <input type="tel" v-model="telefone" placeholder="(00) 00000-0000" required>
            <button class="button" type="submit">Finalizar</button>
        </form>
    </div>
</template>

<script>
export default {
    name: "DonoModal",
    props: ['dono'],
    data() {
        return {
            nome: this.dono.nome || "",
            endereco: this.dono.endereco || "",
            telefone: this.dono.telefone || "",
            email: this.dono.email || "",
            editMode: this.dono || false
        }
    },
    methods: {
        sendValues() {
            let dono_obj = {
                id: this.dono.id,
                nome: this.nome,
                endereco: this.endereco,
                telefone: this.telefone,
                email: this.email
            };

            this.$emit('receiveValues', dono_obj, this.editMode);
            this.$emit('close');
        }
    }
}
</script>

<style lang="scss" scoped>

</style>