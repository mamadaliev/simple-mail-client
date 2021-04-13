import React from 'react';
import {Button, createMuiTheme, Paper, TextField} from "@material-ui/core";
import {fade, makeStyles} from '@material-ui/core/styles';
import SendIcon from '@material-ui/icons/Send';
import {observer} from "mobx-react-lite";
import ComposeStore from "../../store/ComposeStore";
import MailStore from "../../store/MailStore";

import {Editor, EditorState} from 'draft-js';
import 'draft-js/dist/Draft.css';

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
    sendContainer: {},
    input: {
        margin: '10px 0 10px 0',
        width: '100%'
    },
    message: {
        margin: '20px 0 50px 0',
        width: '100%'
    }
}));

const Compose = observer(() => {

    // const [compose, setCompose] = useState({
    //     from: "",
    //     to: "",
    //     subject: "",
    //     message: ""
    // });

    const [editorState, setEditorState] = React.useState(() => EditorState.createEmpty());

    const classes = useStyles();

    const sendMessage = () => {
        MailStore.sendMessage().then(r => {
            console.log(r)
            setTimeout(() => {
                console.log("Get sent messages")
                MailStore.getSentMessages().then(r => {
                    console.log(r)
                });
            }, 8000);
        });
    }

    return (
        <div className={"container"}>
            <Paper elevation={0} className={classes.paper}>
                <div className={classes.paperContainer}>
                    <div>
                        <TextField
                            className={classes.input}
                            id="standard-basic"
                            onChange={e => ComposeStore.compose.from = e.target.value}
                            value={localStorage.getItem("email")}
                            label="From:"
                            disabled={true}/>
                    </div>
                    <div>
                        <TextField
                            className={classes.input}
                            id="standard-basic"
                            onChange={e => ComposeStore.compose.to = e.target.value}
                            value={ComposeStore.compose.to}
                            label="To:"/>
                    </div>
                    <div>
                        <TextField
                            className={classes.input}
                            id="standard-basic"
                            onChange={e => ComposeStore.compose.subject = e.target.value}
                            value={ComposeStore.compose.subject}
                            label="Subject:"/>
                    </div>
                    <div>
                        <Editor editorState={editorState} onChange={setEditorState} />
                    </div>
                    <div>
                        <TextField
                            className={classes.message}
                            id="multiline-static"
                            label="Message:"
                            multiline
                            aria-rowcount={10}
                            rows={10}
                            onChange={e => ComposeStore.compose.message = e.target.value}
                            value={ComposeStore.compose.message}
                        />
                        {/*<TextareaAutosize className={"primary-textarea"} rowsMin={5} placeholder={"Write a message"}/>*/}
                    </div>
                    <div className={"sendContainer"}>
                        <Button
                            theme={theme}
                            variant="contained"
                            color="primary"
                            className={classes.button}
                            onClick={sendMessage}
                            endIcon={<SendIcon/>}>
                            Send
                        </Button>
                    </div>
                </div>
            </Paper>
        </div>
    );
});

export default Compose;
