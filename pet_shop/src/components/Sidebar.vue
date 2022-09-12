<template>
    <nav id="sidebar">
        <ul>
            <li :class="{active: this.rotaAtiva('pets')}">
                <router-link class="link" to="/pets">Pets</router-link>
            </li>
            <li :class="{active: this.rotaAtiva('donos')}">
                <router-link class="link" to="/donos">Donos</router-link>
            </li>
        </ul>
    </nav>
</template>

<script>
export default {
    name: "Sidebar",
    data() {
        return {
            
        }
    },
    methods: {
        rotaAtiva(nome) {
            return this.$route.name === nome;
        }
    }
}
</script>

<style lang="scss" scoped>
    #sidebar {
        background-color: #F15412;
        width: 10vw;
        height: 100vh;
        li {
            font-family: 'Poppins', sans-serif;
            color: white;
            height: 60px;
            &.active {
                background-color: #d34b10;
            }
        }
    }

    .link {
        display: flex;
        justify-content: center;
        align-items: center;
        height: 100%;
        width: 100%;
        color: white;
    }
</style>