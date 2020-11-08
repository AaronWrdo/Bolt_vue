<template>
  <label for="file" class="file-choser">
    <div class="file-choser-desc">
      <svg class="icon" aria-hidden="true">
        <use xlink:href="#icon-dianying"></use>
      </svg>
      <p>点击或拖拽添加文件</p>
    </div>
  </label>
</template>
<script>
export default {
  name: "FilePrompt"
};
</script>
<style>
.file-choser {
  display: block;
  width: 100%;
  height: 100%;
  border: 3px #ddd dashed;
  border-radius: 5px;
}

.file-choser:hover {
  border: 3px #69c0ff dashed;
}

.file-choser-desc {
  text-align: center;
  color: #ddd;
  position: relative;
  top: 50%;
  transform: translateY(-50%);
}

.file-choser-desc * {
  font-size: 22px;
  margin: 5px 0;
}
</style>
