import { hilog } from '@kit.PerformanceAnalysisKit';
import testNapi from 'liblibrary.so';

@Component
export struct MainPage {
  @State message: string = 'Hello World';

  build() {
    Row() {
      Column() {

      }
      .width('100%')
    }
    .height('100%')
  }
}