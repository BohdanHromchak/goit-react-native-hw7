import {
  Text,
  Image,
  View,
  StyleSheet,
  FlatList,
  Pressable,
} from "react-native";
import { Feather, AntDesign, Ionicons, EvilIcons } from "@expo/vector-icons";
import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import db from "../../Firebase/config";

export default function ProfileScreen({ navigation }) {
  const dispatch = useDispatch();
  const [userPosts, setUserPosts] = useState([]);

  const { userId } = useSelector((state) => state.auth);

  useEffect(() => {
    getUserPosts();
  }, []);

  const getUserPosts = async () => {
    await db
      .firestore()
      .collection("posts")
      .where("userId", "==", userId)
      .onSnapshot((data) =>
        setUserPosts(data.docs.map((doc) => ({ ...doc.data() })))
      );
  };

  const signOut = () => {
    dispatch(authSignOutUser());
  };

  return (
    <View style={styles.container}>
      <Image
        source={require("../../assets/images/screenBg.png")}
        style={styles.backgroundImage}
      />
      <View style={styles.contentWrapper}>
        <View style={styles.avatar}>
          <Image source={require("../../assets/images/userPhoto2.png")} />
          <Pressable style={styles.avatarButton}>
            <AntDesign name="pluscircleo" size={24} color="#E8E8E8" />
          </Pressable>
        </View>

        <Pressable onPress={signOut} style={styles.logOutButton}>
          <Feather name="log-out" size={24} color="#BDBDBD" />
        </Pressable>
        <Text style={styles.userName}>Natali Romanova</Text>

        <FlatList
          data={userPosts}
          keyExtractor={(item, indx) => indx.toString()}
          renderItem={({ item }) => (
            <View style={styles.postContainer}>
              <Image
                // source={item.photo}
                source={{ uri: item.photo }}
                style={styles.postImg}
              />

              <Text style={styles.postName}>{item.name}</Text>

              <View style={styles.infoWrap}>
                <Pressable
                  style={styles.comments}
                  onPress={() => {
                    navigation.navigate("Комментарии", {
                      image: item.photo,
                      postId: item.id,
                    });
                  }}
                >
                  <EvilIcons name="comment" size={24} color="#BDBDBD" />
                  <Text style={styles.commentText}>0</Text>
                </Pressable>

                <Pressable
                  style={styles.location}
                  onPress={() =>
                    navigation.navigate("Карта", {
                      name: item.name,
                      latitude: item.latitude,
                      longitude: item.longitude,
                    })
                  }
                >
                  <Ionicons
                    name="ios-location-outline"
                    size={24}
                    color="#BDBDBD"
                  />
                  <Text style={styles.locationText}>{item.location}</Text>
                </Pressable>
              </View>
            </View>
          )}
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingTop: 120,
    // flex: 1,
    // paddingHorizontal: 16,
    // backgroundColor: "#fff",
  },
  backgroundImage: {
    position: "absolute",
    width: 411,
    zIndex: -1,
  },
  avatar: {
    position: "absolute",
    left: 147,
    top: -61,
  },
  avatarButton: {
    position: "absolute",
    right: -12,
    bottom: 10,
    backgroundColor: "#FFFFFF",
    borderRadius: 50,
  },

  userName: {
    fontFamily: "Roboto-Bold",
    color: "#212121",
    fontSize: 30,
    lineHeight: 35,
    textAlign: "center",
    marginTop: 38,
    marginBottom: 10,
  },
  contentWrapper: {
    backgroundColor: "#fff",
    width: "100%",
    height: "100%",
    paddingHorizontal: 16,
  },
  logOutButton: {
    marginLeft: "auto",
    marginTop: 22,
  },
  postContainer: {
    marginBottom: 20,
    paddingHorizontal: 4,
  },
  postImg: {
    width: "100%",
    height: 240,
    marginBottom: 8,
  },
  postName: {
    fontFamily: "Roboto-Medium",
    fontSize: 16,
    color: "#212121",
    lineHeight: 19,
    marginBottom: 11,
  },
  infoWrap: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  comments: { flexDirection: "row", alignItems: "center" },
  location: { flexDirection: "row", alignItems: "center" },
  commentText: {
    fontFamily: "Roboto-Medium",
    fontWeight: "400",
    fontSize: 16,
    color: "#BDBDBD",
    lineHeight: 19,
  },
  locationText: {
    fontFamily: "Roboto-Medium",
    fontWeight: "400",
    fontSize: 16,
    color: "#212121",
    lineHeight: 19,
    textDecorationLine: "underline",
  },
});
