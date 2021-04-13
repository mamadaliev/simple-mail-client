// import './App.css';

import {Switch, Route, Link} from 'react-router-dom'
import Counter from "./components/examples/Counter";
import Todo from "./components/examples/Todo";
import Home from "./components/pages/Home";
import TodoPage from "./components/examples/TodoPage";
import Inbox from "./components/pages/Inbox";
import Sent from "./components/pages/Sent";
import Compose from "./components/pages/Compose";
import Settings from "./components/pages/Settings";

import { withStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import MuiDialogTitle from '@material-ui/core/DialogTitle';
import MuiDialogContent from '@material-ui/core/DialogContent';
import MuiDialogActions from '@material-ui/core/DialogActions';
import IconButton from '@material-ui/core/IconButton';
import CloseIcon from '@material-ui/icons/Close';
import Typography from '@material-ui/core/Typography';

import "./styles/App.css"
import "./styles/Input.css"
import {useState} from "react";

const styles = (theme) => ({
    root: {
        margin: 0,
        padding: theme.spacing(2),
    },
    closeButton: {
        position: 'absolute',
        right: theme.spacing(1),
        top: theme.spacing(1),
        color: theme.palette.grey[500],
    },
});

const DialogTitle = withStyles(styles)((props) => {
    const { children, classes, onClose, ...other } = props;
    return (
        <MuiDialogTitle disableTypography className={classes.root} {...other}>
            <Typography variant="h6">{children}</Typography>
            {onClose ? (
                <IconButton aria-label="close" className={classes.closeButton} onClick={onClose}>
                    <CloseIcon />
                </IconButton>
            ) : null}
        </MuiDialogTitle>
    );
});

const DialogContent = withStyles((theme) => ({
    root: {
        padding: theme.spacing(2),
    },
}))(MuiDialogContent);

const DialogActions = withStyles((theme) => ({
    root: {
        margin: 0,
        padding: theme.spacing(1),
    },
}))(MuiDialogActions);

const App = () => {

    const [open, setOpen] = useState(false);

    const handleClickOpen = () => {
        setOpen(true);
    };
    const handleClose = () => {
        setOpen(false);
    };

    return (
        <div>
            <div className="header">
                <ul>
                    <li><Link to='/'>Home</Link></li>
                    <li><Button onClick={handleClickOpen}>Compose</Button></li>
                    <li><Link to='/inbox'>Inbox</Link></li>
                    <li><Link to='/sent'>Sent</Link></li>
                    <li><Link to='/settings'>Settings</Link></li>
                </ul>
            </div>

            {/*<div>*/}
            {/*    <span><Link to='/counter'>Counter</Link> </span>*/}
            {/*    <span><Link to='/todos'>Todos</Link></span>*/}
            {/*</div>*/}

            <Switch>
                <Route exact path='/' component={Home}/>
                <Route path='/inbox' component={Inbox}/>
                <Route path='/sent' component={Sent}/>
                <Route path='/compose' component={Compose}/>
                <Route path='/settings' component={Settings}/>
                <Route path='/counter' component={Counter}/>
                <Route path={'/todos/:id'} component={TodoPage}/>
                <Route path='/todos' component={Todo}/>
            </Switch>

            <Dialog onClose={handleClose} aria-labelledby="customized-dialog-title" open={open}>
                <DialogTitle id="customized-dialog-title" onClose={handleClose}>
                    Modal title
                </DialogTitle>
                <DialogContent dividers>
                    <Typography gutterBottom>
                        Cras mattis consectetur purus sit amet fermentum. Cras justo odio, dapibus ac facilisis
                        in, egestas eget quam. Morbi leo risus, porta ac consectetur ac, vestibulum at eros.
                    </Typography>
                    <Typography gutterBottom>
                        Praesent commodo cursus magna, vel scelerisque nisl consectetur et. Vivamus sagittis
                        lacus vel augue laoreet rutrum faucibus dolor auctor.
                    </Typography>
                    <Typography gutterBottom>
                        Aenean lacinia bibendum nulla sed consectetur. Praesent commodo cursus magna, vel
                        scelerisque nisl consectetur et. Donec sed odio dui. Donec ullamcorper nulla non metus
                        auctor fringilla.
                    </Typography>
                </DialogContent>
                <DialogActions>
                    <Button autoFocus onClick={handleClose} color="primary">
                        Save changes
                    </Button>
                </DialogActions>
            </Dialog>
        </div>
    );
}

export default App;
