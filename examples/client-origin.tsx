import React, { FC, useRef } from 'react';
import { Animated, View, StyleSheet, PanResponder, Text } from 'react-native';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import BottomSheet from '@gorhom/bottom-sheet';

export const Adjustorder: FC<any> = (globalProps?: any) => {
  const pan = useRef(new Animated.ValueXY()).current;

  const panResponder = useRef(
    PanResponder.create({
      onMoveShouldSetPanResponder: () => true,
      onPanResponderGrant: () => {
        pan.setOffset({
          x: pan.x._value,
          y: pan.y._value,
        });
      },
      onPanResponderMove: Animated.event([null, { dx: pan.x, dy: pan.y }]),
      onPanResponderRelease: () => {
        pan.flattenOffset();
      },
      onPanResponderTerminate: () => {
        console.log('======');
      },
    }),
  ).current;

  return (
    <View style={{ flex: 1 }}>
      <GestureHandlerRootView style={styles.mapContainer}>
        <BottomSheet
          index={1}
          snapPoints={['25%', '50%', '90%']}
          onChange={() => {}}
          topInset={10}
          enableAccessibilityChangeAnnouncement={true}
          enableContentPanningGesture={false}>
          <View style={styles.container}>
            <Text style={styles.titleText}>Drag this box!</Text>
            <Animated.View
              style={{
                transform: [{ translateX: pan.x }, { translateY: pan.y }],
              }}
              {...panResponder.panHandlers}>
              <View style={styles.box} />
            </Animated.View>
          </View>
        </BottomSheet>
      </GestureHandlerRootView>
    </View>
  );
};

const styles = StyleSheet.create({
  mapContainer: {
    flex: 1,
    justifyContent: 'flex-end',
  },
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#888888',
  },
  titleText: {
    fontSize: 14,
    lineHeight: 24,
    fontWeight: 'bold',
  },
  box: {
    height: 150,
    width: 150,
    backgroundColor: 'blue',
    borderRadius: 5,
  },
});

export default Adjustorder;
