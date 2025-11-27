import {RNAbility} from '@rnoh/react-native-openharmony';
import { AbilityConstant, Want } from '@kit.AbilityKit';
// import { WechatLibTurboModule } from '@react-native-ohos/react-native-wechat-lib';

export default class EntryAbility extends RNAbility {

  onCreate(want: Want) {
    super.onCreate(want)
    // this.handleWeChatCallIfNeed(want)
  }

  getPagePath() {
    return 'pages/Index';
  }

  onNewWant(want: Want, _launchParam: AbilityConstant.LaunchParam): void {
    // this.handleWeChatCallIfNeed(want)
  }

  // private handleWeChatCallIfNeed(want: Want) {
  //   WechatLibTurboModule.handleWant(want)
  // }
}
