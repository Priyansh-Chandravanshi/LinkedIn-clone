import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import ReactPlayer from "react-player";
import styled from "styled-components";
import { getArticlesAPI, updateArticleAPI, deletePostAPI } from "../action";
import PostalModal from "./PostalModal";

/* ---------------- STYLES ---------------- */

const Container = styled.div`
  grid-area: main;
`;

const CommonBox = styled.div`
  text-align: center;
  overflow: hidden;
  margin-bottom: 8px;
  background-color: #fff;
  border-radius: 5px;
  position: relative;
  border: none;
  box-shadow: 0 0 0 1px rgb(0 0 0 / 15%);
`;

const ShareBox = styled(CommonBox)`
  display: flex;
  flex-direction: column;
`;

const Article = styled(CommonBox)`
  padding: 0;
`;

const Content = styled.div`
  text-align: center;
`;

/* ---------------- MAIN ---------------- */

function Main(props) {
  const [showModal, setShowModal] = useState("close");

  useEffect(() => {
    props.getArticles();
  }, []);

  const clickHandler = (e) => {
    e.preventDefault();
    if (!props.user) return;

    setShowModal(showModal === "open" ? "close" : "open");
  };

  /* ---------- LIKE ---------- */

  function likeHandler(event, postIndex, id) {
    event.preventDefault();

    let likesObj = props.articles[postIndex].likes || {
      count: 0,
      whoLiked: [],
    };

    let currentLikes = likesObj.count;
    let whoLiked = [...likesObj.whoLiked];

    let user = props.user?.email;
    if (!user) return;

    let userIndex = whoLiked.indexOf(user);

    if (userIndex >= 0) {
      currentLikes--;
      whoLiked.splice(userIndex, 1);
    } else {
      currentLikes++;
      whoLiked.push(user);
    }

    const payload = {
      update: {
        likes: {
          count: currentLikes,
          whoLiked: whoLiked,
        },
      },
      id: id,
    };

    props.likeHandler(payload);
  }

  /* ---------------- UI ---------------- */

  return (
    <Container>
      {/* POST BOX */}
      <ShareBox>
        <div style={{ display: "flex", padding: "10px" }}>
          <img
            src={props.user?.photoURL || "/images/user.svg"}
            alt=""
            style={{ width: 45, borderRadius: "50%" }}
          />

          <button
            onClick={clickHandler}
            disabled={props.loading}
            style={{
              flex: 1,
              marginLeft: 10,
              borderRadius: 30,
              border: "1px solid #ccc",
              textAlign: "left",
              padding: "10px",
              background: "white",
            }}
          >
            Start a post
          </button>
        </div>
      </ShareBox>

      {/* FEED */}
      <Content>
        {props.loading && <p>Loading...</p>}

        {props.articles?.map((article, key) => (
          <Article key={key}>
            {/* USER INFO */}
            <div style={{ display: "flex", padding: 15 }}>
              <img
                src={article.actor?.image || "/images/user.svg"}
                alt=""
                style={{ width: 45, borderRadius: "50%" }}
              />

              <div style={{ marginLeft: 10, textAlign: "left" }}>
                <div style={{ fontWeight: "bold" }}>
                  {article.actor?.title}
                </div>
                <div style={{ fontSize: 12 }}>
                  {article.actor?.description}
                </div>
                <div style={{ fontSize: 11 }}>
                  {article.actor?.date?.toDate?.().toLocaleDateString()}
                </div>
              </div>

              {/* DELETE BUTTON */}
              {article.actor?.email === props.user?.email && (
                <button
                  onClick={() => props.deletePost(props.ids[key])}
                  style={{
                    marginLeft: "auto",
                    border: "none",
                    background: "transparent",
                    color: "red",
                    cursor: "pointer",
                    fontWeight: "bold",
                  }}
                >
                  Delete
                </button>
              )}
            </div>

            {/* DESCRIPTION */}
            <div style={{ padding: "0 15px", textAlign: "left" }}>
              {article.description}
            </div>

            {/* IMAGE OR VIDEO */}
            {article.video && (
              <ReactPlayer width="100%" url={article.video} />
            )}

            {article.sharedImg && (
              <img src={article.sharedImg} alt="" width="100%" />
            )}

            {/* LIKE */}
            <div style={{ padding: 10 }}>
              <button
                onClick={(e) => likeHandler(e, key, props.ids[key])}
              >
                Like ({article.likes?.count || 0})
              </button>
            </div>
          </Article>
        ))}
      </Content>

      <PostalModal showModal={showModal} clickHandler={clickHandler} />
    </Container>
  );
}

/* ---------------- REDUX ---------------- */

const mapStateToProps = (state) => ({
  user: state.userState.user,
  loading: state.articleState.loading,
  articles: state.articleState.articles,
  ids: state.articleState.ids,
});

const mapDispatchToProps = (dispatch) => ({
  getArticles: () => dispatch(getArticlesAPI()),
  likeHandler: (payload) => dispatch(updateArticleAPI(payload)),
  deletePost: (id) => dispatch(deletePostAPI(id)),
});

export default connect(mapStateToProps, mapDispatchToProps)(Main);