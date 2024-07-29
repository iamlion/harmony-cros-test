import WebView from '@ohos.web.webview';

@Entry
@Component
struct Index {
  @State message: string = 'Hello World';
  @State pageUrl: string = 'https://www.baidu.com';

  webviewController: WebView.WebviewController = new WebView.WebviewController("ec-scheme-handler");


  build() {
    Row() {
      Column() {
        Web({ src: $rawfile("page/index.html"), controller: this.webviewController })
          .zoomAccess(true)
          .overScrollMode(OverScrollMode.ALWAYS)//回弹效果
          .backgroundColor(Color.White)
          .height("100%")
          .width("100%")
          .layoutWeight(1)
          .javaScriptAccess(true)
          .fileAccess(true)
          .domStorageAccess(true)// 必须，用于localstorage存储。
          .mixedMode(MixedMode.All)// 混合模式，用于https链接中访问http资源
      }
      .width('100%')
    }
    .height('100%')
  }
}