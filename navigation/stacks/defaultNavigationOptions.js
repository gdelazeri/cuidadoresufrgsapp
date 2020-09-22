import React from 'react';

import colors from '../../constants/colors';
import BackBtn from '../../components/BackBtn';

export default ({ navigation }) => ({
  headerTitleAlign: 'center',
  headerStyle: { elevation: 1, shadowOpacity: 1, backgroundColor: colors.green },
  headerTitleStyle: { fontSize: 16, color: '#ffffff' },
  headerLeft: <BackBtn navigation={navigation} color={'#ffffff'} />,
  cardStyle: { backgroundColor: colors.background },
})