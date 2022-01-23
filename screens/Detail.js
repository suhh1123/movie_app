import React, { useEffect } from 'react';
import { Text, ScrollView, Image, StyleSheet, Dimensions, ActivityIndicator, View, Modal, Pressable } from 'react-native';
import Star from 'react-native-star-view/lib/Star';
import { useState } from 'react/cjs/react.development';
import { getMovie } from '../services/services';
import dateFormat from 'dateformat';
import PlayButton from '../components/PlayButton';
import Video from '../components/Video';

const placeholderImage = require('../assets/images/placeholder.png');
const height = Dimensions.get('screen').height;

const Detail = ({route, navigation}) => {
  const movieId = route.params.movieId;
  const [movieDetail, setMovieDetail] = useState();
  const [loaded, setLoaded] = useState(false);
  const [modalVisible, setModalVisible] = useState(false);

  useEffect(() => {
    getMovie(movieId).then(movieData => {
      setMovieDetail(movieData);
      setLoaded(true);
    });
  }, [movieId]);

  const videoShown = () => {
    setModalVisible(!modalVisible);
  }

  return (
    <React.Fragment>
      {loaded && (
        <View>
          <ScrollView>
            <Image 
              resizeMode='cover'
              style={styles.image} 
              source={
                movieDetail.poster_path ? 
                {uri: 'https://image.tmdb.org/t/p/w500' + movieDetail.poster_path}
                : placeholderImage
              }
            />
            <View style={styles.container}>
              <View>
                <PlayButton handlePress={videoShown}/>
              </View>
              <Text style={styles.movieTitle}>{movieDetail.title}</Text>
              {movieDetail.genres && (
                <View style={styles.genresContainer}>
                  {movieDetail.genres.map(genre => {
                    return (
                      <Text style={styles.genre} key={genre.id}>{genre.name}</Text>
                    )
                  })}
                </View>
              )}
              <Star style={styles.starStyle} score={movieDetail.vote_average / 2}/>
              <Text style={styles.overview}>{movieDetail.overview}</Text>
              <Text style={styles.release}>{'Release date: ' + dateFormat(movieDetail.release_date, 'mmmm dS, yyyy')}</Text>
            </View>
          </ScrollView>
          <Modal
            supportedOrientations={['portrait', 'landscape']}
            animationType="slide"
            visible={modalVisible}
          >
            <View style={styles.videoModal}>
              <Video onClose={videoShown}/>
            </View>
          </Modal>
        </View>
      )}
      {!loaded && <ActivityIndicator size="large" />}
    </React.Fragment>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  image: {
    height: height / 2,
  },
  movieTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    marginTop: 20,
    marginBottom: 10
  },
  genresContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 20
  },
  genre: {
    marginRight: 10,
    fontWeight: 'bold'
  },
  starStyle: {
    width: 150,
    height: 30,
    marginTop: 10
  },
  overview: {
    padding: 15
  },
  release: {
    fontWeight: 'bold'
  },
  videoModal: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  }
})

export default Detail;