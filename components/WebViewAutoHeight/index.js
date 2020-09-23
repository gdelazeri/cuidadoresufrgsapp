import React, { useState } from 'react'
import { Dimensions} from 'react-native'
import { WebView } from 'react-native-webview'


export default ({ html, padding = 0 }) => {

  const [webViewHeight, setWebViewHeight] = useState(10)

  const onWebViewMessage = (event) => {
    setWebViewHeight(Number(event.nativeEvent.data))
  }

  return (
    <WebView
      scrollEnabled={false}
      onMessage={onWebViewMessage}
      injectedJavaScript='window.ReactNativeWebView.postMessage(document.body.scrollHeight)'
      source={{ html }}
      style={{ width: Dimensions.get('window').width - padding, height: webViewHeight + padding }}
    />
  )
}