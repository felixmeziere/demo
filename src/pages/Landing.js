// @flow
import React, { Component } from 'react';
import { StyleSheet, View, Image } from 'react-native';

import { Page, Button, SecondaryFlatButton } from 'components';
import theme from 'theme';
import I18n from 'lib/i18n';
import LottieView from 'lottie-react-native';
import flag from '../theme/animations/uk.json';
import { RSA, RSAKeychain } from 'react-native-rsa-native';

type Props = {
  navigation: any,
};

class Landing extends Component<void, Props, void> {
  componentDidMount = () => {
    RSA.generateKeys(1024) // set key size
      .then(keys => {
        console.log('1024 public:', keys.public); // the public key
        console.log('1024 private:', keys.private); // the public key
      });
  };
  render() {
    return (
      <Page style={styles.content} backgroundImage={theme.images.landing}>
        <View style={styles.imageContainer}>
          <Image source={theme.images.logo} />
        </View>
        <View>
          <Button
            onPress={() => this.props.navigation.navigate('signup')}
            text={I18n.t('landing.register')}
          />
          <SecondaryFlatButton
            onPress={() => this.props.navigation.navigate('login')}
            text={I18n.t('landing.login')}
          />
        </View>
        <LottieView style={{ height: 100, alignSelf: 'center' }} source={flag} autoPlay loop />
      </Page>
    );
  }
}

const styles = StyleSheet.create({
  content: {
    justifyContent: 'space-around',
  },
  imageContainer: {
    alignItems: 'center',
  },
});

export default Landing;
