import db, { auth, provider, storage } from "../firebase";
import { SET_LOADING_STATUS, SET_USER, GET_ARTICLES } from "./actionType";

/* ---------------- USER ---------------- */

export function setUser(payload) {
  return {
    type: SET_USER,
    user: payload,
  };
}

export function setLoading(status) {
  return {
    type: SET_LOADING_STATUS,
    status: status,
  };
}

export function getArticles(payload, id) {
  return {
    type: GET_ARTICLES,
    payload: payload,
    id: id,
  };
}

/* ---------------- AUTH ---------------- */

export function getUserAuth() {
  return (dispatch) => {
    auth.onAuthStateChanged(async (user) => {
      if (user) {
        dispatch(setUser(user));
      }
    });
  };
}

export function signInAPI() {
  return (dispatch) => {
    auth.signInWithPopup(provider)
      .then((payload) => dispatch(setUser(payload.user)))
      .catch((err) => alert(err.message));
  };
}

export function signOutAPI() {
  return (dispatch) => {
    auth.signOut()
      .then(() => dispatch(setUser(null)))
      .catch((err) => alert(err.message));
  };
}

/* ---------------- POST CREATE ---------------- */

export function postArticleAPI(payload) {
  return (dispatch) => {
    dispatch(setLoading(true));

    const articleData = {
      actor: {
        description: payload.user.email,
        title: payload.user.displayName,
        date: payload.timestamp,
        image: payload.user.photoURL,
        email: payload.user.email, // important for edit/delete ownership
      },
      video: payload.video || "",
      sharedImg: "",
      likes: {
        count: 0,
        whoLiked: [],
      },
      comments: 0,
      description: payload.description,
    };

    if (payload.image !== "") {
      const upload = storage
        .ref(`images/${payload.image.name}`)
        .put(payload.image);

      upload.on(
        "state_changed",
        () => {},
        (err) => alert(err),
        async () => {
          const downloadURL =
            await upload.snapshot.ref.getDownloadURL();
          articleData.sharedImg = downloadURL;

          db.collection("articles").add(articleData);
          dispatch(setLoading(false));
        }
      );
    } else {
      db.collection("articles").add(articleData);
      dispatch(setLoading(false));
    }
  };
}

/* ---------------- GET POSTS ---------------- */

export function getArticlesAPI() {
  return (dispatch) => {
    dispatch(setLoading(true));

    db.collection("articles")
      .orderBy("actor.date", "desc")
      .onSnapshot((snapshot) => {
        const payload = snapshot.docs.map((doc) => doc.data());
        const id = snapshot.docs.map((doc) => doc.id);

        dispatch(getArticles(payload, id));
        dispatch(setLoading(false));
      });
  };
}

/* ---------------- LIKE UPDATE ---------------- */

export function updateArticleAPI(payload) {
  return (dispatch) => {
    db.collection("articles")
      .doc(payload.id)
      .update(payload.update);
  };
}

/* ---------------- DELETE POST ---------------- */

export function deletePostAPI(id) {
  return (dispatch) => {
    db.collection("articles")
      .doc(id)
      .delete()
      .then(() => {
        dispatch(getArticlesAPI());
      })
      .catch((err) => alert(err.message));
  };
}

/* ---------------- EDIT POST ---------------- */

export function editPostAPI(payload) {
  return (dispatch) => {
    db.collection("articles")
      .doc(payload.id)
      .update({
        description: payload.text,
      })
      .then(() => dispatch(getArticlesAPI()))
      .catch((err) => alert(err.message));
  };
}