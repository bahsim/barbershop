import { createAction, handleActions } from 'redux-actions';
import { reducerMethods } from './utils';
import axios from 'axios';

export const fetchData = () => async (dispatch, getState) => {
  const { 
    global: { 
      data: oldData, 
      filterGender, 
      filterAge,
      search,
    },
  } = getState()

  try {
    const { data, error } = await axios.get('/data.json');

    if (error) {
      return alert(error);
    }

    const dataFiltered = data.filter(({ 
      gender, age, name, description,
    }) => {
      if (filterGender && filterGender !== gender) {
        return false
      }
      if (filterAge 
        && ((filterAge[0] < age[0]) || (filterAge[1] > age[1]))
      ) {
        return false
      }
      if (search
        && (name.indexOf(search) === -1 || description.indexOf(search) === -1)
      ) {
        return false
      }
      return true
    })

    const newData = [...oldData, ...dataFiltered]

    await dispatch(replaceData(
      newData.map((item, index) => ({ ...item, id: index }))
    ));

  } catch (error) {
    alert(error);
  }
};

export const filterDataByAge = value => async dispatch => {
  await dispatch(replaceFilterAge(value))
  await dispatch(replaceData([]))
  await dispatch(fetchData())
}

export const filterDataByGender = value => async dispatch => {
  await dispatch(replaceFilterGender(value))
  await dispatch(replaceData([]))
  await dispatch(fetchData())
}

export const searchInData = value => async dispatch => {
  await dispatch(replaceSearch(value))
  await dispatch(replaceData([]))
  await dispatch(fetchData())
}

export const defaultState = {
  data: [],
  filterGender: null,
  filterAge: null,
  search: null,
};

export const replaceData = createAction('REPLACE_DATA');
export const replaceFilterGender = createAction('REPLACE_FILTER_GENDER');
export const replaceFilterAge = createAction('REPLACE_FILTER_AGE');
export const replaceSearch = createAction('REPLACE_SEARCH');

export const reducer = handleActions(
  {
    [replaceData]: reducerMethods.replace('data'),
    [replaceFilterGender]: reducerMethods.replace('filterGender'),
    [replaceFilterAge]: reducerMethods.replace('filterAge'),
    [replaceSearch]: reducerMethods.replace('search'),
  },
  defaultState,
);
