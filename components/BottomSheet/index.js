import React, { useMemo } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import {
  BottomSheetModal,
  BottomSheetModalProvider,
} from '@gorhom/bottom-sheet';
import { colors as useColors } from '../../config/styles';
import { theme } from '../../config';

const colors = useColors(theme);

const BottomSheetContainer = ({
  handleSheetChanges,
  bottomSheetModalRef,
  title,
  children,
}) => {

  // variables
  const snapPoints = useMemo(() => ['20%', '30%'], []);

  // renders
  return (
    <BottomSheetModalProvider>
      <BottomSheetModal
        ref={bottomSheetModalRef}
        index={1}
        snapPoints={snapPoints}
        onChange={handleSheetChanges}
        backgroundStyle={styles.contentModalBottomSheet}
        handleIndicatorStyle={{ backgroundColor: colors.white }}
      >
        <View style={{ flex: 1 }}>
          <View>
            <Text style={styles.titleModalBottomSheet}>{title}</Text>
          </View>
          <View style={{ display: 'flex' }}>
            {children}
          </View>
        </View>
      </BottomSheetModal>
    </BottomSheetModalProvider>
  );
};

const styles = StyleSheet.create({
  containerBottomSheet: {
    width: '100%',
    height: '100%',
    padding: 24,
    justifyContent: 'center',
    backgroundColor: 'grey',
  },
  contentModalBottomSheet: {
    backgroundColor: colors.bg[5],
  },
  titleModalBottomSheet: {
    color: colors.white,
    display: 'flex',
    width: '100%',
    textAlign: 'center',
    fontSize: 24,
    fontWeight: '600',
  },
  contentContainerBottomSheet: {
  },
});

export default BottomSheetContainer;