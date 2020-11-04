<template>
  <div class="control">
    <div class="changeDiv">
      速度
      <InputNumber
        :max="3"
        :min="0.5"
        :step="0.1"
        v-model="velocity"
        @on-change="changeVelocity"
        :formatter="value => `x${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ',')"
        :parser="value => value.replace(/x\s?|(,*)/g, '')"
      ></InputNumber>
    </div>
    <button @click="changeShieldBarVisible">
      {{ shieldBarVisible ? "隐藏字幕遮挡" : "显示字幕遮挡" }}
    </button>
    <button onclick="">快捷键设置</button>
    <button><label for="file">重新选择文件</label></button>
    <!--
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
    -->
  </div>
</template>
<script>
export default {
  name: "Control",
  data() {
    return {
      velocity: 1
    };
  },
  props: {
    shieldBarVisible: {
      type: Boolean
    }
  },
  methods: {
    changeShieldBarVisible() {
      this.$emit("change-shieldbar-visible", !this.shieldBarVisible);
    },
    changeVelocity(velo) {
      this.$emit("change-velocity", velo);
    }
  }
};
</script>
<style>
/* 
control 
*/
.control {
  margin: 20px;
  /* min-width: 400px; */
  display: flex;
  justify-content: flex-start;
  flex-wrap: wrap;
}

.control > * {
  margin: 8px;
  width: 150px;
  height: 34px;
  text-align: center;
  vertical-align: middle;
}

/* .control .changeDiv {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 4px;
}

.control .changeDiv input {
  height: 34px;
  width: 120px;
  font-size: 1.2em;
  padding: 0 20px;
  border-radius: 34px;
  border: 2px #69c0ff solid;
}

.control .changeDiv input:hover {
  border-color: #40a9ff;
} */

.control button {
  color: #69c0ff;
  background-color: #fff;
  border: 2px #69c0ff solid;
  border-radius: 34px;
}

.control button:hover {
  border-color: #69c0ff;
  background-color: #69c0ff;
  color: #fff;
}
</style>
