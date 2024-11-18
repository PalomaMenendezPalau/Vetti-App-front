import React from 'react';
import { View, Text } from 'react-native';
import { WebView } from 'react-native-webview';


const RequestAppointment = () => {
  return (
    <View className="flex-1 p-4 bg-white">
      <Text className="text-lg font-bold mb-2">Solicitar Turno</Text>
      <WebView
        className="flex-1"
        source={{
          html: `
            <!DOCTYPE html>
            <html>
              <head>
                <style>
                  body, html { margin: 0; padding: 0; height: 100%; overflow: hidden; }
                </style>
                <script type="text/javascript" src="https://calendly.com/luzzijuanma"></script>
              </head>
              <body>
                <div class="calendly-inline-widget" data-url="https://calendly.com/luzzijuanma" style="min-width:320px;height:600px;"></div>
              </body>
            </html>
          `
        }}
        javaScriptEnabled={true}
        originWhitelist={['*']}
        automaticallyAdjustContentInsets={false}
      />
    </View>
  );
};

export default RequestAppointment;
