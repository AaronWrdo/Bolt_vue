export function handleVideoShortcut(event, player) {
  var e = event || window.event || arguments.callee.caller.arguments[0];
  if (!e) return;

  switch (e.keyCode) {
    // 按 E 暂停
    case 69:
      {
        if (!player.paused()) player.pause();
        else player.play();
      }
      break;

    // 按 W 回退2秒
    case 87:
      {
        player.currentTime(player.currentTime() - 2);
        player.play();
      }
      break;

    // 按 R 前进2秒
    case 82:
      {
        player.currentTime(player.currentTime() + 2);
        player.play();
      }
      break;

    // '1' 设置循环起点
    // case 49: {
    //     loopFrom = player.currentTime();
    //     _bindAnkerLooper();
    // }; break;

    // // '2' 设置循环终点
    // case 50: {
    //     loopTo = player.currentTime();
    //     _bindAnkerLooper();
    // }; break;

    // // '3' 取消循环
    // case 51: {
    //     loopFrom = undefined;
    //     loopTo = undefined;
    //     _bindAnkerLooper();
    // }; break;
  }
}

export function handleTranscriptShortcut(
  event,
  player,
  subtitleList,
  activeNodeIndex
) {
  var e = event || window.event || arguments.callee.caller.arguments[0];
  if (!e) return;

  switch (e.keyCode) {
    // 按 D 暂停
    case 68:
      {
        if (!player.paused()) player.pause();
        else player.play();
      }
      break;

    // 按 S 播放上一句
    case 83:
      {
        if (activeNodeIndex > 0) {
          player.currentTime(subtitleList[activeNodeIndex - 1].from);
          activeNodeIndex--;
        } else if (activeNodeIndex == 0) {
          player.currentTime(subtitleList[activeNodeIndex].from);
        }
        player.play();
      }
      break;

    // 按 F 播放下一句
    case 70:
      {
        if (activeNodeIndex < subtitleList.length) {
          player.currentTime(subtitleList[activeNodeIndex + 1].from);
          activeNodeIndex++;
        } else if (activeNodeIndex == subtitleList.length) {
          player.currentTime(subtitleList[activeNodeIndex].from);
        }
        player.play();
      }
      break;
  }
}
