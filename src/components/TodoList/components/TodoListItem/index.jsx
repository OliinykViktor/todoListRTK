import { List, ListItemText, ListItemButton } from "@mui/material";
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';

const TodoListItem = ({ title, onDelete }) => {
    return (
      <List sx={{display:"flex"}}>
        <ListItemText primary={title} />
        <ListItemButton dense>
          <DeleteForeverIcon onClick={onDelete}/>
        </ListItemButton>    
      </List>
      )
  }
  
  export default TodoListItem;