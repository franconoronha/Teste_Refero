<template>
    <div>
        <h1 class="title">Donos</h1>
        <div class="area-filtro">
            <input type="text" placeholder="Filtro" v-model="busca">
            <button class="button" @click="openModalCadastrar">Cadastrar</button>
        </div>
        <Error v-if="error" :errorMsg="errorMsg"></Error>
        <div class="list">
            <table class="list-body">
                <tr>
                    <td>.</td>
                    <td class="ordenavel" @click="ordenar('nome')">Nome</td>
                    <td class="ordenavel" @click="ordenar('email')">Email</td>
                    <td class="ordenavel" @click="ordenar('endereco')">Endereço</td>
                    <td class="ordenavel" @click="ordenar('telefone')">Telefone</td>
                    <td>Editar</td>
                    <td>Excluir</td>
                </tr>
                <tr v-for="(item, index) in filtroBusca" v-bind:key="index">
                    <td>{{ index + 1 }}</td>
                    <td>{{ item.nome }}</td>
                    <td>{{ item.email }}</td>
                    <td>{{ item.endereco }}</td>
                    <td>{{ item.telefone }}</td>
                    <td>
                        <button class="button round-button edit center-flex delete" @click="openModalEditar(item)">E</button>
                    </td>
                    <td>
                        <button class="button round-button close center-flex delete" @click="deletarItem(item.id)">X</button>
                    </td>
                </tr>
            </table>
            <DonoModal v-if="modalOpen" @close="closeModal" @receiveValues="receiveValues" :dono="this.selectedDono"></DonoModal>
        </div>
    </div>
</template>

<script>
import DonoModal from './modals/DonoModal.vue';
import Error from './Error.vue';

export default {
    name: "Donos",
    components: {
        DonoModal,
        Error
    },
    data() {
        return {
            ordem: "",
            busca: "",
            error: false,
            errorMsg: "",
            selectedDono: false,
            modalOpen: false,
            donos: []
        }
    },
    created() {
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
        closeModal() {
            this.selectedDono = false;
            this.modalOpen = false;
        },
        openModalEditar(dono) {
            this.selectedDono = dono;
            this.modalOpen = true;
        },
        openModalCadastrar() {
            this.selectedDono = false;
            this.modalOpen = true;
        },
        criarItem(data_obj) {
            this.$http.post("/dono", data_obj)
                .then((res) => {
                    this.donos.push(res.data);
                }).catch((error) => {
                    this.setError(error);
            });
        },
        editarItem(data_obj) {
            this.$http.put("/dono/" + data_obj.id, data_obj)
                .then((res) => {
                    this.donos.forEach((el, index, arr) => {
                        if (el.id === data_obj.id) {
                            arr[index] = res.data;
                        }
                    })
                }).catch((error) => {
                    this.setError(error);
            });
        },
        deletarItem(id) {
            this.$http.delete("/dono/" + id, {
            }).then((res) => {
                this.donos = this.donos.filter(val => {
                    return val.id != id;
                });
                this.clearError();
            }).catch((error) => {
                this.setError(error);
            });
        },
        receiveValues(dono_obj, editMode) {
            this.clearError();
            if(!editMode) {
                this.criarItem(dono_obj);
            } else {
                this.editarItem(dono_obj);
            }
        },
        ordenar(campo) {
            if(this.ordem !== campo) {
                this.donos.sort((a, b) => {
                    let n1 = a[campo].toLocaleLowerCase("pt-br");
                    let n2 = b[campo].toLocaleLowerCase("pt-br");
                    if (n1 < n2) return -1;
                    if (n1 > n2) return 1;
                    return 0;
                });

                this.ordem = campo;
            } else {
                this.donos.sort((a, b) => {
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
            return this.donos.filter(el => {
                let busca = this.busca.toLocaleLowerCase("pt-br");
                let arr = [el.nome, el.endereco, el.telefone, el.email];
                arr = arr.some(val => val.toLocaleLowerCase("pt-br").match(busca)); // se ao menos um elemento conter a busca retorna true
   
                return arr;
            })
        },
    }
}
</script>

<style lang="scss" scoped>

</style>