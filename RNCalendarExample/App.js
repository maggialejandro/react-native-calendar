/**
 * RNCalendar Example
 * @flow
 */

import React from 'react';
import { View, Modal, Text, Platform } from 'react-native';
import Calendar from 'react-native-calendario';

const iOS = Platform.OS === 'ios';
const THEME = {
  weekColumnTextStyle: {
    color: '#b6c1cd',
    fontSize: 13,
  },
  weekColumnStyle: {
    paddingVertical: 10,
  },
  weekColumnsContainerStyle: {
  },
  monthTitleTextStyle: {
    color: '#6d95da',
    fontWeight: '300',
    fontSize: 16,
  },
  emptyMonthTextStyle: {
    fontWeight: '200',
  },
  nonTouchableDayTextStyle: {
    color: 'white',
  },
  dayContainerStyle: {
    marginVertical: 3,
  },
  dayTextStyle: {
    color: '#2d4150',
    fontWeight: '200',
    fontSize: 15,
  },
  activeDayContainerStyle: {
    backgroundColor: '#6d95da',
  },
  activeDayTextStyle: {
    color: 'white',
  },
};

function CloseButton({ onClose, children }) {
  return (
    <View style={{ marginTop: iOS ? 40 : 0 }}>
      <Text
        style={{ fontSize: 20, marginLeft: 10 }}
        onPress={() => onClose()}
      >
        Close
      </Text>
      {children}
    </View>
  );
}

export default class App extends React.PureComponent<{}, {
  isVisibleModalCustom: boolean
}> {
  state = {
    isVisibleModalCustom: false,
  }

  handleOpenCustomModal = () => {
    this.setState({ isVisibleModalCustom: true });
  };

  handleCloseCustomModal = () => {
    this.setState({ isVisibleModalCustom: false });
  };

  renderDayContent = (item: DayType) => {
    const { isActive, date } = item;
    return (
      <Text
        style={[
          { color: isActive ? 'green' : 'grey' },
          THEME.dayTextStyle,
          isActive ? THEME.activeDayTextStyle : {},
        ]}
      >
        {date.getDate()}
      </Text>
    );
  }

  render() {
    return (
      <View style={{ marginTop: iOS ? 20 : 0 }}>
        <Text
          style={{
            color: '#6d95da',
            fontWeight: 'bold',
            textAlign: 'center',
            marginTop: 50,
          }}
          onPress={this.handleOpenCustomModal}
        >
          Open Calendar
        </Text>

        <Modal
          animationType="fade"
          onRequestClose={() => this.setState({ isVisibleModalCustom: false })}
          visible={this.state.isVisibleModalCustom}
        >
          <CloseButton onClose={this.handleCloseCustomModal}>
            <Calendar
              monthHeight={370}
              startingMonth="2018-08-01"
              startDate="2018-08-20"
              endDate="2018-09-20"
              numberOfMonths={100}
              initialListSize={6}
              onChange={console.log}
              theme={THEME}
              renderDayContent={this.renderDayContent}
            />
          </CloseButton>
        </Modal>
      </View>
    );
  }
}
