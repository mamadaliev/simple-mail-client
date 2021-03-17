import React from 'react';
import clsx from 'clsx';
import {fade, makeStyles, useTheme} from '@material-ui/core/styles';
import Drawer from '@material-ui/core/Drawer';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import List from '@material-ui/core/List';
import Typography from '@material-ui/core/Typography';
import Divider from '@material-ui/core/Divider';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import ChevronRightIcon from '@material-ui/icons/ChevronRight';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import InboxIcon from '@material-ui/icons/MoveToInbox';
import SearchIcon from '@material-ui/icons/Search';
import MailIcon from '@material-ui/icons/Mail';
import CreateIcon from '@material-ui/icons/Create';
import TuneIcon from '@material-ui/icons/Tune';
import {Button, InputBase} from "@material-ui/core";
import {Link, Route, Switch} from "react-router-dom";
import Home from "./components/pages/Home";
import Inbox from "./components/pages/Inbox";
import Sent from "./components/pages/Sent";
import Compose from "./components/pages/Compose";
import Settings from "./components/pages/Settings";
import Counter from "./components/examples/Counter";
import TodoPage from "./components/examples/TodoPage";
import Todo from "./components/examples/Todo";

const drawerWidth = 240;

const useStyles = makeStyles((theme) => ({
    root: {
        display: 'flex',
        backgroundColor: '#fff'
    },
    appBar: {
        zIndex: theme.zIndex.drawer + 1,
        transition: theme.transitions.create(['width', 'margin'], {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.leavingScreen,
        }),
        boxShadow: "none",
        backgroundColor: "#fff"
    },
    appBarShift: {
        marginLeft: drawerWidth,
        width: `calc(100% - ${drawerWidth}px)`,
        transition: theme.transitions.create(['width', 'margin'], {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.enteringScreen,
        }),
    },
    menuButton: {
        marginRight: 36,
    },
    hide: {
        display: 'none',
    },
    drawer: {
        width: drawerWidth,
        flexShrink: 0,
        whiteSpace: 'nowrap',
    },
    drawerOpen: {
        width: drawerWidth,
        transition: theme.transitions.create('width', {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.enteringScreen,
        }),
    },
    drawerClose: {
        transition: theme.transitions.create('width', {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.leavingScreen,
        }),
        overflowX: 'hidden',
        width: theme.spacing(7) + 1,
        [theme.breakpoints.up('sm')]: {
            width: theme.spacing(9) + 1,
        },
    },
    toolbar: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'flex-end',
        padding: theme.spacing(0, 1),
        // necessary for content to be below app bar
        ...theme.mixins.toolbar,
    },
    content: {
        flexGrow: 1,
        padding: theme.spacing(3),
    },
    search: {
        position: 'relative',
        borderRadius: 20,
        backgroundColor: fade('#e1e7eb', 0.5),
        '&:hover': {
            backgroundColor: fade('#e1e7eb', 1),
        },
        marginRight: theme.spacing(2),
        marginLeft: 0,
        width: '100%',
        [theme.breakpoints.up('sm')]: {
            marginLeft: theme.spacing(3),
            width: 'auto',
        },
        color: '#000'
    },
    searchIcon: {
        padding: theme.spacing(0, 2),
        height: '100%',
        position: 'absolute',
        pointerEvents: 'none',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        color: '#909090'
    },
    inputRoot: {
        color: 'inherit',
        padding: '4px 4px 4px 0',
    },
    inputInput: {
        padding: theme.spacing(1, 1, 1, 0),
        // vertical padding + font size from searchIcon
        paddingLeft: `calc(1em + ${theme.spacing(4)}px)`,
        transition: theme.transitions.create('width'),
        width: '100%',
        [theme.breakpoints.up('md')]: {
            width: '40ch',
        },
    },
    button: {
        margin: '10px 0',
        borderRadius: 20,
        background: '#0099ff',
        color: '#fff',
        textTransform: 'none',
        boxShadow: 'none',
        '&:hover': {
            boxShadow: 'none',
            backgroundColor: fade('#0099ff', 1),
        },
        '&:active': {
            boxShadow: 'none',
            backgroundColor: fade('#0099ff', 1),
        },
    },
}));

export default function Main() {
    const classes = useStyles();
    const theme = useTheme();
    const [open, setOpen] = React.useState(false);

    const handleDrawerOpen = () => {
        setOpen(true);
    };

    const handleDrawerClose = () => {
        setOpen(false);
    };

    return (
        <div className={classes.root}>
            <AppBar
                position="fixed"
                className={clsx(classes.appBar, {
                    [classes.appBarShift]: open,
                })}
            >
                <Toolbar>
                    <IconButton
                        color="#000"
                        aria-label="open drawer"
                        onClick={handleDrawerOpen}
                        edge="start"
                        className={clsx(classes.menuButton, {
                            [classes.hide]: open,
                        })}
                    >
                        <MenuIcon/>
                    </IconButton>
                    <Typography variant="h6" noWrap>
                        <Link to='/compose'>
                            <Button
                                theme={theme}
                                className={classes.button}
                                variant="contained"
                                color="primary"
                            >
                                Compose
                            </Button>
                        </Link>
                    </Typography>
                    <div className={classes.search}>
                        <div className={classes.searchIcon}>
                            <SearchIcon/>
                        </div>
                        <InputBase
                            placeholder="Search messages or contacts"
                            classes={{
                                root: classes.inputRoot,
                                input: classes.inputInput,
                            }}
                            inputProps={{'aria-label': 'search'}}
                        />
                    </div>
                </Toolbar>
            </AppBar>
            <Drawer
                variant="permanent"
                className={clsx(classes.drawer, {
                    [classes.drawerOpen]: open,
                    [classes.drawerClose]: !open,
                })}
                classes={{
                    paper: clsx({
                        [classes.drawerOpen]: open,
                        [classes.drawerClose]: !open,
                    }),
                }}
            >
                <div className={classes.toolbar}>
                    <IconButton onClick={handleDrawerClose}>
                        {theme.direction === 'rtl' ? <ChevronRightIcon/> : <ChevronLeftIcon/>}
                    </IconButton>
                </div>
                <Divider/>
                <List>
                    <Link to='/inbox'>
                        <ListItem button key={"Inbox"}>
                            <ListItemIcon><InboxIcon/></ListItemIcon>
                            <ListItemText primary={"Inbox"}/>
                        </ListItem>
                    </Link>
                    <Link to='/sent'>
                        <ListItem button key={"Sent"}>
                            <ListItemIcon><MailIcon/></ListItemIcon>
                            <ListItemText primary={"Sent"}/>
                        </ListItem>
                    </Link>
                </List>
                <Divider/>
                <List>
                    <Link to='/settings'>
                        <ListItem button key={"Settings"}>
                            <ListItemIcon><TuneIcon/></ListItemIcon>
                            <ListItemText primary={"Settings"}/>
                        </ListItem>
                    </Link>
                </List>
            </Drawer>
            <main className={classes.content}>
                <div className={classes.toolbar}/>
                <div className={"container"}>
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
                </div>
            </main>
        </div>
    );
}