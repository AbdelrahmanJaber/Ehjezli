import React from 'react';
import { View } from 'react-native';
import Svg, { Path } from 'react-native-svg';


export default function WavyHeader({ customStyles }) {
    return (
      <View style={customStyles}>
        <View style={{ backgroundColor: 'rgb(28,158,212)', height: 160 }}>
          <Svg
            height="65%"
            width="100%"
            viewBox="0 0 1440 320"
            style={{ position: 'absolute', top: 130 }}
          >
       
    <Path fill="rgb(28,158,212)" fill-opacity="1" d="M0,128L60,149.3C120,171,240,213,360,224C480,235,600,213,720,176C840,139,960,85,1080,90.7C1200,96,1320,160,1380,192L1440,224L1440,0L1380,0C1320,0,1200,0,1080,0C960,0,840,0,720,0C600,0,480,0,360,0C240,0,120,0,60,0L0,0Z" />
          </Svg>
        </View>
      </View>
    );
  }