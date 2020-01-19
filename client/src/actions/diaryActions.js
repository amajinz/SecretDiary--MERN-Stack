import axios from "axios";
import {
  GET_DIARIES,
  ADD_DIARY,
  UPDATE_DIARY,
  DELETE_DIARY,
  DIARIES_LOADING,
  GET_DIARY,
  CLEAR_DIARY
} from "./types";
import {
  getDiariesURL,
  getDiaryURL,
  addDiaryURL,
  updateDiaryURL,
  deleteDiaryURL
} from "../constants";
import { tokenHeader } from "./authActions";
import { returnErrors } from "./errorActions";
import { encryptContent, decryptContent } from "../encryption";

export const getDiaries = () => (dispatch, getState) => {
  dispatch(setDiariesLoading());
  axios
    .get(getDiariesURL, tokenHeader(getState))
    .then(res =>
      dispatch({
        type: GET_DIARIES,
        payload: res.data
      })
    )
    .catch(err =>
      dispatch(returnErrors(err.response.data, err.response.status))
    );
};

export const getDiary = id => (dispatch, getState) => {
  dispatch(setDiariesLoading());
  axios
    .get(getDiaryURL(id), tokenHeader(getState))
    .then(res => {
      // const decryptedBody = decryptContent(res.data.body, secret);
      // const data = { ...res.data, body: decryptedBody };
      dispatch({
        type: GET_DIARY,
        payload: res.data
      });
    })
    .catch(err => {
      dispatch(returnErrors(err.response, err.response.status));
    });
};

export const addDiary = ({ title, body }, history, secret) => (
  dispatch,
  getState
) => {
  dispatch(setDiariesLoading());
  const encryptBody = encryptContent(body, secret);
  const content = JSON.stringify({ title, body: encryptBody });

  axios
    .post(addDiaryURL, content, tokenHeader(getState))
    .then(res => {
      const id = res.data._id;
      dispatch({
        type: ADD_DIARY,
        payload: res.data
      });
      history.push(`/diary/${id}`);
    })
    .catch(err =>
      dispatch(returnErrors(err.response.data, err.response.status))
    );
};

export const editDiary = (id, { title, body }, history, secret) => (
  dispatch,
  getState
) => {
  dispatch(setDiariesLoading());

  const encryptTitle = encryptContent(title, secret);
  const encryptBody = encryptContent(body, secret);
  const content = JSON.stringify({ encryptTitle, encryptBody });
  axios
    .put(updateDiaryURL(id), content, tokenHeader(getState))
    .then(res => {
      dispatch({
        type: UPDATE_DIARY,
        payload: res.data
      });
      history.push(`/diary/${id}`);
    })
    .catch(err =>
      dispatch(returnErrors(err.response.data, err.response.status))
    );
};

export const deleteDiary = (id, history) => (dispatch, getState) => {
  axios
    .delete(deleteDiaryURL(id), tokenHeader(getState))
    .then(res => {
      dispatch({
        type: DELETE_DIARY,
        payload: id
      });
      history.push("/");
    })
    .catch(err =>
      dispatch(returnErrors(err.response.data, err.response.status))
    );
};

export const setDiariesLoading = () => {
  return {
    type: DIARIES_LOADING
  };
};

export const clearDiary = () => {
  return {
    type: CLEAR_DIARY
  };
};
