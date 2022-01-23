import React from 'react';
import { Text, Pressable, StyleSheet } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons'

class PlayButton extends React.PureComponent {
  render() {
    return (
      <Pressable style={styles.button}>
        <Icon name={'caret-forward-outline'} size={30} color={'#fff'}/>
      </Pressable>
    );
  }
}

const styles = StyleSheet.create({
  button: {
    position: 'absolute',
    top: -30,
    right: -170,
    borderRadius: 50,
    width: 50,
    padding: 10,
    backgroundColor: '#4481FF'
  }
});

export default PlayButton;