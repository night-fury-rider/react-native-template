import {SearchBar, useTheme} from '@rneui/themed';
import {useEffect, useState} from 'react';
import {StyleSheet, View} from 'react-native';

import {COLORS} from '$clubhouse/constants/colors.constants';
import {DASHBOARD} from '$clubhouse/constants/strings.constants';
import {useAppDispatch, useAppSelector} from '$clubhouse/redux/redux.hooks';
import {filterContacts} from '$dashboard/ContactService';
import {resetFilters, setFilteredContacts} from '$dashboard/dashboardSlice';

const DashboardHeader = () => {
  const {theme} = useTheme();
  const dispatch = useAppDispatch();

  const contacts = useAppSelector(state => state.dashboard.contacts);
  const lastModifiedTime = useAppSelector(
    state => state.dashboard.lastModifiedTime,
  );

  const [searchValue, setSearchValue] = useState('');

  // Reset the search string whenever there is update in main contact list
  useEffect(() => {
    setSearchValue('');
  }, [lastModifiedTime]);

  const handleSearchChange = (searchText: any) => {
    setSearchValue(searchText);
    if (searchText) {
      dispatch(setFilteredContacts(filterContacts(contacts, searchText)));
    } else {
      dispatch(resetFilters());
    }
  };
  return (
    <View style={[styles.view, {backgroundColor: theme.colors.background1}]}>
      <SearchBar
        placeholder={DASHBOARD.searchBox.placeholder}
        onChangeText={handleSearchChange}
        round
        searchIcon={{
          name: 'search',
          size: 25,
        }}
        value={searchValue}
        containerStyle={styles.searchBarContainer}
        inputContainerStyle={[
          styles.searchBarInputContainer,
          {backgroundColor: theme.colors.background2},
        ]}
        inputStyle={styles.searchBarInput}
        style={styles.searchBar}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  view: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    padding: 10,
  },
  searchBarContainer: {
    backgroundColor: COLORS.transparent,
    borderColor: COLORS.transparent,
    flex: 8,
  },
  searchBarInputContainer: {
    flexBasis: 40,
  },
  searchBarInput: {},
  searchBar: {},
  avatar: {
    flex: 1,
    marginHorizontal: 10,
  },
});

export default DashboardHeader;
