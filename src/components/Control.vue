<template>
  <div class="control">
    <div class="changeDiv">
      速度 x
      <input
        label="速度"
        id="velocity"
        type="number"
        value="1.0"
        step="0.1"
        min="0"
        max="2"
      />
    </div>
    <button id="addShield">添加字幕遮挡</button>
    <button onclick="">字幕设置</button>
    <button onclick="">快捷键设置</button>
    <button><label for="file">重新选择文件</label></button>
    <div id="choose-sub">
      <div>
        主字幕
        <input type="checkbox" />字幕1 <input type="checkbox" />字幕2
      </div>
      <div>
        副字幕
        <input type="checkbox" />字幕1 <input type="checkbox" />字幕2
      </div>
    </div>
    <div class="changeDiv">
      循环起:
      <div id="loop_from"></div>
    </div>
    <div class="changeDiv">
      循环终:
      <div id="loop_to"></div>
    </div>
  </div>
</template>

<script>
export default {
  name: "Control"
};
</script>

<style></style>
