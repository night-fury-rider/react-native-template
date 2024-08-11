import React from 'react';
import {View, StyleSheet} from 'react-native';
import {Card, Icon, ListItem, useTheme} from '@rneui/themed';

import {COLORS} from '$clubhouse/constants/colors.constants';
import {TLabeledItem} from '$dashboard/dashboard.types';

type TTileProps = {
  title: string;
  styles?: object;
  titleStyles?: object;
  labeledItems?: TLabeledItem[];
};

const Tile = ({title, titleStyles, labeledItems}: TTileProps) => {
  const {theme} = useTheme();
  if (labeledItems?.length === 0) {
    return null;
  }
  return (
    <View style={styles.container}>
      <Card
        containerStyle={[
          styles.card,
          {backgroundColor: theme.colors.background8},
        ]}>
        <Card.Title style={[styles.cardTitle, titleStyles]}>{title}</Card.Title>
        <Card.Divider />

        {labeledItems?.map((labeledObj, itemIndex) => (
          <React.Fragment
            key={`${itemIndex}_${labeledObj?.label}_${labeledObj?.value}_${labeledObj?.leftIcon}_${labeledObj?.rightIcon}`}>
            {labeledObj?.value ? (
              <ListItem
                onPress={() => {
                  labeledObj?.leftIconCallback?.(labeledObj.value);
                }}
                containerStyle={[
                  styles.listItemContainer,
                  {backgroundColor: theme.colors.background8},
                ]}>
                {labeledObj?.leftIcon ? (
                  <Icon
                    disabledStyle={styles.disabledIcon}
                    name={labeledObj?.leftIcon || 'plus'}
                    brand={labeledObj?.leftIconBrand || false}
                    type={labeledObj?.leftIconType || 'material-community'}
                    color={labeledObj?.leftIconColor || theme.colors.text1}
                    onPress={() =>
                      labeledObj?.leftIconCallback?.(labeledObj.value)
                    }
                    style={
                      labeledObj?.leftIconType === 'fontisto'
                        ? styles.fontistoIconContainer
                        : {}
                    }
                  />
                ) : null}

                <ListItem.Content>
                  <ListItem.Title>{labeledObj?.value}</ListItem.Title>
                  {labeledObj?.label ? (
                    <ListItem.Subtitle>{labeledObj?.label}</ListItem.Subtitle>
                  ) : null}
                </ListItem.Content>
                {labeledObj?.rightIcon ? (
                  <Icon
                    name={labeledObj?.rightIcon || 'plus'}
                    brand={labeledObj?.rightIconBrand || false}
                    type={labeledObj?.rightIconType || 'material-community'}
                    color={labeledObj?.rightIconColor || theme.colors.text1}
                    onPress={() =>
                      labeledObj?.rightIconCallback?.(labeledObj.value)
                    }
                  />
                ) : null}
              </ListItem>
            ) : null}
          </React.Fragment>
        ))}
      </Card>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: '100%',
    marginBottom: '10%',
  },
  card: {
    borderRadius: 10,
  },
  cardTitle: {},
  listItemContainer: {},
  disabledIcon: {
    backgroundColor: COLORS.transparent,
  },
  fontistoIconContainer: {paddingHorizontal: 5},
});

export default Tile;
