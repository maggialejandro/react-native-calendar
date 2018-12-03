// @flow
import React from 'react';
import { View, Modal, Text, Platform } from 'react-native';
import Calendar from 'react-native-calendario';

const iOS = Platform.OS === 'ios';
const THEME = {
  activeDayColor: {},
  monthTitleTextStyle: {
    color: '#6d95da',
    fontWeight: '300',
    fontSize: 16,
  },
  emptyMonthContainerStyle: {},
  emptyMonthTextStyle: {
    fontWeight: '200',
  },
  weekColumnsContainerStyle: {},
  weekColumnStyle: {
    paddingVertical: 10,
  },
  weekColumnTextStyle: {
    color: '#b6c1cd',
    fontSize: 13,
  },
  nonTouchableDayContainerStyle: {},
  nonTouchableDayTextStyle: {},
  startDateContainerStyle: {},
  endDateContainerStyle: {},
  dayContainerStyle: {},
  dayTextStyle: {
    color: '#2d4150',
    fontWeight: '200',
    fontSize: 15,
  },
  dayOutOfRangeContainerStyle: {},
  dayOutOfRangeTextStyle: {},
  activeDayContainerStyle: {
    backgroundColor: '#6d95da',
  },
  activeDayTextStyle: {
    color: 'white',
  },
  nonTouchableLastMonthDayTextStyle: {},
};

function CloseButton({ onClose, children }) {
  return (
    <View style={{ marginTop: iOS ? 40 : 0 }}>
      <Text style={{ fontSize: 20, marginLeft: 10 }} onPress={onClose}>
        Close
      </Text>
      {children}
    </View>
  );
}

export default class App extends React.PureComponent<
  {},
  {
    isVisibleModalCustom: boolean,
  },
> {
  state = {
    isVisibleModalCustom: false,
  };

  handleOpenCustomModal = () => {
    this.setState({ isVisibleModalCustom: true });
  };

  handleCloseCustomModal = () => {
    this.setState({ isVisibleModalCustom: false });
  };

  renderDayContent = (item: DayType) => {
    const { isActive, date } = item;
    return (
      <View style={{ justifyContent: 'center', alignItems: 'center' }}>
        <Text
          style={[
            { color: isActive ? 'green' : 'grey' },
            THEME.dayTextStyle,
            isActive ? THEME.activeDayTextStyle : {},
          ]}
        >
          {date.getDate()}
        </Text>
        <Text style={{ fontSize: 7 }}>asd</Text>
      </View>
    );
  };

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
              disableRange
              locale="es"
              monthHeight={370}
              startingMonth="1980-01-01"
              startDate="1990-08-20"
              minDate="1990-08-10"
              // endDate="1990-09-20"
              numberOfMonths={600}
              initialListSize={4}
              onChange={console.log}
              theme={THEME}
              // renderDayContent={this.renderDayContent}
            />
          </CloseButton>
        </Modal>
      </View>
    );
  }
}
