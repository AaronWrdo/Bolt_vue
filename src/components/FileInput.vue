<template>
  <input id="file" type="file" accept=".mp4, .ass" @change="handleFile" />
</template>
<script>
export default {
  name: "FileInput",
  data() {
    return {
      subtitleList: []
    };
  },
  methods: {
    handleFile(e) {
      const input = e.target;
      const file = input.files[0];
      if (!file) return;
      const fileName = file.name;
      const fileType = fileName.split(".").pop(); // 获取文件类型

      switch (fileType) {
        // 读取并解析字幕文件
        // todo: 支持 .srt 格式
        case "ass":
          {
            const that = this;
            var reader = new FileReader(); // 创建一个 FR 对象
            reader.readAsText(file); //读取文件的内容
            reader.onload = function() {
              //当读取完成后回调这个函数,然后此时文件的内容存储到了result中,直接操作即可
              const sbtStr = this.result;
              that.subtitleList = that.parse(sbtStr, fileType); // 解析文件内容，获得字幕 list
              that.$emit("upload-subtitle", that.subtitleList);
            };
          }
          break;

        // 视频文件
        case "mp4": {
          let url = URL.createObjectURL(file);
          const res = {
            name: fileName,
            type: file.type,
            src: url
          };
          this.$emit("upload-video", res);
          //   appendVideo(url);
          // onVideoLoaded();
          //   const title = document.getElementById("title");
          //   title.textContent = fileName;
          //   if (this.subtitleList.length > 0) {
          //     // onVideoAndTransLoaded(subtitleList);
          //   }
          break;
        }

        default:
          window.alert("不支持的文件类型！");
      }
    },
    parse(sbtStr, type) {
      switch (type) {
        case "ass":
          return this.parseAss(sbtStr);
        case "srt":
          return this.parseSrt(sbtStr);
        default:
          break;
      }
      return [];
    },
    parseAss(subtitle) {
      try {
        let lines = []; // result

        // split into dialogues
        const dialogues = subtitle.match(/Dialogue.+\r\n/g);
        if (dialogues.length <= 0) throw Error("匹配出错！");

        // do with every dialogue
        dialogues.map(dialogue => {
          // filter desc dialogue
          // if ( /0\,0\,0\,/g.test(dialogue) ) return; // remove lines with '0, 0, 0,'
          if (/,{2}\{/g.test(dialogue)) return; // remove lines with '{\xxx'

          // parse times
          const slots = dialogue.match(/\d:\d{2}:\d{2}\.\d+/g);
          if (slots.length !== 2) throw Error("匹配出错！");

          // parse texts
          const text = dialogue
            .replace(/Dialogue.*,,/g, "")
            .replace(/\r\n/g, "")
            .split(/(\\N|\{.*\})/g);
          const texts = text.filter(
            item => item && !/(\\N|\{.*\})/g.test(item)
          );

          lines = [
            ...lines,
            {
              from: this.slot2Secs(slots[0]),
              to: this.slot2Secs(slots[1]),
              text1: texts[0] || "",
              text2: texts[1] || ""
            }
          ];
          // 解决字幕乱序问题
          lines.sort((a, b) => a.from - b.from);
        });
        return lines;
      } catch (e) {
        console.log(e);
      }
    },
    parseSrt(subtitle) {
      console.log(subtitle);
    },
    slot2Secs(str) {
      if (!str) return "";
      str = str.split(":");
      const time =
        parseInt(str[0]) * 60 * 60 + parseInt(str[1]) * 60 + parseFloat(str[2]);
      return time;
    }
  }
};
</script>
