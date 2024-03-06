import { StatusBar } from 'expo-status-bar';
import { LogBox, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { Audio } from 'expo-av';
import React, {useState} from 'react';
import {AntDesign} from '@expo/vector-icons';
import Player from './Player';

export default function App() {

  LogBox.ignoreAllLogs(true);

  const [audioIndex,setarAudioIndex] = useState(0);

  const [playing,setPlaying] = useState(false);
  
  const [audio,setarAudio] = useState(null);

  const [musicas, setarMusicas] = useState([
    {
      nome: 'Cicatriz',
      artista: 'Enygma Rapper',
      playing: false,
      file: require('./Cicatriz _ Guts.mp3')
    },
    {
      nome: 'Rap do Zoro',
      artista: '7 Minutos',
      playing: false,
      file: require('./Cicatriz _ Guts.mp3')
    },
    {
      nome: 'Rap do Sukuna',
      artista: 'Takeru',
      playing: false,
      file: require('./Cicatriz _ Guts.mp3')
    },
    {
      nome: 'Rap do Naruto',
      artista: 'Enygma Rapper',
      playing: false,
      file: ''
    },
    {
      nome: 'Rap do Asta',
      artista: '7 Minutos',
      playing: false,
      file: ''
    },
    {
      nome: 'Rap do Goku',
      artista: 'Takeru',
      playing: false,
      file: ''
    },
    {
      nome: 'Rap do Naruto',
      artista: 'Enygma Rapper',
      playing: false,
      file: ''
    },
    {
      nome: 'Rap do Asta',
      artista: '7 Minutos',
      playing: false,
      file: ''
    },
    {
      nome: 'Rap do Goku',
      artista: 'Takeru',
      playing: false,
      file: ''
    },
    {
      nome: 'Rap do Naruto',
      artista: 'Enygma Rapper',
      playing: false,
      file: ''
    },
    {
      nome: 'Rap do Asta',
      artista: '7 Minutos',
      playing: false,
      file: ''
    },
    {
      nome: 'Rap do Goku',
      artista: 'Takeru',
      playing: false,
      file: ''
    }
  ]);

  const changeMusic = async (id) =>{
    let curFile = null;
    let newMusics = musicas.filter((val,k)=>{
          if(id == k){
              musicas[k].playing = true;
             
              curFile = musicas[k].file;
              setPlaying(true);
              setarAudioIndex(id);
          }
          else{
              musicas[k].playing = false;
          }

          return musicas[k];
    })

    if(audio != null){
        audio.unloadAsync();
    }

    let curAudio = new Audio.Sound();

    try{
        await curAudio.loadAsync(curFile);
        await curAudio.playAsync();
    }catch(error){}

    setarAudio(curAudio);
    setarMusicas(newMusics);

}


  return (
    <View style={{flex: 1}}>
      <ScrollView style={styles.container}>
      <StatusBar hidden/>

      <View style={styles.header}>
        <Text style={{textAlign: 'center', color: '#fff', fontSize: 25}}>Music Geek</Text>
      </View>


      <View style={styles.table}>
        <Text style={{width: '50%', color: 'rgb(200,200,200)'}}>Musica</Text>
        <Text style={{width: '50%', color: 'rgb(200,200,200)'}}>Artista</Text>
      </View>


      {
        musicas.map((val,k) => {
          if(val.playing){
            //renderiza
            return(
              <View style={styles.table}>
              <TouchableOpacity onPress={() => changeMusic(k)} style={{width: '100%', flexDirection: 'row'}}>
                <Text style={styles.tableTextSelected}><AntDesign name='play' size={15} color={'red'}/>  {val.nome}</Text>
                <Text style={styles.tableTextSelected}>{val.artista}</Text>
              </TouchableOpacity>
            </View>
            );
          } else{
            //outro render
            return(
              <View style={styles.table}>
              <TouchableOpacity onPress={() => changeMusic(k)} style={{width: '100%', flexDirection: 'row'}}>
                <Text style={styles.tableText}><AntDesign name='play' size={15} color={'#fff'}/>  {val.nome}</Text>
                <Text style={styles.tableText}>{val.artista}</Text>
              </TouchableOpacity>
            </View>
            );
          }
        })
      }

    <View style={{paddingBottom: 200}}></View>
    </ScrollView>

    <Player playing={playing}  setPlaying={setPlaying} setarAudioIndex={setarAudioIndex} audioIndex={audioIndex} musicas={musicas}
        setarMusicas={setarMusicas} audio={audio} setarAudio={setarAudio}
      ></Player>

    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#191414',
  },
  header: {
    backgroundColor: '#911c2b',
    width: '100%',
    padding: 20
  },
  table: {
    flexDirection: 'row',
    padding: 20,
    borderBottomColor: '#fff',
    borderBottomWidth: 1
  },
  tableTextSelected: {
    width: '50%', 
    color: 'red'
  },
  tableText:{
    width: '50%', color: '#fff'
  }
});
