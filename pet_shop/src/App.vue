<template>
  <div id="main">
    <Sidebar></Sidebar>
    <div id="page">
      <router-view></router-view>
    </div>
  </div>
</template>

<script>
import Sidebar from './components/Sidebar.vue';

export default {
  name: 'App',
  components: {
    Sidebar
}
}
</script>

<style lang="scss">
  @import url('https://fonts.googleapis.com/css2?family=Poppins:wght@300;400;600&display=swap');
  // GERAIS
  * {
    box-sizing: border-box;
    margin: 0;
    padding: 0;
  }

  a {
    text-decoration: none;
  }

  #page {
    max-height: 100vh;
    padding: 15px;
    width: 90vw;
    background-color: #d1e7e7;
  }

  #main {
    display: flex;
  }

  .title {
    font-family: 'Poppins';
  }

  .button {
    cursor: pointer;
    background-color: #008000;
    color: white;
    font-size: 18px;
    font-family: Verdana;
    padding: 15px;
    border: none;
    border-radius: 5px;
  }

  .center-flex {
    display: flex;
    justify-content: center;
    align-items: center;
  }

  .close {
    background-color: #ff0000;
    font-weight: bold;
  }

  .modal-header {
    display: flex;
    justify-content: space-between;
  }

  .modal {
    min-width: 400px;
    background-color: white;
    border-radius: 10px;
    padding: 20px;
    box-shadow: #d1d1d185 4px 5px 3px, #96969633 0 -12px 30px, #75757533 0 4px 6px, #b5b5b533 0 12px 13px, #96969633 0 -3px 5px;
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    display: flex;
    flex-direction: column;
  }

  .formulario {
    margin-top: 15px;
    display: flex;
    flex-direction: column;
    gap: 20px;
  }

  input:not(.radio), select {
    text-indent: 5px;
    min-height: 40px;
  }

  .radio {
    margin-right: 5px;
  }

  .list {
    max-height: 80vh;
    overflow-y: scroll;
  }

  .list-body {
    border-spacing: 0;
    border-radius: 8px;
    background-color: #afdfdfad;
    margin-top: 10px;

    td {
      &:not(:last-child) {
        border-right: 1px solid black;
      }
      padding-block: 8px;
      padding-inline: 15px;
      font-family: 'Verdana';
    }

    tr:first-child {
      td {
        font-size: 18px;
        padding-block: 5px;
        border-bottom: 1px solid black;
        font-family: 'Poppins';
        font-weight: bold;
      }
    }
  }

  .round-button {
    transform: translateX(10px);
    height: 30px;
    aspect-ratio: 1;
  }

  .delete {
    width: 10px;
  }

  .edit {
    background-color: #005c8c;
  }

  .area-filtro {
    display: flex;
    gap: 10px;
    & > input {
      min-width: 300px;
    }
  }

  .ordenavel {
    cursor: pointer;
  }
</style>
