import {Skeleton as LibrarySkeleton, useTheme} from '@rneui/themed';
import React from 'react';
import {ViewProps, ViewStyle, StyleProp, StyleSheet, View} from 'react-native';

type SkeletonProps = ViewProps & {
  animation?: 'none' | 'pulse' | 'wave';
  circle?: boolean;
  height?: ViewStyle['height'];
  skeletonStyle?: StyleProp<ViewStyle>;
  width?: ViewStyle['width'];
};

const SkeletonLoader = ({
  animation = 'wave',
  circle = false,
  height = 40,
  skeletonStyle = {},
  width = 80,
}: SkeletonProps) => {
  const {theme} = useTheme();
  return (
    <View
      style={[styles.container, {backgroundColor: theme.colors.background1}]}>
      {[...Array(15)].map((obj: any, index: number) => (
        <React.Fragment key={index}>
          <LibrarySkeleton
            animation={animation}
            circle={circle}
            height={height}
            skeletonStyle={[
              styles.skeleton,
              skeletonStyle,
              {backgroundColor: theme.colors.background3},
            ]}
            width={width}
          />
        </React.Fragment>
      ))}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    columnGap: 50,
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'center',
    paddingTop: 50,
    rowGap: 50,
  },
  skeleton: {},
});

export default SkeletonLoader;
