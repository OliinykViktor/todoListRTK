import { useDispatch, useSelector } from "react-redux";
import useHttp from '../../hooks/http.hook'
import TodoListItem from "./components/TodoListItem";
import { useCallback, useEffect } from "react";
import {todosDeleted, fetchTodos} from "./TodosSlice"
import { Alert, Box, CircularProgress, Stack } from "@mui/material";

const TodoList =()=>{
    const {todos, todosLoadingStatus} = useSelector(state=>state.todos);
    const dispatch = useDispatch();
    const {request} = useHttp();

    useEffect(()=>{
        dispatch(fetchTodos())
    },[]);

    const onDelete = useCallback((id) => {
        dispatch(fetchTodos(request));
        request(`http://localhost:3001/todos/${id}`, 'DELETE')
          .then(res => {
            console.log(res, 'Deleted');
            dispatch(todosDeleted(id));
          })
          .catch(error => console.log(error));
      }, [dispatch, request]);

    if (todosLoadingStatus === "Loading") {
        return (
            <Stack>
                <CircularProgress color="success"/>
            </Stack>    
        )    } else if (todosLoadingStatus === "error"){
        return (
            <Alert severity="error">Oops! Something went wrong while accessing the to-do list.</Alert>
        )
    }

    const renderTodosList = (arr) => {
        if(arr.length === 0){
            return (
                <Alert severity="info">The to-do list is empty.</Alert>
            )
        }

        return arr.map(({id, ...props})=>{
            return <TodoListItem key={id} {...props} onDelete={()=>onDelete(id)}/>
        })
    }

    const element = renderTodosList(todos)
return(
        <Box sx={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            backgroundColor:"#f2f7d5de", 
            padding:"10px", marginTop:"50px", 
            borderRadius:"7px"
        }}>
            {element}
        </Box>
    )
}

export default TodoList