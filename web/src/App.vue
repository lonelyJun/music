<template>
  <div id="app">
    <router-view/>
  </div>
</template>

<script>
export default {
  name: 'App'
}
</script>

<style lang="scss">
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  width: 100%;
  height: 100%;
  overflow-x: hidden;
}
::-webkit-scrollbar
{
    width: 6px;
    height: 6px;
}
/*定义滚动条轨道 内阴影+圆角*/
::-webkit-scrollbar-track
{
    border-radius: 10px;
    background-color: #F5F5F5;
}
/*定义滑块 内阴影+圆角*/
::-webkit-scrollbar-thumb
{
    border-radius: 10px;
    background-color: #ccc;
}

.fade-enter-active, .fade-leave-active {
    transition: opacity .5s
}
.fade-enter, .fade-leave-active {
    opacity: 0
}
</style>
