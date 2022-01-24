import React from 'react';
import {Text, SafeAreaView, View, TouchableOpacity, Image, StyleSheet} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import PropTypes from 'prop-types';
import Colors from '../theme/Colors';

const propTypes = {
  main: PropTypes.bool
};

const defaultProps = {
  main: false
};

class NavBar extends React.PureComponent {
  render() {
    const {navigation, main} = this.props;
    return (
      <SafeAreaView>
        { main ? (
          <View style={styles.mainNav}>
            <Image style={styles.logo} source={require('../assets/images/movies.png')}/>
            <TouchableOpacity onPress={() => {navigation.navigate('Search')}}>
              <Icon name={'search-outline'} size={30} color={Colors.black}/>
            </TouchableOpacity>
          </View>
        ) : (
          <View>
            <TouchableOpacity onPress={() => {navigation.goBack()}}>
              <Icon name={'chevron-back'} size={35} color={Colors.black} />
            </TouchableOpacity>
          </View>
        )}
      </SafeAreaView>
    );
  }
}

const styles = StyleSheet.create({
  mainNav: {
    justifyContent: 'space-between',
    flexDirection: 'row',
    padding: 10,
    alignItems: 'center'
  },
  logo: {
    width: 35,
    height: 35
  }
})

NavBar.propTypes = propTypes;
NavBar.defaultProps = defaultProps;

export default NavBar;