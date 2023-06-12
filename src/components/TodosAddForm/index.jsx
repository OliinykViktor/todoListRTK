import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { v4 as uuidv4 } from 'uuid';
import useHttp from '../../hooks/http.hook';
import {todosCreated} from "../../components/TodoList/TodosSlice" 
import { Box, Button, TextField} from '@mui/material';
import PlaylistAddIcon from '@mui/icons-material/PlaylistAdd';


const TodosAddForm = () =>{
    const [todosTitle, setTodosTitle] = useState('');
    const dispatch = useDispatch();
    const {request} = useHttp();

    const onSubmitHandler = (e) =>{
        e.preventDefault;

        const newTodos = {
            "id": uuidv4(),
            "title": todosTitle,
            "completed": false
        }

        request("http://localhost:3001/todos", "POST", JSON.stringify(newTodos))
            .then(res => console.log(res, "Posted"))
            .then(dispatch(todosCreated(newTodos)))
            .catch(error => console.log(error));

        setTodosTitle('')
    }

    return(
        <Box 
            component={"form"} 
            onSubmit={onSubmitHandler}
            sx={{ marginTop:"10px"}}
            >
            <TextField
                placeholder="What plans?"
                variant="filled"
                focused 
                type="text" 
                value={todosTitle}
                onChange={(e)=>setTodosTitle(e.target.value)}
                sx={{  
                    backgroundColor:"#b8bca3de", 
                    borderRadius:"7px",
                    borderBottom:"none"
                    }}/>
            <Button 
                type='submit' 
                sx={{
                    backgroundColor:"#7ff893", 
                    paddingTop:"15px", 
                    paddingBottom:"15px",
                    color:"black"
                    }}>
                        <PlaylistAddIcon/>
            </Button>
        </Box>
    )
}

export default TodosAddForm