import React from 'react';
import { View, StyleSheet, ActivityIndicator } from 'react-native';
import { WebView } from 'react-native-webview';

const RequestAppointment = () => {
  const calendlyUrl = 'https://calendly.com/veterinariadavinci98/30min';

  const LoadingIndicatorView = () => {
    return (
      <ActivityIndicator
        size="large"
        color="#6200EE"
        style={styles.loadingIndicator}
      />
    );
  };

  return (
    <View style={styles.container}>
      <WebView
        source={{ uri: calendlyUrl }}
        startInLoadingState={true}
        renderLoading={LoadingIndicatorView}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  loadingIndicator: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default RequestAppointment;
