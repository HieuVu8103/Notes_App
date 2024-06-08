import React, { useEffect } from "react";
import { View, StyleSheet, Text } from "react-native";
import { COLORS, LABELS, NOTES, EDITNAME } from "../../data/dummy-data";
import { ScrollView } from "react-native";
import { useRoute } from "@react-navigation/native";
import { Ionicons } from "@expo/vector-icons";
function EditFunction({ isClick }) {
  const route = useRoute();
  const { noteId } = route.params;
  const note = NOTES.find((n) => n.id === noteId);

  function getLabelByValue(value) {
    const label = LABELS.find((label) => label.id === value);
    return label ? label.label : null;
  }


  return (
    <View style={styles.container}>
        <View style={styles.scrollBar}>
      <ScrollView horizontal>
        <View style={styles.color_bar}>
          <View style={styles.emptyCircle}>
            <Text style={{ textAlign: "center", fontSize: 12 }}>No color</Text>
          </View>
          {COLORS.map((color, index) => (
            <View
              key={index}
              style={[styles.colorCircle, { backgroundColor: color }]}
            />
          ))}
        </View>
      </ScrollView>
      </View>
      <View style={styles.noteLabel}>
       {note.labelIds.map((labelId, index) => (
          <Text key={index} style={styles.noteLabelText}>
            {getLabelByValue(labelId)}
          </Text>
        ))}
        <Text style={styles.noteLabelText}> + Manage Labels</Text>
      </View>
      <View>
        {EDITNAME.map((edit, index) => (
            <View key={index} style={styles.editCategory}>
                <Ionicons name={edit.img} size={18} color="grey"></Ionicons>
                <Text style={{fontSize: 18, color: 'grey'}}>{edit.editName}</Text>
            </View>
        ))}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: "white",
  },
  scrollBar:{
  },
  color_bar: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-around",
    alignItems: "center",
    paddingVertical: 10,
    paddingHorizontal: 20,
    shadowColor: "grey",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
    gap: 10,
  },
  colorCircle: {
    width: 40,
    height: 40,
    borderRadius: 20,
  },
  emptyCircle: {
    width: 40,
    height: 40,
    borderRadius: 20,
    borderWidth: 2,
    borderColor: "black",
  },
  noteLabel: {
    display: 'flex',
    flexDirection: 'row',
    paddingHorizontal: 8,
    paddingVertical: 8,
    borderRadius: 12,
    marginRight: 8,
    fontSize: 12,
  },
  noteLabelText: {
    backgroundColor: '#f9f9f9',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 12,
    marginRight: 8,
    marginBottom: 4,
    maxWidth: 150,
    fontSize: 12,
    color: 'gray'
  },
  editCategory: {
    display: 'flex',
    flexDirection: 'row',
    padding: 10,
    alignItems: 'center',
    gap: 10,
  }
});

export default EditFunction;
