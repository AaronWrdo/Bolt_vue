<template>
  <nav class="nav">
    <div class="nav-left">
      <svg class="icon" aria-hidden="true">
        <use xlink:href="#icon-shandian"></use>
      </svg>
      <h1>Bolt</h1>
    </div>
    <ul class="nav-right">
      <li><a>使用说明</a></li>
      <li>
        <a>
          <svg class="icon" aria-hidden="true">
            <use xlink:href="#icon-rijianmoshi"></use>
          </svg>
          <svg class="icon hidden" aria-hidden="true">
            <use xlink:href="#icon-yejianmoshi"></use>
          </svg>
        </a>
      </li>
    </ul>
  </nav>
</template>
<script>
export default {
  name: "Nav"
};
</script>
<style>
nav {
  min-width: 800px;
  height: 45px;
  line-height: 45px;
  color: #fff;
  background-color: #434343;
  box-shadow: 0px 1px 5px #434343;
}

.nav-left h1 {
  float: left;
  font-size: 20px;
  font-family: cursive;
}

.nav-left svg {
  height: 45px;
  font-size: 2em;
  float: left;
  margin: 0 10px 0 15px;
}

ul {
  list-style-type: none;
  margin: 0;
  padding: 0;
  float: right;
}

li {
  float: left;
}

li a {
  display: block;
  text-align: center;
  padding: 0 20px;
  text-decoration: none;
  font-size: 16px;
}

li a:hover {
  background-color: #595959;
}
</style>
