<template>
    <div>
        <h1 class="title">Pets</h1>
        <div class="area-filtro">
            <input type="text" placeholder="Filtro" v-model="busca">
            <button class="button" @click="openModalCadastrar">Cadastrar</button>
        </div>
        <Error v-if="error" :errorMsg="errorMsg"> </Error>
        <div class="list">
            <table class="list-body">
                <tr>
                    <td>.</td>
                    <td class="ordenavel" @click="ordenar('nome')">Nome</td>
                    <td class="ordenavel" @click="ordenar('tipo')">Tipo</td>
                    <td class="ordenavel" @click="ordenar('raca')">Raça</td>
                    <td class="ordenavel" @click="ordenar('dono')">Dono</td>
                    <td>Editar</td>
                    <td>Excluir</td>
                </tr>
                <tr v-for="(pet, index) in filtroBusca" v-bind:key="index">
                    <td>{{ index + 1 }}</td>
                    <td>{{ pet.nome }}</td>
                    <td>{{ showTipo(pet.tipo) }}</td>
                    <td>{{ pet.raca }}</td>
                    <td>{{ pet.dono.nome }}</td>
                    <td>
                        <button class="button round-button edit center-flex delete" @click="openModalEditar(pet)">E</button>
                    </td>
                    <td>
                        <button class="button round-button close center-flex delete" @click="deletarItem(pet.id)">X</button>
                    </td>
                </tr>
            </table>
        </div>
        <PetModal v-if="modalOpen" @close="closeModal" @receiveValues="receiveValues" :pet="this.selectedPet" :donos="this.donos"></PetModal>
    </div>
</template>

<script>
import PetModal from './modals/PetModal.vue';
import Error from './Error.vue';

export default {
    name: "Pets",
    components: {
        PetModal,
        Error
    },
    data() {
        return {
            ordem: "",
            busca: "",
            error: false,
            errorMsg: "",
            selectedPet: false,
            modalOpen: false,
            pets: []
        }
    },
    created() {
        this.$http.get("/pets")
                  .then((response) => {
                        this.pets = response.data;
                  }).catch(error => {
                    this.setError(error);
        });

        this.$http.get("/donos")
                  .then((response) => {
                        this.donos = response.data;
                  }).catch(error => {
                    this.setError(error);
        });
    },
    methods: {
        setError(errorMsg) {
            this.error = true;
            this.errorMsg = errorMsg;
        }, 
        clearError() {
            this.error = false;
            this.errorMsg = "";
        },
        showTipo(tipo) {
            if(tipo === 0) {
                return "Gato";
            } else if(tipo === 1) {
                return "Cachorro";
            } else { 
                return "Desconhecido";
            }
        },
        closeModal() {
            this.selectedPet = false;
            this.modalOpen = false;
        },
        openModalEditar(pet) {
            this.selectedPet = pet;
            this.modalOpen = true;
        },
        openModalCadastrar() {
            this.selectedPet = false;
            this.modalOpen = true;
        },
        criarItem(pet_obj) {
            this.$http.post("/pet", pet_obj)
                .then((res) => {
                    let push_obj = res.data;
                    push_obj.dono = this.donos.find(el => {
                        return el.id === pet_obj.donoId
                    });
                    this.pets.push(push_obj);
                }).catch((error) => {
                    this.setError(error);
            });
        },  
        editarItem(data_obj) {
            this.$http.put("/pet/" + data_obj.id, data_obj)
                .then((res) => {
                    let edit_obj = res.data
                    edit_obj.dono = this.donos.find(el => {
                        return el.id === edit_obj.donoId
                    });

                    this.pets.forEach((el, index, arr) => {
                        if (el.id === data_obj.id) {
                            arr[index] = edit_obj;
                        }
                    })
                }).catch((error) => {
                    this.setError(error);
            });
        },
        deletarItem(id) {
            this.$http.delete("/pet/" + id, {
            }).then((res) => {
                this.pets = this.pets.filter(val => {
                    return val.id != id;
                })
                this.clearError();
            }).catch((error) => {
                this.setError(error);
            });
        },
        receiveValues(pet_obj, editMode) {
            this.clearError();
            if(!editMode) {
                this.criarItem(pet_obj);
            } else {
                this.editarItem(pet_obj);
            }
        },
        ordenar(campo) {
            if(this.ordem !== campo) {
                this.pets.sort((a, b) => {
                    let n1, n2;
                    if(campo === "dono") {
                        n1 = a.dono.nome.toLocaleLowerCase("pt-br");
                        n2 = b.dono.nome.toLocaleLowerCase("pt-br");
                    } else if(campo === "tipo") { 
                        n1 = a.tipo;
                        n2 = b.tipo;
                    } else {
                        n1 = a[campo].toLocaleLowerCase("pt-br");
                        n2 = b[campo].toLocaleLowerCase("pt-br");
                    }
                    if (n1 < n2) return -1;
                    if (n1 > n2) return 1;
                    return 0;
                });

                this.ordem = campo;
            } else {
                this.pets.sort((a, b) => {
                    if (a.id < b.id) return -1;
                    if (a.id > b.id) return 1;
                    return 0;
                });

                this.ordem = "";
            }
        }
    },
    computed: {
        filtroBusca() {
            return this.pets.filter(el => {
                let busca = this.busca.toLocaleLowerCase("pt-br");
                let arr = [el.nome, this.showTipo(el.tipo), el.raca, el.dono.nome];
                arr = arr.some(val => val.toLocaleLowerCase("pt-br").match(busca)); // se ao menos um elemento conter a busca retorna true
   
                return arr;
            })
        }
    }
}
</script>

<style lang="scss" scoped>
    select {
        min-width: 100px;
    }
</style>