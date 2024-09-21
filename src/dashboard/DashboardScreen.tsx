import {FlatList, StyleSheet, View} from 'react-native';

import EmptyScreen from '$common/components/EmptyScreen';
import {DASHBOARD} from '$common/constants/strings.constants';
import {useAppSelector} from '$common/redux/redux.hooks';
import {TItem} from '$dashboard/dashboard.types';

// TODO: Use specific type instead of any
const DashboardScreen = ({navigation}: any) => {
  const items = useAppSelector(state => state.dashboard.filteredItems);

  const allItems = useAppSelector(state => state.dashboard.items);

  const renderItem = (itemObj: TItem) => {
    return <View></View>;
  };

  return (
    <>
      {!items || items?.length === 0 ? (
        <EmptyScreen
          message={
            allItems?.length === 0
              ? DASHBOARD.comingSoon
              : DASHBOARD.searchBox.noResults
          }
          iconName="home-outline"
        />
      ) : null}
      <View style={styles.container}>
        <FlatList
          data={items}
          renderItem={({item}) => renderItem(item)}
          keyExtractor={item => item.id}
        />
      </View>
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});

export default DashboardScreen;
