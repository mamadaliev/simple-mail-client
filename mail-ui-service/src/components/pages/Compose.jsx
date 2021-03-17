import React from 'react';
import {Button, createMuiTheme, Icon, Paper, TextareaAutosize, TextField} from "@material-ui/core";
import {fade, makeStyles} from '@material-ui/core/styles';
import SendIcon from '@material-ui/icons/Send';

const theme = createMuiTheme({
    overrides: {
        MuiButton: {
            root: {
                margin: "100px",
                padding: "10px"
            }
        }
    }
});

const useStyles = makeStyles((theme) => ({
    button: {
        margin: theme.spacing(0),
        borderRadius: 20,
        background: '#0099ff',
        '&:hover': {
            backgroundColor: fade('#0099ff', 1),
        },
        '&:active': {
            backgroundColor: fade('#0099ff', 1),
        },
    },
    paper: {
        borderRadius: 4
    },
    paperContainer: {
        padding: '0 30px 20px 30px',
    },
    sendContainer: {
    },
    input: {
        margin: '10px 0 10px 0',
        width: '100%'
    },
    message: {
        margin: '20px 0 50px 0',
        width: '100%'
    }
}));

const Compose = () => {

    const classes = useStyles();

    return (
        <div className={"container"}>
            <Paper elevation={1} className={classes.paper}>
                <div className={classes.paperContainer}>
                    <div>
                        <TextField className={classes.input} id="standard-basic" label="To:" />
                    </div>
                    <div>
                        <TextField className={classes.input} id="standard-basic" label="From:" />
                    </div>
                    <div>
                        <TextField
                            className={classes.message}
                            id="multiline-static"
                            label="Message"
                            multiline
                            rowsMin={5}
                        />
                        {/*<TextareaAutosize className={"primary-textarea"} rowsMin={5} placeholder={"Write a message"}/>*/}
                    </div>
                    <div className={"sendContainer"}>
                        <Button
                            theme={theme}
                            variant="contained"
                            color="primary"
                            className={classes.button}
                            endIcon={<SendIcon/>}
                        >
                            Send
                        </Button>
                    </div>
                </div>
            </Paper>
        </div>
    );
};

export default Compose;
