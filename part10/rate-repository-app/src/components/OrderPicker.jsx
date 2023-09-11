import {Modal, StyleSheet, TouchableOpacity, View, Text} from "react-native";
import SpecialText from "./theme/SpecialText";

const OrderPicker = ({ onSelectOrder, onClose }) => {
  return (
    <Modal
      animationType="slide"
      transparent={true}
      visible={true}
      onRequestClose={onClose}
    >
      <View style={styles.centeredView}>
        <View style={styles.modalView}>
          <TouchableOpacity style={styles.closeButton} onPress={onClose}>
            <Text style={styles.closeText}>X</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => { onSelectOrder("CREATED_AT_DESC"); onClose(); }}>
            <SpecialText style={{margin: 8}}>Latest repositories</SpecialText>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => { onSelectOrder("RATING_AVERAGE_DESC"); onClose(); }}>
            <SpecialText style={{margin: 8}}>Highest rated repositories</SpecialText>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => { onSelectOrder("RATING_AVERAGE_ASC"); onClose(); }}>
            <SpecialText style={{margin: 8}}>Lowest rated repositories</SpecialText>
          </TouchableOpacity>
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  centeredView: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  modalView: {
    width: '80%',
    backgroundColor: "white",
    borderRadius: 20,
    padding: 20,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5
  },
  closeButton: {
    alignSelf: 'flex-end',
    margin: 10,
    backgroundColor: 'red',
    borderRadius: 15,
    width: 30,
    height: 30,
    alignItems: 'center',
    justifyContent: 'center',
  },
  closeText: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: 18,
  },
  optionButton: {
    paddingVertical: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#d3d3d3',
    width: '100%',
    alignItems: 'center',
  },
  optionText: {
    fontSize: 16,
    fontWeight: 'bold',
  }
});

export default OrderPicker;